import type { Plugin } from "vite";

import fs from "node:fs";

export function rawFonts(exts: string[]): Plugin {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_code, id) {
      if (exts.some(ext => id.endsWith(ext))) {
        const buffer = fs.readFileSync(id);

        return {
          code: `export default new Uint8Array([${buffer.join(",")}]).buffer`,
          map: null,
        };
      }
    },
  };
}
