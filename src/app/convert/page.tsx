// src/app/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

// Mock functions for minting and burning tokens
const mockMintTokens = async (amount: number) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return amount;
};

const mockBurnTokens = async (amount: number) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return amount;
};

export default function SwapPage() {
  const [amount, setAmount] = useState<string>("");
  const [isSwappingToTokens, setIsSwappingToTokens] = useState<boolean>(true);
  const [creditsBalance, setCreditsBalance] = useState<number>(1000);
  const [tokenBalance, setTokenBalance] = useState<number>(500);

  const handleSwap = () => {
    console.log(
      `Swapping ${amount} ${isSwappingToTokens ? "credits to DWT" : "DWT to credits"}`
    );
  };

  const handleMintTokens = async () => {
    try {
      const mintedAmount = await mockMintTokens(100);
      setTokenBalance((prev) => prev + mintedAmount);
      toast({
        title: "Tokens Minted",
        description: `Successfully minted ${mintedAmount} DWT tokens.`,
      });
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "An error occurred while minting tokens.",
        variant: "destructive",
      });
    }
  };

  const handleBurnTokens = async () => {
    try {
      const burnedAmount = await mockBurnTokens(50);
      setTokenBalance((prev) => Math.max(0, prev - burnedAmount));
      toast({
        title: "Tokens Burned",
        description: `Successfully burned ${burnedAmount} DWT tokens.`,
      });
    } catch (error) {
      toast({
        title: "Burning Failed",
        description: "An error occurred while burning tokens.",
        variant: "destructive",
      });
    }
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
              <Button onClick={handleMintTokens} className="flex-1">
                Mint 100 Tokens
              </Button>
              <Button onClick={handleBurnTokens} className="flex-1">
                Burn 50 Tokens
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}