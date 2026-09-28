import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  FileText,
  Share2,
  Clock,
  Building,
  UploadCloud,
  FileCheck,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeatureDetailSection() {
  return (
    <div className="w-full flex flex-col gap-24 sm:gap-32">
      {/* ========================================================================= */}
      {/* 1. INVOICE CREATION & MANAGEMENT                                          */}
      {/* ========================================================================= */}
      <section
        id="invoicing"
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple/10 flex items-center justify-center p-1.5 shrink-0">
                <Image
                  src="/icons/client-invoice.png"
                  alt="Invoice"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple">
                Invoice Builder
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              Create invoices in seconds. <br />
              Zero calculation errors.
            </h2>

            <p className="text-text-secondary text-base leading-relaxed">
              Standard accounting tools make you click through dozens of
              confusing modal dialogs. Invio treats invoice creation as a
              streamlined, distraction-free workflow with integer-accurate
              minor-unit math.
            </p>

            <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Flexible Payment Terms:</strong> Set Net 1, Net 7, Net
                  14, Net 30, or custom terms with automated due-date
                  resolution.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Multi-Currency Support:</strong> Quote in GBP, USD, or
                  EUR with exact conversion and integer pence/cents storage.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Pixel-Perfect Exports:</strong> Generate vector PDFs
                  or send clean, branded client review links that track views in
                  real-time.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Button
                asChild
                className="rounded-full bg-purple hover:bg-purple-light text-white font-bold h-11 px-6 shadow-sm"
              >
                <Link href="/invoices">Try Live Invoice Editor</Link>
              </Button>
            </div>
          </div>

          {/* Right Visual Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border shadow-card flex flex-col gap-5">
              {/* Mockup Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div>
                  <span className="text-xs font-bold text-text-secondary uppercase">
                    Drafting Invoice
                  </span>
                  <h3 className="text-lg font-extrabold text-text-primary">
                    #RT3080 — Horizon Studios
                  </h3>
                </div>
                <span className="text-xs font-extrabold text-purple bg-purple/10 px-3 py-1 rounded-full">
                  Net 14 Terms
                </span>
              </div>

              {/* Line Items Table */}
              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-6 text-[10px] font-extrabold uppercase tracking-wider text-text-secondary px-2">
                  <span className="col-span-3">Item Name</span>
                  <span className="text-center">QTY</span>
                  <span className="text-right">Rate</span>
                  <span className="text-right">Total</span>
                </div>

                <div className="grid grid-cols-6 items-center p-3 rounded-xl bg-surface-alt dark:bg-surface-alt/40 border border-border/60 text-xs">
                  <span className="col-span-3 font-bold text-text-primary truncate">
                    Brand Strategy & Wireframes
                  </span>
                  <span className="text-center text-text-secondary font-medium">
                    1
                  </span>
                  <span className="text-right text-text-secondary">
                    £1,850.00
                  </span>
                  <span className="text-right font-extrabold text-text-primary">
                    £1,850.00
                  </span>
                </div>

                <div className="grid grid-cols-6 items-center p-3 rounded-xl bg-surface-alt dark:bg-surface-alt/40 border border-border/60 text-xs">
                  <span className="col-span-3 font-bold text-text-primary truncate">
                    Interactive Prototype Handover
                  </span>
                  <span className="text-center text-text-secondary font-medium">
                    20h
                  </span>
                  <span className="text-right text-text-secondary">£85.00</span>
                  <span className="text-right font-extrabold text-text-primary">
                    £1,700.00
                  </span>
                </div>

                <div className="grid grid-cols-6 items-center p-3 rounded-xl bg-surface-alt dark:bg-surface-alt/40 border border-border/60 text-xs">
                  <span className="col-span-3 font-bold text-text-primary truncate">
                    Design System Tokens
                  </span>
                  <span className="text-center text-text-secondary font-medium">
                    1
                  </span>
                  <span className="text-right text-text-secondary">
                    £700.00
                  </span>
                  <span className="text-right font-extrabold text-text-primary">
                    £700.00
                  </span>
                </div>
              </div>

              {/* Math Breakdown Box */}
              <div className="bg-surface-alt dark:bg-surface-alt/60 rounded-2xl p-4 border border-border/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <FileCheck className="w-4 h-4 text-paid-text" />
                  <span>Integer precision verified (425,000 minor units)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-text-secondary block">
                    Total Amount
                  </span>
                  <span className="text-2xl font-black text-text-primary tracking-tight">
                    £4,250.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. AI INVOICE DRAFTING & SMART REMINDERS                                  */}
      {/* ========================================================================= */}
      <section
        id="ai-copilot"
        className="w-full bg-[#141625] text-white py-20 sm:py-28 relative overflow-hidden"
      >
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-purple/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Visual AI Chat Mockup */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-[#1e2139] rounded-3xl p-6 sm:p-8 border border-[#252945] shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col gap-5">
                {/* AI Input Prompt Bubble */}
                <div className="bg-[#252945] rounded-2xl p-4 border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-purple-light font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Conversational Prompt
                    </span>
                    <span className="text-[#888eb0] text-[11px]">
                      Invio Copilot v2.4
                    </span>
                  </div>
                  <p className="text-sm text-white italic leading-relaxed">
                    &quot;Draft an invoice for Acme Corp covering 35 hours of
                    design sprint at £85/hr, plus £300 for Figma asset
                    licensing. Set terms to Net 14.&quot;
                  </p>
                </div>

                {/* AI Processing Arrow */}
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-paid-text py-1">
                  <span className="w-2 h-2 rounded-full bg-paid-text animate-pulse" />
                  <span>
                    Parsed 2 line items • Verified Client: Acme Corp • Net 14
                    Applied
                  </span>
                </div>

                {/* AI Generated Result Preview */}
                <div className="bg-[#141625] rounded-2xl p-5 border border-[#252945] flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#252945]">
                    <div>
                      <span className="text-xs font-extrabold text-white">
                        Acme Corp
                      </span>
                      <p className="text-[11px] text-[#888eb0]">
                        Invoice #INV-9281 • Due in 14 days
                      </p>
                    </div>
                    <span className="text-xs font-bold text-paid-text bg-paid-text/15 px-2.5 py-1 rounded-full">
                      Ready for 1-Click Send
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-[#dfe3fa]">
                    <span>Design Sprint (35h × £85.00)</span>
                    <span className="font-extrabold text-white">£2,975.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#dfe3fa]">
                    <span>Figma Asset Licensing</span>
                    <span className="font-extrabold text-white">£300.00</span>
                  </div>

                  <div className="pt-2 border-t border-[#252945] flex justify-between items-baseline">
                    <span className="text-xs text-[#888eb0] font-bold uppercase">
                      Total Due
                    </span>
                    <span className="text-xl font-black text-white">
                      £3,275.00
                    </span>
                  </div>
                </div>

                {/* Auto Reminders Footer Note */}
                <div className="p-3.5 rounded-xl bg-purple/10 border border-purple/20 flex items-center gap-2.5 text-xs text-purple-light">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>
                    Automated follow-up reminder scheduled for Day 12 if unpaid.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-5 flex flex-col gap-5 text-left order-1 lg:order-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple/20 flex items-center justify-center p-1.5 shrink-0">
                  <Image
                    src="/icons/ai.png"
                    alt="AI Copilot"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-light">
                  AI Intelligence
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Turn thoughts into invoices in under 3 seconds.
              </h2>

              <p className="text-[#888eb0] text-base leading-relaxed">
                Describe your work in plain English. Invio calculates hours,
                itemizes rates, assigns payment terms, and even drafts polite
                automated reminder sequences so you never have to send
                uncomfortable debt-collection emails.
              </p>

              <ul className="flex flex-col gap-3 text-sm text-[#dfe3fa] list-none p-0 m-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                  <span>
                    <strong>Natural Language Invoicing:</strong> Speak or type
                    summaries — Invio maps descriptions directly to line items.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                  <span>
                    <strong>Polite Auto-Reminders:</strong> Sends timely,
                    friendly reminders before and on due dates without manual
                    effort.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                  <span>
                    <strong>1-Click Approval:</strong> You always maintain
                    complete control — AI drafts; you approve and send.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CLIENT MANAGEMENT & RETAINERS                                          */}
      {/* ========================================================================= */}
      <section
        id="client-management"
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple/10 flex items-center justify-center p-1.5 shrink-0">
                <Image
                  src="/icons/drafts.png"
                  alt="Clients"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple">
                Client Directory
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              Manage client relationships <br />
              and recurring retainers.
            </h2>

            <p className="text-text-secondary text-base leading-relaxed">
              Keep client contact info, VAT numbers, currency defaults, and
              payment history in one clean hub. Track ongoing retainer hours
              with real-time balance transparency.
            </p>

            <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Dedicated Client Portals:</strong> Give clients a
                  permanent link to view open, paid, and historical invoices.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Retainer Hour Tracking:</strong> Monitor hours logged
                  against monthly contracts with automatic rollover alerts.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Lifetime Value Analytics:</strong> Know exactly which
                  clients contribute most to your studio revenue.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Visual Client Directory Card */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border shadow-card flex flex-col gap-5">
              {/* Client Profile Card */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-purple/15 text-purple font-black text-base flex items-center justify-center">
                    AC
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-text-primary">
                      Acme Corporation Ltd.
                    </h3>
                    <p className="text-xs text-text-secondary">
                      billing@acmecorp.io • VAT: GB92819481
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-paid-text bg-paid-text/10 px-3 py-1 rounded-full">
                  Active Client
                </span>
              </div>

              {/* Retainer & Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-alt dark:bg-surface-alt/40 rounded-xl p-3.5 border border-border/60">
                  <span className="text-[10px] font-bold uppercase text-text-secondary block">
                    Monthly Retainer
                  </span>
                  <span className="text-lg font-black text-text-primary mt-0.5 block">
                    180 hr/mo
                  </span>
                </div>
                <div className="bg-surface-alt dark:bg-surface-alt/40 rounded-xl p-3.5 border border-border/60">
                  <span className="text-[10px] font-bold uppercase text-text-secondary block">
                    Hourly Rate
                  </span>
                  <span className="text-lg font-black text-text-primary mt-0.5 block">
                    £85.00/hr
                  </span>
                </div>
                <div className="bg-surface-alt dark:bg-surface-alt/40 rounded-xl p-3.5 border border-border/60">
                  <span className="text-[10px] font-bold uppercase text-text-secondary block">
                    Total Lifetime Billed
                  </span>
                  <span className="text-lg font-black text-paid-text mt-0.5 block">
                    £34,850.00
                  </span>
                </div>
              </div>

              {/* Recent Invoices for this Client */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary">
                  Recent Invoices
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-alt dark:bg-surface-alt/40 border border-border/60 text-xs">
                  <div>
                    <span className="font-bold text-text-primary">#RT3080</span>
                    <span className="text-text-secondary ml-2">
                      Brand Identity Handover
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-text-primary">
                      £4,250.00
                    </span>
                    <span className="text-[10px] font-bold text-paid-text bg-paid-text/10 px-2 py-0.5 rounded">
                      Paid
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-alt dark:bg-surface-alt/40 border border-border/60 text-xs">
                  <div>
                    <span className="font-bold text-text-primary">#XM9141</span>
                    <span className="text-text-secondary ml-2">
                      Monthly Design Retainer (Oct)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-text-primary">
                      £3,275.00
                    </span>
                    <span className="text-[10px] font-bold text-pending-text bg-pending-text/10 px-2 py-0.5 rounded">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CSV BANK STATEMENT RECONCILIATION                                     */}
      {/* ========================================================================= */}
      <section
        id="csv-reconciliation"
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual CSV Upload & Reconciliation */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border shadow-card flex flex-col gap-5">
              {/* Dropzone Simulation */}
              <div className="border-2 border-dashed border-purple/40 bg-purple/5 rounded-2xl p-6 text-center flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center text-purple">
                  <UploadCloud className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-sm font-extrabold text-text-primary">
                  monzo_statement_october_2026.csv
                </span>
                <span className="text-xs text-text-secondary">
                  Processed 14 transactions • Monzo format auto-detected
                </span>
              </div>

              {/* Matched Transactions Feed */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary">
                  Auto-Matched Deposit Records
                </span>

                <div className="p-3.5 rounded-xl bg-surface-alt dark:bg-surface-alt/40 border border-border/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-paid-text" />
                    <div>
                      <span className="font-bold text-text-primary block">
                        Acme Corp Direct Credit
                      </span>
                      <span className="text-[11px] text-text-secondary">
                        Matched with Invoice #RT3080
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-paid-text block">
                      +£4,250.00
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      Marked as Paid
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-alt dark:bg-surface-alt/40 border border-border/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-paid-text" />
                    <div>
                      <span className="font-bold text-text-primary block">
                        Stripe Payout Ref: 9812
                      </span>
                      <span className="text-[11px] text-text-secondary">
                        Matched with Invoice #XM9141
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-paid-text block">
                      +£1,800.90
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      Marked as Paid
                    </span>
                  </div>
                </div>
              </div>

              {/* Reconciliation Status Bar */}
              <div className="pt-2 flex items-center justify-between text-xs text-text-secondary">
                <span>
                  Total Reconciled: <strong>£6,050.90</strong>
                </span>
                <span className="text-paid-text font-bold">
                  14/14 Matched (0 Discrepancies)
                </span>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left order-1 lg:order-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple/10 flex items-center justify-center p-1.5 shrink-0">
                <Image
                  src="/icons/csv.png"
                  alt="CSV Import"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple">
                Bank Reconciliation
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              Reconcile bank accounts <br />
              without Open Banking logins.
            </h2>

            <p className="text-text-secondary text-base leading-relaxed">
              Don&apos;t want to link your banking credentials to third-party
              aggregators? Export standard CSVs from Monzo, Revolut, Starling,
              or Stripe. Invio cross-checks deposits and clears invoices
              automatically.
            </p>

            <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>100% Bank Agnostic:</strong> Works with Monzo,
                  Starling, Revolut, HSBC, Barclays, Stripe, Wise, and generic
                  CSVs.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Smart Fuzzy Matching:</strong> Detects invoice
                  reference codes and settlement sums even if client names
                  slightly differ.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Privacy First:</strong> Your CSV statement data stays
                  in your personal workspace; we never train public AI models on
                  your bank feeds.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeatureDetailSection;
