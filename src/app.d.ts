// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { Env } from "hono";
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env: Env;
    }
  }
}
