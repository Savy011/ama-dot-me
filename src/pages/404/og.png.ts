import type { APIRoute } from "astro";

import { ImageResponse } from "workers-og";

import { CONSTANTS, DefaultTemplate } from "$lib/og";

export const prerender = true;

export const GET: APIRoute = async () => {
  try {
    const response = new ImageResponse(DefaultTemplate("404 - page not found."), {
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
