import {
  certificateContractAddresses,
  dailywiserTokenContractAddresses,
  getChainById,
} from "@/config";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { GENERATE_CERTIFICATE_COST } from "@/utils/constants";
import { CERTIFICATE_CONTRACT_ABI } from "@/utils/constants/certificate";
import { DAILYWISER_TOKEN_CONTRACT_ABI } from "@/utils/constants/dailywisertoken";
import { TRPCError } from "@trpc/server";
import { Redis } from "@upstash/redis";
import { createWalletClient, http, parseEther, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { waitForTransactionReceipt } from "viem/actions";
import { z } from "zod";
import { createCaller } from "../root";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const getFaucetPrivateKey = () => {
  const key = process.env.FAUCET_PRIVATE_KEY;
  if (!key) {
    throw new Error(
      "FAUCET_PRIVATE_KEY is not defined in environment variables"
    );
  }
  if (!key.startsWith("0x")) {
    return `0x${key}` as `0x${string}`;
  }
  return key as `0x${string}`;
};

// Safely get the admin private key
const getAdminPrivateKey = () => {
  const key = process.env.ADMIN_PRIVATE_KEY;
  if (!key) {
    throw new Error(
      "ADMIN_PRIVATE_KEY is not defined in environment variables"
    );
  }
  if (!key.startsWith("0x")) {
    return `0x${key}` as `0x${string}`;
  }
  return key as `0x${string}`;
};

export const web3Router = createTRPCRouter({
  adminMintCertificate: publicProcedure
    .input(
      z.object({
        chainId: z.number(),
        userAddress: z.string(),
        tokenURI: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { chainId, userAddress, tokenURI } = input;

      try {
        const ADMIN_PRIVATE_KEY = getAdminPrivateKey();
        const adminAccount = privateKeyToAccount(ADMIN_PRIVATE_KEY);

        const walletClient = createWalletClient({
          account: adminAccount,
          chain: getChainById(chainId),
          transport: http(),
        });

        // Deduct credits
        const caller = createCaller(ctx);
        await caller.user.spendCredits({
          address: userAddress,
          creditsToSpend: GENERATE_CERTIFICATE_COST,
        });
        await caller.user.addXp({
          address: userAddress,
          xpToAdd: GENERATE_CERTIFICATE_COST,
        });

        // Use provided tokenURI or default if not provided
        const finalTokenURI =
          tokenURI ||
          "https://gateway.irys.xyz/FFyoky1LPR8Q3cFNFu2vN5CaywHFrKRVpZSEZDNeFejQ";

        const mintNFTReceiptHash = await walletClient.writeContract({
          address: certificateContractAddresses[chainId],
          abi: CERTIFICATE_CONTRACT_ABI,
          functionName: "mintNFT",
          args: [userAddress, finalTokenURI],
        });

        const mintNFTReceipt = await waitForTransactionReceipt(walletClient, {
          hash: mintNFTReceiptHash,
        });

        return {
          hash: mintNFTReceipt.transactionHash,
        };
      } catch (error: any) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `${errorMessage}`,
        });
      }
    }),

  claimFaucetToken: publicProcedure
    .input(
      z.object({
        chainId: z.number(),
        userAddress: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { chainId, userAddress } = input;

      // Check if the user has already claimed within the last 24 hours
      const lastClaimTime = await redis.get(`faucet:${userAddress}`);
      if (lastClaimTime) {
        const timeElapsed = Date.now() - Number(lastClaimTime);
        if (timeElapsed < 24 * 60 * 60 * 1000) {
          // 24 hours in milliseconds
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "You can only claim once per day. Please try again later.",
          });
        }
      }

      try {
        const FAUCET_PRIVATE_KEY = getFaucetPrivateKey();
        const faucetAccount = privateKeyToAccount(FAUCET_PRIVATE_KEY);

        const walletClient = createWalletClient({
          account: faucetAccount,
          chain: getChainById(chainId),
          transport: http(),
        });

        // Send 0.001 EDU tokens
        const txHash = await walletClient.sendTransaction({
          to: userAddress as `0x${string}`,
          value: parseEther("0.001"),
        });

        // Update the last claim time in Redis
        await redis.set(`faucet:${userAddress}`, Date.now());

        return {
          hash: txHash,
        };
      } catch (error: any) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to claim faucet token: ${errorMessage}`,
        });
      }
    }),

  mintDailywiserToken: publicProcedure
    .input(
      z.object({
        toAddress: z.string(),
        amount: z.string(),
        chainId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { toAddress, amount, chainId } = input;
      try {
        const ADMIN_PRIVATE_KEY = getAdminPrivateKey();
        const adminAccount = privateKeyToAccount(ADMIN_PRIVATE_KEY);

        const walletClient = createWalletClient({
          account: adminAccount,
          chain: getChainById(chainId),
          transport: http(),
        });

        // Mint ERC20 tokens
        const mintReceiptHash = await walletClient.writeContract({
          address: dailywiserTokenContractAddresses[chainId],
          abi: DAILYWISER_TOKEN_CONTRACT_ABI,
          functionName: "mint",
          args: [toAddress as `0x${string}`, parseUnits(amount, 18)],
        });

        const mintReceipt = await waitForTransactionReceipt(walletClient, {
          hash: mintReceiptHash,
        });

        return { hash: mintReceipt.transactionHash };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to mint tokens: ${errorMessage}`,
        });
      }
    }),
});

export type Web3Router = typeof web3Router;
