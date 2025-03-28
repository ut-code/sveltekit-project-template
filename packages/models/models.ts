import * as v from "valibot";

// sample model
export type User = v.InferOutput<typeof User>;
export const User = v.object({
  id: v.number(),
  name: v.string(),
  age: v.number(),
});
