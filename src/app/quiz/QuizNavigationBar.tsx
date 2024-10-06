import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quizStore";

export function QuizNavigationBar() {
  const {
    currentSlide,
    quizData,
    answerSubmitted,
    isCorrectAnswer,
    selectedAnswer,
    submitAnswer,
    nextSlide,
  } = useQuizStore();

  const totalSlides = quizData.length;
  const isQuizSlide = quizData[currentSlide]?.type === "quiz";

  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm sm:text-base">
        {currentSlide + 1} of {totalSlides} Slides
      </span>
      {isQuizSlide ? (
        !answerSubmitted || !isCorrectAnswer ? (
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
  );
}
