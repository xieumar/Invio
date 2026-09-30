"use client";

import React from "react";
import { Clock, FileText, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { OnboardingFormValues } from "./types";

interface StepInvoiceDefaultsProps {
  values: OnboardingFormValues;
  onChange: (updates: Partial<OnboardingFormValues>) => void;
}

const PAYMENT_TERMS_OPTIONS = [
  { days: 7, label: "Net 7 Days", desc: "Due 1 week after issue" },
  { days: 14, label: "Net 14 Days", desc: "Standard freelance term" },
  { days: 30, label: "Net 30 Days", desc: "Corporate / agency default" },
  { days: 60, label: "Net 60 Days", desc: "Extended enterprise term" },
];

export function StepInvoiceDefaults({
  values,
  onChange,
}: StepInvoiceDefaultsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-text-primary tracking-tight">
          Invoice Preferences
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Set your default payment schedules and memo text. You can change these
          on any invoice.
        </p>
      </div>

      <div className="space-y-5">
        {/* Payment Terms Grid Selector */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple" />
            <span>Default Payment Terms</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PAYMENT_TERMS_OPTIONS.map((term) => {
              const isSelected = values.defaultPaymentTerms === term.days;
              return (
                <button
                  key={term.days}
                  type="button"
                  onClick={() => onChange({ defaultPaymentTerms: term.days })}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between ${
                    isSelected
                      ? "border-purple bg-purple/10 text-purple dark:text-purple-light shadow-sm"
                      : "border-border/80 bg-surface dark:bg-surface-dark hover:bg-surface-alt text-text-primary"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm">{term.label}</div>
                    <div className="text-xs text-text-secondary mt-0.5">
                      {term.desc}
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-purple shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Default Notes */}
        <div>
          <label
            htmlFor="biz-notes"
            className="block text-xs font-semibold text-text-primary mb-1.5 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-purple" />
            <span>Default Invoice Notes & Remittance</span>
          </label>
          <textarea
            id="biz-notes"
            rows={3}
            placeholder="e.g. Please send payment via bank transfer. Thank you for your business!"
            value={values.defaultNotes || ""}
            onChange={(e) => onChange({ defaultNotes: e.target.value })}
            className="w-full p-3 rounded-xl border border-input bg-transparent text-sm text-text-primary placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors resize-none"
          />
        </div>

        {/* Live Summary Preview Card */}
        <div className="p-4 rounded-2xl bg-surface-alt dark:bg-[#1e2139] border border-border/70 space-y-2.5">
          <span className="text-[10px] font-bold text-purple uppercase tracking-wider block">
            Workspace Summary
          </span>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Business:</span>
            <span className="font-bold text-text-primary">
              {values.businessName || "Not set"}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Billing Email:</span>
            <span className="font-medium text-text-primary">
              {values.email || "Not set"}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Currency:</span>
            <span className="font-bold text-text-primary">
              {values.defaultCurrency}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Terms:</span>
            <span className="font-bold text-text-primary">
              Net {values.defaultPaymentTerms} Days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
