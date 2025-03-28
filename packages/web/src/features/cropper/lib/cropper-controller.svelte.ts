import type { CropArea } from "svelte-easy-crop";
import { cropImage } from "./crop-image.ts";

export class CropperController {
  source: File | null = $state(null);
  sourceUrl = $derived(this.source ? URL.createObjectURL(this.source) : null);
  cropped: File | null = $state(null);
  croppedUrl = $derived(
    this.cropped ? URL.createObjectURL(this.cropped) : null,
  );
  cropOptions: CropArea | null = $state(null);
  ready = $derived(Boolean(this.sourceUrl && this.cropOptions));

  async crop(): Promise<File> {
    if (!this.sourceUrl || !this.cropOptions) {
      throw new Error(
        "[CropperController] crop is not ready: Crop options or source URL is not set",
      );
    }
    const croppedImage = await cropImage(this.sourceUrl, this.cropOptions);
    this.cropped = croppedImage;
    return croppedImage;
  }
}
