type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

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
  subtotal?: MinorUnitAmount;
  taxRate?: TaxRatePercent;
  taxAmount?: MinorUnitAmount;
  discountAmount?: MinorUnitAmount;
  total: number;
  notes?: string | null;
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
  discount?: number;
  currency?: CurrencyCode;
  notes?: string;
}
