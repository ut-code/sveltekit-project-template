<script lang="ts">
  import { onMount } from "svelte";
  import { getSession, signOut, useSession } from "@/lib/auth/auth-client";
  import { goto } from "$app/navigation";

  const sessionStore = useSession();

  onMount(async () => {
    const session = await getSession();
    if (!session.data?.user) {
      goto("/demos/auth");
    }
  });

  async function handleSignOut() {
    try {
      await signOut();
      goto("/demos/auth");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  const session = $derived($sessionStore);
  const user = $derived(session.data?.user);
</script>

<svelte:head>
  <title>Dashboard - Protected Route</title>
</svelte:head>

{#if session.isPending}
  <div class="bg-base-200 flex min-h-screen items-center justify-center">
    <div class="text-center">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-4">Loading...</p>
    </div>
  </div>
{:else if user}
  <div class="bg-base-200 min-h-screen">
    <div class="container mx-auto p-6">
      <div class="hero bg-base-100 rounded-box mb-8 shadow-xl">
        <div class="hero-content">
          <div
            class="flex w-full max-w-4xl flex-col items-center gap-6 lg:flex-row"
          >
            <div class="flex flex-col items-center gap-4">
              <div class="avatar">
                <div
                  class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2"
                >
                  {#if user.image}
                    <img src={user.image} alt="Profile" />
                  {:else}
                    <div
                      class="bg-neutral text-neutral-content flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold"
                    >
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  {/if}
                </div>
              </div>
              <div class="dropdown dropdown-bottom">
                <button class="btn btn-primary btn-sm">Profile Actions</button>
                <ul
                  class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-1 w-52 p-2 shadow"
                >
                  <li><button>Edit Profile</button></li>
                  <li><button>Settings</button></li>
                  <li><button onclick={handleSignOut}>Sign Out</button></li>
                </ul>
              </div>
            </div>
            <div class="flex-1 text-center lg:text-left">
              <h1 class="text-5xl font-bold">Welcome!</h1>
              <p class="py-4 text-lg">
                Hello <span class="text-primary font-semibold">{user.name}</span
                >! This is your protected dashboard.
              </p>
              <div class="stats stats-vertical lg:stats-horizontal shadow">
                <div class="stat">
                  <div class="stat-title">User ID</div>
                  <div class="stat-value text-sm">{user.id}</div>
                </div>
                <div class="stat">
                  <div class="stat-title">Email</div>
                  <div class="stat-value text-sm">{user.email}</div>
                </div>
                <div class="stat">
                  <div class="stat-title">Member Since</div>
                  <div class="stat-value text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-title">Email Verified</div>
                  <div class="stat-value text-sm">
                    {user.emailVerified
                      ? "[✅️] Verified"
                      : "[❌️] Not Verified"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center gap-4">
        <a href="/" class="btn btn-outline">Back to Home</a>
        <a href="/demos/auth" class="btn btn-outline">Auth Showcase</a>
        <button onclick={handleSignOut} class="btn btn-primary">Sign Out</button
        >
      </div>
    </div>
  </div>
{:else}
  <div class="bg-base-200 flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="mb-4 text-2xl font-bold">Access Denied</h1>
      <p class="mb-6">You need to be logged in to access this page.</p>
      <a href="/demos/auth" class="btn btn-primary">Go to Login</a>
    </div>
  </div>
{/if}
