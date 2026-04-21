"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInvoices } from "@/context/InvoiceContext";
import { FilterState, InvoiceFormData, InvoiceStatus } from "@/lib/types";
import InvoiceCard from "@/components/InvoiceCard";
import FilterDropdown from "@/components/FilterDropdown";
import InvoiceForm from "@/components/InvoiceForm";

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
    setShowForm(false);
  }

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-[36px] font-extrabold tracking-tight text-[var(--text-primary)]">
              Invoices
            </h1>
            <p
              className="text-[13px] text-[var(--text-secondary)] mt-1"
              aria-live="polite"
            >
              {loading
                ? "Loading..."
                : filtered.length === 0
                  ? "No invoices"
                  : `There are ${filtered.length} total invoice${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-[18px]">
            <FilterDropdown filter={filter} onChange={setFilter} />

            {/* Refactored Button */}
            <Button
              onClick={() => setShowForm(true)}
              aria-label="Create new invoice"
              className="
                relative flex items-center gap-4
                pl-[56px] pr-4 sm:pr-6 py-6 h-[48px]
                bg-purple hover:bg-purple-light
                text-white text-[15px] font-bold
                rounded-3xl transition-colors border-0
              "
            >
              <span className="absolute left-[6px] w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Plus className="w-4 h-4 text-purple stroke-[3]" />
              </span>
              <span>
                New <span className="hidden sm:inline">Invoice</span>
              </span>
            </Button>
          </div>
        </header>

        {/* List */}
        {loading ? (
          <div
            className="flex items-center justify-center h-48 text-[var(--text-secondary)]"
            aria-busy="true"
          >
            Loading invoices...
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            role="status"
          >
            {/* Empty State SVG preserved as it appears to be a custom brand illustration */}
            <svg
              width="200"
              height="160"
              viewBox="0 0 200 160"
              fill="none"
              aria-hidden="true"
            >
              <ellipse cx="100" cy="80" rx="80" ry="72" fill="var(--surface)" />
              <ellipse cx="100" cy="68" rx="36" ry="44" fill="var(--border)" />
              <ellipse
                cx="100"
                cy="68"
                rx="22"
                ry="30"
                fill="var(--surface-alt)"
              />
              <circle cx="100" cy="128" r="14" fill="#7C5DFA" opacity="0.25" />
              <circle cx="100" cy="128" r="7" fill="#7C5DFA" opacity="0.55" />
            </svg>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">
              Nothing here
            </h3>
            <p className="text-[13px] text-[var(--text-secondary)] max-w-[220px] leading-relaxed">
              {anyActive
                ? "No invoices match the selected filters."
                : "Create an invoice by clicking New Invoice and get started."}
            </p>
          </div>
        ) : (
          <ul aria-label="Invoice list" className="flex flex-col gap-5">
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
