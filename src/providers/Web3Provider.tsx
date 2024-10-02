"use client";

import { morphHolesky, projectId } from "@/utils/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
// import { createWeb3Modal } from "@web3modal/wagmi/react";
import type { ReactNode } from "react";
import {
  type State,
  WagmiProvider,
  cookieStorage,
  createConfig,
  createStorage,
} from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create wagmiConfig
const chains = [morphHolesky] as const;
export const config = createConfig(
  getDefaultConfig({
    chains,
    walletConnectProjectId: projectId,
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    // auth: {
    //   email: true,
    //   socials: [
    //     "google",
    //     "x",
    //     "github",
    //     "discord",
    //     "apple",
    //     "facebook",
    //     "farcaster",
    //   ],
    //   showWallets: true,
    //   walletFeatures: true,
    // },
  })
);

// Create modal
// createWeb3Modal({
//   metadata,
//   wagmiConfig: config,
//   projectId,
//   themeMode: "light",
//   enableOnramp: true,
//   enableSwaps: true, // Notes: Only available for email login
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
// });

export default function AppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
