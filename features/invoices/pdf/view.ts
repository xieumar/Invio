import { formatCurrency, formatDate } from "@/lib/utils";
import { buildInvoiceDocument } from "@/lib/invoice-document";

/** The built-in PDF font only covers Latin-1 (plus the euro sign). */
function makeMoney(currency = "GBP") {
  return (amount: number): string => {
    const formatted = formatCurrency(amount, currency);
    return /[^\u0000-ÿ€]/.test(formatted)
      ? `${currency.toUpperCase()} ${amount.toFixed(2)}`
      : formatted;
  };
}

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  paid: "PAID",
  pending: "PENDING",
  overdue: "OVERDUE",
  draft: "DRAFT",
  cancelled: "CANCELLED",
};

/** Everything a template needs, already formatted. Templates only lay it out. */
export interface InvoiceView {
  id: string;
  status: InvoiceStatus;
  statusLabel: string;
  issuer: ReturnType<typeof buildInvoiceDocument>["issuer"];
  /** Issuer contact lines: email, phone, tax ID */
  issuerContact: string[];
  clientName: string;
  clientEmail: string;
  clientAddress: string[];
  issued: string;
  due: string;
  terms: string;
  description: string;
  items: Array<{
    id: string;
    name: string;
    quantity: string;
    price: string;
    amount: string;
  }>;
  /** Subtotal / tax / discount rows; empty when the total is the only figure */
  adjustments: Array<{ label: string; value: string }>;
  totalLabel: string;
  total: string;
  paymentLines: ReturnType<typeof buildInvoiceDocument>["paymentLines"];
  notes: string | null;
  footerText: string;
}

export function buildInvoiceView(
  invoice: Invoice,
  profile?: BusinessProfile | null
): InvoiceView {
  const doc = buildInvoiceDocument(invoice, profile);
  const money = makeMoney(invoice.currency);

  const showTax = !!(
    invoice.taxRate &&
    invoice.taxRate > 0 &&
    invoice.taxAmount
  );
  const showDiscount = !!(invoice.discountAmount && invoice.discountAmount > 0);

  const adjustments: InvoiceView["adjustments"] = [];
  if ((showTax || showDiscount) && invoice.subtotal !== undefined) {
    adjustments.push({ label: "Subtotal", value: money(invoice.subtotal) });
  }
  if (showTax) {
    adjustments.push({
      label: `Tax (${invoice.taxRate}%)`,
      value: money(invoice.taxAmount ?? 0),
    });
  }
  if (showDiscount) {
    adjustments.push({
      label: "Discount",
      value: `-${money(invoice.discountAmount ?? 0)}`,
    });
  }

  return {
    id: invoice.id,
    status: invoice.status,
    statusLabel: STATUS_LABELS[invoice.status] ?? STATUS_LABELS.pending,
    issuer: doc.issuer,
    issuerContact: [
      doc.issuer.email,
      doc.issuer.phone,
      doc.issuer.taxId ? `Tax ID: ${doc.issuer.taxId}` : null,
    ].filter((l): l is string => Boolean(l)),
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    clientAddress: [
      invoice.clientAddress?.street,
      invoice.clientAddress?.city,
      invoice.clientAddress?.postCode,
      invoice.clientAddress?.country,
    ].filter((l): l is string => Boolean(l)),
    issued: formatDate(invoice.createdAt),
    due: formatDate(invoice.paymentDue),
    terms: `Net ${invoice.paymentTerms} days`,
    description: invoice.description,
    items: invoice.items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: String(item.quantity),
      price: money(item.price),
      amount: money(item.total),
    })),
    adjustments,
    totalLabel: invoice.status === "paid" ? "Total paid" : "Total due",
    total: money(invoice.total),
    paymentLines: doc.paymentLines,
    notes: doc.notes,
    footerText:
      [doc.issuer.name, doc.issuer.email].filter(Boolean).join("  |  ") ||
      `Invoice #${invoice.id}`,
  };
}
