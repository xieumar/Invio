"use client";

import React from "react";
import { Wallet, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { useDashboardMetrics } from "@/features/dashboard/useDashboardMetrics";
import { formatMoney, toMinorUnits } from "@/lib/money";

export function DashboardMetrics() {
  const { data: metrics, isLoading } = useDashboardMetrics();

  const currency = metrics?.currency || "GBP";

  const totalInvoicedFormatted = metrics
    ? formatMoney(toMinorUnits(metrics.totalInvoiced), currency)
    : "£0.00";

  const outstandingRevenueFormatted = metrics
    ? formatMoney(toMinorUnits(metrics.outstandingRevenue), currency)
    : "£0.00";

  const paidBalanceFormatted = metrics
    ? formatMoney(toMinorUnits(metrics.paidBalance), currency)
    : "£0.00";

  const overdueInvoicesCount = metrics?.overdueCount ?? 0;

  // Collection percentage calculation
  const collectionRate =
    metrics && metrics.totalInvoiced > 0
      ? Math.round((metrics.paidBalance / metrics.totalInvoiced) * 100)
      : 100;

  return (
    <section aria-labelledby="metrics-heading" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2
          id="metrics-heading"
          className="text-sm font-bold uppercase tracking-wider text-text-secondary"
        >
          Financial Performance
        </h2>
        <span className="text-xs text-text-muted">Updated in real-time</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Total Invoiced"
          value={totalInvoicedFormatted}
          badgeText="All Time"
          subtitle={
            metrics
              ? `${metrics.totalInvoicesCount} ${
                  metrics.totalInvoicesCount === 1 ? "invoice" : "invoices"
                } recorded`
              : "0 invoices recorded"
          }
          icon={<Wallet className="w-5 h-5" />}
          variant="primary"
          isLoading={isLoading}
        />

        <MetricCard
          title="Outstanding Revenue"
          value={outstandingRevenueFormatted}
          badgeText="Receivables"
          subtitle="Pending customer payment"
          icon={<Clock className="w-5 h-5" />}
          variant="warning"
          isLoading={isLoading}
        />

        <MetricCard
          title="Paid Balance"
          value={paidBalanceFormatted}
          badgeText={`${collectionRate}% Collected`}
          subtitle="Successfully settled"
          icon={<CheckCircle2 className="w-5 h-5" />}
          variant="success"
          isLoading={isLoading}
        />

        <MetricCard
          title="Overdue Invoices"
          value={`${overdueInvoicesCount}`}
          badgeText={overdueInvoicesCount > 0 ? "Action Required" : "Healthy"}
          subtitle={
            overdueInvoicesCount > 0
              ? `${overdueInvoicesCount} ${
                  overdueInvoicesCount === 1 ? "invoice" : "invoices"
                } past due date`
              : "All invoices on schedule"
          }
          icon={<AlertCircle className="w-5 h-5" />}
          variant={overdueInvoicesCount > 0 ? "danger" : "success"}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
