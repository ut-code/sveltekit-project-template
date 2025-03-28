<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  type ButtonClickEvent = MouseEvent & {
    currentTarget: EventTarget & HTMLButtonElement;
  };

  type Props = {
    onclick?: (e: ButtonClickEvent) => void;
    children: Snippet;
    "keep-open"?: boolean;
    class?: ClassValue;
    style?: string;
  } & Record<string, unknown>;
  const { "keep-open": keepOpen = false, ...props }: Props = $props();
</script>

{#if keepOpen}
  <Button />
{:else}
  <form method="dialog">
    <Button />
  </form>
{/if}

{#snippet Button()}
  <button type={keepOpen ? "button" : "submit"} {...props}>
    {@render props.children()}
  </button>
{/snippet}
