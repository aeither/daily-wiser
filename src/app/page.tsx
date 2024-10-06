"use client";

import FAQ from "@/components/faq";
import { FeedbackModalButton } from "@/components/feedback-modal";
import Footer from "@/components/footer";
import RevealWisdom from "@/components/reveal-wisdom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { openCampusCodex } from "@/config";
import { MessageCircle, Trophy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChainId } from "wagmi";

export default function HomePage() {
  const router = useRouter();
  const chainId = useChainId();

  const AnnouncementBadge = () => {
    switch (chainId) {
      case openCampusCodex.id: // Ethereum Mainnet
        return (
          <Badge className="bg-purple-500 text-white hover:bg-purple-600">
            OC Points: Testnet Campaign. 👉{" "}
            <Link
              href="https://medium.com/edu-chain/introducing-oc-points-testnet-16617ee0cc4c"
              className="underline hover:text-purple-200"
              target="_blank"
            >
              Learn More
            </Link>
          </Badge>
        );
      default:
        return (
          <Badge className="bg-purple-500 text-white hover:bg-purple-600">
            AI Tutor is now Daily Wiser.
          </Badge>
        );
    }
  };

  const renderExtraBSCComponent = () => {
    return chainId === openCampusCodex.id ? <div>Hello</div> : null;
  };

  return (
    <div className="min-h-screen p-4">
      <main className="max-w-md mx-auto space-y-6">
        <header className="text-center space-y-2">
          <AnnouncementBadge />
          <h1 className="text-3xl font-bold text-purple-800">DailyWiser</h1>
          <p className="text-purple-600">Micro-learning, macro impact!</p>
        </header>
        <Card className="p-4 shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-purple-700">Quiz</h2>
          <p className="text-gray-600 mb-4">
            Challenge yourself with our quiz. We've just added 4 new quizzes for
            you to try!
          </p>
          <Button
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            onClick={() => router.push("/select-quiz")}
          >
            Start Quiz
          </Button>
        </Card>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-2 text-purple-700">
              AI Chat Assistant
            </h2>
            <p className="text-gray-600 mb-4">
              Learn any subject easily with personalized AI assistants.
            </p>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => router.push("/chat")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Chat
            </Button>
          </Card>

          <FeedbackModalButton />
        </div>
        <RevealWisdom />
        <Card className="p-4 shadow-lg rounded-xl">
          <Trophy className="h-12 w-12 text-purple-500 mx-auto mb-2" />
          <h2 className="text-xl font-semibold text-purple-700">Leaderboard</h2>
          <p className="text-gray-600 mt-2">Coming Soon!</p>
        </Card>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
