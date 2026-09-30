"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, FileText, Plus } from "lucide-react";
import { StatusBadge } from "@/components/invoices/StatusBadge";
import { Button } from "@/components/ui/button";
import { useRecentInvoices } from "@/features/dashboard/useDashboardMetrics";
import { formatMoney, toMinorUnits } from "@/lib/money";
import { formatDate } from "@/lib/utils";

interface RecentInvoicesProps {
  onNewInvoice?: () => void;
}

export function RecentInvoices({ onNewInvoice }: RecentInvoicesProps) {
  const { data: invoices, isLoading } = useRecentInvoices(5);

  return (
    <div className="w-full bg-surface rounded-2xl border border-border/60 p-6 sm:p-7 shadow-card">
      {/* Widget Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
            Recent Invoices
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Latest 5 billed transactions
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNewInvoice && (
            <Button
              onClick={onNewInvoice}
              size="sm"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 bg-purple hover:bg-purple-light text-white text-xs font-bold rounded-full transition-colors border-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </Button>
          )}

          <Link href="/invoices">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors h-9 px-3"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Invoices List / Skeleton / Empty State */}
      {isLoading ? (
        <div className="space-y-3" aria-busy="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-16 w-full bg-muted/40 dark:bg-muted/20 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : !invoices || invoices.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-purple/10 text-purple flex items-center justify-center mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-text-primary mb-1">
            No invoices yet
          </h3>
          <p className="text-xs text-text-secondary max-w-xs mb-4">
            Create your first invoice to start tracking payments and revenue.
          </p>
          {onNewInvoice ? (
            <Button
              onClick={onNewInvoice}
              size="sm"
              className="bg-purple hover:bg-purple-light text-white text-xs font-bold rounded-full px-4 h-9"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Create Invoice
            </Button>
          ) : (
            <Link href="/invoices">
              <Button
                size="sm"
                className="bg-purple hover:bg-purple-light text-white text-xs font-bold rounded-full px-4 h-9"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Create Invoice
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <ul className="space-y-2.5 list-none p-0 m-0">
          {invoices.map((inv) => {
            const formattedTotal = formatMoney(
              toMinorUnits(inv.total),
              inv.currency || "GBP"
            );

            return (
              <li key={inv.id}>
                <Link
                  href={`/invoices/${inv.id}`}
                  className="group flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-4.5 rounded-xl border border-border/40 hover:border-purple/50 bg-surface hover:bg-surface-alt/40 transition-all duration-200 no-underline gap-3 sm:gap-4"
                >
                  {/* Left: ID & Due Date */}
                  <div className="flex items-center gap-3 min-w-0 sm:w-1/3">
                    <span className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-purple transition-colors shrink-0">
                      <span className="text-text-muted">#</span>
                      {inv.id}
                    </span>
                    <span className="text-xs text-text-secondary truncate">
                      Due {formatDate(inv.paymentDue)}
                    </span>
                  </div>

                  {/* Middle: Client Name */}
                  <div className="sm:w-1/3 min-w-0">
                    <span className="text-xs sm:text-sm text-text-secondary font-medium truncate block">
                      {inv.clientName}
                    </span>
                  </div>

                  {/* Right: Total & Status Badge */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 sm:w-1/3 shrink-0">
                    <span className="text-sm sm:text-base font-extrabold text-text-primary tracking-tight">
                      {formattedTotal}
                    </span>

                    <div className="scale-90 origin-right shrink-0">
                      <StatusBadge status={inv.status} />
                    </div>

                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-purple group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
