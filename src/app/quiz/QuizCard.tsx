import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuizStore } from "@/store/quizStore";

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
    submitAnswer,
    nextSlide,
  } = useQuizStore();

  const content = quizData[currentSlide]?.content || "";
  const options = quizData[currentSlide]?.options || [];
  const correctAnswer = quizData[currentSlide]?.correctAnswer || "";
  const totalSlides = quizData.length;
  const isQuizSlide = quizData[currentSlide]?.type === "quiz";

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
                  disabled={answerSubmitted && isCorrectAnswer}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
        </div>
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
      </CardContent>
    </Card>
  );
}