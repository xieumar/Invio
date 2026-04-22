"use client";

import { useRef, useState, useEffect } from "react";
import { FilterState } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
}

const OPTIONS: { key: keyof FilterState; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "pending", label: "Pending" },
  { key: "paid", label: "Paid" },
];

export default function FilterDropdown({
  filter,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function toggle(key: keyof FilterState) {
    onChange({ ...filter, [key]: !filter[key] });
  }

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
        className="flex items-center gap-3 text-[15px] font-bold text-text-primary hover:text-purple transition-colors outline-none"
      >
        <span>
          Filter <span className="hidden sm:inline">by status</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-purple transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
          strokeWidth={3}
        />
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+24px)] z-50 w-48 p-6 flex flex-col gap-4 rounded-lg shadow-dropdown"
          style={{ backgroundColor: "var(--surface)" }}
        >
          {OPTIONS.map(({ key, label }) => {
            const checked = filter[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                className="flex items-center gap-4 cursor-pointer outline-none group"
              >
                <div
                  className={`
                    flex items-center justify-center w-4 h-4 rounded-[2px] shrink-0
                    transition-colors
                    ${
                      checked
                        ? "bg-purple"
                        : "bg-[#DFE3FA] dark:bg-[#1E2139] group-hover:bg-purple/20"
                    }
                  `}
                >
                  {checked && (
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 4.5L3.83333 6.83333L8.5 2.16667"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <span className="text-[15px] font-bold text-text-primary">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
