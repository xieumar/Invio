"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInvoices } from "@/context/InvoiceContext";
import { FilterState, InvoiceFormData, InvoiceStatus } from "@/lib/types";
import InvoiceCard from "@/components/InvoiceCard";
import FilterDropdown from "@/components/FilterDropdown";
import InvoiceForm from "@/components/InvoiceForm";
import { toast } from "sonner";

const defaultFilter: FilterState = {
  draft: false,
  pending: false,
  paid: false,
};

export default function HomePage() {
  const { invoices, loading, createInvoice } = useInvoices();
  const [filter, setFilter] = useState<FilterState>(defaultFilter);
  const [showForm, setShowForm] = useState(false);

  const anyActive = filter.draft || filter.pending || filter.paid;

  const filtered = useMemo(() => {
    if (!anyActive) return invoices;
    return invoices.filter((inv) => filter[inv.status]);
  }, [invoices, filter, anyActive]);

  async function handleCreate(data: InvoiceFormData, status: InvoiceStatus) {
    await createInvoice(data, status);
    toast.success("New invoice created!");
    setShowForm(false);
  }

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-16 sm:mb-20">
          <div>
            <h1 className="text-3xl sm:text-[36px] font-extrabold tracking-tight text-text-primary">
              Invoices
            </h1>
            <p
              className="text-[13px] text-text-secondary mt-1"
              aria-live="polite"
            >
              {loading
                ? "Loading..."
                : filtered.length === 0
                  ? "No invoices"
                  : `There are ${filtered.length} total invoice${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-10">
            <FilterDropdown filter={filter} onChange={setFilter} />

            <Button
              onClick={() => setShowForm(true)}
              aria-label="Create new invoice"
              className="
                relative flex items-center gap-4
                pl-14 pr-4 sm:pr-6 py-6 h-12
                bg-purple hover:bg-purple-light
                text-white text-[15px] font-bold
                rounded-3xl transition-colors border-0
              "
            >
              <span className="absolute left-1.5 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Plus className="w-4 h-4 text-purple stroke-3" />
              </span>
              <span>
                New <span className="hidden sm:inline">Invoice</span>
              </span>
            </Button>
          </div>
        </header>

        {loading ? (
          <div
            className="flex items-center justify-center h-48 text-text-secondary"
            aria-busy="true"
          >
            Loading invoices...
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center mt-15 sm:mt-25 text-center"
            role="status"
          >
            <Image
              src="/empty-state.svg"
              alt="No invoices found"
              width={242}
              height={200}
              className="mb-10"
            />

            <h3 className="text-2xl font-bold text-text-primary mb-3">
              There is nothing here
            </h3>
            <p className="text-[13px] text-text-secondary max-w-55 leading-relaxed mx-auto">
              {anyActive
                ? "No invoices match the selected filters. Change your status filter or create a new one."
                : "Create an invoice by clicking the New Invoice button and get started."}
            </p>
          </div>
        ) : (
          <ul aria-label="Invoice list" className="flex flex-col gap-4">
            {filtered.map((invoice) => (
              <li key={invoice.id}>
                <InvoiceCard invoice={invoice} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {showForm && (
        <InvoiceForm
          onSave={handleCreate}
          onDiscard={() => setShowForm(false)}
        />
      )}
    </>
  );
}
