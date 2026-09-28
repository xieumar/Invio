interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
