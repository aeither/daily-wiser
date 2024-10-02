import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { arbitrum, mainnet } from "@reown/appkit/networks";
import { cookieStorage, createStorage } from "@wagmi/core";
import { createPublicClient, http } from "viem";
import { morphHolesky } from "viem/chains";

/**
 * Reown
 */

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [mainnet, arbitrum];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

/**
 * Public Client
 */

const publicClient = createPublicClient({
  chain: morphHolesky,
  transport: http(),
});

export function getPublicClient() {
  return publicClient;
}
