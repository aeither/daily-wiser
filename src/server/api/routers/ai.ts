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
    const prompt = `Generate an inspiring and actionable daily quote for ${dateString}. The quote should:

1. Be concise (20-30 words max) and easy to remember
2. Focus on themes of personal growth, discipline, continuous learning, or habit formation
3. Provide a specific, actionable insight or challenge
4. Relate to the concept of daily improvement or 'getting 1% better every day'
5. Be suitable for a diverse, global audience
6. Avoid clichés and overly common phrases
7. Optionally, tie into the idea of leveling up or gaining experience in real life

The quote should motivate users to engage in daily learning, reinforce the value of consistent self-improvement, and inspire application of knowledge to personal or professional life.

Return only the quote itself, without any additional explanation or context.`;

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
