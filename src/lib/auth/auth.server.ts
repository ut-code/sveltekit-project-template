import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { env } from "../config/env.server.ts";
import { db } from "../db/db.server.ts";
import * as t from "../db/schema.ts";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: t.users,
      session: t.sessions,
      account: t.accounts,
      verification: t.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },

  appName: "sveltekit-fullstack-template",
  plugins: [sveltekitCookies(getRequestEvent)],
});
