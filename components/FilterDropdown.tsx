"use client";

import { FilterState } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterDropdownProps {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
}

export default function FilterDropdown({
  filter,
  onChange,
}: FilterDropdownProps) {
  function toggle(key: keyof FilterState) {
    onChange({ ...filter, [key]: !filter[key] });
  }

  const options: { key: keyof FilterState; label: string }[] = [
    { key: "draft", label: "Draft" },
    { key: "pending", label: "Pending" },
    { key: "paid", label: "Paid" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-3 text-[15px] font-bold text-[var(--text-primary)] hover:text-purple transition-colors outline-none">
          <span>
            Filter <span className="hidden sm:inline">by status</span>
          </span>
          {/* Radix UI automatically applies data-[state=open] to the trigger, which we use to rotate the arrow */}
          <ChevronDown
            className="w-4 h-4 text-purple transition-transform duration-200 group-data-[state=open]:-rotate-180"
            strokeWidth={3}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={16}
        className="w-[192px] p-6 flex flex-col gap-4 rounded-lg border-none shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.4)] z-50"
        style={{ backgroundColor: "var(--surface)" }}
      >
        {options.map(({ key, label }) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={filter[key]}
            onCheckedChange={() => toggle(key)}
            className="flex items-center gap-3 cursor-pointer text-[15px] font-bold text-[var(--text-primary)] focus:text-purple focus:bg-transparent transition-colors p-0 data-[state=checked]:text-[var(--text-primary)]"
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
