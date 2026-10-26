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

export function DeleteConfirmModal({
  invoiceId,
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent
        className="
          bg-surface text-text-primary border-none shadow-card
          rounded-xl w-full max-w-[327px] sm:max-w-[480px] p-8 sm:p-12
        "
      >
        <AlertDialogHeader className="place-items-start text-left gap-3 mb-2">
          <AlertDialogTitle className="text-2xl font-bold text-text-primary">
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13px] leading-5.5 text-text-secondary">
            Are you sure you want to delete invoice{" "}
            <span className="font-bold text-text-primary">#{invoiceId}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row justify-end gap-2 bg-transparent border-none m-0 p-0 rounded-none">
          <AlertDialogCancel
            onClick={onClose}
            className="
              px-6 h-12 rounded-full text-[15px] font-bold pt-1
              bg-surface-alt text-text-muted dark:text-text-secondary
              hover:bg-border border-none shadow-none cursor-pointer
              focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2
            "
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="
              px-6 h-12 rounded-full text-[15px] font-bold pt-1
              bg-red dark:bg-red hover:bg-red-hover dark:hover:bg-red-hover
              text-white border-none shadow-none cursor-pointer
              focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2
            "
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteConfirmModal;
