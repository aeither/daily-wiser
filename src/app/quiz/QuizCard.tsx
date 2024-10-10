import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuizStore } from "@/store/quizStore";
import { useCallback, useState } from "react";

const getRandomPhrase = (isCorrect: boolean): string => {
  const correctPhrases = [
    "Brilliant! You're on fire! 🔥",
    "Fantastic job! Keep it up! 👏",
    "You're crushing it! Amazing work! 💪",
    "Wow, you're a quiz master! 🏆",
    "Incredible! You're unstoppable! 🚀",
  ];

  const incorrectPhrases = [
    "Oops! Close, but not quite. Try again! 💡",
    "Almost there! Give it another shot! 🎯",
    "Don't give up! You've got this! 💪",
    "Learning is a journey. Keep going! 🌟",
    "Mistakes help us learn. You're doing great! 🌈",
  ];

  const phrases = isCorrect ? correctPhrases : incorrectPhrases;
  return phrases[Math.floor(Math.random() * phrases.length)];
};

export function QuizCard() {
  const {
    quizName,
    currentSlide,
    timeLeft,
    quizData,
    selectedAnswer,
    answerSubmitted,
    isCorrectAnswer,
    setSelectedAnswer,
    submitAnswer: storeSubmitAnswer,
    nextSlide,
  } = useQuizStore();

  const [feedbackPhrase, setFeedbackPhrase] = useState<string>("");
  const [localIsCorrectAnswer, setLocalIsCorrectAnswer] =
    useState<boolean>(false);

    console.log("🚀 ~ QuizCard ~ quizData:", quizData)
  const content = quizData[currentSlide]?.content || "";
  const options = quizData[currentSlide]?.options || [];
  const correctAnswer = quizData[currentSlide]?.correctAnswer || "";
  const totalSlides = quizData.length;
  const isQuizSlide = quizData[currentSlide]?.type === "quiz";

  const updateFeedbackPhrase = useCallback((isCorrect: boolean) => {
    setFeedbackPhrase(getRandomPhrase(isCorrect));
  }, []);

  const submitAnswer = useCallback(() => {
    const isCorrect = selectedAnswer === correctAnswer;
    setLocalIsCorrectAnswer(isCorrect);
    storeSubmitAnswer();
    updateFeedbackPhrase(isCorrect);
  }, [selectedAnswer, correctAnswer, storeSubmitAnswer, updateFeedbackPhrase]);

  return (
    <Card className="w-full flex flex-col max-w-2xl">
      <CardHeader>
        <div className="w-full mb-4">
          <Progress value={(timeLeft / 60) * 100} className="w-full" />
          <p className="text-center mt-2">{timeLeft} seconds left</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col h-auto justify-between p-4 sm:p-6">
        <div className="flex flex-col justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            {currentSlide + 1}. {content}
          </h2>
          {options.length > 0 && (
            <div className="space-y-2">
              {options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedAnswer === option
                      ? answerSubmitted
                        ? option === correctAnswer
                          ? "default"
                          : "destructive"
                        : "default"
                      : answerSubmitted && option === correctAnswer
                        ? "default"
                        : "outline"
                  }
                  className={`w-full text-left justify-start ${
                    answerSubmitted && option === correctAnswer
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }`}
                  onClick={() => setSelectedAnswer(option)}
                  disabled={answerSubmitted && localIsCorrectAnswer}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="text-center font-bold text-lg">
          {isQuizSlide && answerSubmitted && (
            <span
              className={`font-bold ${
                localIsCorrectAnswer ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedbackPhrase}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm sm:text-base">
            {currentSlide + 1} of {totalSlides} Slides
          </span>
          {isQuizSlide ? (
            !answerSubmitted || !localIsCorrectAnswer ? (
              <Button onClick={submitAnswer} disabled={!selectedAnswer}>
                Submit
              </Button>
            ) : (
              <Button onClick={nextSlide}>
                {currentSlide === totalSlides - 1 ? "Finish" : "Next"}
              </Button>
            )
          ) : (
            <Button onClick={nextSlide}>
              {currentSlide === totalSlides - 1 ? "Finish" : "Next"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}