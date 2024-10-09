"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { apiReact } from "@/trpc/react";
import { ToastAction } from "@radix-ui/react-toast";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function FaucetComponent() {
  const [isClaiming, setIsClaiming] = useState(false);
  const { address, isConnected, chain } = useAccount();
  const claimMutation = apiReact.web3.claimFaucetToken.useMutation();
  const baseUrl = chain?.blockExplorers?.default.url;

  const handleClaim = async () => {
    if (!address || !chain) return;

    setIsClaiming(true);
    try {
      const result = await claimMutation.mutateAsync({
        chainId: chain.id,
        userAddress: address,
      });
      console.log("Claim successful:", result.hash);
      toast({
        title: "Claim Successful",
        description: "Successfully claimed 0.001 EDU!",
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
            "You can only claim once per day. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Claim Your Daily EDU</CardTitle>
        <CardDescription>
          Connect your wallet to claim 0.001 EDU tokens once per day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <p className="text-sm text-gray-600 mb-4">Connected: {address}</p>
        ) : (
          <p className="text-sm text-gray-600 mb-4">
            Please connect your wallet to claim tokens.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <w3m-button />
        {isConnected && (
          <Button
            onClick={handleClaim}
            disabled={isClaiming}
            className="w-full mt-2"
          >
            {isClaiming ? "Claiming..." : "Claim 0.001 EDU"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
