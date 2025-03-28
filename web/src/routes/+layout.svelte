<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import Header from "@/parts/Header.svelte";

  const { children } = $props();

  // toast
  import { ToastController } from "@/lib/toast/controller.svelte.ts";
  import Toast from "@/lib/toast/provider.svelte";
  const toast = new ToastController();
</script>

<svelte:head>
  <meta property="og:site_name" content="SvelteKit project template" />
  <meta property="og:url" content={page.url.toString()} />
</svelte:head>

<Header />
<Toast {toast} />
{@render children()}
