"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmModalProps {
  invoiceId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ invoiceId, isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent 
        className="w-[90%] max-w-[480px] p-8 sm:p-12 rounded-lg border-none shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <AlertDialogHeader className="text-left mb-4">
          <AlertDialogTitle className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13px] leading-[22px] text-[var(--text-secondary)]">
            Are you sure you want to delete invoice <span className="font-bold">#{invoiceId}</span>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-end gap-3 sm:space-x-0">
          <AlertDialogCancel 
            onClick={onClose}
            className="mt-0 px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-[var(--draft-bg)] text-[var(--text-secondary)] hover:bg-[var(--border)] border-none transition-colors"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-[var(--red)] hover:bg-[var(--red-hover)] text-white border-none transition-colors"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}