// src/app/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SwapPage() {
  const [amount, setAmount] = useState<string>("");
  const [isSwappingToTokens, setIsSwappingToTokens] = useState<boolean>(true);

  // Mock balances - replace with actual data fetching logic
  const creditsBalance = 1000;
  const tokenBalance = 500;

  const handleSwap = () => {
    console.log(
      `Swapping ${amount} ${isSwappingToTokens ? "credits to DWT" : "DWT to credits"}`
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}