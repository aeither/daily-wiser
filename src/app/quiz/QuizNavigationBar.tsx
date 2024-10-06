import { Button } from "@/components/ui/button";

interface QuizNavigationBarProps {
  currentSlide: number;
  totalSlides: number;
  isQuizSlide: boolean;
  answerSubmitted: boolean;
  isCorrectAnswer: boolean;
  selectedAnswer: string | null;
  onSubmit: () => void;
  onNext: () => void;
}

export function QuizNavigationBar({
  currentSlide,
  totalSlides,
  isQuizSlide,
  answerSubmitted,
  isCorrectAnswer,
  selectedAnswer,
  onSubmit,
  onNext,
}: QuizNavigationBarProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm sm:text-base">
        {currentSlide + 1} of {totalSlides} Slides
      </span>
      {isQuizSlide ? (
        !answerSubmitted || !isCorrectAnswer ? (
          <Button onClick={onSubmit} disabled={!selectedAnswer}>
            Submit
          </Button>
        ) : (
          <Button onClick={onNext}>
            {currentSlide === totalSlides - 1 ? "Finish" : "Next"}
          </Button>
        )
      ) : (
        <Button onClick={onNext}>
          {currentSlide === totalSlides - 1 ? "Finish" : "Next"}
        </Button>
      )}
    </div>
  );
}