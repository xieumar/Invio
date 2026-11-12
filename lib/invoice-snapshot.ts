export const PAYMENT_FIELD_KEYS: PaymentFieldKey[] = [
  "bankName",
  "accountName",
  "accountNumber",
  "sortCode",
  "iban",
  "swift",
  "paymentLink",
  "instructions",
];

/**
 * Freezes the parts of the business profile that print on an invoice, so an
 * issued invoice keeps the logo, contact details and bank details it was
 * issued with even if Settings change later.
 *
 * Per-field visibility is applied here: hidden or empty payment fields are
 * stored as null. Every key is always present so a Firestore merge-write
 * overwrites old values instead of leaving stale ones behind.
 */
export function buildInvoiceSnapshot(
  profile: BusinessProfile | null | undefined
): { issuer: InvoiceIssuer | null; paymentInfo: InvoicePaymentInfo | null } {
  if (!profile) return { issuer: null, paymentInfo: null };

  const details = profile.paymentDetails;
  const paymentInfo = {} as InvoicePaymentInfo;
  for (const key of PAYMENT_FIELD_KEYS) {
    const value = details?.[key]?.trim();
    const visible = details?.visibility?.[key] !== false;
    paymentInfo[key] = value && visible ? value : null;
  }

  return {
    issuer: {
      businessName: profile.businessName,
      email: profile.email ?? null,
      phone: profile.phone ?? null,
      taxId: profile.taxId ?? null,
      logoUrl: profile.logoUrl ?? null,
    },
    paymentInfo,
  };
}
