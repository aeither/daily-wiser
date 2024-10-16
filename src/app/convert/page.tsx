"use client";

import { useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import {
  useAccount,
  useChainId,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { dailywiserTokenContractAddresses } from "@/config";
import { useMintDailywiserToken } from "@/hooks/use-convert-token";
import { apiReact } from "@/trpc/react";
import { DAILYWISER_TOKEN_CONTRACT_ABI } from "@/utils/constants/dailywisertoken";

export default function SwapPage() {
  const [amount, setAmount] = useState<string>("");
  const [isSwappingToTokens, setIsSwappingToTokens] = useState<boolean>(true);
  const [creditsBalance, setCreditsBalance] = useState<number>(1000);

  const { address } = useAccount();
  const chainId = useChainId();
  const utils = apiReact.useUtils();

  const { mutate: mintTokens, isPending: isMinting } = useMintDailywiserToken();

  const {
    data: contractData,
    isError,
    isLoading,
    refetch,
  } = useReadContracts({
    contracts: [
      {
        address: dailywiserTokenContractAddresses[chainId],
        abi: DAILYWISER_TOKEN_CONTRACT_ABI,
        functionName: "balanceOf",
        args: [address!],
      },
    ],
  });

  const spendCreditsAction = apiReact.user.spendCredits.useMutation({
    onSuccess(data, variables, context) {
      mintTokens(
        {
          toAddress: address as string,
          amount: Number(amount),
          chainId: chainId,
        },
        {
          onSuccess: () => {
            refetch();
            toast({
              title: "Success",
              description: `${amount} tokens minted successfully!`,
            });
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: `Failed to mint tokens: ${error.message}`,
              variant: "destructive",
            });
          },
        }
      );
    },
    onError(error, variables, context) {
      toast({
        variant: "destructive",
        title: "Something went wrong :(",
        description: error.message,
      });
    },
  });

  const { mutate: burnEvent2Credits } =
    apiReact.user.burnEvent2Credits.useMutation({
      async onSuccess() {
        await utils.user.getUser.invalidate();
        refetch();
        toast({
          title: "Credits Purchased",
          description: "Your credits have been successfully purchased.",
        });
      },
    });

  const {
    writeContract,
    isPending: isBurning,
    data: hash,
  } = useWriteContract();
  const {
    data: receipt,
    isSuccess,
    isLoading: isWaiting,
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && receipt && hash && chainId) {
      burnEvent2Credits({
        txHash: hash,
        chainId: chainId,
      });
    }
  }, [isSuccess, receipt, hash, burnEvent2Credits]);

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
      `Swapping ${amount} ${isSwappingToTokens ? "credits to WISER" : "WISER to credits"}`
    );
  };

  const handleMintTokens = async () => {
    if (!chainId || !address) {
      toast({
        title: "Error",
        description:
          "Please connect your wallet and ensure you're on a supported network.",
        variant: "destructive",
      });
      return;
    }

    const data = await spendCreditsAction.mutateAsync({
      address: address,
      creditsToSpend: Number(amount),
    });
    console.log("🚀 ~ handleMintTokens ~ data:", data);
  };

  const handleBurnTokens = async () => {
    if (!chainId || !address) {
      toast({
        title: "Error",
        description:
          "Please connect your wallet and ensure you're on a supported network.",
        variant: "destructive",
      });
      return;
    }

    try {
      await writeContract({
        address: dailywiserTokenContractAddresses[chainId],
        abi: DAILYWISER_TOKEN_CONTRACT_ABI,
        functionName: "burn",
        args: [parseUnits(amount, 0)],
      });

      refetch();
      toast({
        title: "Success",
        description: `${amount} tokens burned successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to burn tokens: ${(error as Error).message}`,
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
              <span>
                WISER Token: {isLoading ? "Loading..." : tokenBalance}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isSwappingToTokens ? "default" : "outline"}
                onClick={() => setIsSwappingToTokens(true)}
                className="flex-1"
              >
                Credits to WISER
              </Button>
              <Button
                variant={!isSwappingToTokens ? "default" : "outline"}
                onClick={() => setIsSwappingToTokens(false)}
                className="flex-1"
              >
                WISER to Credits
              </Button>
            </div>
            <Input
              type="number"
              placeholder={`Enter ${isSwappingToTokens ? "credits" : "WISER"} amount`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={handleSwap} className="w-full">
              Swap{" "}
              {isSwappingToTokens ? "Credits to WISER" : "WISER to Credits"}
            </Button>
            <div className="flex space-x-2 mt-4">
              <Button
                onClick={handleMintTokens}
                className="flex-1"
                disabled={isMinting || !amount || isWaiting}
              >
                {isMinting ? "Minting..." : `Mint ${amount || "0"} Tokens`}
              </Button>
              <Button
                onClick={handleBurnTokens}
                className="flex-1"
                disabled={isBurning || !amount}
              >
                {isBurning ? "Burning..." : `Burn ${amount || "0"} Tokens`}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}