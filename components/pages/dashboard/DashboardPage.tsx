"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DashboardMetrics,
  RecentInvoices,
  QuickActions,
} from "@/components/dashboard";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { useInvoices } from "@/context/InvoiceContext";
import { useAuth } from "@/features/auth";
import { queryKeys } from "@/lib/query";

export function DashboardPage() {
  const { user } = useAuth();
  const { createInvoice } = useInvoices();
  const queryClient = useQueryClient();
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  const userName = user?.displayName?.split(" ")[0] || "there";

  const handleCreateInvoice = async (
    data: InvoiceFormData,
    status: InvoiceStatus
  ) => {
    try {
      await createInvoice(data, status);
      queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.metrics.all });
      toast.success("New invoice created!");
      setShowInvoiceForm(false);
    } catch {
      toast.error("Failed to create invoice.");
    }
  };

  return (
    <>
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

            <Button
              onClick={() => setShowInvoiceForm(true)}
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
          </div>
        </header>

        {/* Overview Metric Summary Cards */}
        <DashboardMetrics />

        {/* Recent Invoices & Quick Actions Section */}
        <section
          aria-label="Recent Invoices and Quick Actions"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start"
        >
          {/* Recent Invoices Widget (2 Columns on large screens) */}
          <div className="lg:col-span-2">
            <RecentInvoices onNewInvoice={() => setShowInvoiceForm(true)} />
          </div>

          {/* Quick Actions Panel (1 Column on large screens) */}
          <div className="lg:col-span-1">
            <QuickActions onNewInvoice={() => setShowInvoiceForm(true)} />
          </div>
        </section>
      </div>

      {/* Invoice Creation Drawer/Modal */}
      {showInvoiceForm && (
        <InvoiceForm
          onSave={handleCreateInvoice}
          onDiscard={() => setShowInvoiceForm(false)}
        />
      )}
    </>
  );
}

export default DashboardPage;
