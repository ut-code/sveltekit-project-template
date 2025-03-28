import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
// you can choose any adapter.
import adapter from "svelte-adapter-bun";

/** @type import("@sveltejs/kit").Config */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      out: "target",
    }),
    alias: {
      "@/*": "./src/*",
    },
    experimental: {
      remoteFunctions: true,
    },
  },
  compilerOptions: {
    experimental: {
      async: true,
    },
  },
};

export default config;
