"use client";

import { useQuizStore } from "@/store/quizStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { QuizCard } from "./QuizCard";
import { QuizEndCard } from "./QuizEndCard";
import { QuizStartCard } from "./QuizStartCard";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("id");

  const {
    quizData,
    quizStarted,
    quizEnded,
    setQuizId,
    decrementTime,
    timeLeft,
    resetQuiz,
  } = useQuizStore();

  useEffect(() => {
    if (quizId) {
      setQuizId(quizId);
    }

    return () => {
      resetQuiz();
    };
  }, [quizId, setQuizId, resetQuiz]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !quizEnded && quizStarted) {
      timer = setTimeout(() => decrementTime(), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, quizEnded, quizStarted, decrementTime]);

  if (quizData.length === 0) return <div>No quiz data available.</div>;

  return (
    <main className="mx-auto flex h-[calc(100dvh-57px)] w-full max-w-lg flex-col items-center justify-center px-4 py-2">
      <div className="w-full h-full grid grid-cols-1 grid-rows-1 gap-4">
        {!quizStarted ? (
          <QuizStartCard />
        ) : !quizEnded ? (
          <QuizCard />
        ) : (
          <QuizEndCard />
        )}
      </div>
    </main>
  );
}