"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { queryKeys } from "@/lib/query";
import { fetchInvoices } from "@/features/invoices";
import { getEffectiveStatus } from "@/lib/invoice-status";
import { getBusinessProfile } from "@/features/onboarding/api";
import { convertAmount, type ExchangeRates } from "@/lib/money";
import { fetchExchangeRates } from "./useExchangeRates";

export interface DashboardMetricsSummary {
  totalInvoiced: number;
  outstandingRevenue: number;
  paidBalance: number;
  overdueCount: number;
  totalInvoicesCount: number;
  /** Currency every amount above is expressed in */
  currency: CurrencyCode;
  /** True when at least one invoice in another currency was converted */
  hasConverted: boolean;
  /** Foreign-currency invoices left out because no rate was available */
  unconvertedCount: number;
  ratesUpdatedAt?: string;
}

export function calculateMetricsFromInvoices(
  invoices: Invoice[],
  defaultCurrency: CurrencyCode = "GBP",
  rates?: ExchangeRates | null
): DashboardMetricsSummary {
  const now = new Date();
  let totalInvoiced = 0;
  let outstandingRevenue = 0;
  let paidBalance = 0;
  let overdueCount = 0;
  let hasConverted = false;
  let unconvertedCount = 0;

  for (const inv of invoices) {
    if (inv.status === "cancelled") continue;

    const invCurrency = inv.currency || defaultCurrency;
    const amount = convertAmount(inv.total, invCurrency, defaultCurrency, rates);
    if (amount === null) {
      unconvertedCount += 1;
      continue;
    }
    if (invCurrency.toUpperCase() !== defaultCurrency.toUpperCase()) {
      hasConverted = true;
    }

    // Total Invoiced includes all non-cancelled invoices
    totalInvoiced += amount;

    const status = getEffectiveStatus(inv, now);
    if (status === "paid") {
      paidBalance += amount;
    } else if (status === "pending") {
      outstandingRevenue += amount;
    } else if (status === "overdue") {
      outstandingRevenue += amount;
      overdueCount += 1;
    }
  }

  return {
    totalInvoiced,
    outstandingRevenue,
    paidBalance,
    overdueCount,
    totalInvoicesCount: invoices.length,
    currency: defaultCurrency || "GBP",
    hasConverted,
    unconvertedCount,
    ratesUpdatedAt: rates?.updatedAt,
  };
}

export async function fetchDashboardInvoices(
  userId?: string | null
): Promise<Invoice[]> {
  return fetchInvoices(userId);
}

export function useDashboardMetrics() {
  const { user } = useAuth();
  const userId = user?.uid;

  return useQuery({
    queryKey: queryKeys.metrics.overview(userId),
    queryFn: async (): Promise<DashboardMetricsSummary> => {
      const [invoices, profile] = await Promise.all([
        fetchDashboardInvoices(userId),
        getBusinessProfile(userId ?? "demo-user").catch(() => null),
      ]);

      const defaultCurrency =
        (profile?.defaultCurrency as CurrencyCode) || "GBP";

      const needsRates = invoices.some(
        (inv) =>
          inv.status !== "cancelled" &&
          (inv.currency || defaultCurrency).toUpperCase() !==
            defaultCurrency.toUpperCase()
      );
      const rates = needsRates
        ? await fetchExchangeRates(defaultCurrency)
        : null;

      return calculateMetricsFromInvoices(invoices, defaultCurrency, rates);
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
