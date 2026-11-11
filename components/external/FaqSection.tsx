"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapse, FadeIn, Stagger, StaggerItem } from "@/components/motion";

interface FaqItem {
  category:
    | "Invoicing"
    | "AI Assistant"
    | "Branding"
    | "Security"
    | "Coming soon";
  q: string;
  a: string;
}

const ALL_FAQS: FaqItem[] = [
  // Invoicing
  {
    category: "Invoicing",
    q: "Why does Invio store money using integers instead of decimals?",
    a: "Standard floating-point numbers in computers suffer from rounding discrepancies (e.g. 0.1 + 0.2 = 0.30000000000000004). Invio stores all monetary values in minor units (pence or cents) as whole numbers and only formats them as decimals for display, so subtotals, tax, discounts and totals always add up exactly.",
  },
  {
    category: "Invoicing",
    q: "Can I customize the payment terms and due dates?",
    a: "Yes. Choose Net 1, 7, 14 or 30 days when you create an invoice, and the due date is worked out from the invoice date automatically. You can set your preferred default in Settings.",
  },
  {
    category: "Invoicing",
    q: "What currencies does Invio support?",
    a: "Dozens, including GBP, USD and EUR. Each invoice has its own currency, and the dashboard converts amounts in other currencies so your totals are in one place. Currencies that don't use two decimal places (such as JPY) aren't supported yet.",
  },
  {
    category: "Invoicing",
    q: "Does Invio handle tax and discounts?",
    a: "Yes. Add a tax rate and a discount to any invoice. Tax is calculated on the subtotal, the discount is then deducted, and the PDF and invoice page both show the subtotal, tax, discount and total.",
  },
  {
    category: "Invoicing",
    q: "How do clients pay invoices sent through Invio?",
    a: "Invio doesn't process payments. You download a PDF and send it to your client yourself, and the invoice carries your payment details (such as bank account and a payment link) that you set up in Settings. When you're paid, mark the invoice as paid.",
  },

  // AI Assistant
  {
    category: "AI Assistant",
    q: "How does the AI invoice drafting feature work?",
    a: "Describe the work in plain English (for example, 'Invoice Acme for 25 hours of brand design at £90/hr with Net 14 terms'). The assistant fills in the invoice form with line items, quantities, prices and terms, and highlights what it filled in so you can check it. Nothing is saved until you do.",
  },
  {
    category: "AI Assistant",
    q: "Does the AI ever send invoices automatically without my permission?",
    a: "Never. The AI drafts and suggests, and you review and save. Invio doesn't send invoices or emails on your behalf at all. You have full edit access to every line item and total.",
  },
  {
    category: "AI Assistant",
    q: "How do payment reminders work?",
    a: "On an unpaid invoice, ask the assistant to draft a reminder email in a friendly, firm or urgent tone. It takes into account how many days overdue the invoice is. You can copy the text or open it in your own email app. Scheduled, automatic reminders aren't available yet.",
  },
  {
    category: "AI Assistant",
    q: "What does the AI see?",
    a: "Only what's needed for the request: the description you type for a draft, or the invoice details needed to write a reminder. These are sent from Invio's server to the AI provider (OpenRouter), so the AI key is never exposed in your browser. Requests are rate limited.",
  },

  // Branding
  {
    category: "Branding",
    q: "Can I customise how my invoices look?",
    a: "Yes. In Settings, add your logo, business details and payment information, then choose a PDF template: Minimal (clean and typographic), Classic (a grey panel with client and payment details) or Bold (a dark header banner with a purple accent). The invoice page and the downloaded PDF both use your choice.",
  },
  {
    category: "Branding",
    q: "Can I try Invio without signing up?",
    a: "Yes. Demo mode lets you explore with sample data that stays in your own browser. Sign up when you want your invoices saved to your account.",
  },

  // Security & Data
  {
    category: "Security",
    q: "Where is my data stored?",
    a: "Your invoices, clients and business profile are stored in Google Cloud Firestore, scoped to your account with per-user security rules. Sign-in is handled by Firebase Authentication, with email/password or Google.",
  },
  {
    category: "Security",
    q: "Where is my business logo stored?",
    a: "Your logo is saved with your business profile in Firestore, so there's no separate file storage to manage.",
  },

  // Coming soon
  {
    category: "Coming soon",
    q: "Can I import bank statements and match payments?",
    a: "Not yet. CSV bank import and matching incoming payments to invoices is planned, but it isn't in the app today. For now, mark invoices as paid yourself.",
  },
  {
    category: "Coming soon",
    q: "Are there client links, team seats or paid plans?",
    a: "Shareable client links and team seats are planned, along with paid plans to go with them. Everything in Invio today is free, and prices will be published on the Pricing page before any paid plan launches.",
  },
];

const CATEGORIES = [
  "All",
  "Invoicing",
  "AI Assistant",
  "Branding",
  "Security",
  "Coming soon",
] as const;

export function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;
      const matchesSearch =
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full flex flex-col gap-16 sm:gap-20">
      {/* Header with Search and Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center pt-8 sm:pt-14">
        <Stagger immediate stagger={0.12}>
          <StaggerItem>
            <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full">
              Help & Answers
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary tracking-tight mt-4">
              Frequently Asked <span className="text-purple">Questions</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-text-secondary mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about invoicing, the AI assistant, PDF
              templates, and what&apos;s coming next.
            </p>
          </StaggerItem>

          {/* Search Input */}
          <StaggerItem>
            <div className="mt-8 max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-full text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all shadow-xs"
              />
            </div>
          </StaggerItem>

          {/* Category Filter Pills */}
          <StaggerItem>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-purple text-white shadow-xs"
                      : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-alt"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Accordion List */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {filteredFaqs.length === 0 ? (
          <div className="bg-surface rounded-3xl p-12 text-center border border-border">
            <p className="text-text-secondary text-base">
              No matching questions found for &quot;{searchQuery}&quot;.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-full"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <Stagger className="flex flex-col gap-3.5" stagger={0.07}>
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <StaggerItem key={faq.q} distance={28}>
                  <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-xs transition-colors hover:border-purple/40">
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="w-full flex items-center justify-between text-left gap-4 font-bold text-base text-text-primary cursor-pointer outline-none"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-black text-purple bg-purple/10 px-2 py-0.5 rounded-full hidden sm:inline-block">
                          {faq.category}
                        </span>
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-purple shrink-0 transition-transform duration-200 ${
                          isOpen ? "-rotate-180" : ""
                        }`}
                      />
                    </button>

                    <Collapse open={isOpen}>
                      <div className="mt-4 pt-3.5 border-t border-border/60 text-sm text-text-secondary leading-relaxed">
                        {faq.a}
                      </div>
                    </Collapse>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </section>

      {/* "Still have questions?" Callout Strip */}
      <FadeIn
        className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full"
        distance={40}
      >
        <div className="bg-surface rounded-3xl p-8 sm:p-10 border border-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl font-extrabold text-text-primary">
              Still have a question?
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Send us a message
              and we&apos;ll get back to you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              asChild
              className="rounded-full bg-purple hover:bg-purple-light text-white font-bold h-11 px-6 shadow-sm"
            >
              <Link
                href="/contact"
                className="no-underline flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Support</span>
              </Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default FaqSection;
