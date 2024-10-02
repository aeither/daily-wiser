"use server";

import { getPublicClient, morphHolesky } from "@/utils/config";
import {
  FACTORY_CONTRACT_ABI,
  FACTORY_CONTRACT_ADDRESS,
} from "@/utils/constants/factory";
import { FACTORY_NFT_CONTRACT_ABI } from "@/utils/constants/factory-nft";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { waitForTransactionReceipt } from "viem/actions";

export async function deployNFTContractAndMint(
  name: string,
  symbol: string,
  tokenURI: string,
  userAddress: string
) {
  try {
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
    const ADMIN_PRIVATE_KEY = getAdminPrivateKey();
    const adminAccount = privateKeyToAccount(ADMIN_PRIVATE_KEY);

    const walletClient = createWalletClient({
      account: adminAccount,
      chain: morphHolesky,
      transport: http(),
    });

    // Deploy NFT contract using factory
    const createNFTDeployerHash = await walletClient.writeContract({
      address: FACTORY_CONTRACT_ADDRESS,
      abi: FACTORY_CONTRACT_ABI,
      functionName: "createNFTDeployer",
      args: [name, symbol, adminAccount.address],
    });

    const createNFTDeployerReceipt = await waitForTransactionReceipt(
      getPublicClient(),
      {
        hash: createNFTDeployerHash,
      }
    );
    const newNFTAddress = createNFTDeployerReceipt.logs[0].address;
    console.log("Deployed NFT Contract Address:", newNFTAddress);

    // Mint NFT
    const mintNFTHash = await walletClient.writeContract({
      address: newNFTAddress,
      abi: FACTORY_NFT_CONTRACT_ABI,
      functionName: "mintNFT",
      args: [userAddress, tokenURI],
    });

    // const mintNFTReceipt = await waitForTransactionReceipt(getPublicClient(), {
    //   hash: mintNFTHash,
    // });

    // console.log("Minted NFT with token ID:", mintNFTReceipt);

    return {
      nftContractAddress: "newNFTAddress",
      mintNFTHash,
    };
  } catch (error) {
    console.error("Error deploying NFT contract or minting:", error);
    throw error;
  }
}
