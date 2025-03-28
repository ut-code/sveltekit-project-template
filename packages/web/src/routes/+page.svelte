<script lang="ts">
  import { createClient } from "@/client.ts";
  import { useAction } from "@/lib/async/useAction.svelte";
  import ActionButton from "@/lib/modal/ActionButton.svelte";
  import Modal from "@/lib/modal/Modal.svelte";
  import { useToast } from "@/lib/toast/client.ts";
  import PageHead from "@/parts/PageHead.svelte";

  const client = createClient({ fetch });
  const toast = useToast();

  let deleteModalShown = $state(false);
  let message = $state("No messages yet");
  let count = $state(0);

  const get = useAction(async () => {
    const res = await client.hello.$get();
    if (!res.ok) {
      throw new Error(
        `bad status ${res.status} with text: \`${await res.text()}\``,
      );
    }
    const json = await res.json();
    message = json.message;
    count = json.count;
  });

  const delete_ = useAction(async () => {
    const res = await client.hello.$delete();
    if (!res.ok) {
      throw new Error(
        `bad status ${res.status} with text: \`${await res.text()}\``,
      );
    }
    const json = await res.json();
    message = json.message;
    count = json.count;

    toast.push({
      content: message,
      color: "alert-success",
      style: "alert-outline",
    });
  });

  const post = useAction(async () => {
    const res = await client.hello.$post();
    if (!res.ok) {
      throw new Error(
        `bad status ${res.status} with text: \`${await res.text()}\``,
      );
    }
    const json = await res.json();
    message = json.message;
    count = json.count;
  });

  const disabled = $derived(
    get.processing || delete_.processing || post.processing,
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
    <ActionButton class="btn btn-error" onclick={() => delete_.run()}>
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
        <button class="btn btn-primary" onclick={() => post.run()} {disabled}>
          POST
        </button>
        <button class="btn btn-accent" onclick={() => get.run()} {disabled}>
          GET
        </button>
      </div>
    </main>
  </div>
</div>
