"use client";

import { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface InvoiceDatePickerProps {
  value: string; // ISO date string "YYYY-MM-DD"
  onChange: (value: string) => void;
  error?: boolean;
}

export function InvoiceDatePicker({
  value,
  onChange,
  error,
}: InvoiceDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (value) {
      try {
        return parseISO(value);
      } catch {
        /* fall through */
      }
    }
    return new Date();
  });
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

  // Sync viewDate when value changes externally
  useEffect(() => {
    if (value) {
      try {
        setViewDate(parseISO(value));
      } catch {
        /* ignore */
      }
    }
  }, [value]);

  const selectedDate = value
    ? (() => {
        try {
          return parseISO(value);
        } catch {
          return null;
        }
      })()
    : null;

  // Build the 6-week grid for current view month
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  function handleDayClick(day: Date) {
    // Only allow days in current month
    if (!isSameMonth(day, viewDate)) return;
    onChange(format(day, "yyyy-MM-dd"));
    setOpen(false);
  }

  function prevMonth(e: React.MouseEvent) {
    e.stopPropagation();
    setViewDate((d) => subMonths(d, 1));
  }

  function nextMonth(e: React.MouseEvent) {
    e.stopPropagation();
    setViewDate((d) => addMonths(d, 1));
  }

  const displayLabel = selectedDate
    ? format(selectedDate, "dd MMM yyyy")
    : "Pick a date";

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
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
        <span>{displayLabel}</span>
        <CalendarIcon className="h-4 w-4 shrink-0 text-purple" />
      </button>

      {/* Calendar Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] z-[9999] rounded-lg p-6 shadow-dropdown"
          style={{
            backgroundColor: "var(--surface)",
            minWidth: "240px",
            width: "100%",
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative flex items-center justify-center mb-6">
            <button
              type="button"
              onClick={prevMonth}
              className="absolute left-0 text-purple hover:opacity-70 transition-opacity p-0"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-[13px] font-bold text-text-primary select-none">
              {format(viewDate, "MMM yyyy")}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              className="absolute right-0 text-purple hover:opacity-70 transition-opacity p-0"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day Grid — no weekday headers per the design */}
          <div className="grid grid-cols-7 gap-y-1">
            {days.map((day) => {
              const inCurrentMonth = isSameMonth(day, viewDate);
              const isSelected = selectedDate
                ? isSameDay(day, selectedDate)
                : false;

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  disabled={!inCurrentMonth}
                  className={`
                    h-8 w-full flex items-center justify-center
                    text-[13px] font-bold
                    bg-transparent border-0 p-0
                    transition-colors
                    ${
                      !inCurrentMonth
                        ? "text-text-secondary opacity-20 cursor-default"
                        : isSelected
                          ? "text-purple"
                          : "text-text-primary hover:text-purple"
                    }
                  `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
