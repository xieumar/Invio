"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
  Mail,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface PaymentReminderModalProps {
  invoice: Invoice;
  open: boolean;
  onClose: () => void;
}

type Tone = "friendly" | "firm" | "urgent";

const TONE_OPTIONS: { id: Tone; label: string; desc: string; emoji: string }[] =
  [
    {
      id: "friendly",
      label: "Friendly",
      desc: "Polite check-in, ideal for upcoming or recent dates",
      emoji: "😊",
    },
    {
      id: "firm",
      label: "Firm",
      desc: "Direct & clear, ideal for past due payments",
      emoji: "📋",
    },
    {
      id: "urgent",
      label: "Urgent",
      desc: "Assertive notice for significantly overdue accounts",
      emoji: "⚠️",
    },
  ];

function getDaysOverdue(paymentDue: string): number {
  const due = new Date(paymentDue);
  if (Number.isNaN(due.getTime())) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((today.getTime() - due.getTime()) / 86_400_000));
}

function defaultToneFor(daysOverdue: number): Tone {
  if (daysOverdue > 14) return "urgent";
  if (daysOverdue > 0) return "firm";
  return "friendly";
}

export function PaymentReminderModal({
  invoice,
  open,
  onClose,
}: PaymentReminderModalProps) {
  const daysOverdue = getDaysOverdue(invoice.paymentDue);
  const [tone, setTone] = useState<Tone>(() => defaultToneFor(daysOverdue));
  const dialogRef = useRef<HTMLDivElement>(null);
  // Latest onClose without re-running the focus/scroll-lock effect on parent re-renders
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  // Lock background scroll and listen for Escape key
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      // Keep Tab focus cycling inside the dialog
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, textarea, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  // Reset and pre-generate whenever the modal opens for an invoice
  useEffect(() => {
    if (!open) return;
    const initialTone = defaultToneFor(daysOverdue);
    setTone(initialTone);
    setSubject("");
    setBody("");
    handleGenerate(initialTone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, invoice.id]);

  async function handleGenerate(chosenTone = tone) {
    setLoading(true);
    setCopied(false);
    try {
      const response = await fetch("/api/ai/reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: invoice.id,
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail,
          description: invoice.description,
          total: formatCurrency(invoice.total),
          paymentDue: formatDate(invoice.paymentDue),
          status: invoice.status,
          daysOverdue,
          tone: chosenTone,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to generate reminder.");
      }

      setSubject(result.data.subject);
      setBody(result.data.body);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to draft reminder.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    const fullText = `Subject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      toast.success("Reminder copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Couldn't copy to clipboard. Select the text and copy manually.");
    }
  }

  function handleMailTo() {
    const mailto = `mailto:${encodeURIComponent(invoice.clientEmail || "")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-150 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="fixed inset-0 z-151 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reminder-dialog-title"
          tabIndex={-1}
          className="
            outline-none relative w-full max-w-2xl bg-surface text-text-primary 
            rounded-2xl border border-border shadow-2xl p-6 sm:p-8 
            animate-in zoom-in-95 duration-200 flex flex-col gap-6
          "
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center text-purple shadow-sm shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3
                  id="reminder-dialog-title"
                  className="text-xl font-bold text-text-primary"
                >
                  Draft Payment Reminder
                </h3>
                <p className="text-[13px] text-text-secondary mt-0.5">
                  Invoice <span className="font-bold text-text-primary">#{invoice.id}</span> · {invoice.clientName} ({formatCurrency(invoice.total)})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-border/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tone Selector */}
          <div className="space-y-2">
            <label className="text-[12px] font-bold uppercase tracking-wider text-text-secondary">
              Select Reminder Tone
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TONE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setTone(opt.id);
                    handleGenerate(opt.id);
                  }}
                  disabled={loading}
                  className={`
                    p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1
                    ${
                      tone === opt.id
                        ? "border-purple bg-purple/5 shadow-sm"
                        : "border-border bg-surface-alt/60 hover:bg-border/40"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-text-primary flex items-center gap-1.5">
                      <span>{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </span>
                    {tone === opt.id && (
                      <span className="w-2 h-2 rounded-full bg-purple" />
                    )}
                  </div>
                  <span className="text-[11px] text-text-secondary leading-snug">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Generated Subject and Body */}
          {loading ? (
            <div className="py-14 flex flex-col items-center justify-center gap-3 text-text-secondary">
              <Loader2 className="w-6 h-6 animate-spin text-purple" />
              <p className="text-[14px] font-medium">
                Drafting {tone} reminder email…
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Subject */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reminder-subject"
                  className="text-[12px] font-bold text-text-secondary"
                >
                  Email Subject
                </label>
                <input
                  id="reminder-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-11 rounded-lg px-4 text-[14px] font-medium bg-(--input-bg) border border-(--input-border) text-text-primary focus:border-purple focus:outline-none transition-colors"
                />
              </div>

              {/* Body */}
              <div className="space-y-1.5">
                <label
                  htmlFor="reminder-body"
                  className="text-[12px] font-bold text-text-secondary"
                >
                  Message Body
                </label>
                <Textarea
                  id="reminder-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={8}
                  className="text-[14px] leading-relaxed resize-none bg-(--input-bg) border-(--input-border) focus-visible:border-purple focus-visible:ring-purple/20 transition-all font-sans"
                />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleGenerate(tone)}
              disabled={loading}
              className="text-[13px] font-bold text-text-secondary hover:text-purple h-11 px-4 cursor-pointer"
            >
              Regenerate
            </Button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {invoice.clientEmail && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleMailTo}
                  disabled={loading || !body}
                  className="h-11 px-4 rounded-full text-[14px] font-bold bg-surface-alt text-text-primary hover:bg-border transition-colors border-none cursor-pointer flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Mail</span>
                  <ExternalLink className="w-3.5 h-3.5 text-text-secondary" />
                </Button>
              )}

              <Button
                type="button"
                onClick={handleCopy}
                disabled={loading || !body}
                className="h-11 px-5 rounded-full text-[14px] font-bold bg-purple hover:bg-purple-light text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
