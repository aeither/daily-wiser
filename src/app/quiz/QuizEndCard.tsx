import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAdminMintCertificate } from "@/hooks/use-mint-certificate";
import { useQuizStore } from "@/store/quizStore";
import { GENERATE_MEME_COST } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export function QuizEndCard() {
  const router = useRouter();
  const { isConnected, address, chain } = useAccount();
  const {
    quizName,
    correctAnswers,
    quizQuestionCount,
    playAgain,
    quizEndscreen,
  } = useQuizStore();

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

    if (chain?.id && address) {
      adminMintCertificate({ chainId: chain.id, userAddress: address });
    } else {
      console.error("Chain ID or address is not defined.");
    }
  };

  const handlePlayAnotherQuiz = () => router.push("/select-quiz");

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
        <div className="space-y-2">
          {correctAnswers === quizQuestionCount && !isSuccess && (
            <Button
              onClick={mintNFTCredential}
              disabled={isPendingTx}
              className="w-full"
            >
              {isPendingTx
                ? "Claiming..."
                : `Claim Certificate (${GENERATE_MEME_COST} 🪙)`}
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
            <Button variant="secondary" onClick={playAgain} className="w-full">
              Play Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
