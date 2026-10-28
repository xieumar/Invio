"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Sparkles } from "lucide-react";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { useInvoices } from "@/context/InvoiceContext";
import {
  InvoiceCard,
  FilterDropdown,
  InvoiceForm,
} from "@/components/invoices";
import {
  InvoiceSearch,
  SortDropdown,
  type SortKey,
} from "@/features/invoices";
import { AiAssistantDrawer } from "@/features/ai";
import { type InvoiceFormValues } from "@/lib/validations";
import { type AiInvoiceDraft } from "@/lib/validations/ai";
import { toast } from "sonner";

const defaultFilter: FilterState = {
  draft: false,
  pending: false,
  paid: false,
};

function sortInvoices(invoices: Invoice[], sort: SortKey): Invoice[] {
  return [...invoices].sort((a, b) => {
    switch (sort) {
      case "date-asc":    return a.createdAt.localeCompare(b.createdAt);
      case "date-desc":   return b.createdAt.localeCompare(a.createdAt);
      case "amount-desc": return b.total - a.total;
      case "amount-asc":  return a.total - b.total;
      case "due-asc":     return (a.paymentDue ?? "").localeCompare(b.paymentDue ?? "");
      default:            return 0;
    }
  });
}

export function InvoicesPage() {
  const { invoices, loading, createInvoice } = useInvoices();
  const [filter, setFilter] = useState<FilterState>(defaultFilter);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("date-desc");

  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [aiDraftValues, setAiDraftValues] = useState<
    Partial<InvoiceFormValues> | undefined
  >(undefined);

  const anyActive = filter.draft || filter.pending || filter.paid;

  const filtered = useMemo(() => {
    let result = anyActive
      ? invoices.filter((inv) => filter[inv.status as keyof FilterState])
      : invoices;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (inv) =>
          inv.clientName.toLowerCase().includes(q) ||
          inv.description.toLowerCase().includes(q)
      );
    }

    return sortInvoices(result, sort);
  }, [invoices, filter, anyActive, search, sort]);

  async function handleCreate(data: InvoiceFormData, status: InvoiceStatus) {
    await createInvoice(data, status);
    toast.success("New invoice created!");
    setShowForm(false);
    setAiDraftValues(undefined);
  }

  function handleDraftGenerated(draft: AiInvoiceDraft) {
    setAiDraftValues({
      clientName: draft.clientName,
      clientEmail: draft.clientEmail,
      description: draft.description,
      paymentTerms: draft.paymentTerms,
      createdAt: new Date().toISOString().split("T")[0],
      senderAddress: draft.senderAddress,
      clientAddress: draft.clientAddress,
      taxRate: draft.taxRate ?? 0,
      discount: draft.discount ?? 0,
      items: draft.items.map((item) => ({
        id: nanoid(),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      })),
    });
    setShowForm(true);
    toast.info("Invoice populated with AI draft! Review and save.");
  }

  return (
    <>
      <div className="w-full max-w-182.5 mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-[36px] font-extrabold tracking-tight text-text-primary">
              Invoices
            </h1>
            <p
              className="text-[13px] text-text-secondary -mt-1"
              aria-live="polite"
            >
              {loading
                ? "Loading..."
                : filtered.length === 0
                  ? "No invoices"
                  : filtered.length === 1
                    ? "1 invoice"
                    : `${filtered.length} invoices`}
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <FilterDropdown filter={filter} onChange={setFilter} />

            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAiDrawer(true)}
              className="
                h-12 px-4 rounded-3xl text-[14px] font-bold
                bg-purple/10 text-purple hover:bg-purple/20
                dark:bg-purple/20 dark:hover:bg-purple/30
                transition-all border-none flex items-center gap-2 cursor-pointer shadow-sm
              "
            >
              <Sparkles className="w-4 h-4 text-purple" />
              <span className="hidden sm:inline">AI Assistant</span>
            </Button>

            <Button
              onClick={() => {
                setAiDraftValues(undefined);
                setShowForm(true);
              }}
              aria-label="Create new invoice"
              className="
                relative flex items-center gap-4
                pl-14 pr-4 sm:pr-6 py-6 h-12
                bg-purple hover:bg-purple-light
                text-white text-[15px] font-bold
                rounded-3xl transition-colors border-0 cursor-pointer
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

        {/* Search + Sort toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <InvoiceSearch value={search} onChange={setSearch} />
          <div className="ml-auto">
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

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
              {search
                ? `No invoices match "${search}". Try a different search term.`
                : anyActive
                  ? "No invoices match the selected filters."
                  : "Create an invoice by clicking the New Invoice button and get started."}
            </p>
          </div>
        ) : (
          <ul
            aria-label="Invoice list"
            className="flex flex-col gap-4 list-none p-0 m-0"
          >
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
          initialValues={aiDraftValues}
          aiSuggested={!!aiDraftValues}
          onSave={handleCreate}
          onDiscard={() => {
            setShowForm(false);
            setAiDraftValues(undefined);
          }}
        />
      )}

      <AiAssistantDrawer
        open={showAiDrawer}
        onOpenChange={setShowAiDrawer}
        onDraftGenerated={handleDraftGenerated}
      />
    </>
  );
}

export default InvoicesPage;
