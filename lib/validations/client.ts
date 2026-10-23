import { z } from "zod";
import { addressSchema } from "./invoice";

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Client name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Client email is required")
    .email("Please enter a valid email address"),
  phone: z.string().trim().optional().nullable(),
  address: addressSchema,
  currency: z.string().optional(),
  defaultPaymentTerms: z
    .number()
    .min(1, "Payment terms must be at least 1 day")
    .optional(),
  notes: z.string().trim().optional().nullable(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;
