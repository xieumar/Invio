import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Sparkles,
  FileCheck,
  Clock,
  Landmark,
  Link2,
  Users,
  BellRing,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";
import { TemplateShowcase } from "./TemplateShowcase";

const ROADMAP = [
  {
    icon: Landmark,
    title: "Bank CSV import",
    body: "Upload a statement and match incoming payments to open invoices.",
  },
  {
    icon: BellRing,
    title: "Scheduled reminders",
    body: "Reminder emails that go out on their own before and after the due date.",
  },
  {
    icon: Link2,
    title: "Shareable client links",
    body: "A link your client can open to view their invoice online.",
  },
  {
    icon: Users,
    title: "Teams",
    body: "Seats, roles and an activity log for studios and agencies.",
  },
];

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
          <FadeIn
            direction="right"
            distance={80}
            duration={0.9}
            className="lg:col-span-5 flex flex-col gap-5 text-left"
          >
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
              Invoice creation is a single, distraction-free form. Amounts are
              calculated in whole pence and cents, so subtotals, tax and
              discounts always add up.
            </p>

            <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Payment terms:</strong> Choose Net 1, 7, 14 or 30 days
                  and the due date is worked out for you. Set your own default
                  in Settings.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Tax, discounts and currencies:</strong> Add a tax rate
                  and a discount, and invoice in dozens of currencies, each
                  stored exactly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Track every invoice:</strong> Draft, pending and paid
                  statuses, with search, sort and filtering to find any invoice
                  fast.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Button
                asChild
                className="rounded-full bg-purple hover:bg-purple-light text-white font-bold h-11 px-6 shadow-sm"
              >
                <Link href="/invoices">Try the Invoice Editor</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn
            direction="left"
            distance={80}
            duration={0.9}
            className="lg:col-span-7"
          >
            <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border shadow-card flex flex-col gap-5">
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

              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-6 text-[10px] font-extrabold uppercase tracking-wider text-text-secondary px-2">
                  <span className="col-span-3">Item Name</span>
                  <span className="text-center">QTY</span>
                  <span className="text-right">Rate</span>
                  <span className="text-right">Total</span>
                </div>

                {[
                  [
                    "Brand Strategy & Wireframes",
                    "1",
                    "£1,850.00",
                    "£1,850.00",
                  ],
                  [
                    "Interactive Prototype Handover",
                    "20",
                    "£85.00",
                    "£1,700.00",
                  ],
                  ["Design System Tokens", "1", "£700.00", "£700.00"],
                ].map(([name, qty, rate, total]) => (
                  <div
                    key={name}
                    className="grid grid-cols-6 items-center p-3 rounded-xl bg-surface-alt dark:bg-surface-alt/40 border border-border/60 text-xs"
                  >
                    <span className="col-span-3 font-bold text-text-primary truncate">
                      {name}
                    </span>
                    <span className="text-center text-text-secondary font-medium">
                      {qty}
                    </span>
                    <span className="text-right text-text-secondary">
                      {rate}
                    </span>
                    <span className="text-right font-extrabold text-text-primary">
                      {total}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-surface-alt dark:bg-surface-alt/60 rounded-2xl p-4 border border-border/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <FileCheck className="w-4 h-4 text-paid-text" />
                  <span>Exact to the penny, no rounding drift</span>
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
          </FadeIn>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. AI INVOICE DRAFTING & PAYMENT REMINDERS                                */}
      {/* ========================================================================= */}
      <section
        id="ai-copilot"
        className="w-full bg-[#141625] text-white py-20 sm:py-28 relative overflow-hidden"
      >
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-purple/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <FadeIn
              direction="right"
              distance={80}
              duration={0.9}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="bg-[#1e2139] rounded-3xl p-6 sm:p-8 border border-[#252945] shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col gap-5">
                <div className="bg-[#252945] rounded-2xl p-4 border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center text-xs text-purple-light font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Describe the work
                    </span>
                  </div>
                  <p className="text-sm text-white italic leading-relaxed">
                    &quot;Draft an invoice for Acme Corp covering 35 hours of
                    design sprint at £85/hr, plus £300 for Figma asset
                    licensing. Set terms to Net 14.&quot;
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-bold text-paid-text py-1">
                  <span className="w-2 h-2 rounded-full bg-paid-text animate-pulse" />
                  <span>2 line items drafted • Net 14 applied</span>
                </div>

                <div className="bg-[#141625] rounded-2xl p-5 border border-[#252945] flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#252945]">
                    <div>
                      <span className="text-xs font-extrabold text-white">
                        Acme Corp
                      </span>
                      <p className="text-[11px] text-[#888eb0]">
                        Draft invoice • Due in 14 days
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-light bg-purple/20 px-2.5 py-1 rounded-full">
                      Ready for your review
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

                <div className="p-3.5 rounded-xl bg-purple/10 border border-purple/20 flex flex-wrap items-center gap-2.5 text-xs text-purple-light">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Overdue? Draft a reminder in your tone:</span>
                  {["Friendly", "Firm", "Urgent"].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full bg-purple/20 font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn
              direction="left"
              distance={80}
              duration={0.9}
              className="lg:col-span-5 flex flex-col gap-5 text-left order-1 lg:order-2"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple/20 flex items-center justify-center p-1.5 shrink-0">
                  <Image
                    src="/icons/ai.png"
                    alt="AI assistant"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-light">
                  AI Assistant
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Describe the work. Review the draft.
              </h2>

              <p className="text-[#888eb0] text-base leading-relaxed">
                Describe your work in plain English and the assistant fills in
                line items, quantities, prices and payment terms. When a payment
                runs late, it drafts the awkward email for you.
              </p>

              <ul className="flex flex-col gap-3 text-sm text-[#dfe3fa] list-none p-0 m-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                  <span>
                    <strong>Invoice drafting:</strong> Type a summary, or pick a
                    preset, and the form is prefilled. Filled-in fields are
                    highlighted until you edit them.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                  <span>
                    <strong>Payment reminders:</strong> Generate a reminder
                    email in a friendly, firm or urgent tone, aware of how
                    overdue the invoice is. Copy it or open it in your email
                    app.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                  <span>
                    <strong>You stay in control:</strong> The AI drafts and
                    suggests. Nothing is saved or sent until you decide.
                  </span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CLIENT DIRECTORY                                                       */}
      {/* ========================================================================= */}
      <section
        id="client-management"
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <FadeIn
            direction="right"
            distance={80}
            duration={0.9}
            className="lg:col-span-5 flex flex-col gap-5 text-left"
          >
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
              Save a client once. <br />
              Invoice them in a click.
            </h2>

            <p className="text-text-secondary text-base leading-relaxed">
              Keep your clients&apos; contact details and preferred currency in
              one place, and see at a glance who you&apos;ve billed.
            </p>

            <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Client picker:</strong> Choose a saved client in the
                  invoice form and their name, email and address fill in
                  automatically.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Add, edit and search:</strong> A simple directory with
                  search and summary metrics.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Currency per client:</strong> Set the currency each
                  client pays in, and your dashboard converts everything into
                  one total.
                </span>
              </li>
            </ul>
          </FadeIn>

          <FadeIn
            direction="left"
            distance={80}
            duration={0.9}
            className="lg:col-span-7"
          >
            <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border shadow-card flex flex-col gap-5">
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
                      billing@acmecorp.io • London, UK
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple bg-purple/10 px-3 py-1 rounded-full">
                  GBP
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary">
                  Recent Invoices
                </span>
                {[
                  [
                    "#RT3080",
                    "Brand Identity Handover",
                    "£4,250.00",
                    "Paid",
                    "paid",
                  ],
                  [
                    "#XM9141",
                    "Monthly Design Retainer (Oct)",
                    "£3,275.00",
                    "Pending",
                    "pending",
                  ],
                ].map(([id, desc, amount, status, kind]) => (
                  <div
                    key={id}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-alt dark:bg-surface-alt/40 border border-border/60 text-xs"
                  >
                    <div>
                      <span className="font-bold text-text-primary">{id}</span>
                      <span className="text-text-secondary ml-2">{desc}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-text-primary">
                        {amount}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          kind === "paid"
                            ? "text-paid-text bg-paid-text/10"
                            : "text-pending-text bg-pending-text/10"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PDF TEMPLATES & BRANDING                                               */}
      {/* ========================================================================= */}
      <section
        id="templates"
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <FadeIn
            direction="right"
            distance={80}
            duration={0.9}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <TemplateShowcase />
          </FadeIn>

          <FadeIn
            direction="left"
            distance={80}
            duration={0.9}
            className="lg:col-span-5 flex flex-col gap-5 text-left order-1 lg:order-2"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple/10 flex items-center justify-center p-1.5 shrink-0">
                <Image
                  src="/icons/client-invoice.png"
                  alt="PDF templates"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple">
                PDF Templates & Branding
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              Invoices that look <br />
              like your business.
            </h2>

            <p className="text-text-secondary text-base leading-relaxed">
              Set up your business details once, pick a template, and every PDF
              you download is ready to send.
            </p>

            <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Three templates:</strong> Minimal, Classic or Bold.
                  Preview them in Settings and see your choice on every invoice
                  page.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Your logo and details:</strong> Add your logo,
                  business address and tax ID, and they appear on every invoice.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5] mt-1 shrink-0" />
                <span>
                  <strong>Payment details built in:</strong> Bank details, a
                  payment link and your own notes print on the invoice, so
                  clients know how to pay.
                </span>
              </li>
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ROADMAP                                                                */}
      {/* ========================================================================= */}
      <section
        id="roadmap"
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <FadeIn className="text-center max-w-2xl mx-auto mb-10" distance={40}>
          <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full">
            On the Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-4">
            What we&apos;re building next
          </h2>
          <p className="text-text-secondary mt-3 text-base">
            These aren&apos;t in the app yet. We&apos;re listing them so you
            know what to expect.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROADMAP.map(({ icon: Icon, title, body }) => (
            <FadeIn key={title} distance={32}>
              <div className="h-full bg-surface rounded-2xl p-6 border border-border shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-alt text-text-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-text-secondary">
                    <Clock className="w-3 h-3" /> Coming soon
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-text-primary">
                  {title}
                </h3>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  {body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FeatureDetailSection;
