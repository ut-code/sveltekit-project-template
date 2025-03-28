import type { CropArea } from "svelte-easy-crop";

export function cropImage(
  imageUrl: string,
  area: CropArea,
  filename?: string,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Failed to get context"));
      return;
    }
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = area.width;
      canvas.height = area.height;
      ctx.drawImage(
        img,
        area.x,
        area.y,
        area.width,
        area.height,
        0,
        0,
        area.width,
        area.height,
      );
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to get blob"));
          return;
        }
        resolve(
          new File([blob], filename ?? "cropped.png", { type: "image/png" }),
        );
      });
    };
  });
}
