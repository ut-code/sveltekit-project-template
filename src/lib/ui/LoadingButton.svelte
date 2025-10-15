<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline";
    isLoading?: boolean;
    disabled?: boolean;
    children: Snippet;
    onclick?: () => void;
  }

  const {
    type = "button",
    variant = "primary",
    isLoading = false,
    disabled = false,
    children,
    onclick,
  }: Props = $props();

  const variantClass = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
  };
</script>

<button
  {type}
  class="btn {variantClass[variant]} w-full"
  disabled={isLoading || disabled}
  {onclick}
>
  {#if isLoading}
    <span class="loading loading-spinner loading-sm"></span>
  {/if}
  {@render children()}
</button>
