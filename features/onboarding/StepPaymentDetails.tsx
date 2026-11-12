"use client";

import React from "react";
import { Landmark } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PaymentFieldConfig {
  key: PaymentFieldKey;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

export const PAYMENT_FIELDS: PaymentFieldConfig[] = [
  { key: "bankName", label: "Bank name", placeholder: "e.g. Monzo, GTBank" },
  {
    key: "accountName",
    label: "Account name",
    placeholder: "e.g. Acme Studio Ltd",
  },
  {
    key: "accountNumber",
    label: "Account number",
    placeholder: "e.g. 12345678",
  },
  {
    key: "sortCode",
    label: "Sort code / routing number",
    placeholder: "e.g. 04-00-04",
  },
  {
    key: "iban",
    label: "IBAN",
    placeholder: "e.g. GB29 NWBK 6016 1331 9268 19",
  },
  { key: "swift", label: "SWIFT / BIC", placeholder: "e.g. NWBKGB2L" },
  {
    key: "paymentLink",
    label: "Payment link",
    placeholder: "https://pay.example.com/acme",
  },
  {
    key: "instructions",
    label: "Payment instructions",
    placeholder: "e.g. Use the invoice number as your payment reference.",
    multiline: true,
  },
];

interface StepPaymentDetailsProps {
  values: PaymentDetails;
  onChange: (next: PaymentDetails) => void;
  errors: Record<string, string>;
}

export function StepPaymentDetails({
  values,
  onChange,
  errors,
}: StepPaymentDetailsProps) {
  const setField = (key: PaymentFieldKey, value: string) =>
    onChange({ ...values, [key]: value });

  const setVisible = (key: PaymentFieldKey, visible: boolean) =>
    onChange({
      ...values,
      visibility: { ...values.visibility, [key]: visible },
    });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
          <Landmark className="w-5 h-5 text-purple" />
          Payment Details
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Tell clients where to send money. These are printed on your invoices
          when &ldquo;Show on invoice&rdquo; is ticked. Invio only displays
          them; it doesn&apos;t process payments.
        </p>
      </div>

      <div className="space-y-4">
        {PAYMENT_FIELDS.map((field) => {
          const id = `pay-${field.key}`;
          const error = errors[`paymentDetails.${field.key}`];
          const value = (values[field.key] as string | null | undefined) ?? "";
          const visible = values.visibility?.[field.key] !== false;
          const inputClass = `rounded-xl ${error ? "border-red focus-visible:ring-red/30" : ""}`;

          return (
            <div key={field.key}>
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <label
                  htmlFor={id}
                  className="text-xs font-semibold text-text-primary"
                >
                  {field.label}
                </label>
                <label className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(field.key, e.target.checked)}
                    className="accent-purple w-3.5 h-3.5"
                  />
                  Show on invoice
                </label>
              </div>
              {field.multiline ? (
                <textarea
                  id={id}
                  rows={3}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => setField(field.key, e.target.value)}
                  className={`w-full p-3 border border-input bg-transparent text-sm text-text-primary placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors resize-none ${inputClass}`}
                />
              ) : (
                <Input
                  id={id}
                  type={field.key === "paymentLink" ? "url" : "text"}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => setField(field.key, e.target.value)}
                  className={`h-11 ${inputClass}`}
                />
              )}
              {error && (
                <p className="text-xs text-red mt-1 font-medium">{error}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
