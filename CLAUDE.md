# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Coding Rules

- Always define specification before implementing new feature.
- Use Svelte 5 syntax.
  1. Use runes. `$state` instead of plain variables, `$effect` / `$derived` instead of `$:`
  2. use `onclick` attribute instead of `on:click`.
  3. use classes with runes for reusable lifetime controller.
- Refer to <https://svelte.dev/llms.txt> for latest svelte syntax.
- Always run `bun check` before committing.

## Development Commands

- `bun dev` - Start development server on port 3000
- `bun run build` - Build the application for production
- `bun preview` - Preview the built application
- `bun check` - Run type checking and formatting checks
- `bun check:types` - Run TypeScript type checking with svelte-check
- `bun check:format` - Run Biome linting and Prettier format checking
- `bun fix` - Auto-fix formatting issues with Biome and Prettier
- `bun install:production` - Install dependencies for production deployment

## Architecture Overview

This is a SvelteKit fullstack application with the following key characteristics:

### Tech Stack

- **Frontend**: Svelte 5, SvelteKit, TailwindCSS, DaisyUI
- **Backend**: SvelteKit server functions with experimental remote functions
- **Runtime**: Bun
- **Deployment**: Designed for Cloudflare Pages + Functions (uses svelte-adapter-bun)

### Project Structure

- `src/routes/` - SvelteKit routes and pages
- `src/services/` - Business logic organized by feature
- `src/lib/` - Shared utilities and components
  - `src/lib/remote/` - Remote function definitions for server-client communication
  - `src/lib/async/` - Async state management utilities
- `src/ui/components` - Reusable UI components that are not related to any services
- `src/ui/parts/` - Reusable Page Parts

### Key Features

- **Remote Functions**: Uses SvelteKit's experimental remote functions for type-safe server-client communication
- **Service Architecture**: Business logic organized into services with corresponding remote function interfaces

### Development Workflow

- Uses Lefthook for pre-commit hooks (type checking, formatting)
- Biome for linting (formatter disabled, uses Prettier instead)
- Prettier for code formatting
- TypeScript with strict checking via svelte-check

### Deployment Notes

- Configured for Cloudflare deployment
- Build output goes to `target/` directory
- Requires `BUN_VERSION` environment variable for Cloudflare
- Cannot use Node.js `process` API in Cloudflare Workers - use Hono Env helpers instead

## Important Patterns

### Snippet

Use `Snippet` type for children prop.

```svelte
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }
  const { children } = $props();
</script>

{@render children()}
```

### Remote Functions

Server functions in `src/lib/remote/` export Svelte Remote Functions that can be called from the client:

```typescript
// title = filename.remote.ts
export const list = query(async () => {
  return await service.getAll();
});
// queries can optionally have parameters
export const get = query(v.object({ id: v.string() }), async ({ id }) => {
  return await service.get(id);
});
// commands perform side effects
export const create = command(
  v.object({ name: v.string() }),
  async ({ name }) => {
    const data = await service.create(name);

    // refresh query server-side for one-round trip
    // (or use `command().updates(list())` client side for one-round trip)
    await list().refresh();
    return data;
  },
);
```

### Service Organization

Each feature has its own service directory with:

- Server-side logic (`*.server.ts`)
- Components (`components/`)
- Utilities (`lib/`)
