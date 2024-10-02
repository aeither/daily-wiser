import { createPublicClient } from "viem";
import { http } from "wagmi";
import type { Chain } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const morphHolesky: Chain = {
  id: 2810,
  name: "Morph Holesky",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc-quicknode-holesky.morphl2.io/"] },
    default: { http: ["https://rpc-quicknode-holesky.morphl2.io/"] },
  },
  blockExplorers: {
    default: {
      name: "Morph Holesky Explorer",
      url: "https://explorer-holesky.morphl2.io/",
    },
  },
};

const publicClient = createPublicClient({
  chain: morphHolesky,
  transport: http(),
});

export function getPublicClient() {
  return publicClient;
}
