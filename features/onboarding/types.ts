export type OnboardingFormValues = BusinessProfileFormData;

export const DEFAULT_ONBOARDING_VALUES: OnboardingFormValues = {
  businessName: "",
  email: "",
  phone: "",
  taxId: "",
  address: {
    street: "",
    city: "",
    postCode: "",
    country: "United Kingdom",
  },
  defaultCurrency: "GBP",
  defaultPaymentTerms: 14,
  defaultNotes:
    "Thank you for your business! Please remit payment within terms.",
};
