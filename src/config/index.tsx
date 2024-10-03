import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { defineChain } from "viem";
import { cookieStorage, createStorage } from "wagmi";
import { getPublicClient } from "wagmi/actions";
import { morphHolesky } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
// Define Open Campus Codex chain
const openCampusCodex = defineChain({
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
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
});

// Define Neo X chain
const neoX = defineChain({
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

// Create wagmiConfig
const chains = [openCampusCodex, morphHolesky, neoX] as const;
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

export const topUpContractAddresses: { [key: string]: `0x${string}` } = {
  [openCampusCodex.id]: "0xd74a7CC422443ed6606a953B5428305Df23b1047",
  [morphHolesky.id]: "0xc3914bfD49e030B3a2c975B33947aDC338919A60",
  [neoX.id]: "0x9abc...",
};

export const certificateContractAddresses: { [key: string]: `0x${string}` } = {
  [openCampusCodex.id]: "0x1a6Fc72588770c6fef0985525930F2337Db4DCD8",
  [morphHolesky.id]: "0xE936c41FfeFce0ebF26d512eB4aCc6CAb39b50f9",
  [neoX.id]: "0x9abc...",
};

export const feedbackContractAddresses: { [key: string]: `0x${string}` } = {
  [openCampusCodex.id]: "0xe4A0682A04bF47b455A69C04F893a9Cd5b09fF4C",
  [morphHolesky.id]: "0x021f096E46bD5309bB978A91DF13154f6015dBD5",
  [neoX.id]: "0x9abc...",
};
