"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmModalProps {
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
}: DeleteConfirmModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="w-[90%] w-[480px] p-8 sm:p-12 rounded-2xl border-none shadow-card bg-surface">
        <AlertDialogHeader className="space-y-4 text-left">
          <AlertDialogTitle className="text-2xl font-bold text-text-primary">
            Confirm Deletion
          </AlertDialogTitle>

          <AlertDialogDescription className="text-[13px] leading-[22px] text-text-secondary">
            Are you sure you want to delete invoice{" "}
            <span className="font-bold text-text-primary">#{invoiceId}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-8  rounded-xl p-4 flex justify-end gap-3">
          <AlertDialogCancel
            onClick={onClose}
            className="px-6 h-[48px] rounded-full text-[15px] font-bold bg-surface text-text-secondary hover:bg-border border-none shadow-none"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="px-6 h-[48px] justify-center rounded-2xl text-[15px] font-bold bg-red hover:bg-red-hover text-white border-none shadow-none"
          >
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
