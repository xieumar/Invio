import { z } from "zod";
import { addressSchema } from "./invoice";

export const businessProfileSchema = z.object({
  businessName: z.string().min(1, "Company / trading name is required"),
  email: z
    .string()
    .min(1, "Billing email is required")
    .email("Please enter a valid billing email address"),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  address: addressSchema,
  defaultCurrency: z.string().default("GBP"),
  defaultPaymentTerms: z
    .number()
    .min(1, "Payment terms must be at least 1 day")
    .default(14),
  defaultNotes: z.string().optional().nullable(),
});

export type BusinessProfileFormSchema = z.infer<typeof businessProfileSchema>;
