import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { apiReact } from "@/trpc/react";
import { useAccount } from "wagmi";

export function useMintDailywiserToken() {
  const { chain } = useAccount();
  const baseUrl = chain?.blockExplorers?.default.url;
  const utils = apiReact.useUtils();

  return apiReact.web3.mintDailywiserToken.useMutation({
    onSuccess(data) {
      if (data.hash) {
        utils.user.getUser.invalidate();

        toast({
          title: "Tokens Minted",
          description: "Dailywiser tokens have been successfully minted.",
          action: (
            <ToastAction
              onClick={() =>
                window.open(`${baseUrl}/tx/${data.hash}`, "_blank")
              }
              altText="View Transaction"
            >
              View Transaction
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
