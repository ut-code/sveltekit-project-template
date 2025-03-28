import * as v from "valibot";

export type ClientEnv = v.InferOutput<typeof ClientEnv>;
export const ClientEnv = v.object({
  PUBLIC_BASE_URL: v.string(),
});

export const clientEnv = v.parse(ClientEnv, {
  PUBLIC_BASE_URL: import.meta.env.PUBLIC_BASE_URL,
});
