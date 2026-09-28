import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="w-full bg-[#141625] text-white py-20 sm:py-28 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-purple-light text-xs font-extrabold uppercase tracking-widest bg-purple/20 px-3.5 py-1 rounded-full">
            Simple Steps
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            How Invio Works
          </h2>
          <p className="text-[#888eb0] mt-3.5 text-base sm:text-lg leading-relaxed">
            No confusion or delays. Just fast, automated invoicing from initial
            draft to settled bank deposit.
          </p>
        </div>

        {/* 2-Column Showcase (Visual Card on Left + Connected Steps on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase with Floating Card & Annotation */}
          <div className="lg:col-span-6 relative">
            {/* Background Container / Gradient Canvas */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1e2139] via-[#141625] to-[#1e2139] border border-[#252945] shadow-[0_25px_50px_rgba(0,0,0,0.4)] overflow-hidden">
              {/* Floating Annotation Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paid-text text-[#0c0e16] text-xs font-extrabold shadow-md shadow-paid-text/25">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Drafted in 2.4s</span>
                </div>
                <span className="text-xs font-bold text-[#888eb0]">
                  #INV-2026-089
                </span>
              </div>

              {/* Main Interactive Showcase Card */}
              <div className="bg-[#1e2139] rounded-2xl p-6 border border-[#252945] shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#252945]">
                  <div>
                    <h4 className="text-base font-extrabold text-white">
                      Studio Horizon Design
                    </h4>
                    <p className="text-xs text-[#888eb0]">
                      contact@horizonstudio.io
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-purple-light bg-purple/20 px-2.5 py-1 rounded-full">
                      Due Net 14
                    </span>
                  </div>
                </div>

                {/* Line Items List */}
                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#252945]/70 border border-[#252945]">
                    <span className="font-bold text-white">
                      UX Research & Discovery
                    </span>
                    <span className="font-extrabold text-white">£1,200.00</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#252945]/70 border border-[#252945]">
                    <span className="font-bold text-white">
                      Component Design System
                    </span>
                    <span className="font-extrabold text-white">£2,450.00</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#252945]/70 border border-[#252945]">
                    <span className="font-bold text-white">
                      Figma Prototype Review
                    </span>
                    <span className="font-extrabold text-white">£600.00</span>
                  </div>
                </div>

                {/* Total Bar */}
                <div className="pt-3 border-t border-[#252945] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#888eb0] uppercase tracking-wider">
                    Total Invoiced
                  </span>
                  <span className="text-2xl font-extrabold text-white tracking-tight">
                    £4,250
                    <span className="text-sm font-semibold text-[#888eb0]">
                      .00
                    </span>
                  </span>
                </div>
              </div>

              {/* Secondary Floating Overlapping Badge */}
              <div className="mt-4 bg-[#1e2139]/95 backdrop-blur-md rounded-xl p-3.5 border border-[#252945] flex items-center justify-between text-xs shadow-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-paid-text" />
                  <span className="font-bold text-white">
                    Deposit Verified in Monzo CSV
                  </span>
                </div>
                <span className="font-extrabold text-paid-text">
                  +£4,250.00
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Connected Timeline with PNG Icons */}
          <div className="lg:col-span-6 flex flex-col gap-8 relative">
            {/* Vertical Line Connector */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-[#252945] hidden sm:block -z-0" />

            {/* Step 1 */}
            <div className="relative flex items-start gap-5 sm:gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-[#1e2139] border border-[#252945] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 group-hover:border-purple/50 transition-all z-10 p-2.5">
                <Image
                  src="/icons/ai.png"
                  alt="AI drafting"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-extrabold text-paid-text uppercase tracking-wider">
                    Step 01
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight mb-1.5">
                  Describe or Draft with AI
                </h3>
                <p className="text-sm text-[#888eb0] leading-relaxed">
                  Type a short summary of work completed or pick an existing
                  client. Invio auto-generates line items, quantities, pricing,
                  and VAT in seconds.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start gap-5 sm:gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-[#1e2139] border border-[#252945] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 group-hover:border-purple/50 transition-all z-10 p-2.5">
                <Image
                  src="/icons/client-invoice.png"
                  alt="Send & Track"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-extrabold text-purple-light uppercase tracking-wider">
                    Step 02
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight mb-1.5">
                  Send & Track in Real-Time
                </h3>
                <p className="text-sm text-[#888eb0] leading-relaxed">
                  Share a high-res PDF or custom payment portal link. Receive
                  live notifications when clients open your invoice and review
                  terms.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start gap-5 sm:gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-[#1e2139] border border-[#252945] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 group-hover:border-purple/50 transition-all z-10 p-2.5">
                <Image
                  src="/icons/csv.png"
                  alt="Bank CSV reconciliation"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-extrabold text-pending-text uppercase tracking-wider">
                    Step 03
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight mb-1.5">
                  Reconcile with Bank CSVs
                </h3>
                <p className="text-sm text-[#888eb0] leading-relaxed">
                  Upload bank statement CSVs from Monzo or Revolut. Invio
                  automatically cross-references deposits against open invoices
                  to clear payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
