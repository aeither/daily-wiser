"use server";

import * as fal from "@fal-ai/serverless-client";

fal.config({
  credentials: process.env.FAL_KEY as string,
});

export async function generateImage(prompt: string): Promise<string> {
  try {
    const result: any = await fal.subscribe("fal-ai/realistic-vision", {
      input: {
        prompt: prompt,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    return result.images[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image");
  }
}
