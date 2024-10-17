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

function formatTokenBalance(balance: string): string {
  const num = Number.parseFloat(balance);
  if (Number.isInteger(num)) {
    return num.toString();
  }
  return num.toFixed(0);
}

export default function ConvertToken() {
  const [amount, setAmount] = useState<string>("20");
  const [isConvertingToCredits, setIsConvertingToCredits] =
    useState<boolean>(true);

  const { address } = useAccount();
  const chainId = useChainId();
  const utils = apiReact.useUtils();

  const { mutate: mintTokens, isPending: isMinting } = useMintDailywiserToken();

  const { data: user, refetch: refetchUser } = apiReact.user.getUser.useQuery(
    { address: address as string },
    { enabled: !!address }
  );

  const {
    data: contractData,
    isError,
    isLoading,
    refetch: refetchTokenBalance,
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

  const convertCreditsToTokens = apiReact.user.spendCredits.useMutation({
    onSuccess(data, variables, context) {
      mintTokens(
        {
          toAddress: address as string,
          amount: amount,
          chainId: chainId,
        },
        {
          onSuccess: () => {
            refetchTokenBalance();
            refetchUser();
            toast({
              title: "Success",
              description: `${amount} DailyWiser tokens minted successfully!`,
            });
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: `Failed to mint DailyWiser tokens: ${error.message}`,
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

  const { mutate: convertTokensToCredits } =
    apiReact.user.burnEvent2Credits.useMutation({
      async onSuccess() {
        await utils.user.getUser.invalidate();
        refetchTokenBalance();
        refetchUser();
        toast({
          title: "Credits Received",
          description:
            "Your DailyWiser tokens have been successfully converted to credits.",
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
      convertTokensToCredits({
        txHash: hash,
        chainId: chainId,
      });
    }
  }, [isSuccess, receipt, hash, convertTokensToCredits]);

  const tokenBalance = (() => {
    if (contractData && !isError && !isLoading) {
      const [balanceData] = contractData;
      if (balanceData?.result) {
        return formatTokenBalance(formatUnits(balanceData.result, 18));
      }
    }
    return "0";
  })();

  const checkSufficientBalance = () => {
    const amountNumber = Number(amount);
    if (isConvertingToCredits) {
      if (amountNumber > Number(tokenBalance)) {
        toast({
          title: "Insufficient Tokens",
          description:
            "You don't have enough DailyWiser tokens for this conversion.",
          variant: "destructive",
        });
        return false;
      }
    } else {
      if (amountNumber > Number(user?.totalCredits ?? 0)) {
        toast({
          title: "Insufficient Credits",
          description: "You don't have enough credits for this conversion.",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleConvert = async () => {
    if (!chainId || !address) {
      toast({
        title: "Error",
        description:
          "Please connect your wallet and ensure you're on a supported network.",
        variant: "destructive",
      });
      return;
    }

    if (!checkSufficientBalance()) {
      return;
    }

    if (isConvertingToCredits) {
      try {
        await writeContract({
          address: dailywiserTokenContractAddresses[chainId],
          abi: DAILYWISER_TOKEN_CONTRACT_ABI,
          functionName: "burn",
          args: [parseUnits(amount, 18)],
        });

        refetchTokenBalance();
        toast({
          title: "Success",
          description: `${amount} DailyWiser tokens converted to credits successfully!`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to convert DailyWiser tokens to credits: ${(error as Error).message}`,
          variant: "destructive",
        });
      }
    } else {
      await convertCreditsToTokens.mutateAsync({
        address: address,
        creditsToSpend: Number(amount),
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Convert DailyWiser Tokens and Platform Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>
                Platform Credits: {user?.totalCredits ?? "Loading..."}
              </span>
              <span>
                DailyWiser Tokens: {isLoading ? "Loading..." : tokenBalance}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isConvertingToCredits ? "default" : "outline"}
                onClick={() => setIsConvertingToCredits(true)}
                className="flex-1"
              >
                Tokens to Credits
              </Button>
              <Button
                variant={!isConvertingToCredits ? "default" : "outline"}
                onClick={() => setIsConvertingToCredits(false)}
                className="flex-1"
              >
                Credits to Tokens
              </Button>
            </div>
            <Input
              type="number"
              placeholder={`Enter ${isConvertingToCredits ? "DailyWiser tokens" : "credits"} amount`}
              value={amount}
              max={20000}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              onClick={handleConvert}
              className="w-full"
              disabled={isMinting || isBurning || !amount || isWaiting}
            >
              {isMinting || isBurning || isWaiting
                ? "Converting..."
                : `Convert ${amount || "0"} ${isConvertingToCredits ? "Tokens to Credits" : "Credits to Tokens"}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
