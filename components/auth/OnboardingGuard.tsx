"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/features/auth";
import { getOnboardingStatus } from "@/features/onboarding";
import { LoadingScreen } from "./LoadingScreen";

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
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
