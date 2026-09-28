import type { Address } from "./common";
import type { CurrencyCode } from "./money";

export interface UserProfile {
  id: string; // Firebase Auth UID
  email: string;
  displayName: string;
  photoURL?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessProfile {
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

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  dateFormat?: string;
  currencyDisplay?: "symbol" | "code";
  tourCompleted?: boolean;
  tourLastStep?: number;
}

export type OnboardingStep =
  | "business_info"
  | "first_client"
  | "sample_invoice"
  | "ready";

export interface OnboardingState {
  isCompleted: boolean;
  currentStep: OnboardingStep;
  completedAt?: string | null;
}
