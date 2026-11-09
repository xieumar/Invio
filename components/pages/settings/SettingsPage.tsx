"use client";

import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  StepBusinessInfo,
  StepInvoiceDefaults,
  StepPaymentDetails,
  DEFAULT_ONBOARDING_VALUES,
  useBusinessProfile,
  useSaveBusinessProfile,
} from "@/features/onboarding";
import { businessProfileSchema } from "@/lib/validations";

function toFormValues(
  profile: BusinessProfile | null | undefined
): BusinessProfileFormData {
  if (!profile) return DEFAULT_ONBOARDING_VALUES;
  return {
    businessName: profile.businessName,
    email: profile.email,
    phone: profile.phone ?? "",
    taxId: profile.taxId ?? "",
    address: profile.address,
    defaultCurrency: profile.defaultCurrency,
    defaultPaymentTerms: profile.defaultPaymentTerms,
    defaultNotes: profile.defaultNotes ?? "",
    paymentDetails: profile.paymentDetails ?? {},
  };
}

function SettingsForm({ initial }: { initial: BusinessProfileFormData }) {
  const save = useSaveBusinessProfile();
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(saved),
    [values, saved]
  );

  const update = (updates: Partial<BusinessProfileFormData>) => {
    setValues((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(updates).forEach((k) => {
        for (const e of Object.keys(next)) {
          if (e === k || e.startsWith(`${k}.`)) delete next[e];
        }
      });
      return next;
    });
  };

  async function handleSave() {
    const result = businessProfileSchema.safeParse(values);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      toast.error("Couldn't save. Please check the highlighted fields.");
      return;
    }

    try {
      await save.mutateAsync(values);
      setSaved(values);
      toast.success("Settings saved");
    } catch (err) {
      console.error("Failed to save settings:", err);
      toast.error(
        err instanceof Error
          ? `Couldn't save settings: ${err.message}`
          : "Couldn't save settings. Please try again."
      );
    }
  }

  const sectionClass =
    "bg-surface dark:bg-[#1e2139] border border-border/80 rounded-3xl p-6 sm:p-8";

  return (
    <div className="space-y-6">
      <section className={sectionClass}>
        <StepBusinessInfo values={values} onChange={update} errors={errors} />
      </section>

      <section className={sectionClass}>
        <StepInvoiceDefaults
          values={values}
          onChange={update}
          showSummary={false}
        />
      </section>

      <section className={sectionClass}>
        <StepPaymentDetails
          values={values.paymentDetails ?? {}}
          onChange={(paymentDetails) => update({ paymentDetails })}
          errors={errors}
        />
      </section>

      <div className="sticky bottom-4 flex items-center justify-end gap-3 bg-surface/90 backdrop-blur border border-border/60 rounded-2xl p-3 shadow-sm">
        {isDirty && (
          <span className="text-xs text-text-secondary mr-auto pl-2">
            You have unsaved changes
          </span>
        )}
        <Button
          type="button"
          variant="outline"
          disabled={!isDirty || save.isPending}
          onClick={() => {
            setValues(saved);
            setErrors({});
          }}
          className="h-11 px-5 rounded-xl text-xs font-semibold"
        >
          Discard
        </Button>
        <Button
          type="button"
          disabled={!isDirty || save.isPending}
          onClick={handleSave}
          className="h-11 px-6 rounded-xl bg-purple hover:bg-purple-light text-white font-bold text-xs"
        >
          {save.isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const { data: profile, isLoading } = useBusinessProfile();

  return (
    <div className="w-full max-w-3xl space-y-8">
      <header className="pb-2 border-b border-border/40">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Your business details, invoice defaults and payment information.
        </p>
      </header>

      {isLoading ? (
        <p className="text-sm text-text-secondary">Loading settings...</p>
      ) : (
        <SettingsForm initial={toFormValues(profile)} />
      )}
    </div>
  );
}

export default SettingsPage;
