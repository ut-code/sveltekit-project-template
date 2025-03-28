<script lang="ts">
  const demos = [
    {
      title: "Auth Showcase",
      description:
        "Authentication demo with Better Auth - login, registration, and protected routes",
      href: "/demos/auth",
      icon: "🔐",
    },
    {
      title: "Image Cropper Demo",
      description:
        "Interactive image cropping component with file upload and download",
      href: "/demos/crop",
      icon: "✂️",
    },
    {
      title: "Dashboard Demo",
      description:
        "Protected dashboard page with user authentication and session management",
      href: "/demos/dashboard",
      icon: "📊",
    },
  ];
</script>

<svelte:head>
  <title>Demos - SvelteKit Template</title>
  <meta
    name="description"
    content="Explore various demos showcasing the features of this SvelteKit template"
  />
</svelte:head>

<div class="bg-base-200 min-h-screen">
  <div class="container mx-auto px-4 py-12">
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold">Demo Showcase</h1>
      <p class="text-base-content/70 mx-auto max-w-2xl text-lg">
        Explore the various features and components available in this SvelteKit
        template. Each demo showcases different aspects of the application
        architecture.
      </p>
    </div>

    <div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each demos as demo}
        <a href={demo.href} class="group">
          <div
            class="card bg-base-100 transform shadow-xl transition-shadow transition-transform duration-300 group-hover:-translate-y-1 hover:shadow-2xl"
          >
            <div class="card-body">
              <div class="mb-4 text-center">
                <div class="mb-4 text-5xl">{demo.icon}</div>
                <h2 class="card-title justify-center text-xl">{demo.title}</h2>
              </div>
              <p class="text-base-content/70 mb-4 text-center">
                {demo.description}
              </p>
              <div class="card-actions justify-center">
                <span
                  class="btn btn-primary btn-sm group-hover:btn-accent transition-colors"
                >
                  View Demo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <div class="mt-12 text-center">
      <a href="/" class="btn btn-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </a>
    </div>
  </div>
</div>
