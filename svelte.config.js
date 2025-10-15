// you can choose any adapter.
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

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
    runes: true,
  },
};

export default config;
