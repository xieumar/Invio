"use client";

import React, { useRef } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LOGO_ACCEPT, LogoError } from "@/lib/image/prepareLogo";
import { useRemoveLogo, useUploadLogo } from "./useBusinessProfile";

interface LogoUploaderProps {
  logoUrl?: string | null;
  businessName?: string;
}

function uploadErrorMessage(err: unknown): string {
  if (err instanceof LogoError) return err.message;
  return err instanceof Error
    ? `Couldn't upload logo: ${err.message}`
    : "Couldn't upload logo. Please try again.";
}

export function LogoUploader({ logoUrl, businessName }: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadLogo();
  const remove = useRemoveLogo();
  const busy = upload.isPending || remove.isPending;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset so picking the same file again still fires onChange
    e.target.value = "";
    if (!file) return;

    try {
      await upload.mutateAsync(file);
      toast.success(logoUrl ? "Logo replaced" : "Logo uploaded");
    } catch (err) {
      console.error("Logo upload failed:", err);
      toast.error(uploadErrorMessage(err));
    }
  }

  async function handleRemove() {
    try {
      await remove.mutateAsync();
      toast.success("Logo removed");
    } catch (err) {
      console.error("Logo removal failed:", err);
      toast.error(
        err instanceof Error
          ? `Couldn't remove logo: ${err.message}`
          : "Couldn't remove logo. Please try again."
      );
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-text-primary tracking-tight">
          Logo
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Shown at the top of your invoices. PNG, JPEG or WebP, up to 2 MB (it’s
          shrunk automatically). Changes here save immediately.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-28 h-28 shrink-0 rounded-2xl border border-dashed border-border bg-surface-alt dark:bg-[#252945] flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote Storage URL or data URL
            <img
              src={logoUrl}
              alt={businessName ? `${businessName} logo` : "Business logo"}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <ImagePlus className="w-7 h-7 text-text-muted" aria-hidden="true" />
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            ref={inputRef}
            type="file"
            accept={LOGO_ACCEPT}
            onChange={handleFile}
            className="sr-only"
            aria-label="Choose logo file"
            tabIndex={-1}
          />
          <Button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="h-11 px-5 rounded-xl bg-purple hover:bg-purple-light text-white font-bold text-xs flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {upload.isPending
              ? "Uploading..."
              : logoUrl
                ? "Replace logo"
                : "Upload logo"}
          </Button>
          {logoUrl && (
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={handleRemove}
              className="h-11 px-5 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {remove.isPending ? "Removing..." : "Remove"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
