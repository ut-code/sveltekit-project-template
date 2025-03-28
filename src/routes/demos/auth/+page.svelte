<script lang="ts">
  import type { User } from "better-auth";
  import { SigninController } from "@/services/auth/signin-controller.svelte";
  import { authClient, useSession } from "$lib/auth/auth-client.ts";

  const controller = new SigninController();

  const session = useSession();

  async function handleLogout() {
    await authClient.signOut();
  }
</script>

<svelte:head>
  <title>Auth Showcase - SvelteKit Template</title>
</svelte:head>

<div class="bg-base-200 flex min-h-screen items-center justify-center p-4">
  <div class="w-full max-w-md">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold">Auth Showcase</h1>
      <p class="text-base-content/60 mt-2">
        Simple authentication with Better Auth
      </p>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <!-- Current Login Status -->
        {#if $session.isPending}
          <div class="mb-6 text-center">
            <span class="loading loading-spinner loading-md"></span>
            <p class="mt-2 text-sm">Checking login status...</p>
          </div>
        {:else if $session.data?.user}
          <div class="mb-6">
            <div class="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 class="font-bold">Welcome back!</h3>
                <div class="text-xs">
                  Logged in as: {$session.data?.user.name} ({$session.data?.user
                    .email})
                </div>
              </div>
            </div>
            <div class="flex flex-row justify-end gap-4">
              <a href="/demos/dashboard" class="btn btn-primary mt-4">
                Go to Dashboard
              </a>
              <button
                class="btn btn-outline btn-error mt-4"
                onclick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        {:else}
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
          {:else}
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
          {/if}
        {/if}

        <div class="mt-6 text-center">
          <a href="/" class="link link-primary">Back to Home</a>
        </div>
      </div>
    </div>
  </div>
</div>
