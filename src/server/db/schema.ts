import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").unique().primaryKey(),
  lastActive: timestamp("last_active", { withTimezone: true }),
  totalCredits: integer("total_credits").default(0),
  xp: integer("xp").default(0),
});

export const creditPurchases = pgTable("credit_purchases", {
  id: text("id").unique().primaryKey(),
  userAddress: text("user_address").notNull(),
  ethPaid: text("eth_paid").notNull(),
  creditsReceived: integer("credits_received").notNull(),
  purchasedAt: timestamp("purchased_at", { withTimezone: true }).defaultNow(),
});

export const customBots = pgTable("custom_bots", {
  id: uuid("id").defaultRandom().primaryKey(),
  creatorAddress: text("creator_address").notNull(),
  nftAddress: text("nft_address").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  prompt: text("prompt").notNull(),
  imageUrl: text("image_url"),
  likes: integer("likes").default(0),
  tags: text("tags").array(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const nftMetadata = pgTable("nft_metadata", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
});

// // Define relationships
// export const web3UsersRelations = relations(web3Users, ({ many }) => ({
//   creditPurchases: many(creditPurchases),
//   customBots: many(customBots),
// }))

// export const creditPurchasesRelations = relations(
//   creditPurchases,
//   ({ one }) => ({
//     user: one(web3Users, {
//       fields: [creditPurchases.userId],
//       references: [web3Users.id],
//     }),
//   })
// )

// export const customBotsRelations = relations(customBots, ({ one }) => ({
//   creator: one(web3Users, {
//     fields: [customBots.creatorId],
//     references: [web3Users.id],
//   }),
// }))
