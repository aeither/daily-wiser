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

// Custom hook for chat scroll behavior
function useChatScroll(dependency: any) {
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [dependency, autoScroll]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const atBottom = scrollHeight - scrollTop === clientHeight;
      setAutoScroll(atBottom);
    }
  };

  return { scrollRef, bottomRef, handleScroll };
}

export default function ChatClientPage() {
  const { isConnected, address } = useAccount();
  const botId = useSearchParams().get("botId");
  const utils = apiReact.useUtils();
  const { data: user } = apiReact.user.getUser.useQuery({
    address: address as string,
  });
  const { data: publicBot } = apiReact.user.getPublicBotById.useQuery(
    { id: botId! },
    { enabled: !!botId }
  );

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
              toast({
                title: "Unauthorized",
                description: "Please log in to continue.",
              });
              break;
            case 402:
              toast({
                title: "Insufficient Credits",
                description: "Please add more credits to continue.",
              });
              break;
            default:
              toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
              });
              break;
          }
        }
      },
    });

  const { scrollRef, bottomRef, handleScroll } = useChatScroll(messages);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "To proceed, please connect your wallet to chat.",
      });
      return;
    }

    if (!user || Number(user.totalCredits) < CHAT_COST) {
      toast({
        title: "Insufficient Credits",
        description: <div>You need at least {CHAT_COST} credits to chat.</div>,
      });
      return;
    }

    handleSubmit(e);
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <div className="mx-auto mt-3 w-full max-w-2xl bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg p-4">
        <div className="bg-white bg-opacity-90 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={publicBot?.imageUrl ?? ""} />
              <AvatarFallback className="bg-emerald-500 text-white text-lg">
                {publicBot?.name?.charAt(0) || "AI"}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-center">
              {publicBot?.name || "AI Assistant"}
            </h1>
          </div>
          <ScrollArea
            className="mb-4 h-[400px] rounded-md border p-4 bg-gray-50"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`mb-4 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${m.role === "user" ? "bg-blue-100" : "bg-white border"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">
                      {m.role === "user" ? "You" : publicBot?.name || "Bot"}
                    </p>
                    {m.role === "assistant" && (
                      <CopyToClipboard
                        message={m}
                        className="text-gray-500 hover:text-gray-700"
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </ScrollArea>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              🪄 {CHAT_COST} credits per message
            </span>
            <span className="text-sm text-gray-600">
              Available credits: {user?.totalCredits || 0}
            </span>
          </div>
          <form onSubmit={onSubmit} className="relative">
            <Input
              name="message"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="pr-12 placeholder:italic placeholder:text-gray-400 focus-visible:ring-blue-500"
            />
            <Button
              size="icon"
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="absolute right-1 top-1 h-8 w-10 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <SendHorizontalIcon className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </Suspense>
  );
}