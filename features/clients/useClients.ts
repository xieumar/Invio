"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { queryKeys } from "@/lib/query";
import {
  fetchClients,
  fetchClientById,
  createClient,
  updateClient,
  deleteClient,
} from "./api";

export function useClients() {
  const { user } = useAuth();
  const userId = user?.uid;

  return useQuery({
    queryKey: queryKeys.clients.list(userId),
    queryFn: () => fetchClients(userId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useClient(clientId: string) {
  const { user } = useAuth();
  const userId = user?.uid;

  return useQuery({
    queryKey: queryKeys.clients.detail(userId, clientId),
    queryFn: () => fetchClientById(userId, clientId),
    enabled: Boolean(clientId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateClient() {
  const { user } = useAuth();
  const userId = user?.uid;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClientFormData) => createClient(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.all });
    },
  });
}

export function useUpdateClient() {
  const { user } = useAuth();
  const userId = user?.uid;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      clientId,
      data,
    }: {
      clientId: string;
      data: Partial<ClientFormData>;
    }) => updateClient(userId, clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.all });
    },
  });
}

export function useDeleteClient() {
  const { user } = useAuth();
  const userId = user?.uid;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: string) => deleteClient(userId, clientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.all });
    },
  });
}
