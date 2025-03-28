import type { App } from "@packages/server";
import { hc } from "hono/client";

// this is a trick to calculate the type when compiling
// s.t. we get better performance at LSP runtime
const client = hc<App>("");
export type Client = typeof client;

type Fetch = typeof fetch;
export function createClient({ fetch }: { fetch: Fetch }): Client["api"] {
  return hc<App>("/", { fetch }).api;
}
