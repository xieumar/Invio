"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { queryKeys } from "@/lib/query";
import {
  fetchInvoices,
  fetchInvoiceById,
  createInvoiceRecord,
  updateInvoiceRecord,
  updateInvoiceStatus,
  deleteInvoiceRecord,
} from "./api";

export function useInvoices(filter?: string) {
  const { user } = useAuth();
  const userId = user?.uid;

  return useQuery({
    queryKey: queryKeys.invoices.list(userId),
    queryFn: () => fetchInvoices(userId),
    select: (invoices) => {
      if (!filter) return invoices;
      return invoices.filter((inv) => inv.status === filter);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useInvoice(invoiceId: string) {
  const { user } = useAuth();
  const userId = user?.uid;

  return useQuery({
    queryKey: queryKeys.invoices.detail(userId, invoiceId),
    queryFn: () => fetchInvoiceById(userId, invoiceId),
    enabled: Boolean(invoiceId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateInvoice() {
  const { user } = useAuth();
  const userId = user?.uid;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      status = "pending",
    }: {
      data: InvoiceFormData;
      status?: InvoiceStatus;
    }) => createInvoiceRecord(userId, data, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.metrics.all });
    },
  });
}

export function useUpdateInvoice() {
  const { user } = useAuth();
  const userId = user?.uid;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      status,
    }: {
      id: string;
      data: Partial<InvoiceFormData>;
      status?: InvoiceStatus;
    }) => updateInvoiceRecord(userId, id, data, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.invoices.detail(userId, variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.metrics.all });
    },
  });
}

export function useUpdateInvoiceStatus() {
  const { user } = useAuth();
  const userId = user?.uid;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      invoiceId,
      status,
    }: {
      invoiceId: string;
      status: InvoiceStatus;
    }) => updateInvoiceStatus(userId, invoiceId, status),
    onMutate: async ({ invoiceId, status }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.invoices.all });

      const previousInvoices = queryClient.getQueryData<Invoice[]>(
        queryKeys.invoices.list(userId)
      );

      if (previousInvoices) {
        queryClient.setQueryData<Invoice[]>(
          queryKeys.invoices.list(userId),
          previousInvoices.map((inv) =>
            inv.id === invoiceId
              ? {
                  ...inv,
                  status,
                  paidAt: status === "paid" ? new Date().toISOString() : null,
                }
              : inv
          )
        );
      }

      return { previousInvoices };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousInvoices) {
        queryClient.setQueryData(
          queryKeys.invoices.list(userId),
          context.previousInvoices
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.invoices.detail(userId, variables?.invoiceId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.metrics.all });
    },
  });
}

export function useDeleteInvoice() {
  const { user } = useAuth();
  const userId = user?.uid;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInvoiceRecord(userId, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.invoices.all });

      const previousInvoices = queryClient.getQueryData<Invoice[]>(
        queryKeys.invoices.list(userId)
      );

      if (previousInvoices) {
        queryClient.setQueryData<Invoice[]>(
          queryKeys.invoices.list(userId),
          previousInvoices.filter((inv) => inv.id !== id)
        );
      }

      return { previousInvoices };
    },
    onError: (_err, _id, context) => {
      if (context?.previousInvoices) {
        queryClient.setQueryData(
          queryKeys.invoices.list(userId),
          context.previousInvoices
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.metrics.all });
    },
  });
}
