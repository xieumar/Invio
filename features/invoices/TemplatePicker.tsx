"use client";

import React, { useEffect, useState } from "react";
import { Check, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { INVOICE_TEMPLATES } from "./templates";
import { InvoicePreview } from "./InvoicePreview";
import type { InvoiceView } from "./pdf/view";

/** Sample invoice used for the thumbnails. */
const SAMPLE_VIEW: InvoiceView = {
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

function Preview({ id }: { id: InvoiceTemplate }) {
  return <InvoicePreview view={SAMPLE_VIEW} template={id} fixedA4 />;
}

/* ------------------------------------------------------------------ */
/* Picker                                                              */
/* ------------------------------------------------------------------ */

export function TemplatePicker({
  value,
  onChange,
}: {
  value: InvoiceTemplate;
  onChange: (next: InvoiceTemplate) => void;
}) {
  const [enlarged, setEnlarged] = useState<InvoiceTemplate | null>(null);

  useEffect(() => {
    if (!enlarged) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setEnlarged(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enlarged]);

  const enlargedMeta = INVOICE_TEMPLATES.find((t) => t.id === enlarged);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-text-primary tracking-tight">
          Invoice Template
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Choose how your PDF invoices look. Previews show a sample invoice;
          your own details fill in when you download. Your choice is used for
          every PDF you download.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Invoice template"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {INVOICE_TEMPLATES.map((t) => {
          const selected = value === t.id;
          return (
            <div
              key={t.id}
              className={cn(
                "rounded-2xl border p-3 transition-all",
                selected
                  ? "border-purple bg-purple/5 ring-2 ring-purple/30"
                  : "border-border/80 hover:border-purple/50"
              )}
            >
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${t.name} template`}
                onClick={() => onChange(t.id)}
                className="block w-full text-left cursor-pointer"
              >
                <div className="mx-auto max-w-64 sm:max-w-none">
                  <Preview id={t.id} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-text-primary">
                    {t.name}
                  </span>
                  {selected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple">
                      <Check className="w-4 h-4" /> Selected
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-text-secondary">
                      Use this
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary mt-0.5">
                  {t.description}
                </p>
              </button>
              <button
                type="button"
                onClick={() => setEnlarged(t.id)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-purple hover:underline cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" /> View larger
              </button>
            </div>
          );
        })}
      </div>

      {enlarged && enlargedMeta && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${enlargedMeta.name} template preview`}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:p-8"
          onClick={() => setEnlarged(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-base font-bold text-text-primary">
                {enlargedMeta.name}
              </span>
              <button
                type="button"
                aria-label="Close preview"
                onClick={() => setEnlarged(null)}
                className="cursor-pointer rounded-full p-1 hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Preview id={enlargedMeta.id} />
            <button
              type="button"
              onClick={() => {
                onChange(enlargedMeta.id);
                setEnlarged(null);
              }}
              className="mt-4 w-full cursor-pointer rounded-full bg-purple py-3 text-sm font-bold text-white hover:opacity-90"
            >
              {value === enlargedMeta.id
                ? "Currently selected"
                : `Use ${enlargedMeta.name}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
