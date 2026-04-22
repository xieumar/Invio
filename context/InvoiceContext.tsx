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
  updateInvoice: (
    id: string,
    data: InvoiceFormData,
    status: InvoiceStatus
  ) => Promise<void>;
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

      setInvoices((prev) => [invoice, ...prev]);
      await saveInvoice(invoice);
      return invoice;
    },
    []
  );

  const updateInvoice = useCallback(
    async (id: string, data: InvoiceFormData, status?: InvoiceStatus) => {
      setInvoices((prev) => {
        const index = prev.findIndex((inv) => inv.id === id);
        if (index === -1) return prev;

        const existing = prev[index];
        const updated: Invoice = {
          ...existing,
          ...data,
          paymentDue: calcPaymentDue(data.createdAt, data.paymentTerms),
          items: data.items.map((item) => ({
            ...item,
            total: item.quantity * item.price,
          })),
          total: calcTotal(data.items),
          // Use explicit status if provided, otherwise promote draft→pending, keep everything else
          status:
            status ??
            (existing.status === "draft" ? "pending" : existing.status),
        };

        saveInvoice(updated);

        const newInvoices = [...prev];
        newInvoices[index] = updated;
        return newInvoices;
      });
    },
    []
  );

  const deleteInvoice = useCallback(async (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    await dbDelete(id);
  }, []);

  const markAsPaid = useCallback(async (id: string) => {
    setInvoices((prev) => {
      const index = prev.findIndex((inv) => inv.id === id);
      if (index === -1) return prev;

      const updated = { ...prev[index], status: "paid" as InvoiceStatus };
      saveInvoice(updated);

      const newInvoices = [...prev];
      newInvoices[index] = updated;
      return newInvoices;
    });
  }, []);

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
