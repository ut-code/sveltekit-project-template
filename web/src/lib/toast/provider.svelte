<script lang="ts">
  import { fade } from "svelte/transition";
  import { ToastController } from "./controller.svelte.ts";
  type Props = {
    toast: ToastController;
  };
  const { toast }: Props = $props();
</script>

<div class="toast toast-top">
  {#each toast.items as t (t.id)}
    <li class={["alert backdrop-blur-lg", t.color, t.style]} out:fade>
      {t.content}
    </li>
  {/each}
</div>
