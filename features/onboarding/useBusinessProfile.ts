"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import {
  getBusinessProfile,
  saveBusinessProfile,
  uploadBusinessLogo,
  removeBusinessLogo,
} from "./api";

export function useBusinessProfile() {
  const { user } = useAuth();
  const userId = user?.uid ?? "demo-user";

  return useQuery({
    queryKey: ["businessProfile", userId],
    queryFn: () => getBusinessProfile(userId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSaveBusinessProfile() {
  const { user } = useAuth();
  const userId = user?.uid ?? "demo-user";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BusinessProfileFormData) =>
      saveBusinessProfile(userId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["businessProfile", userId] }),
  });
}

export function useUploadLogo() {
  const { user } = useAuth();
  const userId = user?.uid ?? "demo-user";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadBusinessLogo(userId, file),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["businessProfile", userId] }),
  });
}

export function useRemoveLogo() {
  const { user } = useAuth();
  const userId = user?.uid ?? "demo-user";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeBusinessLogo(userId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["businessProfile", userId] }),
  });
}
