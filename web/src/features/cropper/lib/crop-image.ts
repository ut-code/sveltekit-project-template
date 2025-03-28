export type CropOptions = {
  width: number;
  height: number;
  x: number;
  y: number;
};
export function cropImage(
  imageUrl: string,
  crop: CropOptions,
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
      canvas.width = crop.width;
      canvas.height = crop.height;
      ctx.drawImage(
        img,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height,
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
