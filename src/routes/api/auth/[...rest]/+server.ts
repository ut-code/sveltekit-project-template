import type { RequestHandler } from "@sveltejs/kit";
import { auth } from "@/lib/auth/auth.server";

export const fallback: RequestHandler = async ({ request }) => {
  return await auth.handler(request);
};
