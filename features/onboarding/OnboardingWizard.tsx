"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Building2,
  Sliders,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepBusinessInfo } from "./StepBusinessInfo";
import { StepInvoiceDefaults } from "./StepInvoiceDefaults";
import { DEFAULT_ONBOARDING_VALUES, type OnboardingFormValues } from "./types";

interface OnboardingWizardProps {
  initialValues?: Partial<OnboardingFormValues>;
  onComplete: (values: OnboardingFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}

export function OnboardingWizard({
  initialValues,
  onComplete,
  isSubmitting = false,
}: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formValues, setFormValues] = useState<OnboardingFormValues>({
    ...DEFAULT_ONBOARDING_VALUES,
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleUpdate = (updates: Partial<OnboardingFormValues>) => {
    setFormValues((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(updates).forEach((k) => delete next[k]);
      return next;
    });
  };

  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formValues.businessName.trim()) {
      errs.businessName = "Business name is required";
    }
    if (!formValues.email.trim()) {
      errs.email = "Billing email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formValues.address.street.trim()) {
      errs["address.street"] = "Street address is required";
    }
    if (!formValues.address.city.trim()) {
      errs["address.city"] = "City is required";
    }
    if (!formValues.address.postCode.trim()) {
      errs["address.postCode"] = "Postal code is required";
    }
    if (!formValues.address.country.trim()) {
      errs["address.country"] = "Country is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else {
      onComplete(formValues);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  return (
    <div className="w-full bg-surface dark:bg-[#1e2139] border border-border/80 rounded-3xl shadow-[0_20px_50px_rgba(72,84,159,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-6 sm:p-10 transition-all">
      {/* Wizard Step Navigation Indicator */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          {/* Step 1 Pill */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 1
                  ? "bg-purple text-white shadow-md shadow-purple/25 ring-4 ring-purple/20"
                  : "bg-paid-bg text-paid-text"
              }`}
            >
              {currentStep > 1 ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <span
              className={`text-xs font-semibold hidden sm:inline ${
                currentStep === 1 ? "text-text-primary" : "text-text-muted"
              }`}
            >
              Business Info
            </span>
          </div>

          {/* Divider line */}
          <div className="w-8 sm:w-16 h-0.5 bg-border/80" />

          {/* Step 2 Pill */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 2
                  ? "bg-purple text-white shadow-md shadow-purple/25 ring-4 ring-purple/20"
                  : "bg-surface-alt dark:bg-[#252945] text-text-muted"
              }`}
            >
              2
            </div>
            <span
              className={`text-xs font-semibold hidden sm:inline ${
                currentStep === 2 ? "text-text-primary" : "text-text-muted"
              }`}
            >
              Invoice Defaults
            </span>
          </div>
        </div>

        <span className="text-xs font-medium text-text-muted">
          Step {currentStep} of 2
        </span>
      </div>

      {/* Step Content */}
      <div className="min-h-[380px]">
        {currentStep === 1 ? (
          <StepBusinessInfo
            values={formValues}
            onChange={handleUpdate}
            errors={errors}
          />
        ) : (
          <StepInvoiceDefaults values={formValues} onChange={handleUpdate} />
        )}
      </div>

      {/* Bottom Step Actions */}
      <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/60">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isSubmitting}
            className="h-11 px-5 rounded-xl border-border/80 hover:bg-surface-alt font-semibold text-xs flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        ) : (
          <div />
        )}

        <Button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-purple hover:bg-purple-light text-white font-bold text-xs shadow-lg shadow-purple/20 flex items-center gap-2"
        >
          {currentStep === 1 ? (
            <>
              <span>Continue to Defaults</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? "Setting up..." : "Complete Setup"}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
