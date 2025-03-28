<script lang="ts">
  import { useEventListener } from "runed";
  import Cropper, { type OnCropCompleteEvent } from "svelte-easy-crop";
  import ActionButton from "@/lib/modal/ActionButton.svelte";
  import Modal from "@/lib/modal/Modal.svelte";
  import { CropperController } from "../lib/cropper-controller.svelte.ts";

  type Props = {
    onselect: (croppedFile: File) => void;
    aspect?: number;
    cropped?: File | null;
  };
  let { onselect, aspect = 1, cropped = $bindable(null) }: Props = $props();

  let modalOpen = $state(false);
  const ctl = new CropperController();
  let zoom = $state(1);
  let cropXY = $state({ x: 0, y: 0 });

  function onfileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    ctl.source = file;
    modalOpen = true;
  }

  async function cropAction() {
    if (!ctl.ready) return;
    const file = await ctl.crop();
    cropped = file;
    onselect(file);
  }

  useEventListener(
    () => document,
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        modalOpen = false;
        cropAction();
      }
    },
  );
</script>

<div class="flex items-center justify-center">
  <label class="btn btn-primary">
    Select Image
    <input
      type="file"
      accept="image/*"
      onchange={onfileSelect}
      class="hidden"
    />
  </label>
</div>

<Modal bind:open={modalOpen} class="modal">
  <div class="modal-box max-w-4xl p-0">
    <div class="relative h-[60vh] w-full">
      {#if ctl.sourceUrl}
        <Cropper
          image={ctl.sourceUrl}
          bind:crop={cropXY}
          bind:zoom
          {aspect}
          oncropcomplete={(event) => {
            ctl.cropOptions = event.pixels;
          }}
        />
      {/if}
    </div>

    <div class="flex flex-col gap-4 p-4">
      <div class="flex items-center gap-2">
        <span class="text-sm">Zoom:</span>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          bind:value={zoom}
          class="range range-primary range-sm"
        />
      </div>

      <div class="modal-action">
        <ActionButton onclick={() => (modalOpen = false)} class="btn">
          Cancel
        </ActionButton>
        <ActionButton onclick={cropAction} class="btn btn-primary">
          Crop & Save
        </ActionButton>
      </div>
    </div>
  </div>
</Modal>
