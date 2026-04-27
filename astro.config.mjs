// @ts-check

import cloudflare from "@astrojs/cloudflare";
import { defineConfig, fontProviders } from "astro/config";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Atkinson Hyperlegible Mono",
      cssVariable: "--font-mono"
    },
    {
      provider: fontProviders.fontsource(),
      name: "Faustina",
      cssVariable: "--font-serif"
    },
    {
      provider: fontProviders.fontsource(),
      name: "Englebert",
      cssVariable: "--font-script"
    },
  ],

  integrations: [alpinejs()],
});