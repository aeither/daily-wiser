"use client";

import { neoX, openCampusCodex } from "@/config";
import { PrivyProvider } from "@privy-io/react-auth";
import { morphHolesky } from "viem/chains";

export const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

if (!privyAppId) throw new Error("privyAppId is not defined");

export default function MyPrivyProvider({
  children,
}: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={privyAppId!}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          showWalletLoginFirst: false,
          logo: "/favicon-32x32.png",
          walletChainType: "ethereum-only",
        },
        loginMethods: ["wallet", "google", "email"],
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: openCampusCodex,
        supportedChains: [openCampusCodex, morphHolesky, neoX],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
