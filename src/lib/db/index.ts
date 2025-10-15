import { createSelectSchema } from "drizzle-valibot";
import type * as v from "valibot";
import * as t from "./schema.ts";

export { t };
export const User = createSelectSchema(t.users);
export type User = v.InferOutput<typeof User>;
// User の作成と更新は better-auth 経由で行う。
