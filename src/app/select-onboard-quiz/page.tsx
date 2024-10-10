"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { quizDatas } from "@/utils/constants/quizzes";
import { Clock, Code, FlaskConical, Lightbulb } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const getCategoryIcon = (category: string | undefined) => {
  switch (category) {
    case "mathematics":
      return <Lightbulb className="w-6 h-6" />;
    case "history":
      return <Clock className="w-6 h-6" />;
    case "science":
      return <FlaskConical className="w-6 h-6" />;
    case "technology":
      return <Code className="w-6 h-6" />;
    default:
      return <Lightbulb className="w-6 h-6" />;
  }
};

export default function SelectQuiz() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Select Your Quiz</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {quizDatas.map((quiz) => (
          <Card key={quiz.id} className="border-gray-700 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getCategoryIcon(quiz.category)}
                <span>{quiz.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              {quiz.image && (
                <div
                  className="mb-4 relative w-full"
                  style={{ paddingTop: "56.25%" }}
                >
                  <Image
                    src={quiz.image}
                    alt={quiz.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md absolute top-0 left-0"
                  />
                </div>
              )}
              <p>{quiz.description}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                className="w-full"
                onClick={() => router.push(`/quiz/?id=${quiz.id}`)}
              >
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
