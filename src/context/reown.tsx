"use client";

import { metadata, openCampusCodex, projectId, wagmiConfig } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import type { ReactNode } from "react";
import { morphHolesky } from "viem/chains";
import { type State, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  chainImages: {
    [openCampusCodex.id]:
      "https://opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg",
    [morphHolesky.id]:
      "https://img.notionusercontent.com/s3/prod-files-secure%2Ffcab2c10-8da9-4414-aa63-4998ddf62e78%2F64fbcffc-0e7c-45e1-8900-1bb36dc90924%2FFrame_1597882262.png/size/w=2000?exp=1728392437&sig=RLjctfHsRRNoPQ5cC5UaNMVtdjUiVJyoupuSDCiiU7E",
  },
  metadata,
  wagmiConfig,
  projectId,
  themeMode: "light",
  themeVariables: { "--w3m-border-radius-master": "2px" },
  enableOnramp: false,
  enableSwaps: false, // Notes: Only available for email login
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
