import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturesHero() {
  return (
    <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] bg-purple/15 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Badge with App Logo */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 animate-in fade-in duration-300">
        <Image
          src="/logo.svg"
          alt="Invio"
          width={16}
          height={16}
          className="w-4 h-4 object-contain"
        />
        <span>Workflow & Automation Suite</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary max-w-4xl mx-auto leading-[1.08]">
        Every tool you need to <br className="hidden sm:inline" />
        <span className="text-purple">run your solo studio</span> with
        confidence.
      </h1>

      {/* Description */}
      <p className="mt-6 text-base sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
        From natural language AI invoice drafting to automated bank CSV
        reconciliation, explore the purpose-built tools that replace messy
        spreadsheets and bloated accounting software.
      </p>

      {/* Quick Jump Anchors */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold">
        <a
          href="#invoicing"
          className="px-4 py-2 rounded-full bg-surface border border-border/80 text-text-secondary hover:text-purple hover:border-purple/40 hover:bg-surface-alt transition-colors shadow-xs"
        >
          Invoice Builder
        </a>
        <a
          href="#ai-copilot"
          className="px-4 py-2 rounded-full bg-surface border border-border/80 text-text-secondary hover:text-purple hover:border-purple/40 hover:bg-surface-alt transition-colors shadow-xs"
        >
          AI Copilot
        </a>
        <a
          href="#client-management"
          className="px-4 py-2 rounded-full bg-surface border border-border/80 text-text-secondary hover:text-purple hover:border-purple/40 hover:bg-surface-alt transition-colors shadow-xs"
        >
          Client Directory
        </a>
        <a
          href="#csv-reconciliation"
          className="px-4 py-2 rounded-full bg-surface border border-border/80 text-text-secondary hover:text-purple hover:border-purple/40 hover:bg-surface-alt transition-colors shadow-xs"
        >
          Bank CSV Import
        </a>
      </div>

      {/* Key Stats Bar */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="bg-surface rounded-2xl p-5 border border-border/80 shadow-xs text-left">
          <span className="text-3xl font-extrabold text-text-primary block tracking-tight">
            2.4s
          </span>
          <span className="text-xs text-text-secondary font-medium mt-1 block">
            Avg AI Draft Time
          </span>
        </div>
        <div className="bg-surface rounded-2xl p-5 border border-border/80 shadow-xs text-left">
          <span className="text-3xl font-extrabold text-paid-text block tracking-tight">
            100%
          </span>
          <span className="text-xs text-text-secondary font-medium mt-1 block">
            Integer Math Accuracy
          </span>
        </div>
        <div className="bg-surface rounded-2xl p-5 border border-border/80 shadow-xs text-left">
          <span className="text-3xl font-extrabold text-text-primary block tracking-tight">
            14+
          </span>
          <span className="text-xs text-text-secondary font-medium mt-1 block">
            Supported Bank Formats
          </span>
        </div>
        <div className="bg-surface rounded-2xl p-5 border border-border/80 shadow-xs text-left">
          <span className="text-3xl font-extrabold text-purple block tracking-tight">
            3x
          </span>
          <span className="text-xs text-text-secondary font-medium mt-1 block">
            Faster Payment Settlements
          </span>
        </div>
      </div>
    </section>
  );
}

export default FeaturesHero;
