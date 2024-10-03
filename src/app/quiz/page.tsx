"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { certificateContractAddresses } from "@/config";
import { CERTIFICATE_CONTRACT_ABI } from "@/utils/constants/certificate";
import { quizDatas } from "@/utils/constants/quiz";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import {
  useAccount,
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract
} from "wagmi";

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizEnded, setQuizEnded] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const searchParams = useSearchParams();
  const quizId = Number(searchParams.get("id"));
  const { address } = useAccount();
  const {
    writeContract,
    data: hash,
    isPending: isPendingTx,
  } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });
  const router = useRouter();
const chainId =useChainId()

  useEffect(() => {
    if (isSuccess) {
      console.log("NFT minted successfully:", hash);
      router.push("/profile");
    }
  }, [isSuccess, router, hash]);

  const quizData = quizDatas.find((quiz) => quiz.id === quizId)?.slides || [];

  useEffect(() => {
    if (timeLeft > 0 && !quizEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setQuizEnded(true);
    }
  }, [timeLeft, quizEnded]);

  useEffect(() => {
    if (
      quizEnded &&
      correctAnswers ===
        quizData.filter((slide) => slide.type === "quiz").length
    ) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [quizEnded, correctAnswers, quizData]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextSlide = () => {
    const currentQuizSlide = quizData[currentSlide];
    if (
      currentQuizSlide.type === "quiz" &&
      selectedAnswer === currentQuizSlide.correctAnswer
    ) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentSlide < quizData.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setSelectedAnswer(null);
    } else {
      setQuizEnded(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentSlide(0);
    setSelectedAnswer(null);
    setTimeLeft(60);
    setQuizEnded(false);
    setCorrectAnswers(0);
    setShowConfetti(false);
  };

  const mintNFTCredential = async () => {
    console.log(
      "🚀 ~ mintNFTCredential ~ mintNFTCredential:",
      mintNFTCredential
    );

    const tokenURI =
      "https://gateway.irys.xyz/FFyoky1LPR8Q3cFNFu2vN5CaywHFrKRVpZSEZDNeFejQ";

    writeContract({
      address: certificateContractAddresses[chainId],
      abi: CERTIFICATE_CONTRACT_ABI,
      functionName: "mintNFT",
      args: [address, tokenURI],
    });
  };

  if (quizData.length === 0) {
    return <div>No quiz data available.</div>;
  }

  return (
    <main className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-lg flex-col items-center justify-center px-4 py-2">
      <div className="h-screen grid grid-cols-1 grid-rows-1 gap-4">
        {showConfetti && <Confetti />}
        <Card className="flex flex-col w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">
              {quizDatas.find((quiz) => quiz.id === quizId)?.name || "Quiz"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-grow flex-col h-auto justify-between p-4 sm:p-6">
            {!quizEnded && (
              <div className="w-full mb-4">
                <Progress value={(timeLeft / 60) * 100} className="w-full" />
                <p className="text-center mt-2">{timeLeft} seconds left</p>
              </div>
            )}
            <div className="mb-6">
              {!quizEnded ? (
                <>
                  <h2 className="text-lg sm:text-xl font-bold mb-4">
                    {currentSlide + 1}. {quizData[currentSlide].content}
                  </h2>
                  {quizData[currentSlide].type === "quiz" && (
                    <div className="space-y-2">
                      {quizData[currentSlide].options?.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedAnswer === option ? "default" : "outline"
                          }
                          className="w-full text-left justify-start"
                          onClick={() => handleAnswerSelect(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Quiz Completed!
                  </h2>
                  <p className="mb-4">
                    You got {correctAnswers} out of{" "}
                    {quizData.filter((slide) => slide.type === "quiz").length}{" "}
                    questions correct.
                  </p>
                  {correctAnswers ===
                  quizData.filter((slide) => slide.type === "quiz").length ? (
                    <p className="mb-4">
                      Congratulations! You answered all questions correctly!
                    </p>
                  ) : (
                    <p className="mb-4">
                      Keep practicing to improve your score!
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-auto">
              {!quizEnded ? (
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">
                    {currentSlide + 1} of {quizData.length} Slides
                  </span>
                  <Button
                    onClick={handleNextSlide}
                    disabled={
                      quizData[currentSlide].type === "quiz" && !selectedAnswer
                    }
                  >
                    {currentSlide === quizData.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {correctAnswers ===
                    quizData.filter((slide) => slide.type === "quiz")
                      .length && (
                    <Button
                      onClick={mintNFTCredential}
                      disabled={isPendingTx}
                      className="w-full"
                    >
                      {isPendingTx ? "Minting..." : "Mint NFT Credential"}
                    </Button>
                  )}
                  <Button
                    variant={"secondary"}
                    onClick={handlePlayAgain}
                    className="w-full"
                  >
                    Play Again
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
