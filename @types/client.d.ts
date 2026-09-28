interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string | null;
  address: Address;
  currency?: CurrencyCode;
  defaultPaymentTerms?: number;
  totalInvoicedAmount?: MinorUnitAmount;
  invoiceCount?: number;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ClientFormData {
  name: string;
  email: string;
  phone?: string;
  address: Address;
  currency?: CurrencyCode;
  defaultPaymentTerms?: number;
  notes?: string;
}
