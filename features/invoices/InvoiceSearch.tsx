"use client";

import { Search, X } from "lucide-react";

interface InvoiceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function InvoiceSearch({ value, onChange }: InvoiceSearchProps) {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-4 w-4 h-4 text-text-secondary pointer-events-none" />
      <input
        id="invoice-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by client or description…"
        aria-label="Search invoices"
        className="
          h-11 w-full sm:w-72 rounded-lg pl-10 pr-9 text-[14px] font-medium
          bg-(--input-bg) border border-(--input-border)
          text-text-primary placeholder:text-text-secondary
          hover:border-purple focus:border-purple focus:outline-none
          transition-colors
          [&::-webkit-search-cancel-button]:appearance-none
          [&::-webkit-search-cancel-button]:hidden
          [&::-webkit-search-decoration]:appearance-none
        "
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
