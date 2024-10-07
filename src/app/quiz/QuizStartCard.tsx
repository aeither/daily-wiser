import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuizStore } from "@/store/quizStore";
import Image from "next/image";

export function QuizStartCard() {
  const { quizName, quizDescription, quizCategory, quizImage, startQuiz } =
    useQuizStore();

  return (
    <Card className="flex flex-col w-full max-w-2xl">
      <CardHeader>
        <div className="flex flex-col justify-between items-start mb-2 gap-2">
          {quizCategory && (
            <Badge variant="secondary" className="text-xs">
              {quizCategory}
            </Badge>
          )}
          <CardTitle className="text-xl sm:text-2xl">{quizName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col h-auto justify-between p-4 sm:p-6">
        {quizImage && (
          <div className="mb-4">
            <Image
              src={quizImage}
              alt={quizName}
              width={400}
              height={200}
              className="rounded-lg object-cover w-full"
            />
          </div>
        )}
        <p className="mb-6">
          {quizDescription}
        </p>
        <Button onClick={startQuiz} className="w-full">
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
