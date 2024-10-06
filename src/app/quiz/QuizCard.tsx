import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuizCardProps {
  quizName: string;
  currentSlide: number;
  timeLeft: number;
  content: string;
  options?: string[];
  selectedAnswer: string | null;
  answerSubmitted: boolean;
  isCorrectAnswer: boolean;
  correctAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

export function QuizCard({
  quizName,
  currentSlide,
  timeLeft,
  content,
  options,
  selectedAnswer,
  answerSubmitted,
  isCorrectAnswer,
  correctAnswer,
  onAnswerSelect,
}: QuizCardProps) {
  return (
    <Card className="flex flex-col w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">{quizName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col h-auto justify-between p-4 sm:p-6">
        <div className="w-full mb-4">
          <Progress value={(timeLeft / 60) * 100} className="w-full" />
          <p className="text-center mt-2">{timeLeft} seconds left</p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            {currentSlide + 1}. {content}
          </h2>
          {options && (
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
                  onClick={() => onAnswerSelect(option)}
                  disabled={answerSubmitted && isCorrectAnswer}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}