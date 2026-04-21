"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner"; // <-- Imported Toasts

import { useInvoices } from "@/context/InvoiceContext";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import InvoiceForm from "@/components/InvoiceForm";
import DeleteConfirmModal from "@/components/DeleteConfirmModal"; // <-- Imported Modal
import { formatCurrency, formatDate } from "@/lib/utils";
import { InvoiceFormData, InvoiceStatus } from "@/lib/types";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();

  // 1. Pulled deleteInvoice from your context
  const { invoices, loading, updateInvoice, deleteInvoice } = useInvoices();
  
  const [isEditing, setIsEditing] = useState(false);
  // 2. Added state to control the modal
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); 

  const invoice = invoices.find((inv) => inv.id === params.id);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20 text-[var(--text-secondary)]">
        Loading invoice...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="w-full flex flex-col items-center py-20">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
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

  // --- HANDLERS ---

  const handleEditSave = async (data: InvoiceFormData, status: InvoiceStatus) => {
    if (updateInvoice) {
      await updateInvoice(invoice.id, data, status);
      toast.success(`Invoice #${invoice.id} updated!`); // Toast success
    }
    setIsEditing(false); 
  };

  // 3. Created the Delete Execution Handler
  const handleDeleteConfirm = async () => {
    if (deleteInvoice) {
      await deleteInvoice(invoice.id);
      toast.error(`Invoice #${invoice.id} deleted.`); // Toast deleted
      router.push("/"); // Boot them back to the homepage
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
          className="group inline-flex items-center gap-6 text-[15px] font-bold text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors mb-8 no-underline"
        >
          <ChevronLeft
            className="w-4 h-4 text-purple transition-transform group-hover:-translate-x-1"
            strokeWidth={3}
          />
          Go back
        </Link>

        {/* Action Bar (Top Card) */}
        <div className="bg-[var(--surface)] rounded-lg shadow-sm px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
            <span className="text-[13px] text-[var(--text-secondary)]">Status</span>
            <StatusBadge status={invoice.status} />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={() => setIsEditing(true)}
              className="px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-[var(--draft-bg)] text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
            >
              Edit
            </Button>
            
            {/* 4. Wired the Delete Button to open the Modal */}
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)} 
              className="px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-[var(--red)] hover:bg-[var(--red-hover)] text-white transition-colors border-none"
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
        <div className="bg-[var(--surface)] rounded-lg shadow-sm p-6 sm:p-12 flex flex-col gap-10 sm:gap-12">
          {/* Header: ID & Sender Address */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
            <div className="flex flex-col">
              <span className="text-[16px] font-bold text-[var(--text-primary)] mb-2">
                <span className="text-text-muted">#</span>
                {invoice.id}
              </span>
              <span className="text-[13px] text-[var(--text-secondary)]">
                {invoice.description}
              </span>
            </div>
            <div className="flex flex-col text-[13px] text-[var(--text-secondary)] sm:text-right leading-[18px]">
              <span>{invoice.senderAddress.street}</span>
              <span>{invoice.senderAddress.city}</span>
              <span>{invoice.senderAddress.postCode}</span>
              <span>{invoice.senderAddress.country}</span>
            </div>
          </div>

          {/* Grid: Dates, Client Info, Email */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-0">
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-[13px] text-[var(--text-secondary)]">Invoice Date</span>
                <span className="text-[15px] font-bold text-[var(--text-primary)]">{formatDate(invoice.createdAt)}</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[13px] text-[var(--text-secondary)]">Payment Due</span>
                <span className="text-[15px] font-bold text-[var(--text-primary)]">{formatDate(invoice.paymentDue)}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[13px] text-[var(--text-secondary)] mb-3">Bill To</span>
              <span className="text-[15px] font-bold text-[var(--text-primary)] mb-2">{invoice.clientName}</span>
              <div className="flex flex-col text-[13px] text-[var(--text-secondary)] leading-[18px]">
                <span>{invoice.clientAddress.street}</span>
                <span>{invoice.clientAddress.city}</span>
                <span>{invoice.clientAddress.postCode}</span>
                <span>{invoice.clientAddress.country}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-[13px] text-[var(--text-secondary)]">Sent to</span>
              <span className="text-[15px] font-bold text-[var(--text-primary)]">{invoice.clientEmail}</span>
            </div>
          </div>

          {/* Items Table Area */}
          <div className="rounded-lg overflow-hidden mt-4">
            <div className="bg-[var(--surface-alt)] p-6 sm:p-8">
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 mb-6">
                <span className="text-[13px] text-[var(--text-secondary)]">Item Name</span>
                <span className="text-[13px] text-[var(--text-secondary)] text-center w-8">QTY.</span>
                <span className="text-[13px] text-[var(--text-secondary)] text-right w-24">Price</span>
                <span className="text-[13px] text-[var(--text-secondary)] text-right w-24">Total</span>
              </div>

              <div className="flex flex-col gap-6">
                {invoice.items.map((item) => (
                  <div key={item.id} className="flex sm:grid sm:grid-cols-[1fr_auto_auto_auto] gap-4 items-center justify-between">
                    <div className="flex flex-col sm:block gap-2">
                      <span className="text-[15px] font-bold text-[var(--text-primary)]">{item.name}</span>
                      <span className="text-[15px] font-bold text-[var(--text-secondary)] sm:hidden">
                        {item.quantity} x {formatCurrency(item.price)}
                      </span>
                    </div>
                    <span className="text-[15px] font-bold text-[var(--text-secondary)] text-center w-8 hidden sm:block">
                      {item.quantity}
                    </span>
                    <span className="text-[15px] font-bold text-[var(--text-secondary)] text-right w-24 hidden sm:block">
                      {formatCurrency(item.price)}
                    </span>
                    <span className="text-[15px] font-bold text-[var(--text-primary)] text-right w-24">
                      {formatCurrency(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--sidebar)] px-6 py-6 sm:px-8 sm:py-6 flex justify-between items-center text-white">
              <span className="text-[13px]">Amount Due</span>
              <span className="text-2xl font-bold">{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Edit Form */}
      {isEditing && (
        <InvoiceForm
          invoice={invoice}
          onSave={handleEditSave}
          onDiscard={() => setIsEditing(false)}
        />
      )}

      {/* 5. Appended the Delete Modal! */}
      <DeleteConfirmModal 
        invoiceId={invoice.id} 
        isOpen={isDeleteDialogOpen} 
        onClose={() => setIsDeleteDialogOpen(false)} 
        onConfirm={handleDeleteConfirm} 
      />
    </>
  );
}