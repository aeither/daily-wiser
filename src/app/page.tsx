"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, MessageCircle, Star, Trophy, Twitter } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "recharts";

export default function HomePage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackDescription, setFeedbackDescription] = useState("");
  const router = useRouter();

  const handleFeedbackSubmit = () => {
    // TODO: Implement on-chain feedback submission
    console.log("Submitting feedback:", { feedbackTitle, feedbackDescription });
    setFeedbackOpen(false);
    setFeedbackTitle("");
    setFeedbackDescription("");
  };

  return (
    <div className="min-h-screen p-4">
      <main className="max-w-md mx-auto space-y-6">
        <header className="text-center space-y-2">
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
          <h1 className="text-3xl font-bold text-purple-800">DailyWiser</h1>
          <p className="text-purple-600">
            Level up your life, one quiz at a time!
          </p>
        </header>

        <Card className="p-4 shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-purple-700">Quiz</h2>
          <p className="text-gray-600 mb-4">
            Challenge yourself with our quiz and earn OC Points!
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

          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setFeedbackOpen(true)}
          >
            <Star className="mr-2 h-4 w-4" />
            Provide Feedback
          </Button>
        </div>

        <Card className="p-4 shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-purple-700">
            Daily Token Claim
          </h2>
          <p className="text-gray-600 mb-4">
            Bookmark this web app to come back and claim more juice tokens!
          </p>
          <div className="grid grid-cols-7 gap-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div
                key={i}
                className="aspect-square rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold"
              >
                {day}
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white">
            <Bookmark className="mr-2 h-4 w-4" />
            Claim Tokens
          </Button>
        </Card>

        <Card className="p-4 shadow-lg rounded-xl">
          <Trophy className="h-12 w-12 text-purple-500 mx-auto mb-2" />
          <h2 className="text-xl font-semibold text-purple-700">Leaderboard</h2>
          <p className="text-gray-600 mt-2">Coming Soon!</p>
        </Card>

        <footer className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            {/* <Link
              href="https://t.me/dailywiser"
              className="text-blue-500 hover:text-blue-600"
            >
              Join our Telegram
            </Link> */}
            <Link
              href="https://twitter.com/AITutor3"
              className="text-blue-400 hover:text-blue-500 flex items-center"
            >
              <Twitter className="h-4 w-4 mr-1" />
              Follow us
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            &copy; 2024 DailyWiser. All rights reserved.
          </p>
        </footer>
      </main>

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Your Thoughts</DialogTitle>
            <DialogDescription>
              Help us shape the ultimate platform for building smart habits and
              continuous learning.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Your Feedback</Label>
                <Textarea
                  id="feedbackDescription"
                  className="min-h-[200px]"
                  placeholder={`Please share your thoughts on: \n\n
• Features you'd love to see \n
• Challenges you're facing \n
• How our platform fits into your daily routine \n
• Improvements to user experience \n
• Any 'aha!' moments you've had while using the app`}
                  value={feedbackDescription}
                  onChange={(e) => setFeedbackDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Feedback</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
