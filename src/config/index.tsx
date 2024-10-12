import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { defineChain } from "viem";
import { cookieStorage, createStorage } from "wagmi";
import { getPublicClient } from "wagmi/actions";
import { arbitrumSepolia, morphHolesky } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "Daily Wiser",
  description:
    "Gamified micro-learning app with AI personalization and blockchain-verified achievements. Learn daily, grow consistently, and earn NFT skill badges.",
  url: "https://dailywiser.xyz", // origin must match your domain & subdomain
  icons: ["https://dailywiser.xyz/favicon-32x32.png"],
};

export const openCampusCodex = defineChain({
  id: 656476,
  testnet: true,
  name: "Open Campus Codex",
  nativeCurrency: {
    decimals: 18,
    name: "EDU",
    symbol: "EDU",
  },
  rpcUrls: {
    public: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
    default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://edu-chain-testnet.blockscout.com/api/v2",
    },
  },
});

export const neoX = defineChain({
  id: 12227332,
  testnet: true,
  name: "Neo X Testnet T4",
  nativeCurrency: {
    decimals: 18,
    name: "GAS",
    symbol: "GAS",
  },
  rpcUrls: {
    public: { http: ["https://testnet.rpc.banelabs.org"] },
    default: { http: ["https://testnet.rpc.banelabs.org"] },
  },
  blockExplorers: {
    default: {
      name: "Neo X Testnet T4",
      url: "https://xt4scan.ngd.network",
    },
  },
});

const chains = [openCampusCodex, morphHolesky, neoX, arbitrumSepolia] as const;
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  auth: {
    email: true,
    socials: ["google", "discord", "x"],
    showWallets: true,
    walletFeatures: true,
  },
});

/**
 * Public Client
 */

export function getWagmiPublicClient(chainId: number) {
  return getPublicClient(wagmiConfig, { chainId });
}

export function getChainById(chainId: number) {
  switch (chainId) {
    case openCampusCodex.id:
      return openCampusCodex;
    case morphHolesky.id:
      return morphHolesky;
    case neoX.id:
      return neoX;
    case arbitrumSepolia.id:
      return neoX;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
}

export const topUpContractAddresses: { [key: string]: `0x${string}` } = {
  [openCampusCodex.id]: "0xd74a7CC422443ed6606a953B5428305Df23b1047",
  [morphHolesky.id]: "0xc3914bfD49e030B3a2c975B33947aDC338919A60",
  [neoX.id]: "0xd74a7CC422443ed6606a953B5428305Df23b1047",
  [arbitrumSepolia.id]: "0xB5c2E15d54FB6ACC53e8269eB53f34D00F221101",
};

export const certificateContractAddresses: { [key: string]: `0x${string}` } = {
  [openCampusCodex.id]: "0x1a6Fc72588770c6fef0985525930F2337Db4DCD8",
  [morphHolesky.id]: "0xE936c41FfeFce0ebF26d512eB4aCc6CAb39b50f9",
  [neoX.id]: "0x56C66e07f669A04C21Fb376Ead3eFbAE4f9440AC",
  [arbitrumSepolia.id]: "0x527DC2173923c4091f9af56Ac4776a6979276b0A",
};

export const feedbackContractAddresses: { [key: string]: `0x${string}` } = {
  [openCampusCodex.id]: "0xBD0E22Ce639acbbb3Ef3a1AB0b3A14724AD33505",
  [morphHolesky.id]: "0x1DCce73F023eE23512da1d4092891578c9a3F3E4",
  [neoX.id]: "0xA2DD26D1e1b87975692ab9efdD84177BC16fcA98",
  [arbitrumSepolia.id]: "0xf9E1498d9bA116f1Ca29282cdC001d61474f5f20",
};
