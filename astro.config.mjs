// @ts-check

import cloudflare from "@astrojs/cloudflare";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Atkinson Hyperlegible Mono",
    cssVariable: "--font-mono"
  }],
});
