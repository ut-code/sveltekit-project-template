<script lang="ts">
  import thumbnail from "@/assets/svelte.png";
  import { page } from "$app/state";

  const title = "SvelteKit project template";
  const description = "SvelteKit project template";
</script>

<svelte:head>
  <title>{title}</title>

  <meta property="og:site_name" content="SvelteKit project template" />
  <meta property="og:url" content={page.url.toString()} />

  <meta property="og:title" content={title} />
  <meta property="og:image" content={thumbnail} />
  <meta property="og:description" content={description} />
</svelte:head>
