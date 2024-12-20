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
import { apiReact } from "@/trpc/react";
import { DAILYWISER_TOKEN_CONTRACT_ABI } from "@/utils/constants/dailywisertoken";
import { ToastAction } from "./ui/toast";

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

  const { address, chain } = useAccount();
  const chainId = useChainId();
  const utils = apiReact.useUtils();
  const baseUrl = chain?.blockExplorers?.default.url;

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

  const { mutateAsync: convert2Tokens, isPending: isPending2Tokens } =
    apiReact.web3.convertCredits2Token.useMutation({
      onSuccess(data, variables, context) {
        refetchTokenBalance();
        refetchUser();
        toast({
          title: "Success",
          description: `${amount} credits converted to tokens successfully!`,
          action: (
            <ToastAction
              onClick={() =>
                window.open(`${baseUrl}/tx/${data.hash}`, "_blank")
              }
              altText={"View Transaction"}
            >
              View Transaction
            </ToastAction>
          ),
        });
      },
      onError(error, variables, context) {
        toast({
          variant: "destructive",
          title: "Something went wrong :(",
          description: error.message,
        });
      },
    });

  const {
    mutate: convertTokensToCredits,
    isPending: isPendingTokensToCredits,
  } = apiReact.user.burnEvent2Credits.useMutation({
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
  } = useWriteContract({
    mutation: {
      onSuccess(data, variables, context) {
        refetchTokenBalance();
      },
    },
  });
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
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to convert DailyWiser tokens to credits: ${(error as Error).message}`,
          variant: "destructive",
        });
      }
    } else {
      convert2Tokens({
        userAddress: address,
        amount: amount,
        chainId: chainId,
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
              disabled={
                isPendingTokensToCredits ||
                isPending2Tokens ||
                isBurning ||
                !amount ||
                isWaiting
              }
            >
              {isPendingTokensToCredits ||
              isPending2Tokens ||
              isBurning ||
              isWaiting
                ? "Converting..."
                : `Convert ${amount || "0"} ${isConvertingToCredits ? "Tokens to Credits" : "Credits to Tokens"}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
