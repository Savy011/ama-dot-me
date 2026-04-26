import { index, integer, sqliteTable as table, text } from "drizzle-orm/sqlite-core";

export const Question = table(
  "question",
  {
    id: text().primaryKey(),
    body: text().notNull(),
    answer: text(),
    askedAt: integer({ mode: "timestamp" }).notNull(),
    answeredAt: integer({ mode: "timestamp" }),
    published: integer({ mode: "boolean" }).notNull().default(false),
  },
  table => [index("published_idx").on(table.published)],
);

export type QuestionRow = typeof Question.$inferSelect;
