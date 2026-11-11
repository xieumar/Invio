interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  createdAt: string;
  updatedAt: string;
}

type PaymentFieldKey =
  | "bankName"
  | "accountName"
  | "accountNumber"
  | "sortCode"
  | "iban"
  | "swift"
  | "paymentLink"
  | "instructions";

/**
 * Where clients should send money. Invio only displays these on invoices;
 * it does not process payments.
 */
interface PaymentDetails {
  bankName?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  sortCode?: string | null;
  iban?: string | null;
  swift?: string | null;
  paymentLink?: string | null;
  instructions?: string | null;
  /** Per-field switch for printing on invoices. Missing key = shown. */
  visibility?: Partial<Record<PaymentFieldKey, boolean>>;
}

interface BusinessProfile {
  id: string;
  businessName: string;
  email: string;
  phone?: string | null;
  taxId?: string | null;
  address: Address;
  logoUrl?: string | null;
  defaultCurrency: CurrencyCode;
  defaultPaymentTerms: number;
  defaultNotes?: string | null;
  paymentDetails?: PaymentDetails | null;
  /** Default PDF template for new downloads */
  invoiceTemplate?: InvoiceTemplate | null;
  createdAt: string;
  updatedAt: string;
}

interface BusinessProfileFormData {
  businessName: string;
  email: string;
  phone?: string | null;
  taxId?: string | null;
  address: Address;
  defaultCurrency: CurrencyCode;
  defaultPaymentTerms: number;
  defaultNotes?: string | null;
  paymentDetails?: PaymentDetails | null;
  invoiceTemplate?: InvoiceTemplate | null;
}

interface UserPreferences {
  theme: "light" | "dark" | "system";
  dateFormat?: string;
  currencyDisplay?: "symbol" | "code";
  tourCompleted?: boolean;
  tourLastStep?: number;
}

type OnboardingStep =
  | "business_info"
  | "first_client"
  | "sample_invoice"
  | "ready";

interface OnboardingState {
  isCompleted: boolean;
  currentStep: OnboardingStep;
  completedAt?: string | null;
}
