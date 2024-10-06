import { type Quiz, quizDatas } from "@/utils/constants/quizzes";
// store/quizStore.ts
import { create } from "zustand";

interface QuizState {
  quizId: string | null;
  quizData: Quiz[];
  quizName: string;
  quizQuestionCount: number;
  currentSlide: number;
  selectedAnswer: string | null;
  timeLeft: number;
  quizEnded: boolean;
  correctAnswers: number;
  showConfetti: boolean;
  quizStarted: boolean;
  answerSubmitted: boolean;
  isCorrectAnswer: boolean;
  setQuizId: (id: string | null) => void;
  setSelectedAnswer: (answer: string | null) => void;
  submitAnswer: () => void;
  nextSlide: () => void;
  startQuiz: () => void;
  endQuiz: () => void;
  playAgain: () => void;
  decrementTime: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, _get) => ({
  quizId: null,
  quizData: [],
  quizName: "Quiz",
  quizQuestionCount: 0,
  currentSlide: 0,
  selectedAnswer: null,
  timeLeft: 60,
  quizEnded: false,
  correctAnswers: 0,
  showConfetti: false,
  quizStarted: false,
  answerSubmitted: false,
  isCorrectAnswer: false,

  setQuizId: (id) =>
    set((_state) => {
      const quiz = quizDatas.find((quiz) => quiz.id === id);
      const quizData = quiz?.slides || [];
      const quizName = quiz?.title || "Quiz";
      const quizQuestionCount = quizData.filter(
        (slide) => slide.type === "quiz"
      ).length;
      return { quizId: id, quizData, quizName, quizQuestionCount };
    }),

  setSelectedAnswer: (answer) =>
    set((state) => ({
      selectedAnswer: answer,
      answerSubmitted:
        state.answerSubmitted && !state.isCorrectAnswer
          ? false
          : state.answerSubmitted,
    })),

  submitAnswer: () =>
    set((state) => {
      const currentQuizSlide = state.quizData[state.currentSlide];
      if (currentQuizSlide.type === "quiz") {
        const isCorrect =
          state.selectedAnswer === currentQuizSlide.correctAnswer;
        return {
          answerSubmitted: true,
          isCorrectAnswer: isCorrect,
          correctAnswers: isCorrect
            ? state.correctAnswers + 1
            : state.correctAnswers,
        };
      }
      return state;
    }),

  nextSlide: () =>
    set((state) => {
      if (state.currentSlide < state.quizData.length - 1) {
        return {
          currentSlide: state.currentSlide + 1,
          selectedAnswer: null,
          answerSubmitted: false,
          isCorrectAnswer: false,
        };
      }
      return {
        quizEnded: true,
        showConfetti: state.correctAnswers === state.quizQuestionCount,
      };
    }),

  startQuiz: () => set({ quizStarted: true }),

  endQuiz: () => set({ quizEnded: true }),

  playAgain: () =>
    set({
      currentSlide: 0,
      selectedAnswer: null,
      timeLeft: 60,
      quizEnded: false,
      correctAnswers: 0,
      showConfetti: false,
      quizStarted: false,
      answerSubmitted: false,
      isCorrectAnswer: false,
    }),

  decrementTime: () =>
    set((state) => ({
      timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      quizEnded: state.timeLeft === 1 ? true : state.quizEnded,
    })),

  resetQuiz: () =>
    set({
      quizId: null,
      quizData: [],
      quizName: "Quiz",
      quizQuestionCount: 0,
      currentSlide: 0,
      selectedAnswer: null,
      timeLeft: 60,
      quizEnded: false,
      correctAnswers: 0,
      showConfetti: false,
      quizStarted: false,
      answerSubmitted: false,
      isCorrectAnswer: false,
    }),
}));
