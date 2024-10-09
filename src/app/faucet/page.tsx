// app/page.tsx

import type { Metadata } from "next";
import FaucetComponent from "./FaucetComponent";

export const metadata: Metadata = {
  title: "EduChain Faucet | Claim Your Daily EDU Tokens",
  description:
    "Claim 0.001 EDU tokens daily from the EduChain faucet. Connect your wallet and start earning today!",
  keywords: "EduChain, EDU tokens, cryptocurrency faucet, blockchain education",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        EduChain Faucet
      </h1>
      <FaucetComponent />
    </main>
  );
}
