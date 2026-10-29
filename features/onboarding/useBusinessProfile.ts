"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { getBusinessProfile } from "./api";

export function useBusinessProfile() {
  const { user } = useAuth();
  const userId = user?.uid ?? "demo-user";

  return useQuery({
    queryKey: ["businessProfile", userId],
    queryFn: () => getBusinessProfile(userId),
    staleTime: 5 * 60 * 1000,
  });
}
