"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import { CheckCircle2, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function NumberMemoryGame() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState("");
  const [showSequence, setShowSequence] = useState(true);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<
    "playing" | "correct" | "gameover"
  >("playing");
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateSequence();
  }, [level]);

  useEffect(() => {
    if (showSequence) {
      const timer = setTimeout(
        () => {
          setShowSequence(false);
        },
        2000 + level * 500
      ); // Increase viewing time with level
      return () => clearTimeout(timer);
    }
  }, [showSequence, level]);

  const generateSequence = () => {
    const newSequence = Array.from({ length: level + 2 }, () =>
      Math.floor(Math.random() * 10)
    );
    setSequence(newSequence);
    setShowSequence(true);
    setUserInput("");
    setGameState("playing");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput === sequence.join("")) {
      setScore(score + level * 10);
      setLevel(level + 1);
      setGameState("correct");
    } else {
      setGameState("gameover");
    }
  };

  const handleNextLevel = () => {
    generateSequence();
  };

  const handleNewGame = () => {
    setLevel(1);
    setScore(0);
    generateSequence();
  };

  const handleShareTwitter = async () => {
    if (gameRef.current) {
      try {
        const canvas = await html2canvas(gameRef.current);
        const image = canvas.toDataURL("image/png");

        // Create a temporary anchor element
        const a = document.createElement("a");
        a.href = image;
        a.download = "number-memory-score.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Compose the tweet text
        const tweetText = `I scored ${score} points in Number Memory! Can you beat my score? %23DailyWiser`;

        // Open Twitter share dialog in a new window
        const width = 550;
        const height = 420;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(
          twitterUrl,
          "Share to Twitter",
          `width=${width},height=${height},left=${left},top=${top}`
        );
      } catch (error) {
        console.error("Error sharing to Twitter:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md" ref={gameRef}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Number Memory
          </CardTitle>
          <CardDescription className="text-center">
            Remember the sequence!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-semibold">Level: {level}</p>
            <p className="text-lg font-semibold">Score: {score}</p>
          </div>
          {showSequence ? (
            <div className="text-4xl font-bold text-center tracking-wider animate-pulse">
              {sequence.join(" ")}
            </div>
          ) : (
            <Input
              type="number"
              placeholder="Enter the sequence"
              value={userInput}
              onChange={handleInputChange}
              className="text-center text-lg"
              maxLength={level + 2}
            />
          )}
          {gameState === "correct" && (
            <div className="flex items-center justify-center text-green-500">
              <CheckCircle2 className="mr-2" />
              <span>Correct! Great job!</span>
            </div>
          )}
          {gameState === "gameover" && (
            <div className="text-center">
              <p className="text-xl font-bold mb-2">Game Over!</p>
              <p>Your final score: {score}</p>
              <p>The correct sequence was: {sequence.join(" ")}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {gameState === "playing" && !showSequence && (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
          {gameState === "correct" && (
            <Button onClick={handleNextLevel}>Next Level</Button>
          )}
          {gameState === "gameover" && (
            <div className="space-x-2">
              <Button onClick={handleNewGame}>New Game</Button>
              <Button
                onClick={handleShareTwitter}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Twitter className="mr-2 h-4 w-4" /> Share on Twitter
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
