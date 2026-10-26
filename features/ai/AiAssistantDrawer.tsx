"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2, ArrowRight, Wand2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type AiInvoiceDraft } from "@/lib/validations/ai";

interface AiAssistantDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDraftGenerated: (draft: AiInvoiceDraft) => void;
}

const PROMPT_PRESETS = [
  {
    title: "Development Sprint",
    prompt:
      "Invoice Acme Corp (contact: alex@acmecorp.com, 102 Innovation Way, London, EC2A 4NE, United Kingdom) for 40 hours of frontend development at $75 per hour plus 20% VAT with 30-day payment terms.",
  },
  {
    title: "Monthly Retainer",
    prompt:
      "Monthly SEO and content marketing retainer for Horizon Media (billing@horizonmedia.com, 45 Market Street, Manchester, M1 1WR, United Kingdom) at $1,500 with 14-day terms.",
  },
  {
    title: "Design Package",
    prompt:
      "Brand identity package for Studio North (contact@studionorth.design, 12 Creative Quarter, Bristol, BS1 5HL, United Kingdom): Logo design ($800) and Style guide documentation ($450) with a $50 introductory discount and 20% VAT.",
  },
  {
    title: "Consulting Hours",
    prompt:
      "Cloud architecture advisory: 15 hours at $150 per hour for Nexus Labs (accounts@nexuslabs.io, 88 Tech Park, Cambridge, CB4 0GF, United Kingdom), Net 7 payment terms.",
  },
];

export function AiAssistantDrawer({
  open,
  onOpenChange,
  onDraftGenerated,
}: AiAssistantDrawerProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock background scroll and handle Escape key
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", onKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onOpenChange]);

  async function handleGenerate() {
    if (!prompt.trim() || prompt.trim().length < 3) {
      setError("Please describe the invoice in a few words.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/invoice-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to generate invoice draft.");
      }

      onDraftGenerated(result.data);
      onOpenChange(false);
      setPrompt("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectPreset(presetPrompt: string) {
    setPrompt(presetPrompt);
    setError(null);
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop overlay - locks interaction with background */}
      <div
        className="fixed inset-0 bg-black/50 z-150 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer Panel - matches InvoiceForm.tsx dimensions and styles 1:1 */}
      <div
        className="
          fixed top-0 right-0 bottom-0 z-151 flex flex-col
          w-full md:w-160 max-w-full bg-surface text-text-primary
          border-l border-border shadow-2xl md:rounded-l-[20px]
          transition-all animate-in slide-in-from-right duration-300
        "
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 border-b border-border bg-surface-alt/50 shrink-0">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close assistant"
            className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-border/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 pr-10">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center text-purple shadow-sm shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                AI Invoice Assistant
              </h2>
              <p className="text-[13px] text-text-secondary mt-0.5">
                Describe what you are billing for and AI will draft the invoice.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable body content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Prompt input */}
          <div className="space-y-2">
            <label
              htmlFor="ai-prompt-input"
              className="text-[13px] font-bold text-text-secondary flex items-center justify-between"
            >
              <span>Invoice description or notes</span>
              <span className="text-[11px] font-normal text-text-secondary">
                {prompt.length}/2000
              </span>
            </label>
            <Textarea
              id="ai-prompt-input"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Bill Acme Corp for 40 hours of frontend development at $75/hr plus 20% VAT..."
              className="min-h-[140px] text-[14px] leading-relaxed resize-none bg-(--input-bg) border-(--input-border) focus-visible:border-purple focus-visible:ring-purple/20 transition-all placeholder:text-text-secondary/60"
              disabled={loading}
              maxLength={2000}
            />
          </div>

          {/* Error alert */}
          {error && (
            <div className="p-3.5 rounded-lg bg-red/10 border border-red/20 text-red text-[13px] flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {/* Quick presets */}
          <div className="space-y-3">
            <p className="text-[12px] font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-purple" />
              <span>Or pick a starter preset</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PROMPT_PRESETS.map((preset) => (
                <button
                  key={preset.title}
                  type="button"
                  onClick={() => handleSelectPreset(preset.prompt)}
                  disabled={loading}
                  className="p-3 text-left rounded-lg bg-surface-alt hover:bg-border/60 border border-border/50 hover:border-purple/40 transition-all text-[13px] font-medium group cursor-pointer disabled:opacity-50"
                >
                  <div className="font-bold text-text-primary group-hover:text-purple transition-colors mb-1">
                    {preset.title}
                  </div>
                  <div className="text-[12px] text-text-secondary line-clamp-2 leading-relaxed">
                    {preset.prompt}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Human-in-the-loop guarantee info */}
          <div className="p-4 rounded-xl bg-purple/5 border border-purple/15 text-[12px] text-text-secondary leading-relaxed space-y-1">
            <span className="font-bold text-purple block">Review before saving</span>
            AI drafts line items, amounts, and tax into your invoice form for review. It will never save to your account automatically.
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-border bg-surface-alt/30 flex items-center justify-end gap-3 shrink-0">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="h-11 px-5 rounded-full text-[14px] font-bold text-text-secondary hover:text-text-primary cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="h-11 px-6 rounded-full text-[14px] font-bold bg-purple hover:bg-purple-light text-white transition-all shadow-md hover:shadow-purple/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Drafting Invoice…</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Draft</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
