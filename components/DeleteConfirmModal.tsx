"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface CustomDeleteModalProps {
  invoiceId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  invoiceId,
  isOpen,
  onClose,
  onConfirm,
}: CustomDeleteModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="
          relative z-10 bg-surface p-8 sm:p-12 rounded-lg shadow-card
          /* The exact widths you requested */
          w-full max-w-81.75 sm:max-w-120
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Confirm Deletion
        </h2>

        <p className="text-[13px] leading-5.5 text-text-secondary mb-8">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="
      px-6 h-12 rounded-full text-[15px] font-bold 
      flex items-center justify-center 
      pt-1 
      bg-draft-bg text-text-secondary hover:bg-border border-none shadow-none
    "
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="
      px-6 h-12 rounded-full text-[15px] font-bold 
      flex items-center justify-center 
      pt-1 
      bg-red hover:bg-red-hover text-white border-none shadow-none
    "
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
