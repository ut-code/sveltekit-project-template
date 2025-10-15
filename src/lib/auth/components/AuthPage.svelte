<script lang="ts">
  import { SigninController } from "@/services/auth/signin-controller.svelte";
  import { page } from "$app/state";
  import { authClient, useSession } from "$lib/auth/auth-client.ts";

  const controller = new SigninController();

  const session = useSession();
  const status = $derived.by(() => {
    if ($session.isPending) {
      return "loading";
    } else if ($session.data?.user) {
      return "logged-in";
    } else {
      return "logged-out";
    }
  });

  async function handleLogout() {
    await authClient.signOut();
  }
  async function sendVerificationEmail() {
    await authClient.sendVerificationEmail({
      email: $session.data?.user.email as string,
      callbackURL: page.url.pathname,
    });
  }
  async function deleteUser() {
    await authClient.deleteUser({
      callbackURL: page.url.pathname,
    });
  }
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center p-4">
  <div class="w-full max-w-md">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold">Auth Showcase</h1>
      <p class="text-base-content/60 mt-2">
        Simple authentication with Better Auth
      </p>
    </div>

    {#if status === "loading"}
      <div class="mb-6 text-center">
        <span class="loading loading-spinner loading-md"></span>
        <p class="mt-2 text-sm">Checking login status...</p>
      </div>
    {:else if status === "logged-in"}
      {@render SignedIn()}
    {:else if status === "logged-out"}
      {@render SigninCard()}
    {/if}
  </div>
</div>

{#snippet SignedIn()}
  <div class="mb-6">
    <!-- status -->
    <div class="alert alert-success">
      <h3 class="font-bold">Welcome back, {$session.data?.user.name}!</h3>
    </div>

    <!-- details -->
    <div class="flex flex-col gap-4">
      <div>
        Logged in as: {$session.data?.user.name} ({$session.data?.user.email})
      </div>
      <div>
        Email Verified: {$session.data?.user.emailVerified ? "Yes" : "No"}
      </div>
    </div>
    <!-- actions -->
    <div class="flex flex-row gap-4">
      <button class="btn btn-primary mt-4" onclick={sendVerificationEmail}>
        Send Verification Email
      </button>
      <button class="btn btn-error mt-4" onclick={handleLogout}>
        Sign Out
      </button>
      <button class="btn btn-error mt-4" onclick={deleteUser}>
        Delete User
      </button>
    </div>
  </div>
{/snippet}

{#snippet SigninCard()}
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <!-- Current Login Status -->
      <span class="text-base-content/60 mb-4 text-center text-sm">
        You are not logged in.
      </span>
      <!-- Auth Forms -->
      <div class="tabs tabs-boxed mb-4">
        <button
          class="tab {controller.mode === 'login' ? 'tab-active' : ''}"
          onclick={() => (controller.mode = "login")}
        >
          Login
        </button>
        <button
          class="tab {controller.mode === 'register' ? 'tab-active' : ''}"
          onclick={() => (controller.mode = "register")}
        >
          Register
        </button>
      </div>

      {#if controller.feedback}
        <div
          class="alert {controller.feedback.type === 'success'
            ? 'alert-success'
            : 'alert-error'} mb-4"
        >
          {controller.feedback.message}
        </div>
      {/if}

      {#if controller.mode === "login"}
        {@render LoginForm()}
      {:else if controller.mode === "register"}
        {@render RegisterForm()}
      {/if}

      <div class="mt-6 text-center">
        <a href="/" class="link link-primary">Back to Home</a>
      </div>
    </div>
  </div>
{/snippet}

{#snippet LoginForm()}
  <form
    onsubmit={(e) => {
      e.preventDefault();
      controller.handleLogin();
    }}
  >
    <div class="form-control mb-4">
      <label class="label" for="login-email">
        <span class="label-text">Email</span>
      </label>
      <input
        id="login-email"
        type="email"
        placeholder="Enter your email"
        class="input input-bordered w-full"
        bind:value={controller.loginForm.email}
        required
      />
    </div>

    <div class="form-control mb-6">
      <label class="label" for="login-password">
        <span class="label-text">Password</span>
      </label>
      <input
        id="login-password"
        type="password"
        placeholder="Enter your password"
        class="input input-bordered w-full"
        bind:value={controller.loginForm.password}
        required
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary w-full"
      class:loading={controller.processing}
      disabled={controller.processing}
    >
      {#if controller.processing}
        Signing in...
      {:else}
        Sign In
      {/if}
    </button>
  </form>
{/snippet}

{#snippet RegisterForm()}
  <form
    onsubmit={(e) => {
      e.preventDefault();
      controller.handleRegister();
    }}
  >
    <div class="form-control mb-4">
      <label class="label" for="register-name">
        <span class="label-text">Name</span>
      </label>
      <input
        id="register-name"
        type="text"
        placeholder="Enter your name"
        class="input input-bordered w-full"
        bind:value={controller.registerForm.name}
        required
      />
    </div>

    <div class="form-control mb-4">
      <label class="label" for="register-email">
        <span class="label-text">Email</span>
      </label>
      <input
        id="register-email"
        type="email"
        placeholder="Enter your email"
        class="input input-bordered w-full"
        bind:value={controller.registerForm.email}
        required
      />
    </div>

    <div class="form-control mb-4">
      <label class="label" for="register-password">
        <span class="label-text">Password</span>
      </label>
      <input
        id="register-password"
        type="password"
        placeholder="Enter your password"
        class="input input-bordered w-full"
        bind:value={controller.registerForm.password}
        required
      />
    </div>

    <div class="form-control mb-6">
      <label class="label" for="register-confirm-password">
        <span class="label-text">Confirm Password</span>
      </label>
      <input
        id="register-confirm-password"
        type="password"
        placeholder="Confirm your password"
        class="input input-bordered w-full"
        bind:value={controller.registerForm.confirmPassword}
        required
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary w-full"
      class:loading={controller.processing}
      disabled={controller.processing}
    >
      {#if controller.processing}
        Registering...
      {:else}
        Register
      {/if}
    </button>
  </form>
{/snippet}
