import { getWagmiPublicClient, topUpContractAddresses } from "@/config";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db/drizzle";
import {
  creditPurchases,
  customBots,
  nftMetadata,
  users,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { decodeEventLog, parseAbiItem } from "viem";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async () => {
    return await db.select().from(users);
  }),

  getLeaderboard: publicProcedure.query(async () => {
    const leaderboard = await db
      .select({
        address: users.address,
        xp: users.xp,
        rank: sql<number>`row_number() over (order by cast(${users.xp} as numeric) desc)`.as(
          "rank"
        ),
      })
      .from(users)
      .orderBy(desc(sql`cast(${users.xp} as numeric)`))
      .limit(10);

    return leaderboard;
  }),

  extractEvent: publicProcedure
    .input(z.object({ txHash: z.string(), chainId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const publicClient = getWagmiPublicClient(input.chainId);
        const receipt = await publicClient?.waitForTransactionReceipt({
          hash: input.txHash as `0x${string}`,
        });
        if (!receipt) {
          throw new Error("Transaction receipt not found");
        }

        // Check if receipt.to is defined before comparing
        if (!receipt.to) {
          throw new Error("Transaction 'to' address is undefined");
        }

        if (
          receipt.to.toLowerCase() !==
          topUpContractAddresses[input.chainId].toLowerCase()
        ) {
          throw new Error("Invalid contract address");
        }

        if (receipt.logs.length === 0) {
          throw new Error("No logs found in the transaction");
        }

        const eventAbi = parseAbiItem(
          "event CreditsPurchased(address indexed user, uint256 ethPaid, uint256 creditsReceived)"
        );
        const decodedLog = decodeEventLog({
          abi: [eventAbi],
          data: receipt.logs[0].data,
          topics: receipt.logs[0].topics,
        });

        const userAddress = decodedLog.args.user.toString();
        const ethPaid = String(decodedLog.args.ethPaid);
        const creditsReceived = Number(decodedLog.args.creditsReceived);
        await db.insert(creditPurchases).values({
          userAddress,
          txHash: input.txHash.toString(),
          ethPaid: ethPaid.toString(),
          creditsReceived: creditsReceived.toString(),
        });

        await db
          .update(users)
          .set({
            totalCredits: sql`${users.totalCredits} + ${creditsReceived}`,
            lastActive: new Date(),
          })
          .where(eq(users.address, userAddress));

        return {
          userAddress,
          ethPaidWei: ethPaid.toString(),
          ethPaidEth: Number(ethPaid) / 1e18,
          creditsReceived: creditsReceived.toString(),
          message: "Purchase recorded successfully",
        };
      } catch (error) {
        console.error("Error processing purchase:", error);
        throw new Error("Failed to process purchase");
      }
    }),

  getUserCredits: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      const user = await db
        .select({ totalCredits: users.totalCredits })
        .from(users)
        .where(eq(users.address, input.address))
        .limit(1);

      if (user.length === 0) {
        const newUser = await db
          .insert(users)
          .values({
            address: input.address,
            lastActive: new Date(),
            xp: "0",
          })
          .returning();
        return { credits: newUser[0].totalCredits };
      }

      return { credits: user[0].totalCredits };
    }),

  createCustomBot: publicProcedure
    .input(
      z.object({
        creatorAddress: z.string(),
        name: z.string(),
        description: z.string(),
        prompt: z.string(),
        isPublic: z.boolean(),
        imageUrl: z.string().optional(),
        likes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(customBots).values(input).returning();
      return result[0];
    }),

  getPublicBots: publicProcedure.query(async () => {
    return await db
      .select()
      .from(customBots)
      .where(eq(customBots.isPublic, true));
  }),

  getPublicBotById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(customBots)
        .where(eq(customBots.id, Number.parseInt(input.id)))
        .limit(1);
      return result[0];
    }),

  createOrUpdateUser: publicProcedure
    .input(z.object({ address: z.string() }))
    .mutation(async ({ input }) => {
      const result = await db
        .insert(users)
        .values({
          address: input.address,
          lastActive: new Date(),
          xp: "0",
          totalCredits: "30",
        })
        .onConflictDoUpdate({
          target: users.address,
          set: { lastActive: new Date() },
        })
        .returning();
      return result[0];
    }),

  getPurchaseHistory: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select({
          id: creditPurchases.id,
          ethPaid: creditPurchases.ethPaid,
          creditsReceived: creditPurchases.creditsReceived,
          purchasedAt: creditPurchases.purchasedAt,
        })
        .from(creditPurchases)
        .where(eq(creditPurchases.userAddress, input.address))
        .orderBy(desc(creditPurchases.purchasedAt));
    }),

  addXp: publicProcedure
    .input(z.object({ address: z.string(), xpToAdd: z.number() }))
    .mutation(async ({ input }) => {
      const result = await db
        .update(users)
        .set({ xp: sql`${users.xp} + ${input.xpToAdd}` })
        .where(eq(users.address, input.address))
        .returning();
      return result[0];
    }),

  getUser: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.address, input.address));
      return result[0];
    }),

  spendCredits: publicProcedure
    .input(z.object({ address: z.string(), creditsToSpend: z.number() }))
    .mutation(async ({ input }) => {
      const result = await db
        .update(users)
        .set({
          totalCredits: sql`${users.totalCredits} - ${input.creditsToSpend}`,
        })
        .where(
          and(
            eq(users.address, input.address),
            sql`CAST(${users.totalCredits} AS INTEGER) >= ${input.creditsToSpend}`
          )
        )
        .returning();

      if (result.length === 0) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Oops! Looks like you're out of credits. Add more to continue",
        });
      }

      return result[0];
    }),

  getNFTMetadata: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select({
          name: nftMetadata.name,
          description: nftMetadata.description,
          image: nftMetadata.image,
        })
        .from(nftMetadata)
        .where(eq(nftMetadata.id, Number.parseInt(input.id)));
      return result[0];
    }),

  createNFTMetadata: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(nftMetadata).values(input).returning();
      return result[0];
    }),
});

export type UserRouter = typeof userRouter;
