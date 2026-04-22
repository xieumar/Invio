"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const TERMS = [
  { value: 1, label: "Net 1 Day" },
  { value: 7, label: "Net 7 Days" },
  { value: 14, label: "Net 14 Days" },
  { value: 30, label: "Net 30 Days" },
];

interface InvoicePaymentTermsProps {
  value: number;
  onChange: (value: string) => void;
  error?: boolean;
}

export function InvoicePaymentTerms({
  value,
  onChange,
  error,
}: InvoicePaymentTermsProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selectedLabel =
    TERMS.find((t) => t.value === Number(value))?.label ?? "Select terms";

  function handleSelect(termValue: number) {
    onChange(String(termValue));
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          w-full h-14 px-5 flex justify-between items-center
          rounded border font-bold text-[15px]
          bg-(--input-bg) text-text-primary
          transition-colors outline-none
          ${error ? "border-red!" : "border-(--input-border) hover:border-purple focus:border-purple"}
        `}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-purple transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] z-[9999] w-full rounded-lg overflow-hidden shadow-dropdown"
          style={{ backgroundColor: "var(--input-bg)" }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {TERMS.map((term, i) => {
            const isSelected = Number(value) === term.value;
            return (
              <button
                key={term.value}
                type="button"
                onClick={() => handleSelect(term.value)}
                className={`
                  w-full px-6 py-4 text-left text-[15px] font-bold
                  transition-colors
                  ${i < TERMS.length - 1 ? "border-b border-(--input-border)" : ""}
                  ${
                    isSelected
                      ? "text-purple"
                      : "text-text-primary hover:text-purple"
                  }
                  bg-transparent
                `}
              >
                {term.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
