/**
 * What Invio offers today vs. what is planned. Shared by the homepage pricing
 * preview and the Pricing page so they can't drift apart. There is no billing
 * in the app yet, so nothing here has a price or a usage limit.
 */

export interface Plan {
  id: "free" | "pro" | "studio";
  name: string;
  badge: string;
  available: boolean;
  tagline: string;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Invio",
    badge: "Available now",
    available: true,
    tagline:
      "Everything in the app today is free while Invio is in active development.",
    features: [
      "Unlimited invoices and clients",
      "Draft, pending and paid tracking, with search and sort",
      "AI invoice drafting and payment reminders",
      "PDF export in Minimal, Classic or Bold",
      "Your logo, business profile and payment details",
      "Multi-currency invoices, tax and discounts",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Coming soon",
    available: false,
    tagline: "Planned for freelancers who want more automation.",
    features: [
      "Bank statement CSV import and matching",
      "Scheduled reminder emails",
      "Shareable client invoice links",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    badge: "Coming soon",
    available: false,
    tagline: "Planned for small studios and agencies.",
    features: ["Team seats and roles", "Activity log and audit trail"],
  },
];

/** Every feature, with whether it's built, for the Pricing page table. */
export const FEATURE_STATUS: Array<{
  category: string;
  features: Array<{ name: string; available: boolean }>;
}> = [
  {
    category: "Invoicing",
    features: [
      { name: "Unlimited invoices and saved clients", available: true },
      { name: "Draft, pending and paid status flow", available: true },
      { name: "Tax rates, discounts and payment terms", available: true },
      {
        name: "Integer-accurate maths (no rounding drift)",
        available: true,
      },
      { name: "Multi-currency invoices", available: true },
      { name: "Search, sort and filter invoices", available: true },
    ],
  },
  {
    category: "PDF & branding",
    features: [
      { name: "PDF export", available: true },
      { name: "Minimal, Classic and Bold templates", available: true },
      { name: "Your logo on every invoice", available: true },
      { name: "Bank and payment details on invoices", available: true },
      { name: "Shareable client invoice links", available: false },
    ],
  },
  {
    category: "AI assistant",
    features: [
      {
        name: "Draft an invoice from a plain-English description",
        available: true,
      },
      {
        name: "Payment reminder emails (friendly, firm or urgent)",
        available: true,
      },
      { name: "Scheduled, automatic reminders", available: false },
    ],
  },
  {
    category: "Banking & teams",
    features: [
      { name: "Bank statement CSV import and matching", available: false },
      { name: "Team seats and roles", available: false },
      { name: "Activity log and audit trail", available: false },
    ],
  },
];
