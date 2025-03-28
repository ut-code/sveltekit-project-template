<script lang="ts">
  import Header from "+web/parts/Header.svelte";
  import "../app.css";

  const { children } = $props();
</script>

<Header />
{@render children()}
