import { format } from "date-fns";

/** Local calendar date as YYYY-MM-DD, comparable with `Invoice.paymentDue`. */
export function toDateKey(date: Date = new Date()): string {
  return format(date, "yyyy-MM-dd");
}

/**
 * The status to show for an invoice.
 *
 * Overdue is derived rather than stored: an unpaid invoice (pending, or
 * previously stored as overdue) is overdue once its due date is before today.
 * An invoice due today is not overdue yet. Draft, paid and cancelled invoices
 * are never overdue. If a due date is moved into the future, a stale stored
 * "overdue" reverts to "pending".
 */
export function getEffectiveStatus(
  invoice: Pick<Invoice, "status" | "paymentDue">,
  now: Date = new Date()
): InvoiceStatus {
  if (invoice.status !== "pending" && invoice.status !== "overdue") {
    return invoice.status;
  }
  const due = invoice.paymentDue?.slice(0, 10);
  if (!due) return invoice.status;
  return due < toDateKey(now) ? "overdue" : "pending";
}
