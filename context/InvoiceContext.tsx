"use client";

import React, { createContext, useContext, useCallback } from "react";
import {
  useInvoices as useInvoicesQuery,
  useCreateInvoice,
  useUpdateInvoice,
  useDeleteInvoice,
  useUpdateInvoiceStatus,
} from "@/features/invoices";

interface InvoiceContextValue {
  invoices: Invoice[];
  loading: boolean;
  createInvoice: (
    data: InvoiceFormData,
    status: InvoiceStatus
  ) => Promise<Invoice>;
  updateInvoice: (
    id: string,
    data: InvoiceFormData,
    status?: InvoiceStatus
  ) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
  getInvoice: (id: string) => Invoice | undefined;
}

const InvoiceContext = createContext<InvoiceContextValue | null>(null);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const { data: invoices = [], isLoading } = useInvoicesQuery();
  const createMutation = useCreateInvoice();
  const updateMutation = useUpdateInvoice();
  const deleteMutation = useDeleteInvoice();
  const updateStatusMutation = useUpdateInvoiceStatus();

  const createInvoice = useCallback(
    async (data: InvoiceFormData, status: InvoiceStatus): Promise<Invoice> => {
      return await createMutation.mutateAsync({ data, status });
    },
    [createMutation]
  );

  const updateInvoice = useCallback(
    async (id: string, data: InvoiceFormData, status?: InvoiceStatus) => {
      await updateMutation.mutateAsync({ id, data, status });
    },
    [updateMutation]
  );

  const deleteInvoice = useCallback(
    async (id: string) => {
      await deleteMutation.mutateAsync(id);
    },
    [deleteMutation]
  );

  const markAsPaid = useCallback(
    async (id: string) => {
      await updateStatusMutation.mutateAsync({ invoiceId: id, status: "paid" });
    },
    [updateStatusMutation]
  );

  const getInvoice = useCallback(
    (id: string) => invoices.find((inv) => inv.id === id),
    [invoices]
  );

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        loading: isLoading,
        createInvoice,
        updateInvoice,
        deleteInvoice,
        markAsPaid,
        getInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const ctx = useContext(InvoiceContext);
  if (!ctx) throw new Error("useInvoices must be used within InvoiceProvider");
  return ctx;
}
