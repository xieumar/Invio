"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What makes Invio different from traditional invoice tools?",
    a: "Invio combines beautiful typography with integer-accurate math and built-in AI assistance. Instead of filling out tedious forms, you can draft invoices using conversational AI and automatically reconcile bank statements using CSV imports.",
  },
  {
    q: "How does the AI assistant help me with billing?",
    a: "Invio's AI can generate full invoice line items from a short work description, calculate payment milestones, detect overdue payments, and draft polite follow-up reminders.",
  },
  {
    q: "Can I import bank statements to track expenses?",
    a: "Yes! You can upload standard CSV bank exports from Monzo, Starling, Revolut, HSBC, Barclays, or Stripe. Invio auto-categorizes transactions and matches incoming credits to open invoices.",
  },
  {
    q: "Is my financial data secure?",
    a: "Absolutely. All data is encrypted in transit and at rest. We never sell your financial records or train public AI models on your private accounting data.",
  },
];

export function FaqPreviewSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="text-center mb-12">
        <span className="text-purple text-xs font-bold uppercase tracking-wider">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-2">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {FAQ_ITEMS.map((faq, i) => (
          <div
            key={i}
            className="bg-surface rounded-2xl border border-border p-6 shadow-xs transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between text-left gap-4 font-bold text-base text-text-primary cursor-pointer outline-none"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-purple shrink-0 transition-transform duration-200 ${
                  openIndex === i ? "-rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <p className="mt-3 text-sm text-text-secondary leading-relaxed animate-in fade-in duration-150">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/faq"
          className="text-sm font-bold text-purple hover:underline inline-flex items-center gap-1.5"
        >
          <span>Have more questions? Read our full FAQ</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}

export default FaqPreviewSection;
