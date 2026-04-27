// @ts-check

import cloudflare from "@astrojs/cloudflare";
import { defineConfig, fontProviders } from "astro/config";

import alpinejs from "@astrojs/alpinejs";
import { rawFonts } from "./src/vite-plugin-raw-fonts";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:4321",

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

  vite: {
    plugins: [rawFonts([".ttf"])],
    assetsInclude: ["**/*.ttf"]
  }
});
