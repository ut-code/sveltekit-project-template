<script lang="ts">
  import { createClient } from "../client";
  const client = createClient({ fetch });

  let message = $state("No messages yet");
  let count = $state(0);
  let disabled = $state(false);

  async function get() {
    disabled = true;
    const res = await client.hello.$get();
    if (!res.ok) {
      disabled = false;
      throw new Error(
        `bad status ${res.status} with text: \`${await res.text()}\``,
      );
    }
    const json = await res.json();
    message = json.message;
    count = json.count;
    disabled = false;
  }

  async function delete_() {
    disabled = true;
    const res = await client.hello.$delete();
    if (!res.ok) {
      disabled = false;
      throw new Error(
        `bad status ${res.status} with text: \`${await res.text()}\``,
      );
    }
    const json = await res.json();
    message = json.message;
    count = json.count;
    disabled = false;
  }

  async function post() {
    disabled = true;
    const res = await client.hello.$post();
    if (!res.ok) {
      disabled = false;
      throw new Error(
        `bad status ${res.status} with text: \`${await res.text()}\``,
      );
    }
    const json = await res.json();
    message = json.message;
    count = json.count;
    disabled = false;
  }
</script>

<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content flex flex-col">
    <a href="https://svelte.dev/docs/kit" target="_blank">
      <img src="/logos/svelte.svg" alt="svelte" />
    </a>
    <h1 class="mt-5 text-5xl font-bold">Welcome to SvelteKit</h1>
    <main class="mt-20 w-md text-3xl">
      <span class="my-10 block text-center">{count}</span>
      <span class="my-10 block text-center text-xl text-gray-300">
        {message}
      </span>
      <div class="flex justify-between">
        <button class="btn btn-error" onclick={delete_} {disabled}>
          DELETE
        </button>
        <button class="btn btn-primary" onclick={post} {disabled}>
          POST
        </button>
        <button class="btn btn-accent" onclick={get} {disabled}> GET </button>
      </div>
    </main>
  </div>
</div>
