import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuizStore } from "@/store/quizStore";
import { Check, ClipboardCopy, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function QuizStartCard() {
  const {
    quizName,
    quizDescription,
    quizCategory,
    quizImage,
    startQuiz,
    quizId,
  } = useQuizStore();
  const [isShared, setIsShared] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = `${window.location.origin}/quiz?id=${quizId}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: quizName,
          text: quizDescription,
          url: shareUrl,
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="flex flex-col w-full max-w-2xl mx-auto my-4">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {quizCategory && (
            <Badge variant="secondary" className="text-xs">
              {quizCategory}
            </Badge>
          )}
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="relative"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <ClipboardCopy className="h-4 w-4" />
                    )}
                    {isCopied && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                        Copied!
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isCopied ? "Copied!" : "Copy Link"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isShared ? "Shared!" : "Share Quiz"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <CardTitle className="text-xl sm:text-2xl md:text-3xl">
          {quizName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col h-auto justify-between p-6">
        {quizImage && (
          <div className="mb-6">
            <Image
              src={quizImage}
              alt={quizName}
              width={400}
              height={200}
              className="rounded-lg object-cover w-full"
              layout="responsive"
            />
          </div>
        )}
        <p className="mb-8 text-sm sm:text-base">{quizDescription}</p>
        <Button onClick={startQuiz} className="w-full text-lg py-6">
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
