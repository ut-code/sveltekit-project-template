<script lang="ts">
  interface Props {
    message: string;
    type?: "success" | "error" | "info";
  }

  let { message, type = "error" }: Props = $props();

  const alertClass = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
  };
</script>

{#if message}
  <div class="alert {alertClass[type]} mb-4">
    <span>{message}</span>
  </div>
{/if}
