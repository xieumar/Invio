import { InvoiceStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: InvoiceStatus;
}

const config: Record<InvoiceStatus, { dot: string; text: string; bg: string }> =
  {
    paid: {
      dot: "bg-paid-text",
      text: "text-paid-text",
      bg: "bg-[rgba(51,214,159,0.06)] hover:bg-[rgba(51,214,159,0.06)]", // Added hover to override shadcn defaults
    },
    pending: {
      dot: "bg-pending-text",
      text: "text-pending-text",
      bg: "bg-[rgba(255,143,0,0.06)] hover:bg-[rgba(255,143,0,0.06)]",
    },
    draft: {
      dot: "bg-[var(--draft-text)]",
      text: "text-[var(--draft-text)]",
      bg: "bg-[var(--draft-bg)] hover:bg-[var(--draft-bg)]",
    },
  };

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { dot, text, bg } = config[status];

  return (
    <Badge
      variant="secondary" // Use secondary as a neutral base
      className={`
        gap-2 px-4 py-3 rounded-md text-[15px] font-bold 
        min-w-[104px] justify-center border-none 
        ${bg} ${text}
      `}
      aria-label={`Status: ${status}`}
    >
      <span className={`w-2 h-2 rounded-full ${dot}`} aria-hidden="true" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
