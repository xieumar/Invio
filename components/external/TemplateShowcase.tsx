"use client";

import { useState } from "react";
import { InvoicePreview } from "@/features/invoices/InvoicePreview";
import { SAMPLE_INVOICE_VIEW } from "@/features/invoices/sampleView";
import { INVOICE_TEMPLATES } from "@/features/invoices/templates";

/** Live preview of the three PDF templates, switchable by tab. */
export function TemplateShowcase() {
  const [active, setActive] = useState<InvoiceTemplate>("bold");
  const current = INVOICE_TEMPLATES.find((t) => t.id === active);

  return (
    <div className="bg-surface rounded-3xl p-5 sm:p-8 border border-border shadow-card flex flex-col gap-5">
      <div
        role="tablist"
        aria-label="Invoice template"
        className="flex gap-2 justify-center"
      >
        {INVOICE_TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              active === t.id
                ? "bg-purple text-white shadow-xs"
                : "bg-surface-alt border border-border text-text-secondary hover:text-text-primary"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mx-auto w-full max-w-sm">
        <InvoicePreview view={SAMPLE_INVOICE_VIEW} template={active} fixedA4 />
      </div>

      {current && (
        <p className="text-xs text-text-secondary text-center leading-relaxed">
          {current.description}
        </p>
      )}
    </div>
  );
}

export default TemplateShowcase;
