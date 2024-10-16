// src/app/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  useBurnDailywiserToken,
  useMintDailywiserToken,
} from "@/hooks/use-convert-token";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function SwapPage() {
  const [amount, setAmount] = useState<string>("");
  const [isSwappingToTokens, setIsSwappingToTokens] = useState<boolean>(true);
  const [creditsBalance, setCreditsBalance] = useState<number>(1000);
  const [tokenBalance, setTokenBalance] = useState<number>(500);
  const { address } = useAccount();
  const { chain } = useAccount();
  const { mutate: mintTokens, isPending: isMinting } = useMintDailywiserToken();
  const { mutate: burnTokens, isPending: isBurning } = useBurnDailywiserToken();

  const handleSwap = () => {
    console.log(
      `Swapping ${amount} ${isSwappingToTokens ? "credits to DWT" : "DWT to credits"}`
    );
  };

  const handleMintTokens = async () => {
    if (!chain?.id) {
      toast({
        title: "Chain ID Not Found",
        description:
          "Please make sure you're connected to a supported network.",
        variant: "destructive",
      });
      return;
    }

    mintTokens(
      {
        toAddress: address as `0x${string}`, // Replace with the address to receive the tokens
        amount: 100,
        chainId: chain.id,
      },
      {
        onSuccess: () => {
          setTokenBalance((prev) => prev + 100);
        },
      }
    );
  };

  const handleBurnTokens = async () => {
    if (!chain?.id) {
      toast({
        title: "Chain ID Not Found",
        description:
          "Please make sure you're connected to a supported network.",
        variant: "destructive",
      });
      return;
    }

    burnTokens(
      {
        amount: 50,
        chainId: chain.id,
      },
      {
        onSuccess: () => {
          setTokenBalance((prev) => Math.max(0, prev - 50));
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Swap Credits and DailyWiser Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Credits: {creditsBalance}</span>
              <span>DWT: {tokenBalance}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isSwappingToTokens ? "default" : "outline"}
                onClick={() => setIsSwappingToTokens(true)}
                className="flex-1"
              >
                Credits to DWT
              </Button>
              <Button
                variant={!isSwappingToTokens ? "default" : "outline"}
                onClick={() => setIsSwappingToTokens(false)}
                className="flex-1"
              >
                DWT to Credits
              </Button>
            </div>
            <Input
              type="number"
              placeholder={`Enter ${isSwappingToTokens ? "credits" : "DWT"} amount`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={handleSwap} className="w-full">
              Swap {isSwappingToTokens ? "Credits to DWT" : "DWT to Credits"}
            </Button>

            {/* Test buttons for minting and burning tokens */}
            <div className="flex space-x-2 mt-4">
              <Button
                onClick={handleMintTokens}
                className="flex-1"
                disabled={isMinting}
              >
                {isMinting ? "Minting..." : "Mint 100 Tokens"}
              </Button>
              <Button
                onClick={handleBurnTokens}
                className="flex-1"
                disabled={isBurning}
              >
                {isBurning ? "Burning..." : "Burn 50 Tokens"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
