import { drizzle as D1 } from "drizzle-orm/d1";

import * as schema from "./schema";

export function getDb(db: D1Database) {
  return D1(db, { schema });
}

export type DrizzleClient = ReturnType<typeof getDb>;
