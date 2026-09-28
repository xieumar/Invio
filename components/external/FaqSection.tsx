"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqItem {
  category: "Invoicing" | "AI Copilot" | "Bank & CSV" | "Security";
  q: string;
  a: string;
}

const ALL_FAQS: FaqItem[] = [
  // Invoicing & Math
  {
    category: "Invoicing",
    q: "Why does Invio store money using integers instead of decimals?",
    a: "Standard floating-point numbers in computers suffer from rounding discrepancies (e.g. 0.1 + 0.2 = 0.30000000000000004). Invio stores all monetary values in minor units (pence or cents) as pure integers and only formats them to decimals for display. This guarantees 100% mathematical precision across multi-item invoices, VAT calculations, and discounts.",
  },
  {
    category: "Invoicing",
    q: "Can I customize the payment terms and due dates?",
    a: "Yes. You can choose from Net 1, Net 7, Net 14, Net 30, or configure custom milestone days. The payment due date automatically recalculates in real-time as you modify the invoice issue date or change payment terms.",
  },
  {
    category: "Invoicing",
    q: "What currencies does Invio support?",
    a: "Invio supports British Pounds (GBP £), US Dollars (USD $), and Euros (EUR €). You can set a global default currency for your business profile, while overriding currencies for individual international clients.",
  },
  {
    category: "Invoicing",
    q: "How do clients pay invoices sent through Invio?",
    a: "You can download high-resolution vector PDFs to send via email, or share a live link. The client portal displays your payment instructions, including bank account details (Sort Code/Account Number or IBAN/SWIFT) and accepted payment terms.",
  },

  // AI Copilot
  {
    category: "AI Copilot",
    q: "How does the AI invoice drafting feature work?",
    a: "You describe the work you performed in conversational language (e.g., 'Invoice Acme for 25 hours of brand design at £90/hr with Net 14 terms'). The Invio AI Copilot parses the description, identifies or creates the client, calculates hours and item sums, and populates a draft invoice ready for your review in under 3 seconds.",
  },
  {
    category: "AI Copilot",
    q: "Does the AI ever send invoices automatically without my permission?",
    a: "Never. Invio follows a strict human-in-the-loop philosophy. The AI drafts and suggests, but you must explicitly click 'Send' or 'Approve'. You have full edit access to every line item, description, and total before anything is finalized.",
  },
  {
    category: "AI Copilot",
    q: "How do automated payment reminders work?",
    a: "You can enable automatic reminder sequences for pending invoices. Invio schedules friendly, professional email notifications prior to the due date (e.g. 2 days before) and courteous overdue reminders if a deposit has not yet cleared in your records.",
  },

  // Bank & CSV
  {
    category: "Bank & CSV",
    q: "Why use CSV statement imports instead of Open Banking?",
    a: "Many independent freelancers and boutique agencies prefer not to connect third-party aggregator services to their live bank accounts for privacy reasons. By uploading standard CSV exports from Monzo, Revolut, Starling, Barclays, HSBC, or Stripe, you maintain complete data sovereignty while still enjoying automatic transaction matching.",
  },
  {
    category: "Bank & CSV",
    q: "What bank CSV formats are supported?",
    a: "Invio has built-in smart parsers for Monzo, Revolut, Starling Bank, HSBC, Barclays, Stripe, Wise, and standard generic CSV templates. Our engine automatically detects the date format, description column, and credit/debit figures.",
  },
  {
    category: "Bank & CSV",
    q: "How does deposit matching reconcile invoices?",
    a: "Invio performs fuzzy matching on incoming bank credits against your list of pending invoices. It compares the transaction amount, date window, and reference tags (such as client names or invoice IDs like #RT3080). When a match is confirmed, the invoice status updates to 'Paid' instantly.",
  },

  // Security & Data
  {
    category: "Security",
    q: "Where is my data stored and is it encrypted?",
    a: "All invoice records and user profiles are stored in encrypted cloud databases protected by strict per-user security rules. Data is encrypted both in transit (TLS 1.3) and at rest (AES-256).",
  },
  {
    category: "Security",
    q: "Is my financial data used to train public AI models?",
    a: "No. Your accounting data, invoice line items, and transaction CSVs are strictly private to your account. We never sell your data or use your private business records to train public AI models.",
  },
  {
    category: "Security",
    q: "Can I export all of my data if I decide to leave?",
    a: "Yes. You can export your complete invoice history, client records, and transaction logs in standard JSON or CSV format at any time with a single click.",
  },
];

const CATEGORIES = [
  "All",
  "Invoicing",
  "AI Copilot",
  "Bank & CSV",
  "Security",
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
        <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full">
          Help & Answers
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary tracking-tight mt-4">
          Frequently Asked <span className="text-purple">Questions</span>
        </h1>
        <p className="text-text-secondary mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about our integer math engine,
          conversational AI copilot, and CSV reconciliations.
        </p>

        {/* Search Input */}
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

        {/* Category Filter Pills */}
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
          <div className="flex flex-col gap-3.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-xs transition-colors hover:border-purple/40"
                >
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

                  {isOpen && (
                    <div className="mt-4 pt-3.5 border-t border-border/60 text-sm text-text-secondary leading-relaxed animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* "Still have questions?" Callout Strip */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-surface rounded-3xl p-8 sm:p-10 border border-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl font-extrabold text-text-primary">
              Still have a question?
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Our team typically
              responds to support inquiries within 24 hours.
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
      </section>
    </div>
  );
}

export default FaqSection;
