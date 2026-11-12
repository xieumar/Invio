import { buildInvoiceSnapshot, PAYMENT_FIELD_KEYS } from "./invoice-snapshot";

export const PAYMENT_FIELD_LABELS: Record<PaymentFieldKey, string> = {
  bankName: "Bank",
  accountName: "Account name",
  accountNumber: "Account number",
  sortCode: "Sort code",
  iban: "IBAN",
  swift: "SWIFT / BIC",
  paymentLink: "Pay online",
  instructions: "Instructions",
};

export interface InvoiceDocumentModel {
  issuer: {
    name: string | null;
    email: string | null;
    phone: string | null;
    taxId: string | null;
    logoUrl: string | null;
    address: string[];
  };
  paymentLines: Array<{
    key: PaymentFieldKey;
    label: string;
    value: string;
    isLink: boolean;
  }>;
  notes: string | null;
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

/** "GB29NWBK60161331926819" -> "GB29 NWBK 6016 1331 9268 19" */
function groupIban(iban: string): string {
  return iban.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * What an invoice shows about the issuer and how to pay, shared by the PDF
 * and the on-screen detail page so they never disagree.
 *
 * Uses the snapshot taken when the invoice was issued. Invoices from before
 * snapshots existed (or saved while the profile couldn't be read) fall back
 * to the current business profile.
 */
export function buildInvoiceDocument(
  invoice: Invoice,
  profile?: BusinessProfile | null
): InvoiceDocumentModel {
  const fallback = buildInvoiceSnapshot(profile);
  const issuer = invoice.issuer ?? fallback.issuer;
  const paymentInfo = invoice.issuer
    ? (invoice.paymentInfo ?? {})
    : (invoice.paymentInfo ?? fallback.paymentInfo ?? {});

  const address = [
    invoice.senderAddress?.street,
    invoice.senderAddress?.city,
    invoice.senderAddress?.postCode,
    invoice.senderAddress?.country,
  ].filter((line): line is string => Boolean(line));

  const paymentLines: InvoiceDocumentModel["paymentLines"] = [];
  for (const key of PAYMENT_FIELD_KEYS) {
    const raw = paymentInfo[key];
    if (!raw) continue;
    // Never render a non-http(s) link, even if one slipped into stored data
    if (key === "paymentLink" && !isHttpUrl(raw)) continue;
    paymentLines.push({
      key,
      label: PAYMENT_FIELD_LABELS[key],
      value: key === "iban" ? groupIban(raw) : raw,
      isLink: key === "paymentLink",
    });
  }

  return {
    issuer: {
      name: issuer?.businessName || null,
      email: issuer?.email || null,
      phone: issuer?.phone || null,
      taxId: issuer?.taxId || null,
      logoUrl: issuer?.logoUrl || null,
      address,
    },
    paymentLines,
    notes: invoice.notes?.trim() || null,
  };
}
