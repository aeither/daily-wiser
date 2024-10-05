import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { feedbackContractAddresses, getWagmiPublicClient } from "@/config";
import { FEEDBACK_CONTRACT_ABI } from "@/utils/constants/feedback";
import { useAccount, useChainId, useWriteContract } from "wagmi";

export const useSubmitFeedback = () => {
  const {
    writeContractAsync,
    data: hash,
    isPending: isPendingTx,
  } = useWriteContract();
  const chainId = useChainId();
  const { chain } = useAccount();
  const baseUrl = chain?.blockExplorers?.default.url;

  const submitFeedback = async (feedback: string) => {
    try {
      const txHash = await writeContractAsync({
        address: feedbackContractAddresses[chainId],
        abi: FEEDBACK_CONTRACT_ABI,
        functionName: "addFeedback",
        args: [feedback],
      });

      const publicClient = getWagmiPublicClient(chainId);
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash: txHash,
      });

      if (receipt) {
        toast({
          title: "Success",
          description: "Your feedback has been submitted successfully.",
          action: (
            <ToastAction
              onClick={() =>
                window.open(
                  `${baseUrl}/tx/${receipt.transactionHash}`,
                  "_blank"
                )
              }
              altText={"View Transaction"}
            >
              View Transaction
            </ToastAction>
          ),
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { submitFeedback, hash, isPendingTx };
};

export const useAddWisdom = () => {
  const {
    writeContractAsync,
    data: hash,
    isPending: isPendingTx,
  } = useWriteContract();
  const chainId = useChainId();
  const { chain } = useAccount();
  const baseUrl = chain?.blockExplorers?.default.url;

  const addWisdom = async (quote: string) => {
    try {
      const txHash = await writeContractAsync({
        address: feedbackContractAddresses[chainId],
        abi: FEEDBACK_CONTRACT_ABI,
        functionName: "addWisdom",
        args: [quote],
      });

      const publicClient = getWagmiPublicClient(chainId);
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash: txHash,
      });

      if (receipt) {
        toast({
          title: "Success",
          description: "Your wisdom has been submitted successfully.",
          action: (
            <ToastAction
              onClick={() =>
                window.open(
                  `${baseUrl}/tx/${receipt.transactionHash}`,
                  "_blank"
                )
              }
              altText={"View Transaction"}
            >
              View Transaction
            </ToastAction>
          ),
        });
      }

      return true;
    } catch (error) {
      console.error("Error submitting wisdom:", error);
      toast({
        title: "Error",
        description: "Failed to submit wisdom. Please try again.",
        variant: "destructive",
      });

      return false;
    }
  };

  return { addWisdom, hash, isPendingTx };
};
export const useCanAddWisdom = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = getWagmiPublicClient(chainId);

  const canAddWisdom = async () => {
    if (!publicClient) {
      throw new Error("Public client is not available");
    }
    const response = await publicClient.readContract({
      account: address,
      address: feedbackContractAddresses[chainId],
      abi: FEEDBACK_CONTRACT_ABI,
      functionName: "canAddWisdom",
      args: [],
    });
    return response;
  };

  const timeUntilNextWisdom = async () => {
    if (!publicClient) {
      throw new Error("Public client is not available");
    }
    return await publicClient.readContract({
      account: address,
      address: feedbackContractAddresses[chainId],
      abi: FEEDBACK_CONTRACT_ABI,
      functionName: "timeUntilNextWisdom",
      args: [],
    });
  };

  const getLatestWisdom = async () => {
    if (!publicClient) {
      throw new Error("Public client is not available");
    }
    if (!address) {
      throw new Error("Address is not available");
    }
    return await publicClient.readContract({
      account: address,
      address: feedbackContractAddresses[chainId],
      abi: FEEDBACK_CONTRACT_ABI,
      functionName: "wisdomByUser",
      args: [address],
    });
  };

  return { canAddWisdom, timeUntilNextWisdom, getLatestWisdom };
};
