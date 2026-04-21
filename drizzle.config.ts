import fs from "node:fs";
import path from "node:path";

import { defineConfig } from "drizzle-kit";

function getLocalD1DB() {
  const basePath = path.resolve(".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
  const dbFile = fs
    .readdirSync(basePath, { encoding: "utf-8", recursive: true })
    .find(f => !f.startsWith("metadata") && f.endsWith(".sqlite"));

  if (!dbFile) {
    throw new Error(`.sqlite file not found in ${basePath}`);
  }

  return path.resolve(basePath, dbFile);
}

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: getLocalD1DB(),
  },
});
