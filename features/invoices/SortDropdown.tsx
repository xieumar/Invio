"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export type SortKey =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc"
  | "due-asc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "date-desc", label: "Date: Newest" },
  { value: "date-asc", label: "Date: Oldest" },
  { value: "amount-desc", label: "Amount: High → Low" },
  { value: "amount-asc", label: "Amount: Low → High" },
  { value: "due-asc", label: "Due Date" },
];

interface SortDropdownProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = SORT_OPTIONS.find((o) => o.value === value)!;

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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 text-[15px] font-bold text-text-primary hover:text-purple transition-colors outline-none cursor-pointer"
      >
        <span>
          Sort <span className="hidden sm:inline">by</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-purple transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
          strokeWidth={3}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+24px)] z-50 w-52 p-3 flex flex-col gap-1 rounded-lg shadow-dropdown"
          style={{ backgroundColor: "var(--surface)" }}
        >
          {SORT_OPTIONS.map((opt) => {
            const isActive = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`
                  flex items-center justify-between w-full px-3 py-2 rounded-md
                  text-[14px] font-semibold text-left transition-colors cursor-pointer outline-none
                  ${isActive ? "bg-purple/10 text-purple" : "text-text-primary hover:bg-surface-alt"}
                `}
              >
                {opt.label}
                {isActive && <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
