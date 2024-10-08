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

  if (quizData.length === 0) {
    return (
      <div className="flex h-[calc(100dvh-57px)] w-full items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full border-t-4 border-blue-500 border-r-4 border-blue-500 border-b-4 border-blue-500 border-l-4 border-blue-200 h-16 w-16 mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading Quiz...</p>
          <p className="text-sm text-gray-500 mt-2">
            Get ready for some brain-teasing questions!
          </p>
        </div>
      </div>
    );
  }

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
