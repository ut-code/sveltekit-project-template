import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { db } from "../db/db.server.ts";
import * as t from "../db/schema.ts";
import { env } from "../env/env.server.ts";

export const auth = betterAuth({
  appName: "sveltekit-fullstack-template",
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
  emailVerification: {
    sendOnSignUp: true,
    requireVerification: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      console.log("Sending verification email to", user.email);
      console.log("Verification URL:", url);
    },
  },
  user: {
    deleteUser: { enabled: true },
  },

  plugins: [sveltekitCookies(getRequestEvent)],
});
