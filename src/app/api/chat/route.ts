import { apiServer } from "@/trpc/server";
import { CHAT_COST } from "@/utils/constants";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, user_address, bot_id } = await req.json();

  const { prompt } = await apiServer.user.getPublicBotById({
    id: String(bot_id),
  });

  // Deduct credits
  await apiServer.user.spendCredits({
    address: user_address,
    creditsToSpend: CHAT_COST,
  });
  await apiServer.user.addXp({ address: user_address, xpToAdd: CHAT_COST });

  // Get user
  const user = await apiServer.user.getUser({ address: user_address });
  if (!user) {
    console.error(`User not found for address: ${user_address}`);
    return new Response(
      JSON.stringify({ error: "You need to sign in first." }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!user.totalCredits || Number(user.totalCredits) <= 0) {
    return new Response(
      JSON.stringify({ error: "You have no credits left." }),
      {
        status: 402,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const result = await streamText({
    model: groq("llama-3.1-70b-versatile"),
    system: prompt,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
