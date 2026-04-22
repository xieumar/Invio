import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Invoice } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const idStyle = "text-[15px] font-bold text-text-primary";
  const dateStyle = "text-[13px] text-text-secondary whitespace-nowrap";
  const nameStyle =
    "text-[13px] text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis";
  const totalStyle =
    "text-[16px] font-bold text-text-primary whitespace-nowrap";

  return (
    <Link
      href={`/invoices/${invoice.id}`}
      className="
        group mb-4 bg-surface rounded-lg border border-transparent 
        hover:border-purple cursor-pointer shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]
        transition-all duration-200 no-underline block
      "
    >
      <div className="flex flex-col gap-6 p-6 sm:hidden">
        <div className="flex justify-between items-center">
          <span className={idStyle}>
            <span className="text-text-muted">#</span>
            {invoice.id}
          </span>
          <span className={nameStyle}>{invoice.clientName}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <span className={dateStyle}>
              Due {formatDate(invoice.paymentDue)}
            </span>
            <span className={totalStyle}>{formatCurrency(invoice.total)}</span>
          </div>
          <StatusBadge status={invoice.status} />
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-[90px_150px_1fr_120px_140px_20px] items-center h-20 px-8 gap-4">
        <span className={idStyle}>
          <span className="text-text-muted">#</span>
          {invoice.id}
        </span>

        <span className={dateStyle}>Due {formatDate(invoice.paymentDue)}</span>

        <span className={nameStyle}>{invoice.clientName}</span>

        <span className={`${totalStyle} text-right`}>
          {formatCurrency(invoice.total)}
        </span>

        <div className="flex justify-center">
          <StatusBadge status={invoice.status} />
        </div>

        <div className="flex justify-end">
          <ChevronRight
            className="w-4 h-4 text-purple transition-transform"
            strokeWidth={3}
          />
        </div>
      </div>
    </Link>
  );
}
