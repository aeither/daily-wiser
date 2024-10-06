"use client";

import { metadata, projectId, wagmiConfig } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import type { ReactNode } from "react";
import { type State, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  metadata,
  wagmiConfig,
  projectId,
  themeMode: "light",
  themeVariables: {"--w3m-border-radius-master": "2px"},
  enableOnramp: true,
  enableSwaps: true, // Notes: Only available for email login
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function AppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
