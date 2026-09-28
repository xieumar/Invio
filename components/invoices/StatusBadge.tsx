import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: InvoiceStatus;
}

const config: Record<InvoiceStatus, { dot: string; text: string; bg: string }> =
  {
    paid: {
      dot: "bg-paid-text",
      text: "text-paid-text",
      bg: "bg-[rgba(51,214,159,0.06)] hover:bg-[rgba(51,214,159,0.06)]",
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
    overdue: {
      dot: "bg-red",
      text: "text-red",
      bg: "bg-[rgba(236,87,87,0.06)] hover:bg-[rgba(236,87,87,0.06)]",
    },
    cancelled: {
      dot: "bg-text-secondary",
      text: "text-text-secondary",
      bg: "bg-surface-alt hover:bg-surface-alt",
    },
  };

export function StatusBadge({ status }: StatusBadgeProps) {
  const badgeConfig = config[status] ?? config.draft;

  return (
    <Badge
      variant="secondary"
      className={`
        gap-2 pt-1 px-4 h-10 rounded-md text-[15px] font-bold 
        min-w-26 justify-center border-none 
        ${badgeConfig.bg} ${badgeConfig.text}
      `}
      aria-label={`Status: ${status}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${badgeConfig.dot}`}
        aria-hidden="true"
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default StatusBadge;
