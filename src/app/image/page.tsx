"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { apiReact } from "@/trpc/react";
import { CREATE_CHAT_COST, GENERATE_IMAGE_COST } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { Heart, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";
import { generateImage } from "../actions/fal";

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [liked, setLiked] = useState(false);
  const { address } = useAccount();
  const { data: user } = apiReact.user.getUser.useQuery({
    address: address as string,
  });
  const utils = apiReact.useUtils();

  const addXpAction = apiReact.user.addXp.useMutation();
  const spendCreditsAction = apiReact.user.spendCredits.useMutation({
    onError(error, variables, context) {
      toast({
        variant: "destructive",
        title: "Something went wrong :(",
        description: error.message,
      });
    },
  });

  const {
    mutate: generateImageMutation,
    isPending,
    error,
    isError,
    data: generatedImageUrl,
  } = useMutation({
    mutationFn: generateImage,
    async onSuccess() {
      await utils.user.getUser.invalidate();
    },
  });

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    // Placeholder for share functionality
    console.log("Sharing image...");
  };

  const genImage = async () => {
    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet to generate an image.",
        variant: "destructive",
      });
      return;
    }

    if (user) {
      await spendCreditsAction.mutateAsync({
        address: user.address,
        creditsToSpend: GENERATE_IMAGE_COST,
      });
      await addXpAction.mutateAsync({
        address: user.address,
        xpToAdd: CREATE_CHAT_COST * 5,
      });
    }

    generateImageMutation(prompt);
  };

  if (isError) {
    console.error("Error generating image:", error);
    toast({
      title: "Error",
      description: "Failed to generate image. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <Card className="w-full max-w-6xl mx-auto h-[calc(100vh-124px)] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">AI Image Generator</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleLike}>
            <Heart className={liked ? "fill-current text-red-500" : ""} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 p-4 bg-yellow-100 flex flex-col">
          <Input
            placeholder="Enter your image prompt here. For example: 'A friendly Japanese Girl anime style'"
            className="flex-1 mb-4"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            onClick={genImage}
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={isPending || !prompt}
          >
            {isPending || spendCreditsAction.isPending
              ? "Generating..."
              : "Generate Image"}
          </Button>
          <span className="text-gray-400">
            🪄 {GENERATE_IMAGE_COST} credits
          </span>
        </div>
        <div className="w-1/2 p-4 bg-white border-l flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Generated Image</h3>
          <div className="flex-1 overflow-y-auto flex items-center justify-center">
            {generatedImageUrl ? (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={generatedImageUrl}
                  alt="Generated Image"
                  width={500}
                  height={500}
                  objectFit="contain"
                />
              </div>
            ) : (
              <p className="text-gray-500">
                Your generated image will appear here
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
