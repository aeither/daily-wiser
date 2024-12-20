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
import {
  createPublicClient,
  createWalletClient,
  formatEther,
  http,
  parseEther,
  parseUnits,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { waitForTransactionReceipt } from "viem/actions";
import { mainnet } from "wagmi/chains";
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

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const getMainnetBalance = async (address: `0x${string}`) => {
  try {
    const balance = await mainnetClient.getBalance({
      address,
    });
    console.log(`Mainnet Balance: ${formatEther(balance)} ETH`);
    return balance;
  } catch (error) {
    console.error("Error fetching mainnet balance:", error);
    return BigInt(0);
  }
};

const checkMainnetBalance = async (address: `0x${string}`) => {
  if (!address) return false;
  const ethBalance = await getMainnetBalance(address);
  if (!ethBalance) return false;
  return Number.parseFloat(formatEther(ethBalance)) >= 0.001;
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

      // Check mainnet ETH balance first
      const hasBalance = await checkMainnetBalance(
        userAddress as `0x${string}`
      );
      if (!hasBalance) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "You need at least 0.001 ETH on Ethereum mainnet to prevent spam.",
        });
      }

      // Check if the user has already claimed within the last 24 hours
      const lastClaimTime = await redis.get(`faucet:${userAddress}`);
      if (lastClaimTime) {
        const timeElapsed = Date.now() - Number(lastClaimTime);
        if (timeElapsed < 24 * 60 * 60 * 1000) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "You can only claim once per day. Please try again later.",
          });
        }
      }

      try {
        const FAUCET_PRIVATE_KEY = getFaucetPrivateKey();
        const faucetAccount = privateKeyToAccount(FAUCET_PRIVATE_KEY);

        const faucetWalletClient = createWalletClient({
          account: faucetAccount,
          chain: getChainById(chainId),
          transport: http(),
        });

        // Send 0.001 EDU tokens
        const txHash = await faucetWalletClient.sendTransaction({
          to: userAddress as `0x${string}`,
          value: parseEther("0.001"),
        });

        const ADMIN_PRIVATE_KEY = getAdminPrivateKey();
        const adminAccount = privateKeyToAccount(ADMIN_PRIVATE_KEY);

        const adminWalletClient = createWalletClient({
          account: adminAccount,
          chain: getChainById(chainId),
          transport: http(),
        });

        // Mint ERC20 tokens
        const mintReceiptHash = await adminWalletClient.writeContract({
          address: dailywiserTokenContractAddresses[chainId],
          abi: DAILYWISER_TOKEN_CONTRACT_ABI,
          functionName: "mint",
          args: [userAddress as `0x${string}`, parseUnits("100", 18)], // Mint 100 tokens
        });

        const mintReceipt = await waitForTransactionReceipt(adminWalletClient, {
          hash: mintReceiptHash,
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
          message: `Failed to claim tokens: ${errorMessage}`,
        });
      }
    }),

  convertCredits2Token: publicProcedure
    .input(
      z.object({
        userAddress: z.string(),
        amount: z.string(),
        chainId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { userAddress, amount, chainId } = input;
      try {
        // Deduct credits first
        const creditsToSpend = Number(amount);
        const caller = createCaller(ctx);
        await caller.user.spendCredits({
          address: userAddress,
          creditsToSpend,
        });

        const ADMIN_PRIVATE_KEY = getAdminPrivateKey();
        const adminAccount = privateKeyToAccount(ADMIN_PRIVATE_KEY);

        const walletClient = createWalletClient({
          account: adminAccount,
          chain: getChainById(chainId),
          transport: http(),
        });

        // Mint tokens equivalent to credits spent
        const mintReceiptHash = await walletClient.writeContract({
          address: dailywiserTokenContractAddresses[chainId],
          abi: DAILYWISER_TOKEN_CONTRACT_ABI,
          functionName: "mint",
          args: [userAddress as `0x${string}`, parseUnits(amount, 18)],
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
          message: `Failed to convert credits to tokens: ${errorMessage}`,
        });
      }
    }),
});

export type Web3Router = typeof web3Router;
