"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CREATE_CHAT_COST } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import * as z from "zod";

import ClientOnly from "@/components/client-only";
import { FancyMultiSelect } from "@/components/craft/fancy-multi-select";
import { apiReact } from "@/trpc/react";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query";
import { generateImage } from "../actions/fal";
import { deployNFTContractAndMint } from "../actions/web3";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Friend name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  prompt: z.string().min(20, {
    message: "Prompt must be at least 20 characters.",
  }),
  isPublic: z.boolean().default(false),
  tags: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, {
      message: "Please select at least one tag.",
    })
    .max(3),
});

export default function CreateCustomFriendPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const createNFTMetadata = apiReact.user.createNFTMetadata.useMutation();
  const { address } = useAccount();
  const { data: user } = apiReact.user.getUser.useQuery({
    address: address as string,
  });
  const utils = apiReact.useUtils();

  const addXpAction = apiReact.user.addXp.useMutation();
  const spendCreditsAction = apiReact.user.spendCredits.useMutation();
  const createCustomFriendAction = apiReact.user.createCustomBot.useMutation({
    async onSuccess() {
      await utils.user.getUser.invalidate();
    },
  });
  const generateImageMutation = useMutation({
    mutationFn: generateImage,
    async onSuccess() {
      await utils.user.getUser.invalidate();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      prompt: "",
      isPublic: false,
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const tags = values.tags.map((tag) => tag.value);

    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet to create a custom friend.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (user) {
        await addXpAction.mutateAsync({
          address: user.id,
          xpToAdd: CREATE_CHAT_COST * 5,
        });
        await spendCreditsAction.mutateAsync({
          address: user.id,
          creditsToSpend: CREATE_CHAT_COST,
        });
      }

      const image = await generateImageMutation.mutateAsync(
        `Anime-style illustration of a young person. High-quality, detailed artwork with soft shading and vibrant colors. that fit with name: ${values.name} and description:${values.description} ${values.tags}`
      );

      const metadata = await createNFTMetadata.mutateAsync({
        name: values.name,
        description: values.description,
        image: image,
      });

      const tokenURI = `https://fren-ai-lemon.vercel.app/api/?id=${metadata.id}`;

      const nft = await deployNFTContractAndMint(
        values.name,
        "FAI",
        tokenURI,
        address
      );

      await createCustomFriendAction.mutateAsync({
        ...values,
        tags,
        creatorAddress: address,
        nftAddress: nft.nftContractAddress,
        imageUrl: image,
      });

      toast({
        title: "Success",
        description: "Your custom friend has been created.",
      });
      toast({
        title: "Open Explorer",
        action: (
          <ToastAction
            onClick={() =>
              window.open(
                `https://explorer-holesky.morphl2.io/tx/${nft.mintNFTHash}`,
                "_blank"
              )
            }
            altText="Go"
          >
            Go
          </ToastAction>
        ),
      });
      router.push("/"); // Redirect to friends page after successful creation
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create custom friend. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ClientOnly>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Create Custom Friend</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Friend Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter friend name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a unique name for your custom friend.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your friend's personality and characteristics"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of your friend's traits and
                    background.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <FancyMultiSelect
                      selected={field.value}
                      onSelectionChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Select your preferred tags.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the friend's initial prompt or conversation starter"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Specify the initial prompt or conversation starter for your
                    friend.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Make this friend public</FormLabel>
                    <FormDescription>
                      If checked, your friend will be visible to other users.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Friend"}
            </Button>
            <span className="text-gray-400 pl-2">
              🪄 {CREATE_CHAT_COST} credits
            </span>
          </form>
        </Form>
      </div>
    </ClientOnly>
  );
}
