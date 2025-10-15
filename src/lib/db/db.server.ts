import { drizzle } from "drizzle-orm/libsql/driver";
import { env } from "../env/env.server.ts";
import * as schema from "./schema.ts";

export const db = drizzle(env.DATABASE_URL, {
  schema,
});
