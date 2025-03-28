<script lang="ts">
  import { clientCommand } from "@/lib/async/async-state.svelte.ts";
  import ActionButton from "@/services/modal/ActionButton.svelte";
  import Modal from "@/services/modal/Modal.svelte";
  import { useToast } from "@/services/toast/client.ts";
  import PageHead from "@/ui/parts/PageHead.svelte";
  import * as remote from "$lib/remote/sample.hello.remote.ts";

  const toast = useToast();

  let deleteModalShown = $state(false);
  let message = $state("No messages yet");
  let count = $state(0);

  const get = clientCommand(async () => {
    const res = await remote.get();
    message = res.message;
    count = res.count;
  });

  const hello = clientCommand(async () => {
    const res = await remote.sayHello();
    message = res.message;
    count = res.count;
  });

  const reset = clientCommand(async () => {
    const res = await remote.reset();
    message = res.message;
    count = res.count;

    toast.push({
      content: message,
      color: "alert-success",
      style: "alert-outline",
    });
  });

  const disabled = $derived(
    get.processing || hello.processing || reset.processing,
  );
</script>

<PageHead
  title="Sveltekit Project Template by ut.code();"
  thumbnail="/logos/svelte.png"
  description="a detailed description of this page"
/>

<Modal bind:open={deleteModalShown}>
  <h3 class="font-bold">Are you sure?</h3>
  <p class="py-4">Do you really want to delete messages?</p>

  <div class="modal-action">
    <ActionButton class="btn btn-outline">Cancel</ActionButton>
    <ActionButton class="btn btn-error" onclick={() => reset.run()}>
      Delete
    </ActionButton>
  </div>
</Modal>

<div class="hero">
  <div class="hero-content block">
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img
        src="/logos/svelte.svg"
        alt="svelte"
        width="400"
        class="mx-auto aspect-4/1 w-100 max-w-4/5"
      />
    </a>
    <h1 class="mt-5 text-center text-3xl font-bold sm:text-5xl">
      Welcome to Svelte
    </h1>
    <main class="mt-20 sm:mx-auto sm:w-md">
      <span class="my-10 block text-center text-3xl">{count}</span>
      <span class="my-10 block text-center text-xl font-extralight">
        {message}
      </span>
      <div class="flex flex-col-reverse justify-between gap-2 sm:flex-row">
        <button
          class="btn btn-error"
          onclick={() => {
            deleteModalShown = true;
          }}
          {disabled}
        >
          DELETE
        </button>
        <button class="btn btn-primary" onclick={() => hello.run()} {disabled}>
          POST
        </button>
        <button class="btn btn-accent" onclick={() => get.run()} {disabled}>
          GET
        </button>
      </div>
    </main>
  </div>
</div>
