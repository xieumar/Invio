"use client";

import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/features/auth";
import { queryKeys } from "@/lib/query";
import { getAllInvoices } from "@/lib/db";
import { getBusinessProfile } from "@/features/onboarding/api";

export interface DashboardMetricsSummary {
  totalInvoiced: number;
  outstandingRevenue: number;
  paidBalance: number;
  overdueCount: number;
  totalInvoicesCount: number;
  currency: CurrencyCode;
}

export function calculateMetricsFromInvoices(
  invoices: Invoice[],
  defaultCurrency: CurrencyCode = "GBP"
): DashboardMetricsSummary {
  const now = new Date();
  let totalInvoiced = 0;
  let outstandingRevenue = 0;
  let paidBalance = 0;
  let overdueCount = 0;

  for (const inv of invoices) {
    if (inv.status === "cancelled") continue;

    // Total Invoiced includes all non-cancelled invoices
    totalInvoiced += inv.total;

    if (inv.status === "paid") {
      paidBalance += inv.total;
    } else if (inv.status === "pending") {
      outstandingRevenue += inv.total;

      // Check if past due date
      if (inv.paymentDue && new Date(inv.paymentDue) < now) {
        overdueCount += 1;
      }
    } else if (inv.status === "overdue") {
      outstandingRevenue += inv.total;
      overdueCount += 1;
    }
  }

  const currency = invoices[0]?.currency || defaultCurrency || "GBP";

  return {
    totalInvoiced,
    outstandingRevenue,
    paidBalance,
    overdueCount,
    totalInvoicesCount: invoices.length,
    currency,
  };
}

export async function fetchDashboardInvoices(
  userId?: string | null
): Promise<Invoice[]> {
  if (!userId || userId === "demo-user") {
    return getAllInvoices();
  }

  try {
    const invoicesRef = collection(db, "users", userId, "invoices");
    const snapshot = await getDocs(invoicesRef);

    if (snapshot.empty) {
      // Fallback to local IndexedDB if Firestore is not yet populated
      return getAllInvoices();
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      } as Invoice;
    });
  } catch {
    return getAllInvoices();
  }
}

export function useDashboardMetrics() {
  const { user } = useAuth();
  const userId = user?.uid;

  return useQuery({
    queryKey: queryKeys.metrics.overview(userId),
    queryFn: async (): Promise<DashboardMetricsSummary> => {
      const [invoices, profile] = await Promise.all([
        fetchDashboardInvoices(userId),
        userId
          ? getBusinessProfile(userId).catch(() => null)
          : Promise.resolve(null),
      ]);

      const defaultCurrency =
        (profile?.defaultCurrency as CurrencyCode) || "GBP";
      return calculateMetricsFromInvoices(invoices, defaultCurrency);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useRecentInvoices(limit = 5) {
  const { user } = useAuth();
  const userId = user?.uid;

  return useQuery({
    queryKey: [...queryKeys.invoices.list(userId), { limit }],
    queryFn: async (): Promise<Invoice[]> => {
      const all = await fetchDashboardInvoices(userId);
      const sorted = [...all].sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
      return sorted.slice(0, limit);
    },
    staleTime: 5 * 60 * 1000,
  });
}
