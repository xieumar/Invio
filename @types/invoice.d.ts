type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

type InvoiceTemplate = "minimal" | "classic" | "bold";

/** Business details frozen onto an invoice when it is issued. */
interface InvoiceIssuer {
  businessName: string;
  email?: string | null;
  phone?: string | null;
  taxId?: string | null;
  logoUrl?: string | null;
}

/** Payment details frozen onto an invoice; hidden/empty fields are null. */
type InvoicePaymentInfo = Partial<Record<PaymentFieldKey, string | null>>;

interface Invoice {
  id: string;
  userId?: string;
  clientId?: string | null;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  currency?: CurrencyCode;
  /**
   * All amounts below are in MAJOR units (e.g. 12.50), not minor units.
   * Derived from items + taxRate + discount; see getInvoiceAmounts().
   */
  subtotal?: number;
  taxRate?: TaxRatePercent;
  taxAmount?: number;
  /** Discount entered by the user, in major units */
  discount?: number;
  discountAmount?: number;
  total: number;
  notes?: string | null;
  /** Snapshot of the business profile at issue time (absent on old invoices) */
  issuer?: InvoiceIssuer | null;
  paymentInfo?: InvoicePaymentInfo | null;
  paidAt?: string | null;
  updatedAt?: string;
}

interface InvoiceFormData {
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  clientId?: string | null;
  taxRate?: number;
  taxAmount?: number;
  subtotal?: number;
  discount?: number;
  discountAmount?: number;
  total: number;
  currency?: CurrencyCode;
  notes?: string;
  issuer?: InvoiceIssuer | null;
  paymentInfo?: InvoicePaymentInfo | null;
}
