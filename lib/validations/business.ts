import { z } from "zod";
import { addressSchema } from "./invoice";

/** Trimmed optional text; empty strings become null so Firestore never sees "" or undefined. */
const optionalText = (max: number, message?: string) =>
  z
    .string()
    .trim()
    .max(max, message ?? `Must be ${max} characters or fewer`)
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional();

/** ISO 13616 mod-97 check. Input is already stripped of spaces. */
export function isValidIban(iban: string): boolean {
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false;
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let remainder = 0;
  for (const ch of rearranged) {
    const digits = /\d/.test(ch) ? ch : String(ch.charCodeAt(0) - 55);
    for (const d of digits) {
      remainder = (remainder * 10 + Number(d)) % 97;
    }
  }
  return remainder === 1;
}

const ibanSchema = z
  .string()
  .transform((v) => v.replace(/\s+/g, "").toUpperCase())
  .refine((v) => v === "" || isValidIban(v), "Enter a valid IBAN")
  .transform((v) => (v === "" ? null : v))
  .nullable()
  .optional();

const swiftSchema = z
  .string()
  .transform((v) => v.replace(/\s+/g, "").toUpperCase())
  .refine(
    (v) => v === "" || /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(v),
    "SWIFT/BIC must be 8 or 11 characters"
  )
  .transform((v) => (v === "" ? null : v))
  .nullable()
  .optional();

// Only http(s): this is rendered as a link on invoices, so javascript:/data: must never pass.
const paymentLinkSchema = z
  .string()
  .trim()
  .refine((v) => {
    if (v === "") return true;
    try {
      const url = new URL(v);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }, "Enter a full link starting with https://")
  .transform((v) => (v === "" ? null : v))
  .nullable()
  .optional();

export const paymentDetailsSchema = z.object({
  bankName: optionalText(80),
  accountName: optionalText(80),
  accountNumber: z
    .string()
    .trim()
    .max(34, "Must be 34 characters or fewer")
    .regex(/^[A-Za-z0-9 -]*$/, "Use letters, numbers, spaces or dashes only")
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional(),
  sortCode: z
    .string()
    .trim()
    .max(20, "Must be 20 characters or fewer")
    .regex(/^[A-Za-z0-9 -]*$/, "Use letters, numbers, spaces or dashes only")
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional(),
  iban: ibanSchema,
  swift: swiftSchema,
  paymentLink: paymentLinkSchema,
  instructions: optionalText(500, "Keep instructions under 500 characters"),
  /** Per-field switch for printing on invoices. Missing key = shown. */
  visibility: z
    .object({
      bankName: z.boolean().optional(),
      accountName: z.boolean().optional(),
      accountNumber: z.boolean().optional(),
      sortCode: z.boolean().optional(),
      iban: z.boolean().optional(),
      swift: z.boolean().optional(),
      paymentLink: z.boolean().optional(),
      instructions: z.boolean().optional(),
    })
    .optional(),
});

export const businessProfileSchema = z.object({
  businessName: z.string().trim().min(1, "Company / trading name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Billing email is required")
    .email("Please enter a valid billing email address"),
  phone: z
    .string()
    .trim()
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional(),
  taxId: z
    .string()
    .trim()
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional(),
  address: addressSchema,
  defaultCurrency: z.string().default("GBP"),
  defaultPaymentTerms: z
    .number()
    .min(1, "Payment terms must be at least 1 day")
    .default(14),
  defaultNotes: optionalText(1000, "Keep notes under 1000 characters"),
  paymentDetails: paymentDetailsSchema.nullable().optional(),
});

export type BusinessProfileFormSchema = z.infer<typeof businessProfileSchema>;
