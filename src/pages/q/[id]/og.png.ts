import type { APIRoute } from "astro";

import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";
import { ImageResponse } from "workers-og";

import { getDb } from "$lib/db";
import { Question } from "$lib/db/schema";
import { CONSTANTS, QuestionTemplate } from "$lib/og";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) return new Response("not found", { status: 404 });

  try {
    const db = getDb(env.D1);
    const [question] = await db
      .select({ body: Question.body })
      .from(Question)
      .where(and(eq(Question.id, id), eq(Question.published, true)))
      .limit(1);

    if (!question) return new Response("not found", { status: 404 });

    const response = new ImageResponse(QuestionTemplate(question.body), {
      width: CONSTANTS.OG_WIDTH,
      height: CONSTANTS.OG_HEIGHT,
      fonts: CONSTANTS.FONTS,
    });

    const png = await response.arrayBuffer();
    if (png.byteLength === 0) return new Response("generation failed", { status: 500 });

    return new Response(png, {
      status: 200,
      headers: CONSTANTS.CACHE_HEADERS,
    });
  } catch (err) {
    console.error("[og] generation failed:", err);
    return new Response("generation failed", { status: 500 });
  }
};
