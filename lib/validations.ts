import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  postCode: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
});

export const itemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Required"),
  // Removed z.coerce. React Hook Form will handle the number conversion.
  quantity: z.number().min(1, "Min 1"),
  price: z.number().min(0.01, "Min 0.01"),
  total: z.number(),
});

export const invoiceSchema = z.object({
  description: z.string().min(1, "Required"),
  // Removed z.coerce
  paymentTerms: z.number(),
  clientName: z.string().min(1, "Required"),
  clientEmail: z.string().email("Invalid email"),
  createdAt: z.string().min(1, "Required"),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(itemSchema).min(1, "Add at least one item"),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
