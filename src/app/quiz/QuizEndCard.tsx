import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface QuizEndCardProps {
  quizName: string;
  correctAnswers: number;
  totalQuestions: number;
  isSuccess: boolean;
  isPendingTx: boolean;
  txLink: string;
  onMintNFT: () => void;
  onPlayAnotherQuiz: () => void;
  onPlayAgain: () => void;
}

export function QuizEndCard({
  quizName,
  correctAnswers,
  totalQuestions,
  isSuccess,
  isPendingTx,
  txLink,
  onMintNFT,
  onPlayAnotherQuiz,
  onPlayAgain,
}: QuizEndCardProps) {
  return (
    <Card className="flex flex-col w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">{quizName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col h-auto justify-between p-4 sm:p-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Quiz Completed!
          </h2>
          <p className="mb-4">
            You got {correctAnswers} out of {totalQuestions} questions correct.
          </p>
          {correctAnswers === totalQuestions ? (
            <p className="mb-4">
              Congratulations! You answered all questions correctly!
            </p>
          ) : (
            <p className="mb-4">Keep practicing to improve your score!</p>
          )}
        </div>
        <div className="space-y-2">
          {correctAnswers === totalQuestions && !isSuccess && (
            <Button
              onClick={onMintNFT}
              disabled={isPendingTx}
              className="w-full"
            >
              {isPendingTx ? "Claiming..." : "Claim Certificate"}
            </Button>
          )}
          {isSuccess && (
            <>
              <p className="mb-4">
                NFT minted successfully!{" "}
                <Link
                  href={txLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View transaction
                </Link>
              </p>
              <Button
                variant="secondary"
                onClick={onPlayAnotherQuiz}
                className="w-full"
              >
                Play Another Quiz
              </Button>
            </>
          )}
          {!isSuccess && (
            <Button
              variant={"secondary"}
              onClick={onPlayAgain}
              className="w-full"
            >
              Play Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}