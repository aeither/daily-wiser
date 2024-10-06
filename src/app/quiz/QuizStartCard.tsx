import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizStartCardProps {
  quizName: string;
  onStartQuiz: () => void;
}

export function QuizStartCard({ quizName, onStartQuiz }: QuizStartCardProps) {
  return (
    <Card className="flex flex-col w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">{quizName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col h-auto justify-between p-4 sm:p-6">
        <Button onClick={onStartQuiz} className="w-full">
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
}