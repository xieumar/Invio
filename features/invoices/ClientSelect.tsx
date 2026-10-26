"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, UserCircle2, X } from "lucide-react";
import { useClients } from "@/features/clients";

interface ClientSelectProps {
  value: string | null | undefined;
  onChange: (client: Client | null) => void;
}

export function ClientSelect({ value, onChange }: ClientSelectProps) {
  const { data: clients = [], isLoading } = useClients();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = clients.find((c) => c.id === value) ?? null;

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleSelect(client: Client) {
    onChange(client);
    setOpen(false);
    setSearch("");
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange(null);
    setSearch("");
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          w-full rounded px-5 py-4 text-[15px] font-bold outline-none transition-colors border h-14
          bg-(--input-bg) border-(--input-border) hover:border-purple
          flex items-center justify-between gap-2 cursor-pointer
          ${open ? "border-purple" : ""}
        `}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected ? (
          <span className="flex items-center gap-2 text-text-primary truncate">
            <UserCircle2 className="w-4 h-4 text-purple shrink-0" />
            <span className="truncate">{selected.name}</span>
          </span>
        ) : (
          <span className="text-text-secondary font-medium text-[14px]">
            {isLoading ? "Loading clients…" : "Select a client (optional)"}
          </span>
        )}

        <span className="flex items-center gap-1 shrink-0">
          {selected && (
            <span
              role="button"
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-border transition-colors text-text-secondary hover:text-red"
              aria-label="Clear client selection"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-text-secondary transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-50 top-[calc(100%+6px)] left-0 right-0
            bg-surface border border-border rounded-xl shadow-2xl
            overflow-hidden
          "
          role="listbox"
        >
          {/* Search */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Search className="w-4 h-4 text-text-secondary shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients…"
              className="flex-1 text-[14px] bg-transparent outline-none text-text-primary placeholder:text-text-secondary"
            />
          </div>

          {/* Options */}
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-[13px] text-text-secondary text-center">
                {clients.length === 0 ? "No clients yet — add one first" : "No matches found"}
              </li>
            ) : (
              filtered.map((client) => (
                <li
                  key={client.id}
                  role="option"
                  aria-selected={client.id === value}
                  onClick={() => handleSelect(client)}
                  className={`
                    flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
                    hover:bg-surface-alt
                    ${client.id === value ? "bg-purple/10 text-purple" : "text-text-primary"}
                  `}
                >
                  <UserCircle2 className={`w-5 h-5 shrink-0 ${client.id === value ? "text-purple" : "text-text-secondary"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold truncate">{client.name}</p>
                    <p className="text-[12px] text-text-secondary truncate">{client.email}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
