import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import { Hono } from "hono";
import { getDb } from "$lib/db";
import { Question } from "$lib/db/schema";

const app = new Hono<{ Bindings: Env }>().basePath("/api").get("/questions", async c => {
  const db = getDb(env.AMA);

  const questions = await db.select().from(Question).all();
  return c.json({ questions });
});

export const ALL: APIRoute = ctx => app.fetch(ctx.request);
