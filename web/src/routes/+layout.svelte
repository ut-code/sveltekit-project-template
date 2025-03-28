<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import Header from "+web/parts/Header.svelte";

  const { children } = $props();

  // toast
  import {
    ToastController,
    toastContext,
  } from "+web/lib/toast/controller.svelte";
  import Toast from "+web/lib/toast/provider.svelte";
  const toast = new ToastController();
  toastContext.set(toast);
</script>

<svelte:head>
  <meta property="og:site_name" content="SvelteKit project template" />
  <meta property="og:url" content={page.url.toString()} />
</svelte:head>

<Header />
<Toast {toast} />
{@render children()}
