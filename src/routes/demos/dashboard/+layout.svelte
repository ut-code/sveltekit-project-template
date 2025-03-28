<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }
  const { children } = $props();
</script>

<svelte:boundary>
  {@render children()}
  {#snippet pending()}
    <span class="loading loading-bars" aria-label="Loading"></span>
  {/snippet}
</svelte:boundary>
