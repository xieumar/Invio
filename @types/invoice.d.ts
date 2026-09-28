import type { Address } from "./common";
import type { CurrencyCode, MinorUnitAmount, TaxRatePercent } from "./money";

export type InvoiceStatus =
  | "draft"
  | "pending"
  | "paid"
  | "overdue"
  | "cancelled";

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number; // In client forms: major units (or minor units when specified)
  total: number;
}

export interface Invoice {
  id: string;
  userId?: string;
  clientId?: string | null;
  createdAt: string; // ISO date "YYYY-MM-DD"
  paymentDue: string; // ISO date "YYYY-MM-DD"
  description: string;
  paymentTerms: number; // Days (1, 7, 14, 30)
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

export interface InvoiceFormData {
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
