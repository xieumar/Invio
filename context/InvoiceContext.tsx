"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Invoice, InvoiceFormData, InvoiceStatus } from "@/lib/types";
import {
  getAllInvoices,
  saveInvoice,
  deleteInvoice as dbDelete,
  seedInvoices,
} from "@/lib/db";
import { generateId, calcPaymentDue, calcTotal } from "@/lib/utils";
import { seedData } from "@/lib/seeddata";

interface InvoiceContextValue {
  invoices: Invoice[];
  loading: boolean;
  createInvoice: (
    data: InvoiceFormData,
    status: InvoiceStatus
  ) => Promise<Invoice>;
  updateInvoice: (id: string, data: InvoiceFormData) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
  getInvoice: (id: string) => Invoice | undefined;
}

const InvoiceContext = createContext<InvoiceContextValue | null>(null);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const all = await getAllInvoices();
    setInvoices(all.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
  }, []);

  useEffect(() => {
    (async () => {
      await seedInvoices(seedData);
      await refresh();
      setLoading(false);
    })();
  }, [refresh]);

  const createInvoice = useCallback(
    async (data: InvoiceFormData, status: InvoiceStatus): Promise<Invoice> => {
      const invoice: Invoice = {
        ...data,
        id: generateId(),
        status,
        paymentDue: calcPaymentDue(data.createdAt, data.paymentTerms),
        items: data.items.map((item) => ({
          ...item,
          total: item.quantity * item.price,
        })),
        total: calcTotal(data.items),
      };
      await saveInvoice(invoice);
      await refresh();
      return invoice;
    },
    [refresh]
  );

  const updateInvoice = useCallback(
    async (id: string, data: InvoiceFormData) => {
      const existing = invoices.find((inv) => inv.id === id);
      if (!existing) return;
      const updated: Invoice = {
        ...existing,
        ...data,
        paymentDue: calcPaymentDue(data.createdAt, data.paymentTerms),
        items: data.items.map((item) => ({
          ...item,
          total: item.quantity * item.price,
        })),
        total: calcTotal(data.items),
        status: existing.status === "draft" ? "pending" : existing.status,
      };
      await saveInvoice(updated);
      await refresh();
    },
    [invoices, refresh]
  );

  const deleteInvoice = useCallback(
    async (id: string) => {
      await dbDelete(id);
      await refresh();
    },
    [refresh]
  );

  const markAsPaid = useCallback(
    async (id: string) => {
      const existing = invoices.find((inv) => inv.id === id);
      if (!existing) return;
      await saveInvoice({ ...existing, status: "paid" });
      await refresh();
    },
    [invoices, refresh]
  );

  const getInvoice = useCallback(
    (id: string) => invoices.find((inv) => inv.id === id),
    [invoices]
  );

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        loading,
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
