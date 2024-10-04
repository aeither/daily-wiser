import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { generateText } from "ai";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export const aiRouter = createTRPCRouter({
  getDailyQuote: publicProcedure.mutation(async () => {
    const today = new Date();
    const dateString = today.toISOString().split("T")[0]; // YYYY-MM-DD format
    const prompt = `Generate an inspiring daily quote for ${dateString}. The quote should be concise, thought-provoking, and suitable for motivation or reflection.`;

    try {
      const result = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        system:
          "You are an AI assistant specialized in generating inspiring and thought-provoking quotes.",
        prompt: prompt,
        temperature: 0.8,
      });

      return {
        quote: result.text.trim(),
        date: today.toISOString(),
      };
    } catch (error) {
      console.error("Error generating daily quote:", error);
      throw new Error("Failed to generate daily quote");
    }
  }),
});

export type AiRouter = typeof aiRouter;
