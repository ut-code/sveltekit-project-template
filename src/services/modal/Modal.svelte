<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    open: boolean;
    onclose?: () => void;
    children: Snippet;
    closeOnBackdropClick?: boolean;
    class?: string;
  };
  let {
    open = $bindable(false),
    onclose,
    children,
    class: className,
    closeOnBackdropClick = true,
  }: Props = $props();
  let el = $state<HTMLDialogElement>();

  $effect(() => {
    if (!el) return;
    if (open) {
      if (el.open) return; // already open
      el.showModal();
    } else {
      if (!el.open) return; // already closed
      el.close();
    }
  });
</script>

<dialog
  bind:this={el}
  class={["modal", className]}
  onclose={() => {
    open = false;
    onclose?.();
  }}
>
  <div class="modal-box">
    {@render children()}
  </div>
  {#if closeOnBackdropClick}
    <form method="dialog" class="modal-backdrop">
      <button type="submit">Close</button>
    </form>
  {/if}
</dialog>
