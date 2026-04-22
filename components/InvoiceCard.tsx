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
        group flex items-center
        gap-4 p-6 h-20 mb-4
        bg-surface rounded-lg border border-transparent 
        hover:border-purple cursor-pointer
        shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]
        transition-all duration-200 no-underline
      "
    >
      {/* 1. ID - Fixed width for alignment */}
      <span className="text-[15px] font-bold text-text-primary w-20">
        <span className="text-text-muted">#</span>
        {invoice.id}
      </span>

      {/* 2. Due Date - Fixed width or flex-grow */}
      <span className="text-[13px] text-text-secondary w-32">
        Due {formatDate(invoice.paymentDue)}
      </span>

      {/* 3. Client - Flex-1 pushes remaining content to the right */}
      <span className="text-[13px] text-text-secondary flex-1">
        {invoice.clientName}
      </span>

      {/* 4. Amount - Right aligned relative to its own box */}
      <span className="text-[16px] font-bold text-text-primary text-right w-32">
        {formatCurrency(invoice.total)}
      </span>

      {/* 5. Status - The container handles the centering of the badge */}
      <div className="w-32 flex justify-center">
        <StatusBadge status={invoice.status} />
      </div>

      {/* 6. Arrow */}
      <div className="w-4">
        <ChevronRight
          className="w-4 h-4 text-purple transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={3}
        />
      </div>
    </Link>
  );
}
