"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Collapse, FadeIn, Stagger, StaggerItem } from "@/components/motion";

const FAQ_ITEMS = [
  {
    q: "What makes Invio different from traditional invoice tools?",
    a: "Invio combines beautiful typography with integer-accurate math and built-in AI assistance. Instead of filling out tedious forms, you can draft invoices with conversational AI, then export them as branded PDFs in your choice of three templates.",
  },
  {
    q: "How does the AI assistant help me with billing?",
    a: "Describe the work in plain English and the assistant prefills your invoice's line items for you to review. For late payments it drafts a reminder email in a friendly, firm or urgent tone. It never saves or sends anything on its own.",
  },
  {
    q: "Can I customise how my invoices look?",
    a: "Yes. Add your logo and payment details in Settings, then choose Minimal, Classic or Bold as your PDF template. The invoice page shows your invoice in the template you picked, and the downloaded PDF matches it.",
  },
  {
    q: "Is my financial data secure?",
    a: "Your invoices, clients and business details are stored per account in Google's Firestore, and AI requests run server-side with rate limiting, so your API keys never reach the browser. You can also try Invio in demo mode, where data stays in your own browser.",
  },
];

export function FaqPreviewSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <FadeIn className="text-center mb-12" distance={32}>
        <span className="text-purple text-xs font-bold uppercase tracking-wider">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-2">
          Frequently Asked Questions
        </h2>
      </FadeIn>

      <Stagger className="flex flex-col gap-4" stagger={0.1}>
        {FAQ_ITEMS.map((faq, i) => (
          <StaggerItem key={i} distance={28}>
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs transition-colors hover:border-purple/40">
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
              <Collapse open={openIndex === i}>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  {faq.a}
                </p>
              </Collapse>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

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
