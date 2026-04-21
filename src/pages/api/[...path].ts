import type { APIRoute } from "astro";

import { createHonoApp } from "$lib/api";

export const ALL: APIRoute = ctx => createHonoApp(ctx.locals.cfContext).fetch(ctx.request);
