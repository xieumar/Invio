"use client";

import React from "react";
import Link from "next/link";
import {
  Plus,
  ArrowRight,
  FileText,
  Users,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMetrics } from "@/components/dashboard";
import { useAuth } from "@/features/auth";

export function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.displayName?.split(" ")[0] || "there";

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      {/* Top Banner & Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-2 border-b border-border/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 text-purple dark:text-purple-light text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-purple animate-pulse" />
            Finance Workspace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            Welcome back, {userName}
          </h1>
          <p className="text-sm sm:text-[15px] text-text-secondary mt-1">
            Real-time overview of your cashflow, receivables, and invoices.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/invoices">
            <Button
              variant="outline"
              className="rounded-full border-border/80 hover:border-purple text-text-secondary hover:text-text-primary transition-colors text-xs font-bold px-5 h-11"
            >
              All Invoices
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>

          <Link href="/invoices">
            <Button
              className="
                relative flex items-center gap-2.5
                pl-11 pr-5 h-11
                bg-purple hover:bg-purple-light
                text-white text-xs font-bold
                rounded-full transition-all duration-200 border-0 cursor-pointer shadow-md shadow-purple/20
              "
            >
              <span className="absolute left-1.5 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Plus className="w-4 h-4 text-purple stroke-[3px]" />
              </span>
              <span>New Invoice</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Overview Metric Summary Cards */}
      <DashboardMetrics />

      {/* Quick Navigation Hub */}
      <section aria-labelledby="quick-actions-heading" className="w-full pt-2">
        <h2
          id="quick-actions-heading"
          className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4"
        >
          Quick Access
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/invoices"
            className="group p-5 bg-surface rounded-2xl border border-border/60 hover:border-purple/50 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple/10 text-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-purple group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary group-hover:text-purple transition-colors text-base">
                Invoices
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Draft, issue, and manage all your client invoices with automated
                status tracking.
              </p>
            </div>
          </Link>

          <Link
            href="/clients"
            className="group p-5 bg-surface rounded-2xl border border-border/60 hover:border-purple/50 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-paid-bg text-paid-text flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-purple group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary group-hover:text-purple transition-colors text-base">
                Clients
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Maintain client contact records, default payment terms, and
                billing history.
              </p>
            </div>
          </Link>

          <Link
            href="/insights"
            className="group p-5 bg-surface rounded-2xl border border-border/60 hover:border-purple/50 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-pending-bg text-pending-text flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-purple group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary group-hover:text-purple transition-colors text-base">
                Cashflow & Insights
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Visual analytics on revenue trends, monthly collections, and
                outstanding dues.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
