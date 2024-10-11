import type { Metadata } from "next";
import Link from "next/link";
import FaucetComponent from "./FaucetComponent";

export const metadata: Metadata = {
  title: "EDU Chain Faucet | Claim Your Daily EDU Tokens",
  description:
    "Claim 0.001 EDU tokens daily from the EDU Chain faucet. Connect your wallet and start earning today!",
  keywords: "EDU Chain, EDU tokens, cryptocurrency faucet, blockchain education",
};

export default function Home() {
  return (
    <main className="flex flex-col h-[calc(100dvh-57px)] w-full items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        EDU Chain Faucet
      </h1>
      <FaucetComponent />

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-700">
          More Faucets
        </h2>
        <div className="flex flex-col space-y-2">
          <Link
            href="https://drpc.org/faucet/open-campus-codex"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            DRPC Open Campus Codex Faucet
          </Link>
          <Link
            href="https://www.hackquest.io/en/faucets/656476"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            HackQuest EDU Chain Testnet Faucet
          </Link>
          <Link
            href="https://educhain-community-faucet.vercel.app/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            EDU Chain Community Faucet
          </Link>
        </div>
      </section>
    </main>
  );
}