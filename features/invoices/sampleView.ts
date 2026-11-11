import type { InvoiceView } from "./pdf/view";

/** Sample invoice used for template thumbnails and marketing previews. */
export const SAMPLE_INVOICE_VIEW: InvoiceView = {
  id: "INV-0042",
  status: "pending",
  statusLabel: "PENDING",
  issuer: {
    name: "Your Business",
    email: "hello@yourbusiness.com",
    phone: null,
    taxId: null,
    logoUrl: null,
    address: ["12 Market Street", "Lagos, Nigeria"],
  } as InvoiceView["issuer"],
  issuerContact: ["hello@yourbusiness.com"],
  clientName: "Jane Doe",
  clientEmail: "jane@example.com",
  clientAddress: ["48 Park Avenue", "Abuja, Nigeria"],
  issued: "12 Nov 2026",
  due: "26 Nov 2026",
  terms: "Net 14 days",
  description: "Brand refresh",
  items: [
    {
      id: "1",
      name: "Website design",
      quantity: "1",
      price: "$800.00",
      amount: "$800.00",
    },
    {
      id: "2",
      name: "Logo & branding",
      quantity: "2",
      price: "$250.00",
      amount: "$500.00",
    },
    {
      id: "3",
      name: "Hosting (annual)",
      quantity: "1",
      price: "$120.00",
      amount: "$120.00",
    },
  ],
  adjustments: [
    { label: "Subtotal", value: "$1,420.00" },
    { label: "Tax (7.5%)", value: "$106.50" },
  ],
  totalLabel: "Total due",
  total: "$1,526.50",
  paymentLines: [
    { key: "bankName", label: "Bank", value: "Example Bank", isLink: false },
    {
      key: "accountNumber",
      label: "Account",
      value: "0123456789",
      isLink: false,
    },
  ] as InvoiceView["paymentLines"],
  notes: "Thank you for your business.",
  footerText: "Your Business",
};
