"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { COUNTRIES } from "@/lib/countries";
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

interface CountryComboboxProps {
  id?: string;
  value: string;
  onChange: (country: string) => void;
  hasError?: boolean;
}

export function CountryCombobox({
  id,
  value,
  onChange,
  hasError,
}: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false);

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
            "flex h-11 w-full items-center rounded-xl border border-input bg-transparent px-3 text-left text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            value ? "text-text-primary" : "text-text-muted",
            hasError && "border-red"
          )}
        >
          <span className="truncate">{value || "Country"}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="z-200 w-(--radix-popover-trigger-width) min-w-56 p-0"
      >
        <Command>
          <CommandInput placeholder="Search countries..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {COUNTRIES.map((country) => (
                <CommandItem
                  key={country}
                  value={country}
                  data-checked={country === value}
                  onSelect={() => {
                    onChange(country);
                    setOpen(false);
                  }}
                >
                  {country}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
