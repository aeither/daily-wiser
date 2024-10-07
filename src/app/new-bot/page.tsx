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
import { apiReact } from "@/trpc/react";
import { CREATE_CHAT_COST } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Bot name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  prompt: z.string().min(20, {
    message: "Prompt must be at least 20 characters.",
  }),
  isPublic: z.boolean().default(false),
});

export default function CreateCustomBotPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      prompt: "",
      isPublic: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet to create a custom bot.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("User data not available");
      }

      // Check if user has enough credits
      if (user.totalCredits && Number(user.totalCredits) < CREATE_CHAT_COST) {
        throw new Error("Insufficient credits");
      }

      await spendCreditsAction.mutateAsync({
        address: user.address,
        creditsToSpend: CREATE_CHAT_COST,
      });
      await addXpAction.mutateAsync({
        address: user.address,
        xpToAdd: CREATE_CHAT_COST * 5,
      });

      await createCustomFriendAction.mutateAsync({
        ...values,
        creatorAddress: address,
        imageUrl:
          "https://res.cloudinary.com/dzkwltgyd/image/upload/v1724533260/glif-run-outputs/axgs45lxp7khr83ck2t0.jpg",
      });

      toast({
        title: "Success",
        description: "Your custom bot has been created.",
      });
      router.push("/chat"); // Redirect to bots page after successful creation
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message === "Insufficient credits" ? "Insufficient Credits" : "Error",
          description: error.message === "Insufficient credits" ? `You need ${CREATE_CHAT_COST} credits to create a custom bot. Please add more credits to your account.` : `Failed to create custom bot: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create Custom Bot</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bot Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bot name" {...field} />
                </FormControl>
                <FormDescription>
                  Choose a unique name for your custom bot.
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
                    placeholder="Describe your bot's purpose and capabilities"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a brief description of what your bot does.
                </FormDescription>
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
                    placeholder="Enter the bot's initial prompt or instructions"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify the initial prompt or instructions for your bot.
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
                  <FormLabel>Make this bot public</FormLabel>
                  <FormDescription>
                    If checked, your bot will be visible to other users.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Bot"}
          </Button>
          <span className="text-gray-400 pl-2">
            🪄 {CREATE_CHAT_COST} credits
          </span>
        </form>
      </Form>
    </div>
  );
}
