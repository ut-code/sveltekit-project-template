import * as v from "valibot";

export type Env = v.InferOutput<typeof Env>;
export const Env = v.object({
  DATABASE_URL: v.string(),
  DATABASE_TOKEN: v.optional(v.string()),
  PUBLIC_BASE_URL: v.string(),

  BETTER_AUTH_SECRET: v.string(),
});

export const env = v.parse(Env, process.env);
