"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { useInvoices } from "@/context/InvoiceContext";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import InvoiceForm from "@/components/InvoiceForm";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { formatCurrency, formatDate } from "@/lib/utils";
import { InvoiceFormData, InvoiceStatus } from "@/lib/types";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { invoices, loading, updateInvoice, deleteInvoice } = useInvoices();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const invoice = invoices.find((inv) => inv.id === params.id);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20 text-text-secondary">
        Loading invoice...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="w-full flex flex-col items-center py-20">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Invoice Not Found
        </h2>
        <Button
          onClick={() => router.push("/")}
          className="bg-purple hover:bg-purple-light rounded-3xl"
        >
          Go Back Home
        </Button>
      </div>
    );
  }

  const handleEditSave = async (
    data: InvoiceFormData,
    status: InvoiceStatus
  ) => {
    if (updateInvoice) {
      await updateInvoice(invoice.id, data, status);
      toast.success(`Invoice #${invoice.id} updated!`);
    }
    setIsEditing(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteInvoice) {
      await deleteInvoice(invoice.id);
      toast.error(`Invoice #${invoice.id} deleted.`);
      router.push("/");
    }
  };

  const handleMarkAsPaid = async () => {
    if (updateInvoice && invoice.status !== "paid") {
      const { id, status, total, ...formData } = invoice;
      await updateInvoice(invoice.id, formData as InvoiceFormData, "paid");
      toast.success(`Invoice #${invoice.id} marked as paid!`);
    }
  };

  return (
    <>
      <div className="w-full animate-in fade-in duration-300">
        <Link
          href="/"
          className="group inline-flex items-center gap-6 text-[15px] font-bold text-text-primary hover:text-text-secondary transition-colors mb-8 no-underline"
        >
          <ChevronLeft
            className="w-4 h-4 text-purple transition-transform group-hover:-translate-x-1"
            strokeWidth={3}
          />
          Go back
        </Link>

        {/* Action Bar */}
        <div className="bg-surface rounded-lg shadow-sm px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
            <span className="text-[13px] text-text-secondary">Status</span>
            <StatusBadge status={invoice.status} />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={() => setIsEditing(true)}
              className="
                px-6 h-[48px] rounded-3xl text-[15px] font-bold 
                bg-[#F9FAFE] dark:bg-[#252945] 
                text-[#7E88C3] dark:text-[#DFE3FA] 
                hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3]
                transition-colors border-none
  "
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-red hover:bg-red-hover text-white transition-colors border-none"
            >
              Delete
            </Button>

            <Button
              onClick={handleMarkAsPaid}
              disabled={invoice.status === "paid"}
              className="px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-purple hover:bg-purple-light text-white transition-colors border-none disabled:opacity-50"
            >
              Mark as Paid
            </Button>
          </div>
        </div>

        {/* Main Details Card */}
        <div className="bg-surface rounded-lg shadow-sm p-6 sm:p-12 flex flex-col gap-10 sm:gap-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
            <div>
              <span className="text-[16px] font-bold text-text-primary mb-2">
                <span className="text-text-secondary">#</span>
                {invoice.id}
              </span>
              <p className="text-[13px] text-text-secondary">
                {invoice.description}
              </p>
            </div>

            <div className="text-[13px] text-text-secondary sm:text-right leading-[18px]">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-0">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[13px] text-text-secondary mb-3">
                  Invoice Date
                </p>
                <p className="text-[15px] font-bold text-text-primary">
                  {formatDate(invoice.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-[13px] text-text-secondary mb-3">
                  Payment Due
                </p>
                <p className="text-[15px] font-bold text-text-primary">
                  {formatDate(invoice.paymentDue)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[13px] text-text-secondary mb-3">Bill To</p>
              <p className="text-[15px] font-bold text-text-primary mb-2">
                {invoice.clientName}
              </p>
              <div className="text-[13px] text-text-secondary leading-[18px]">
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-[13px] text-text-secondary mb-3">Sent to</p>
              <p className="text-[15px] font-bold text-text-primary break-all">
                {invoice.clientEmail}
              </p>
            </div>
          </div>

          {/* Responsive Items Table Area */}
          <div className="rounded-lg overflow-hidden mt-4">
            {/* Table Body */}
            <div className="bg-surface-alt p-6 sm:p-8">
              {/* Desktop Header */}
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 mb-8">
                <span className="text-[13px] text-text-secondary">
                  Item Name
                </span>
                <span className="text-[13px] text-text-secondary text-center w-8">
                  QTY.
                </span>
                <span className="text-[13px] text-text-secondary text-right w-24">
                  Price
                </span>
                <span className="text-[13px] text-text-secondary text-right w-24">
                  Total
                </span>
              </div>

              {/* Item Rows */}
              <div className="flex flex-col gap-6 sm:gap-8">
                {invoice.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-4 items-center"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[15px] font-bold text-text-primary">
                        {item.name}
                      </span>
                      {/* Mobile Qty x Price Sub-text */}
                      <span className="text-[15px] font-bold text-text-secondary sm:hidden">
                        {item.quantity} x {formatCurrency(item.price)}
                      </span>
                    </div>

                    <span className="hidden sm:block text-[15px] font-bold text-text-secondary text-center w-8">
                      {item.quantity}
                    </span>

                    <span className="hidden sm:block text-[15px] font-bold text-text-secondary text-right w-24">
                      {formatCurrency(item.price)}
                    </span>

                    <span className="text-[15px] font-bold text-text-primary text-right w-24">
                      {formatCurrency(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Footer */}
            <div className="bg-[#373b53] dark:bg-[#0c0e16] px-6 py-6 sm:px-8 sm:py-8 flex justify-between items-center text-white">
              <span className="text-[13px]">Amount Due</span>
              <span className="text-2xl sm:text-[32px] font-bold leading-none">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlays */}
      {isEditing && (
        <InvoiceForm
          invoice={invoice}
          onSave={handleEditSave}
          onDiscard={() => setIsEditing(false)}
        />
      )}

      <DeleteConfirmModal
        invoiceId={invoice.id}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
