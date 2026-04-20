// @ts-check

import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";
import htmx from "astro-htmx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [htmx()],
  adapter: cloudflare(),
});
