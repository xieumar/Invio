export const INVOICE_TEMPLATES: Array<{
  id: InvoiceTemplate;
  name: string;
  description: string;
}> = [
  {
    id: "minimal",
    name: "Minimal",
    description:
      "Clean black-and-white, with plenty of white space. Thin lines, no colour. Best for a simple, professional look.",
  },
  {
    id: "classic",
    name: "Classic",
    description:
      "Grey, traditional layout. Client, dates and payment details sit together in one shaded box at the top.",
  },
  {
    id: "bold",
    name: "Bold",
    description:
      "Colourful and branded. Dark header banner, purple highlights and a status badge. Stands out most.",
  },
];

export const DEFAULT_INVOICE_TEMPLATE: InvoiceTemplate = "minimal";
