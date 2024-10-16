"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { dailywiserTokenContractAddresses } from "@/config";
import {
  useBurnDailywiserToken,
  useMintDailywiserToken,
} from "@/hooks/use-convert-token";
import { DAILYWISER_TOKEN_CONTRACT_ABI } from "@/utils/constants/dailywisertoken";
import { useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useReadContracts } from "wagmi";

export default function SwapPage() {
  const [amount, setAmount] = useState<string>("");
  const [isSwappingToTokens, setIsSwappingToTokens] = useState<boolean>(true);
  const [creditsBalance, setCreditsBalance] = useState<number>(1000);
  const { address, chain } = useAccount();
  const { mutate: mintTokens, isPending: isMinting } = useMintDailywiserToken();
  const { mutate: burnTokens, isPending: isBurning } = useBurnDailywiserToken();

  const {
    data: contractData,
    isError,
    isLoading,
    refetch,
  } = useReadContracts({
    contracts: [
      {
        address: dailywiserTokenContractAddresses[chain!.id],
        abi: DAILYWISER_TOKEN_CONTRACT_ABI,
        functionName: "balanceOf",
        args: [address!],
      },
    ],
  });

  const tokenBalance = (() => {
    if (contractData && !isError && !isLoading) {
      const [balanceData] = contractData;
      if (balanceData?.result) {
        return formatUnits(balanceData.result, 0);
      }
    }
    return "0";
  })();

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
        toAddress: address as `0x${string}`,
        amount: 100,
        chainId: chain.id,
      },
      {
        onSuccess: () => {
          refetch();
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
          refetch();
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
              <span>DWT: {isLoading ? "Loading..." : tokenBalance}</span>
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
