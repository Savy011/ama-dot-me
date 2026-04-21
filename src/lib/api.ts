import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { nanoid } from "nanoid";

import { getDb } from "$lib/db";
import { Question } from "$lib/db/schema";
import { validateToken } from "$lib/utils";

export function createHonoApp(cfContext: ExecutionContext) {
  return new Hono<{ Bindings: Env }>()
    .basePath("/api")
    .post("/ask", async c => {
      const turnstileError = () => {
        c.status(401);
        return c.html("<p>we can't verify if ur a bot or not! :(</p>");
      };

      const body = await c.req.parseBody();

      const token = body.token;
      const rawQuestion = body.question;
      if (typeof token !== "string" || !token) return turnstileError();
      if (typeof rawQuestion !== "string" || !rawQuestion.trim()) {
        c.status(400);
        return c.html("<p>you forgot to type a question</p>");
      }

      const question = rawQuestion.trim();

      const success = await validateToken(token);

      if (!success) return turnstileError();

      const db = getDb(env.D1);

      const id = nanoid();

      await db.insert(Question).values({
        id,
        body: question,
        askedAt: new Date(),
      });

      const subject = `[ask-${id}] Someone asked you a question!`;

      cfContext.waitUntil(
        env.EMAIL.send({
          to: env.OWNER_EMAIL,
          from: env.FROM_EMAIL,
          subject,
          text: question,
        }),
      );

      c.status(201);
      return c.html(
        `<div><p>Thank you for submitting a question! I will reply to it as soon as I can!</p></div>`,
      );
    })
    .get("/questions", async c => {
      const db = getDb(env.D1);

      const questions = await db
        .select()
        .from(Question)
        .where(eq(Question.published, true))
        .orderBy(Question.askedAt)
        .all();

      return c.json(questions);
    })
    .get("/questions/:id", async c => {
      const db = getDb(env.D1);

      const questionId = c.req.param("id");

      const [question] = await db
        .select()
        .from(Question)
        .where(and(eq(Question.id, questionId), eq(Question.published, true)))
        .limit(1);

      if (!question) c.notFound();

      return c.json(question);
    });
}

export type App = ReturnType<typeof createHonoApp>;
