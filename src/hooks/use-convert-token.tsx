import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { apiReact } from "@/trpc/react";
import { useAccount } from "wagmi";

export function useMintDailywiserToken() {
  const { chain } = useAccount();
  const baseUrl = chain?.blockExplorers?.default.url;
  const utils = apiReact.useUtils();

  return apiReact.web3.mintDailywiserToken.useMutation({
    onSuccess(data, variables, context) {
      if (data.status === "success") {
        utils.user.getUser.invalidate();

        toast({
          title: "Tokens Minted",
          description: "Dailywiser tokens have been successfully minted.",
          action: (
            <ToastAction
              onClick={() => {
                // You might want to add a way to view the transaction if possible
                // For now, we'll just show a success message
                toast({
                  title: "Success",
                  description: "Tokens minted successfully.",
                });
              }}
              altText={"View Details"}
            >
              View Details
            </ToastAction>
          ),
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Minting Failed",
        description: error.message,
      });
    },
  });
}

export function useBurnDailywiserToken() {
  const { chain } = useAccount();
  const baseUrl = chain?.blockExplorers?.default.url;
  const utils = apiReact.useUtils();

  return apiReact.web3.burnDailywiserToken.useMutation({
    onSuccess(data, variables, context) {
      if (data.status === "success") {
        utils.user.getUser.invalidate();

        toast({
          title: "Tokens Burned",
          description: "Dailywiser tokens have been successfully burned.",
          action: (
            <ToastAction
              onClick={() => {
                // You might want to add a way to view the transaction if possible
                // For now, we'll just show a success message
                toast({
                  title: "Success",
                  description: "Tokens burned successfully.",
                });
              }}
              altText={"View Details"}
            >
              View Details
            </ToastAction>
          ),
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Burning Failed",
        description: error.message,
      });
    },
  });
}