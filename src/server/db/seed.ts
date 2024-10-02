import { sql } from "drizzle-orm";
import { db } from "./drizzle";
import { customBots, users } from "./schema";

// Function to generate a random Ethereum address
function randomEthAddress(): string {
  return `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
}

// Seed function
async function seed() {
  console.log("Seeding database...");

  // Seed users
  const dummyUsers = [
    {
      id: randomEthAddress(),
      lastActive: new Date(),
      totalCredits: 100,
    },
    { id: randomEthAddress(), lastActive: new Date(), totalCredits: 50 },
    { id: randomEthAddress(), lastActive: new Date(), totalCredits: 75 },
  ];

  for (const user of dummyUsers) {
    await db.insert(users).values(user);
    console.log(`Inserted user: ${user.id}`);
  }

  const publicBots = [
    {
      creatorAddress: "0xdce5b94823cca00d7aaba63ad37c49e4719a95c",
      nftAddress: "0xdce5b94823cca00d7aaba63ad37c49e4719a95c",
      name: "Chatty Charlotte",
      description: "Your go-to friend for casual conversations!",
      prompt:
        "You are Chassistant, an AI friend who loves engaging in casual, friendly conversations. Be supportive, humorous, and always ready with a fun fact or joke.",
      imageUrl: "https://fal.media/files/penguin/NH_RP_8xHSePy2rjaIO-4.jpeg",
      likes: 0,
      isPublic: true,
      tags: [],
    },
    {
      creatorAddress: "0x45ff67b29b829424588c4e8c36cd061c4b582182",
      nftAddress: "0x45ff67b29b829424588c4e8c36cd061c4b582182",
      name: "Mora",
      description: "cute, best friend forever",
      prompt:
        "cute, best friend forever. very proactive and can talk about anything",
      imageUrl: "https://fal.media/files/lion/jBya5IuoVEc7SEH9MBPuW.jpeg",
      likes: 0,
      isPublic: true,
      tags: ["anime", "cute", "fantasy"],
    },
    {
      creatorAddress: "0x72f4ccbf5e1658b9196b707a42509ba4b38b82fb",
      nftAddress: "0x72f4ccbf5e1658b9196b707a42509ba4b38b82fb",
      name: "Jason",
      description: "Jason is a mafia boss, and you work as his assistant.",
      prompt: "you are Jason, a mafia boss, the user work as your assistant.",
      imageUrl: "https://fal.media/files/penguin/mFagsyNI6UVSchBUHhiTn.jpeg",
      likes: 0,
      isPublic: true,
      tags: ["sci_fi"],
    },
  ];
  for (const bot of publicBots) {
    await db.insert(customBots).values(bot);
    console.log(`Inserted public bot: ${bot.name}`);
  }

  console.log("Seeding completed.");
}

// Run the seed function
seed()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.execute(sql`SELECT pg_terminate_backend(pg_stat_activity.pid)
    FROM pg_stat_activity
    WHERE pg_stat_activity.datname = 'YOUR_DATABASE_NAME'
      AND pid <> pg_backend_pid();`);
    process.exit(0);
  });
