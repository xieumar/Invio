export const LOGO_MAX_BYTES = 2 * 1024 * 1024; // 2 MB input limit
// The logo is stored as a data URL inside Firestore documents (and later
// copied onto invoices), so the processed image must stay small. We try these
// sizes, largest first, until the result fits LOGO_MAX_OUTPUT_BYTES.
export const LOGO_DIMENSIONS = [512, 384, 256, 192, 128];
export const LOGO_MAX_OUTPUT_BYTES = 100 * 1024;
export const LOGO_ACCEPT = "image/png,image/jpeg,image/webp";

export type LogoMime = "image/png" | "image/jpeg";

export class LogoError extends Error {}

export interface PreparedLogo {
  blob: Blob;
  mime: LogoMime;
}

/** Sniffs the real format from the file's bytes; `file.type` is user-controlled. */
function sniffFormat(bytes: Uint8Array): "png" | "jpeg" | "webp" | null {
  const startsWith = (sig: number[], offset = 0) =>
    sig.every((b, i) => bytes[offset + i] === b);

  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    return "png";
  if (startsWith([0xff, 0xd8, 0xff])) return "jpeg";
  // "RIFF" .... "WEBP"
  if (
    startsWith([0x52, 0x49, 0x46, 0x46]) &&
    startsWith([0x57, 0x45, 0x42, 0x50], 8)
  )
    return "webp";
  return null;
}

/**
 * Validates and normalises a logo before upload:
 * - PNG / JPEG / WebP only (SVG is rejected: it can carry scripts)
 * - max 2 MB
 * - downscaled to 512px and re-encoded as PNG or JPEG, which strips metadata
 *   and guarantees a format the PDF renderer supports (it has no WebP support).
 */
export async function prepareLogo(file: File): Promise<PreparedLogo> {
  if (file.size === 0) throw new LogoError("That file is empty.");
  if (file.size > LOGO_MAX_BYTES) {
    throw new LogoError("Logo must be 2 MB or smaller.");
  }

  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const format = sniffFormat(header);
  if (!format) {
    throw new LogoError("Logo must be a PNG, JPEG or WebP image.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new LogoError("We couldn't read that image. Try a different file.");
  }

  try {
    // Keep JPEGs as JPEG (no transparency to lose); PNG and WebP become PNG.
    const mime: LogoMime = format === "jpeg" ? "image/jpeg" : "image/png";

    for (const maxDim of LOGO_DIMENSIONS) {
      const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
      const width = Math.max(1, Math.round(bitmap.width * scale));
      const height = Math.max(1, Math.round(bitmap.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new LogoError("Your browser couldn't process the image.");
      ctx.drawImage(bitmap, 0, 0, width, height);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mime, 0.85)
      );
      if (!blob)
        throw new LogoError("Your browser couldn't process the image.");
      if (blob.size <= LOGO_MAX_OUTPUT_BYTES) return { blob, mime };
    }

    throw new LogoError(
      "That image is too detailed to use as a logo. Try a simpler or flatter version."
    );
  } finally {
    bitmap.close();
  }
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Couldn't read the image."));
    reader.readAsDataURL(blob);
  });
}
