"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { useAdminMintCertificate } from "@/hooks/use-mint-certificate";
import { useQuizStore } from "@/store/quizStore";
import { apiReact } from "@/trpc/react";
import { GENERATE_CERTIFICATE_COST } from "@/utils/constants";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Confetti from "react-confetti";
import { useAccount } from "wagmi";

export function QuizEndCard() {
  const router = useRouter();
  const { isConnected, address, chain } = useAccount();
  const { data: user } = apiReact.user.getUser.useQuery(
    { address: address as string },
    { enabled: !!address }
  );
  const {
    quizName,
    correctAnswers,
    quizQuestionCount,
    playAgain,
    quizEndscreen,
    showConfetti,
    quizId,
  } = useQuizStore();

  const [isShared, setIsShared] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = `${window.location.origin}/quiz?id=${quizId}`;

  const {
    mutate: adminMintCertificate,
    isPending: isPendingTx,
    isSuccess,
    data: mintResult,
  } = useAdminMintCertificate();

  const baseUrl = chain?.blockExplorers?.default.url;
  const txLink = mintResult?.hash ? `${baseUrl}/tx/${mintResult.hash}` : "";

  const mintNFTCredential = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description:
          "Please connect your wallet to continue with the NFT credential minting process.",
      });
      return;
    }

    if (user && Number(user.totalCredits) < GENERATE_CERTIFICATE_COST) {
      toast({
        title: "Not enough credits",
        description: "Looks like you're out of credits. Add more to continue.",
        action: (
          <ToastAction altText="Credits">
            <Link href={"/credits"}>Open</Link>
          </ToastAction>
        ),
      });
      return;
    }

    if (chain?.id && address) {
      adminMintCertificate({ chainId: chain.id, userAddress: address });
    } else {
      console.error("Chain ID or address is not defined.");
    }
  };

  const handlePlayAnotherQuiz = () => router.push("/select-quiz");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I completed the "${quizName}" quiz!`,
          text: `I got ${correctAnswers} out of ${quizQuestionCount} questions correct. Try it yourself!`,
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
    <>
      {showConfetti && <Confetti recycle={false} />}
      <Card className="flex flex-col w-full max-w-2xl">
        <CardHeader className="space-y-4">
          <div className="flex flex-row justify-between items-center gap-4">
            <CardTitle className="text-xl sm:text-2xl">{quizName}</CardTitle>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
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
        </CardHeader>
        <CardContent className="flex flex-grow flex-col h-auto justify-between p-6">
          {correctAnswers === quizQuestionCount ? (
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Quiz Completed!
              </h2>
              <p className="mb-4">
                You got {correctAnswers} out of {quizQuestionCount} questions
                correct.
              </p>
              {quizEndscreen ? (
                <p className="mb-4 text-lg font-semibold">{quizEndscreen}</p>
              ) : (
                <p className="mb-4">
                  Congratulations! You answered all questions correctly!
                </p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Time's Up!</h2>
              <p className="mb-4">
                You got {correctAnswers} out of {quizQuestionCount} questions
                correct before the time ran out.
              </p>
              <p className="mb-4 text-lg font-semibold">
                Don't worry! You can always try again to improve your score and
                complete the quiz.
              </p>
              <p className="mb-4">
                Remember, practice makes perfect. Take your time, review the
                questions, and give it another shot!
              </p>
            </div>
          )}
          <div className="space-y-4">
            {correctAnswers === quizQuestionCount && !isSuccess && (
              <Button
                onClick={mintNFTCredential}
                disabled={isPendingTx}
                className="w-full"
              >
                {isPendingTx
                  ? "Claiming..."
                  : `Claim Certificate (${GENERATE_CERTIFICATE_COST} 🪙)`}
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
                  onClick={handlePlayAnotherQuiz}
                  className="w-full"
                >
                  Play Another Quiz
                </Button>
              </>
            )}
            {!isSuccess && (
              <Button
                variant="secondary"
                onClick={playAgain}
                className="w-full"
              >
                Play Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
