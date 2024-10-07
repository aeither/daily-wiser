import { certificateContractAddresses, getChainById } from "@/config";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CERTIFICATE_CONTRACT_ABI } from "@/utils/constants/certificate";
import { TRPCError } from "@trpc/server";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { z } from "zod";
import { createCaller } from "../root";
import { GENERATE_CERTIFICATE_COST } from "@/utils/constants";

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
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { chainId, userAddress } = input;

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

        // Deploy NFT contract using factory
        const tokenURI =
          "https://gateway.irys.xyz/FFyoky1LPR8Q3cFNFu2vN5CaywHFrKRVpZSEZDNeFejQ";
        const mintNFTReceiptHash = await walletClient.writeContract({
          address: certificateContractAddresses[chainId],
          abi: CERTIFICATE_CONTRACT_ABI,
          functionName: "mintNFT",
          args: [userAddress, tokenURI],
        });

        // const mintNFTReceipt = await waitForTransactionReceipt(walletClient, {
        //   hash: mintNFTReceiptHash,
        // });

        return {
          hash: mintNFTReceiptHash,
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
});

export type Web3Router = typeof web3Router;
