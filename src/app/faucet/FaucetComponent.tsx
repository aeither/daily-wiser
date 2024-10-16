"use client";

import { Badge } from "@/components/ui/badge"; // Make sure to import the Badge component
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useMintDailywiserToken } from "@/hooks/use-convert-token";
import { apiReact } from "@/trpc/react";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function FaucetComponent() {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimStatus, setClaimStatus] = useState<"idle" | "success" | "failed">(
    "idle"
  );
  const { address, isConnected, chain } = useAccount();
  const claimMutation = apiReact.web3.claimFaucetToken.useMutation();
  const baseUrl = chain?.blockExplorers?.default.url;
  const { mutate: mintTokens, isPending: isMinting } = useMintDailywiserToken();

  // Prove human states
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [isHuman, setIsHuman] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaQuestion(`What is ${num1} + ${num2}?`);
    setCaptchaAnswer((num1 + num2).toString());
  };

  const handleCaptchaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userAnswer = (e.target as HTMLFormElement).captcha.value;
    if (userAnswer === captchaAnswer) {
      setIsHuman(true);
      toast({
        title: "Human Verified",
        description: "You can now claim your tokens.",
      });
    } else {
      toast({
        title: "Verification Failed",
        description: "Please try again.",
        variant: "destructive",
      });
      generateCaptcha();
    }
  };

  const handleClaim = async () => {
    if (!address || !chain || !isHuman) return;

    setIsClaiming(true);
    try {
      const result = await claimMutation.mutateAsync({
        chainId: chain.id,
        userAddress: address,
      });

      // Mint 25 WISE Tokens
      mintTokens({
        toAddress: address,
        amount: Number(25),
        chainId: chain.id,
      });
      console.log("Claim successful:", result.hash);
      toast({
        title: "Claim Successful",
        description: "Successfully claimed 0.001 EDU and 25 WISER tokens!",
        action: (
          <ToastAction
            onClick={() =>
              window.open(`${baseUrl}/tx/${result.hash}`, "_blank")
            }
            altText={"View Transaction"}
          >
            View Transaction
          </ToastAction>
        ),
      });
      setClaimStatus("success");
    } catch (error: any) {
      console.error("Claim failed:", error);
      if (error.message.includes("You can only claim once per day")) {
        toast({
          title: "Claim Failed",
          description:
            "You can only claim once per day. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Claim Failed",
          description:
            "An error occurred while claiming. Please try again later.",
          variant: "destructive",
        });
      }
      setClaimStatus("failed");
    } finally {
      setIsClaiming(false);
    }
  };

  const getButtonText = () => {
    if (isClaiming) return "Claiming...";
    if (claimStatus === "success") return "Claimed Successfully";
    if (claimStatus === "failed") return "Claim Failed";
    return "Claim 0.001 EDU + 25 WISER";
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Claim Your Daily Tokens</CardTitle>
          <Badge variant="secondary" className="ml-2">
            Now get 25 WISER tokens!
          </Badge>
        </div>
        <CardDescription>
          Connect your wallet and verify you're human to claim 0.001 EDU and 25
          WISER tokens once per day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-2">
          {isConnected ? (
            <p className="text-sm text-gray-600 mb-4">Connected: {address}</p>
          ) : (
            <p className="text-sm text-gray-600 mb-4">
              Please connect your wallet to claim tokens.
            </p>
          )}
        </div>
        <w3m-button />
        {isConnected && !isHuman && (
          <form onSubmit={handleCaptchaSubmit} className="mt-4">
            <p className="text-sm text-gray-600 mb-2">{captchaQuestion}</p>
            <div className="flex space-x-2">
              <Input
                type="text"
                name="captcha"
                placeholder="Enter answer"
                className="flex-grow"
              />
              <Button type="submit">Verify</Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {isConnected && isHuman && (
          <Button
            onClick={handleClaim}
            disabled={isClaiming || claimStatus !== "idle"}
            className="w-full mt-2"
          >
            {getButtonText()}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
