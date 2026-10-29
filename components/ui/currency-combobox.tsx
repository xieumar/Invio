"use client";

import * as React from "react";
import { ChevronsUpDown, Globe2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { SUPPORTED_CURRENCIES } from "@/lib/money";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CurrencyComboboxProps {
  id?: string;
  value: string;
  onChange: (code: string) => void;
  hasError?: boolean;
}

const CURRENCIES = Object.values(SUPPORTED_CURRENCIES);

export function CurrencyCombobox({
  id,
  value,
  onChange,
  hasError,
}: CurrencyComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selected = SUPPORTED_CURRENCIES[value];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            "relative flex h-11 w-full items-center rounded-xl border border-input bg-transparent pl-10 pr-3 text-left text-sm text-text-primary outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            hasError && "border-red"
          )}
        >
          <Globe2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <span className="truncate">
            {selected
              ? `${selected.code} (${selected.symbol}) — ${selected.name}`
              : value || "Select currency"}
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="z-200 w-(--radix-popover-trigger-width) p-0"
      >
        <Command>
          <CommandInput placeholder="Search by code or name..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {CURRENCIES.map((c) => (
                <CommandItem
                  key={c.code}
                  value={`${c.code} ${c.name}`}
                  data-checked={c.code === value}
                  onSelect={() => {
                    onChange(c.code);
                    setOpen(false);
                  }}
                >
                  <span className="w-12 font-semibold">{c.code}</span>
                  <span className="truncate text-text-secondary">
                    {c.name} ({c.symbol})
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
