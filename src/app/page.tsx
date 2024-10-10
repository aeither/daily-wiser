// HomePage.tsx
"use client";

import FAQ from "@/components/faq";
import { FeedbackModalButton } from "@/components/feedback-modal";
import Footer from "@/components/footer";
import { LeaderboardCard } from "@/components/home-leaderboard-card";
import { OCIDComponent } from "@/components/ocid/OCIDComponent";
import RevealWisdom from "@/components/reveal-wisdom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { openCampusCodex } from "@/config";
import { MessageCircle, Rocket, Sparkles } from "lucide-react";
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

  const ConditialOCIDComponent = () => {
    return chainId === openCampusCodex.id ? <OCIDComponent /> : null;
  };

  return (
    <div className="min-h-screen p-4">
      <main className="max-w-md mx-auto space-y-6">
        <header className="text-center space-y-2">
          <AnnouncementBadge />
          <h1 className="text-3xl font-bold text-purple-800">DailyWiser</h1>
          <p className="text-purple-600">Micro-learning, macro impact!</p>
        </header>
        {/* <ConditialOCIDComponent /> */}
        <Link
          href="https://twitter.com/intent/follow?screen_name=DailyWiser_"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-row justify-center items-center gap-2 shadow-md rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 animate-pulse cursor-pointer hover:opacity-90 transition-opacity"
        >
          <Sparkles className="text-yellow-300 h-5 w-5" />
          <div className="text-white font-semibold">
            Follow us on Twitter for updates
          </div>
          <Sparkles className="text-yellow-300 h-5 w-5" />
        </Link>
        <Card className="p-4 shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-purple-700">
            Onboard Quiz
          </h2>
          <p className="text-gray-600 mb-4">
            Explore partner apps through interactive quizzes. Learn how they
            work and get up to speed quickly!
          </p>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => router.push("/select-onboard-quiz")}
          >
            <Rocket className="mr-2 h-4 w-4" />
            Let's go
          </Button>
        </Card>
        <Card className="p-4 shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-purple-700">Quiz</h2>
          <p className="text-gray-600 mb-4">Challenge yourself with our quiz</p>
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
        <LeaderboardCard />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
