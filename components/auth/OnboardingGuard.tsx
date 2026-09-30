"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/features/auth";
import { getOnboardingStatus } from "@/features/onboarding";

export interface OnboardingGuardProps {
  children: React.ReactNode;
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const { user, isDemoUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  const checkStatus = useCallback(async () => {
    if (authLoading) return;

    if (isDemoUser) {
      // Demo user can freely access workspace; if they explicitly visit /onboarding, allow them
      setIsOnboarded(true);
      setChecking(false);
      return;
    }

    if (!user) {
      setChecking(false);
      return;
    }

    try {
      const status = await getOnboardingStatus(user.uid);
      setIsOnboarded(status.isCompleted);
    } catch {
      // Fallback safely if offline
      setIsOnboarded(true);
    } finally {
      setChecking(false);
    }
  }, [authLoading, isDemoUser, user]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus, pathname]);

  useEffect(() => {
    if (checking || isOnboarded === null) return;

    const isOnboardingRoute = pathname === "/onboarding";

    if (!isOnboarded && !isOnboardingRoute) {
      // Un-onboarded user attempting to access dashboard views -> force redirect to /onboarding
      router.replace("/onboarding");
    } else if (isOnboarded && isOnboardingRoute && !isDemoUser) {
      // Completed account trying to revisit /onboarding -> redirect to /invoices
      router.replace("/invoices");
    }
  }, [checking, isOnboarded, isDemoUser, pathname, router]);

  // Loading skeleton while verifying onboarding status or redirecting
  const shouldBlockContent =
    checking ||
    (isOnboarded === false && pathname !== "/onboarding") ||
    (isOnboarded === true && pathname === "/onboarding" && !isDemoUser);

  if (shouldBlockContent) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg text-text-primary p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center w-14 h-14">
            <div className="w-12 h-12 rounded-2xl bg-purple/10 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Invio"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-purple border-t-transparent animate-spin" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-semibold text-text-primary tracking-wide">
              Preparing your workspace...
            </span>
            <span className="text-xs text-text-muted">
              Checking account configuration
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
