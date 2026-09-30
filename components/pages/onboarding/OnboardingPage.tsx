"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/features/auth";
import {
  OnboardingWizard,
  completeOnboarding,
  type OnboardingFormValues,
} from "@/features/onboarding";

export function OnboardingPage() {
  const router = useRouter();
  const { user, userProfile, isDemoUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: Partial<OnboardingFormValues> = {
    businessName: userProfile?.displayName || user?.displayName || "",
    email: userProfile?.email || user?.email || "",
  };

  const handleComplete = async (values: OnboardingFormValues) => {
    setIsSubmitting(true);
    try {
      const activeUserId =
        user?.uid || (isDemoUser ? "demo-user" : "demo-user");
      await completeOnboarding(activeUserId, values);
      toast.success("Business profile configured successfully!");
      router.push("/invoices");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to complete setup. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-4 sm:py-8 px-4 sm:px-0">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 mb-5 group no-underline"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <Image
              src="/logo.svg"
              alt="Invio"
              width={40}
              height={40}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-text-primary">
            Invio<span className="text-purple">.</span>
          </span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          Welcome to Invio
        </h1>
        <p className="text-sm text-text-secondary mt-1.5 max-w-md">
          Let&apos;s set up your business profile so your invoices look polished
          and professional from day one.
        </p>
      </div>

      {/* Multi-step Wizard Container */}
      <OnboardingWizard
        initialValues={initialValues}
        onComplete={handleComplete}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
