"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/features/auth";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirectPath = pathname
        ? `?redirect=${encodeURIComponent(pathname)}`
        : "";
      router.replace(`/login${redirectPath}`);
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading || !isAuthenticated) {
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
              Loading Invio...
            </span>
            <span className="text-xs text-text-muted">
              Verifying your secure session
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
