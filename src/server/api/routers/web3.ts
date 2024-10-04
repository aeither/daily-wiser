import { certificateContractAddresses, getChainById } from "@/config";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CERTIFICATE_CONTRACT_ABI } from "@/utils/constants/certificate";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { waitForTransactionReceipt } from "viem/actions";
import { z } from "zod";
import { createCaller } from "../root";

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
          creditsToSpend: 25,
        });
        await caller.user.addXp({ address: userAddress, xpToAdd: 25 });

        // Deploy NFT contract using factory
        const tokenURI =
          "https://gateway.irys.xyz/FFyoky1LPR8Q3cFNFu2vN5CaywHFrKRVpZSEZDNeFejQ";
        const mintNFTReceiptHash = await walletClient.writeContract({
          address: certificateContractAddresses[chainId],
          abi: CERTIFICATE_CONTRACT_ABI,
          functionName: "mintNFT",
          args: [userAddress, tokenURI],
        });

        const mintNFTReceipt = await waitForTransactionReceipt(walletClient, {
          hash: mintNFTReceiptHash,
        });
        console.log("Mint NFT Receipt:", mintNFTReceipt);

        return {
          hash: mintNFTReceipt,
        };
      } catch (error) {
        console.error("Error deploying NFT contract or minting:", error);
        throw error;
      }
    }),
});

export type Web3Router = typeof web3Router;
