import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Invoice } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <Link
      href={`/invoices/${invoice.id}`}
      className="
        group flex flex-wrap sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto_auto] sm:items-center
        gap-x-4 gap-y-2 p-6 sm:px-8 sm:py-4 mb-4
        bg-surface rounded-lg border border-transparent 
        hover:border-purple cursor-pointer
        shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]
        transition-all duration-200 no-underline
      "
      aria-label={`Invoice ${invoice.id}, ${invoice.clientName}`}
    >
      {/* ID */}
      <span className="text-[15px] font-bold text-text-primary w-full sm:w-auto">
        <span className="text-text-muted">#</span>
        {invoice.id}
      </span>

      {/* Due date */}
      <span className="text-[13px] text-text-secondary">
        Due {formatDate(invoice.paymentDue)}
      </span>

      {/* Client */}
      <span className="text-[13px] text-text-secondary sm:text-center ml-auto sm:ml-0">
        {invoice.clientName}
      </span>

      {/* Amount */}
      <span className="text-[16px] font-bold text-text-primary sm:text-right w-full sm:w-auto">
        {formatCurrency(invoice.total)}
      </span>

      {/* Status */}
      <StatusBadge status={invoice.status} />

      {/* Arrow */}
      <ChevronRight
        className="w-4 h-4 text-purple hidden sm:block transition-transform duration-200 group-hover:translate-x-1"
        strokeWidth={3}
        aria-hidden="true"
      />
    </Link>
  );
}
