"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { useInvoices } from "@/context/InvoiceContext";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { invoices, loading } = useInvoices();

  // Find the specific invoice based on the URL parameter
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

  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Go Back Link */}
      <Link
        href="/"
        className="group inline-flex items-center gap-6 text-[15px] font-bold text-text-primary hover:text-text-secondary transition-colors mb-8"
      >
        <ChevronLeft
          className="w-4 h-4 text-purple transition-transform group-hover:-translate-x-1"
          strokeWidth={3}
        />
        Go back
      </Link>

      {/* Action Bar (Top Card) */}
      <div className="bg-surface rounded-lg shadow-sm px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
          <span className="text-[13px] text-text-secondary">Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <Button
            variant="secondary"
            className="px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-draft-bg text-text-secondary hover:bg-border"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-red hover:bg-red-hover text-white"
          >
            Delete
          </Button>
          <Button className="px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-purple hover:bg-purple-light text-white">
            Mark as Paid
          </Button>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-surface rounded-lg shadow-sm p-6 sm:p-12 flex flex-col gap-10 sm:gap-12">
        {/* Header: ID & Sender Address */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-text-primary mb-2">
              <span className="text-text-muted">#</span>
              {invoice.id}
            </span>
            <span className="text-[13px] text-text-secondary">
              {invoice.description}
            </span>
          </div>
          <div className="flex flex-col text-[13px] text-text-secondary sm:text-right leading-[18px]">
            <span>{invoice.senderAddress.street}</span>
            <span>{invoice.senderAddress.city}</span>
            <span>{invoice.senderAddress.postCode}</span>
            <span>{invoice.senderAddress.country}</span>
          </div>
        </div>

        {/* Grid: Dates, Client Info, Email */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-0">
          {/* Column 1: Dates */}
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[13px] text-text-secondary">
                Invoice Date
              </span>
              <span className="text-[15px] font-bold text-text-primary">
                {formatDate(invoice.createdAt)}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[13px] text-text-secondary">
                Payment Due
              </span>
              <span className="text-[15px] font-bold text-text-primary">
                {formatDate(invoice.paymentDue)}
              </span>
            </div>
          </div>

          {/* Column 2: Bill To */}
          <div className="flex flex-col">
            <span className="text-[13px] text-text-secondary mb-3">
              Bill To
            </span>
            <span className="text-[15px] font-bold text-text-primary mb-2">
              {invoice.clientName}
            </span>
            <div className="flex flex-col text-[13px] text-text-secondary leading-[18px]">
              <span>{invoice.clientAddress.street}</span>
              <span>{invoice.clientAddress.city}</span>
              <span>{invoice.clientAddress.postCode}</span>
              <span>{invoice.clientAddress.country}</span>
            </div>
          </div>

          {/* Column 3: Sent To */}
          <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
            <span className="text-[13px] text-text-secondary">Sent to</span>
            <span className="text-[15px] font-bold text-text-primary">
              {invoice.clientEmail}
            </span>
          </div>
        </div>

        {/* Items Table Area */}
        <div className="rounded-lg overflow-hidden mt-4">
          {/* Table Body */}
          <div className="bg-[#f9fafe] dark:bg-[#252945] p-6 sm:p-8">
            {/* Desktop Header */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 mb-6">
              <span className="text-[13px] text-text-secondary">Item Name</span>
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
            <div className="flex flex-col gap-6">
              {invoice.items.map((item) => (
                <div
                  key={item.id}
                  className="flex sm:grid sm:grid-cols-[1fr_auto_auto_auto] gap-4 items-center justify-between"
                >
                  {/* Mobile Layout clusters name and qty/price, Desktop uses grid */}
                  <div className="flex flex-col sm:block gap-2">
                    <span className="text-[15px] font-bold text-text-primary">
                      {item.name}
                    </span>
                    <span className="text-[15px] font-bold text-text-secondary sm:hidden">
                      {item.quantity} x {formatCurrency(item.price)}
                    </span>
                  </div>
                  <span className="text-[15px] font-bold text-text-secondary text-center w-8 hidden sm:block">
                    {item.quantity}
                  </span>
                  <span className="text-[15px] font-bold text-text-secondary text-right w-24 hidden sm:block">
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
          <div className="bg-[#373b53] dark:bg-[#0c0e16] px-6 py-6 sm:px-8 sm:py-6 flex justify-between items-center text-white">
            <span className="text-[13px]">Amount Due</span>
            <span className="text-2xl font-bold">
              {formatCurrency(invoice.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
