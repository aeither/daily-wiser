"use client";

import { toast } from "@/components/ui/use-toast";
import { useAdminMintCertificate } from "@/hooks/use-mint-certificate";
import { quizDatas } from "@/utils/constants/quizzes";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useAccount } from "wagmi";
import { QuizCard } from "./QuizCard";
import { QuizEndCard } from "./QuizEndCard";
import { QuizNavigationBar } from "./QuizNavigationBar";
import { QuizStartCard } from "./QuizStartCard";

export default function QuizPage() {
  const { isConnected, address, chain } = useAccount();
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("id");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizEnded, setQuizEnded] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const {
    mutate: adminMintCertificate,
    isPending: isPendingTx,
    isSuccess,
    data: mintResult,
  } = useAdminMintCertificate();

  const quiz = quizDatas.find((quiz) => quiz.id === quizId);
  const quizData = quiz?.slides || [];
  const quizName = quiz?.title || "Quiz";
  const quizQuestionCount = quizData.filter(
    (slide) => slide.type === "quiz"
  ).length;

  const baseUrl = chain?.blockExplorers?.default.url;
  const txLink = mintResult?.hash ? `${baseUrl}/tx/${mintResult.hash}` : "";

  useEffect(() => {
    if (timeLeft > 0 && !quizEnded && quizStarted) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) setQuizEnded(true);
  }, [timeLeft, quizEnded, quizStarted]);

  useEffect(() => {
    if (quizEnded && correctAnswers === quizQuestionCount) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [quizEnded, correctAnswers, quizQuestionCount]);

  const handleAnswerSelect = useCallback(
    (answer: string) => {
      setSelectedAnswer(answer);
      if (answerSubmitted && !isCorrectAnswer) {
        setAnswerSubmitted(false);
      }
    },
    [answerSubmitted, isCorrectAnswer]
  );

  const handleSubmitAnswer = useCallback(() => {
    const currentQuizSlide = quizData[currentSlide];
    if (currentQuizSlide.type === "quiz") {
      setAnswerSubmitted(true);
      const isCorrect = selectedAnswer === currentQuizSlide.correctAnswer;
      setIsCorrectAnswer(isCorrect);
      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
      }
    }
  }, [currentSlide, quizData, selectedAnswer]);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < quizData.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setIsCorrectAnswer(false);
    } else {
      setQuizEnded(true);
    }
  }, [currentSlide, quizData]);

  const handlePlayAgain = () => {
    setCurrentSlide(0);
    setSelectedAnswer(null);
    setTimeLeft(60);
    setQuizEnded(false);
    setCorrectAnswers(0);
    setShowConfetti(false);
    setQuizStarted(false);
    setAnswerSubmitted(false);
    setIsCorrectAnswer(false);
  };

  const mintNFTCredential = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description:
          "Please connect your wallet to continue with the NFT credential minting process.",
      });
      return;
    }

    if (chain?.id && address) {
      adminMintCertificate({ chainId: chain.id, userAddress: address });
    } else {
      console.error("Chain ID or address is not defined.");
    }
  };

  const handlePlayAnotherQuiz = useCallback(
    () => router.push("/select-quiz"),
    [router]
  );

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  if (quizData.length === 0) return <div>No quiz data available.</div>;

  return (
    <main className="mx-auto flex h-[calc(100dvh-57px)] w-full max-w-lg flex-col items-center justify-center px-4 py-2">
      <div className="h-full grid grid-cols-1 grid-rows-1 gap-4">
        {showConfetti && <Confetti />}
        {!quizStarted ? (
          <QuizStartCard quizName={quizName} onStartQuiz={handleStartQuiz} />
        ) : !quizEnded ? (
          <>
            <QuizCard
              quizName={quizName}
              currentSlide={currentSlide}
              timeLeft={timeLeft}
              content={quizData[currentSlide].content}
              options={quizData[currentSlide].options}
              selectedAnswer={selectedAnswer}
              answerSubmitted={answerSubmitted}
              isCorrectAnswer={isCorrectAnswer}
              correctAnswer={quizData[currentSlide].correctAnswer}
              onAnswerSelect={handleAnswerSelect}
            />
            <QuizNavigationBar
              currentSlide={currentSlide}
              totalSlides={quizData.length}
              isQuizSlide={quizData[currentSlide].type === "quiz"}
              answerSubmitted={answerSubmitted}
              isCorrectAnswer={isCorrectAnswer}
              selectedAnswer={selectedAnswer}
              onSubmit={handleSubmitAnswer}
              onNext={handleNextSlide}
            />
          </>
        ) : (
          <QuizEndCard
            quizName={quizName}
            correctAnswers={correctAnswers}
            totalQuestions={quizQuestionCount}
            isSuccess={isSuccess}
            isPendingTx={isPendingTx}
            txLink={txLink}
            onMintNFT={mintNFTCredential}
            onPlayAnotherQuiz={handlePlayAnotherQuiz}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </main>
  );
}