"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight, Compass } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DashboardMetrics,
  RecentInvoices,
  QuickActions,
} from "@/components/dashboard";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { ProductTour, type TourStep } from "@/components/tour";
import { useInvoices } from "@/context/InvoiceContext";
import { useAuth } from "@/features/auth";
import { queryKeys } from "@/lib/query";

const TOUR_DONE_KEY = "invio_demo_tour_done";

const TOUR_STEPS: TourStep[] = [
  {
    title: "Welcome to the Invio demo",
    body: "This workspace is filled with sample data so you can explore freely. Nothing here is saved to an account. Here's a quick look around.",
  },
  {
    target: '[data-tour="sidebar-nav"]',
    title: "Navigate your workspace",
    body: "Switch between your dashboard, invoices and client directory from the sidebar.",
  },
  {
    target: '[data-tour="metrics"]',
    title: "Your finances at a glance",
    body: "Total invoiced, outstanding revenue, what's been paid and what's overdue. Amounts in other currencies are converted to your default currency.",
  },
  {
    target: '[data-tour="new-invoice"]',
    title: "Create an invoice",
    body: "Start a new invoice here. On the Invoices page you can also describe the work in plain English and let the AI assistant draft it for you to review.",
  },
  {
    target: '[data-tour="recent-invoices"]',
    title: "Recent invoices",
    body: "Your latest invoices and their status. Open one to edit it, download a PDF, mark it paid or generate a payment reminder.",
  },
  {
    target: '[data-tour="quick-actions"]',
    title: "Quick actions",
    body: "Shortcuts to the places you'll use most. You can restart this tour any time with the Take a tour button.",
  },
];

export function DashboardPage() {
  const { user, isDemoUser } = useAuth();
  const { createInvoice } = useInvoices();
  const queryClient = useQueryClient();
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  // Offer the tour automatically the first time someone opens the demo
  useEffect(() => {
    if (!isDemoUser) return;
    let done = false;
    try {
      done = localStorage.getItem(TOUR_DONE_KEY) === "true";
    } catch {
      // Storage unavailable (private browsing); just skip auto-start
      return;
    }
    if (done) return;
    const timer = setTimeout(() => setTourOpen(true), 600);
    return () => clearTimeout(timer);
  }, [isDemoUser]);

  const closeTour = () => {
    setTourOpen(false);
    try {
      localStorage.setItem(TOUR_DONE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
  };

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
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {isDemoUser && (
              <Button
                variant="outline"
                onClick={() => setTourOpen(true)}
                className="rounded-full border-border/80 hover:border-purple text-text-secondary hover:text-text-primary transition-colors text-xs font-bold px-4 sm:px-5 h-11"
              >
                <Compass className="w-3.5 h-3.5 mr-1.5" />
                Take a tour
              </Button>
            )}
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
              data-tour="new-invoice"
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
        <div data-tour="metrics">
          <DashboardMetrics />
        </div>

        {/* Recent Invoices & Quick Actions Section */}
        <section
          aria-label="Recent Invoices and Quick Actions"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start"
        >
          {/* Recent Invoices Widget (2 Columns on large screens) */}
          <div className="lg:col-span-2" data-tour="recent-invoices">
            <RecentInvoices onNewInvoice={() => setShowInvoiceForm(true)} />
          </div>

          {/* Quick Actions Panel (1 Column on large screens) */}
          <div className="lg:col-span-1" data-tour="quick-actions">
            <QuickActions onNewInvoice={() => setShowInvoiceForm(true)} />
          </div>
        </section>
      </div>

      {tourOpen && <ProductTour steps={TOUR_STEPS} onClose={closeTour} />}

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
