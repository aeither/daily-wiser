"use client";

import { useChat } from "ai/react";
import { SendHorizontalIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import CopyToClipboard from "@/components/copy-to-clipboard";
import { toast } from "@/components/ui/use-toast";
import { apiReact } from "@/trpc/react";
import { CHAT_COST } from "@/utils/constants";

export const maxDuration = 30;

export default function ChatClientPage() {
  const { isConnected } = useAccount();
  const botId = useSearchParams().get("botId");
  const { address } = useAccount();
  const utils = apiReact.useUtils();
  const { data: publicBot } = apiReact.user.getPublicBotById.useQuery(
    { id: botId! },
    { enabled: !!botId }
  );

  // const [sharesSubject, setSharesSubject] = useState("");
  const [amount, setAmount] = useState("1");

  const ref = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: "system",
          content: "You are an assistant that gives short answers.",
        },
      ],
      keepLastMessageOnError: true,
      body: {
        user_address: address,
        bot_id: botId,
      },
      onResponse: async (response) => {
        await utils.user.getUser.invalidate();
        if (!response.ok) {
          const status = response.status;
          switch (status) {
            case 401:
              // Handle unauthorized
              break;
            case 402:
              // Handle insufficient credits
              break;
            default:
              // Handle other errors
              break;
          }
        }
      },
    });

  useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description:
          "To proceed, please connect your wallet to chat.",
      });
      return;
    }
    handleSubmit(e);
  }

  return (
    <>
      <Suspense>
        <div
          className="mx-auto mt-3 w-full max-w-2xl bg-cover bg-center rounded-lg mx-2"
          style={{ backgroundImage: `url(${publicBot?.imageUrl})` }}
        >
          <div className="bg-white bg-opacity-90 p-4 rounded-lg">
            <h1 className="text-xl font-bold text-center mb-4">
              {publicBot?.name}
            </h1>
            <ScrollArea
              className="mb-2 h-[400px] rounded-md border p-4"
              ref={ref}
            >
              {messages.map((m) => (
                <div key={m.id} className="mr-6 whitespace-pre-wrap md:mr-12">
                  {m.role === "user" && (
                    <div className="mb-6 flex gap-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="text-sm">U</AvatarFallback>
                      </Avatar>
                      <div className="mt-1.5">
                        <p className="font-semibold">You</p>
                        <div className="mt-1.5 text-sm text-zinc-700">
                          {m.content}
                        </div>
                      </div>
                    </div>
                  )}

                  {m.role === "assistant" && (
                    <div className="mb-6 flex gap-3">
                      <Avatar>
                        <AvatarImage src={publicBot?.imageUrl ?? ""} />
                        <AvatarFallback className="bg-emerald-500 text-white">
                          {publicBot?.name?.charAt(0) || "AI"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mt-1.5 w-full">
                        <div className="flex justify-between">
                          <p className="font-semibold">
                            {publicBot?.name || "Bot"}
                          </p>
                          <CopyToClipboard message={m} className="-mt-1" />
                        </div>
                        <div className="mt-2 text-sm text-zinc-700">
                          {m.content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>

            <span>🪄 {CHAT_COST} credits</span>

            <form onSubmit={onSubmit} className="relative">
              <Input
                name="message"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500"
              />
              <Button
                size="icon"
                type="submit"
                variant="secondary"
                disabled={isLoading}
                className="absolute right-1 top-1 h-8 w-10"
              >
                <SendHorizontalIcon className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </Suspense>
    </>
  );
}
