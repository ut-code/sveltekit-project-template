<script lang="ts">
  import ImageSelector from "@/features/cropper/components/ImageSelector.svelte";
  import PageHead from "@/parts/PageHead.svelte";

  let croppedImageUrl: string | null = $state(null);
</script>

<PageHead
  title="Image Cropper Demo"
  description="Demo page for the image cropper component"
  thumbnail="/logos/svelte.png"
/>

<div class="container mx-auto p-4">
  <h1 class="mb-8 text-3xl font-bold">Image Cropper Demo</h1>

  <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
    <ImageSelector
      onselect={(image: File) => {
        croppedImageUrl = URL.createObjectURL(image);
      }}
    />
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Cropped Result</h2>
      {#if croppedImageUrl}
        <img
          src={croppedImageUrl}
          alt="Cropped"
          class="max-w-full rounded-lg border"
        />
        <a
          href={croppedImageUrl}
          download="cropped-image.png"
          class="btn btn-secondary block w-full"
        >
          Download Cropped Image
        </a>
      {:else}
        <div class="rounded-lg border p-8 text-center text-gray-500">
          Cropped image will appear here
        </div>
      {/if}
    </div>
  </div>
</div>
