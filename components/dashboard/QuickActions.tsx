"use client";

import React from "react";
import Link from "next/link";
import {
  Plus,
  FileText,
  Users,
  TrendingUp,
  ArrowRight,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onNewInvoice?: () => void;
}

export function QuickActions({ onNewInvoice }: QuickActionsProps) {
  return (
    <div className="w-full bg-surface rounded-2xl border border-border/60 p-6 sm:p-7 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
            Quick Actions
          </h2>
          <span className="text-xs text-text-muted">Shortcuts</span>
        </div>

        <p className="text-xs text-text-secondary mb-5 leading-relaxed">
          Accelerate your workflow with one-click actions across your invoicing
          and client directory.
        </p>

        {/* Primary CTA: New Invoice */}
        {onNewInvoice ? (
          <Button
            onClick={onNewInvoice}
            className="
              w-full relative flex items-center justify-center gap-3
              h-12 bg-purple hover:bg-purple-light
              text-white text-xs sm:text-sm font-bold
              rounded-xl transition-all duration-200 border-0 cursor-pointer shadow-md shadow-purple/20 mb-4
            "
          >
            <Plus className="w-4 h-4 stroke-[3px]" />
            <span>Create New Invoice</span>
          </Button>
        ) : (
          <Link href="/invoices" className="block w-full mb-4">
            <Button
              className="
                w-full relative flex items-center justify-center gap-3
                h-12 bg-purple hover:bg-purple-light
                text-white text-xs sm:text-sm font-bold
                rounded-xl transition-all duration-200 border-0 cursor-pointer shadow-md shadow-purple/20
              "
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              <span>Create New Invoice</span>
            </Button>
          </Link>
        )}

        {/* Secondary Navigation Shortcuts */}
        <div className="space-y-2">
          <Link
            href="/invoices"
            className="group flex items-center justify-between p-3 rounded-xl border border-border/40 hover:border-purple/40 bg-surface hover:bg-surface-alt/50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple/10 text-purple flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-text-primary group-hover:text-purple transition-colors block">
                  All Invoices
                </span>
                <span className="text-[11px] text-text-secondary">
                  Filter, search & export
                </span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-purple group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/clients"
            className="group flex items-center justify-between p-3 rounded-xl border border-border/40 hover:border-purple/40 bg-surface hover:bg-surface-alt/50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-paid-bg text-paid-text flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-text-primary group-hover:text-purple transition-colors block">
                  Client Directory
                </span>
                <span className="text-[11px] text-text-secondary">
                  Customer profiles & terms
                </span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-purple group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/transactions"
            className="group flex items-center justify-between p-3 rounded-xl border border-border/40 hover:border-purple/40 bg-surface hover:bg-surface-alt/50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pending-bg text-pending-text flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-text-primary group-hover:text-purple transition-colors block">
                  Transactions
                </span>
                <span className="text-[11px] text-text-secondary">
                  Cashflow bookkeeping
                </span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-purple group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
