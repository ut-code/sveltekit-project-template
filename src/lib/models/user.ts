import { createSelectSchema } from "drizzle-valibot";
import type * as v from "valibot";
import * as t from "$lib/db/schema.ts";

export type User = v.InferOutput<typeof User>;
export const User = createSelectSchema(t.users);
