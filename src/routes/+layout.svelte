<script lang="ts">
  import "../app.css";
  import Header from "@/lib/ui/Header.svelte";

  const { children } = $props();

  import Head from "@/lib/meta/Head.svelte";
</script>

<Head />
<Header />

{@render children()}
