"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  X,
  Sparkles,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const COMPARISON_FEATURES = [
  {
    category: "Invoicing & Billing",
    features: [
      {
        name: "Monthly Active Invoices",
        starter: "5 invoices",
        pro: "Unlimited",
        studio: "Unlimited",
      },
      {
        name: "Integer Math Precision (Minor Units)",
        starter: true,
        pro: true,
        studio: true,
      },
      { name: "PDF Vector Exports", starter: true, pro: true, studio: true },
      {
        name: "Shareable Live Client Links",
        starter: true,
        pro: true,
        studio: true,
      },
      {
        name: "Custom Payment Terms (Net 7, 14, 30)",
        starter: false,
        pro: true,
        studio: true,
      },
      {
        name: "Multi-Currency (GBP, USD, EUR)",
        starter: false,
        pro: true,
        studio: true,
      },
      {
        name: "Custom Brand Logo on Invoices",
        starter: false,
        pro: true,
        studio: true,
      },
    ],
  },
  {
    category: "AI Copilot & Automation",
    features: [
      {
        name: "Natural Language Invoicing",
        starter: "10 drafts/mo",
        pro: "Unlimited",
        studio: "Unlimited",
      },
      {
        name: "Automated Overdue Reminders",
        starter: false,
        pro: true,
        studio: true,
      },
      {
        name: "Smart Due-Date Detection",
        starter: false,
        pro: true,
        studio: true,
      },
      {
        name: "Line Item Auto-Categorization",
        starter: false,
        pro: true,
        studio: true,
      },
    ],
  },
  {
    category: "Banking & Reconciliation",
    features: [
      {
        name: "Bank Statement CSV Imports",
        starter: "1 upload/mo",
        pro: "Unlimited",
        studio: "Unlimited",
      },
      {
        name: "Fuzzy Deposit Matching",
        starter: false,
        pro: true,
        studio: true,
      },
      {
        name: "Monzo, Revolut, Stripe Formats",
        starter: true,
        pro: true,
        studio: true,
      },
      {
        name: "Historical Reconciliation Reports",
        starter: false,
        pro: true,
        studio: true,
      },
    ],
  },
  {
    category: "Team & Support",
    features: [
      {
        name: "Included Team Seats",
        starter: "1 user",
        pro: "1 user",
        studio: "Up to 5 users",
      },
      {
        name: "Custom Domain on Portals",
        starter: false,
        pro: false,
        studio: true,
      },
      {
        name: "Support Channel",
        starter: "Community & FAQ",
        pro: "Priority Email (24h)",
        studio: "Dedicated Account Mgr",
      },
    ],
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="w-full flex flex-col gap-20 sm:gap-28">
      {/* Header with Monthly/Annual Toggle */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center pt-8 sm:pt-14">
        <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full">
          Transparent Pricing
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary tracking-tight mt-4">
          Invest in clarity. <br />
          <span className="text-purple">Get paid faster</span> every month.
        </h1>
        <p className="text-text-secondary mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Start for free. Scale when you need unlimited AI invoice drafting,
          bank CSV reconciliation, and team seats.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="mt-10 inline-flex items-center gap-3 bg-surface p-1.5 rounded-full border border-border shadow-xs">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              !annual
                ? "bg-purple text-white shadow-xs"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              annual
                ? "bg-purple text-white shadow-xs"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <span>Annual Billing</span>
            <span className="bg-paid-text text-[#0c0e16] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              Save 20%
            </span>
          </button>
        </div>

        {/* 3 Main Pricing Tier Cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left">
          {/* STARTER TIER */}
          <div className="bg-surface rounded-3xl p-8 border border-border flex flex-col justify-between shadow-card hover:border-purple/40 transition-all">
            <div>
              <span className="text-xs font-extrabold uppercase text-text-secondary tracking-wider">
                Starter
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-text-primary">
                  £0
                </span>
                <span className="text-sm text-text-secondary font-medium">
                  /forever
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Essential tools for solo freelancers starting out with
                occasional invoicing.
              </p>

              <div className="h-px bg-border my-6" />

              <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>5 active invoices per month</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>PDF downloads & client links</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>Basic AI drafting (10 prompts/mo)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>1 bank CSV upload per month</span>
                </li>
              </ul>
            </div>

            <Button
              asChild
              variant="outline"
              className="mt-8 rounded-full w-full font-bold h-12 border-border hover:bg-surface-alt"
            >
              <Link href="/invoices">Start Free Forever</Link>
            </Button>
          </div>

          {/* PROFESSIONAL TIER (Featured) */}
          <div className="bg-surface rounded-3xl p-8 border-2 border-purple relative flex flex-col justify-between shadow-xl">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-extrabold uppercase text-purple tracking-wider">
                Professional
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-text-primary">
                  {annual ? "£11" : "£14"}
                </span>
                <span className="text-sm text-text-secondary font-medium">
                  /month
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {annual
                  ? "Billed annually (£132/year)"
                  : "Billed monthly, cancel anytime"}
              </p>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Complete automation suite for active contractors, freelancers,
                and independent consultants.
              </p>

              <div className="h-px bg-border my-6" />

              <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <strong>Unlimited invoices & clients</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <strong>Unlimited AI Copilot queries</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>Automated email payment reminders</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>Unlimited Bank CSV reconciliations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>Multi-currency support (GBP, USD, EUR)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>Custom invoice logo & branding</span>
                </li>
              </ul>
            </div>

            <Button
              asChild
              className="mt-8 rounded-full w-full font-bold h-12 bg-purple hover:bg-purple-light text-white shadow-sm hover:opacity-95"
            >
              <Link href="/invoices">Start 14-Day Free Trial</Link>
            </Button>
          </div>

          {/* STUDIO & AGENCY TIER */}
          <div className="bg-surface rounded-3xl p-8 border border-border flex flex-col justify-between shadow-card hover:border-purple/40 transition-all">
            <div>
              <span className="text-xs font-extrabold uppercase text-text-secondary tracking-wider">
                Studio & Agency
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-text-primary">
                  {annual ? "£31" : "£39"}
                </span>
                <span className="text-sm text-text-secondary font-medium">
                  /month
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {annual
                  ? "Billed annually (£372/year)"
                  : "Billed monthly, cancel anytime"}
              </p>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                For creative boutique studios and small agencies managing shared
                retainers and team seats.
              </p>

              <div className="h-px bg-border my-6" />

              <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <strong>Everything in Professional</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <strong>Up to 5 team member seats</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>Custom portal domains (billing.yourdomain.com)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>Team activity logs & audit trail</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple shrink-0 stroke-[2.5]" />
                  <span>Dedicated support manager</span>
                </li>
              </ul>
            </div>

            <Button
              asChild
              variant="outline"
              className="mt-8 rounded-full w-full font-bold h-12 border-border hover:bg-surface-alt"
            >
              <Link href="/contact">Contact Studio Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURE COMPARISON MATRIX TABLE                                           */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Compare all plan capabilities
          </h2>
          <p className="text-text-secondary mt-3 text-base">
            Every plan includes our integer math engine and responsive web app.
          </p>
        </div>

        <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-surface-alt dark:bg-surface-alt/60 p-5 sm:p-6 border-b border-border text-xs font-extrabold uppercase tracking-wider text-text-secondary">
            <span className="col-span-6 sm:col-span-5 text-text-primary text-sm font-black">
              Plan Features
            </span>
            <span className="col-span-2 sm:col-span-2 text-center">
              Starter
            </span>
            <span className="col-span-2 sm:col-span-2 text-center text-purple">
              Pro
            </span>
            <span className="col-span-2 sm:col-span-3 text-center">Studio</span>
          </div>

          {/* Feature Categories */}
          {COMPARISON_FEATURES.map((cat, catIdx) => (
            <div key={cat.category} className="divide-y divide-border/60">
              <div className="bg-surface-alt/40 dark:bg-surface-alt/20 px-5 sm:px-6 py-3 text-xs font-black uppercase tracking-wider text-purple">
                {cat.category}
              </div>

              {cat.features.map((feat, featIdx) => (
                <div
                  key={feat.name}
                  className="grid grid-cols-12 items-center p-4 sm:p-5 text-xs sm:text-sm text-text-primary hover:bg-surface-alt/30 transition-colors"
                >
                  <span className="col-span-6 sm:col-span-5 font-semibold text-text-primary">
                    {feat.name}
                  </span>

                  {/* Starter Column */}
                  <div className="col-span-2 sm:col-span-2 flex justify-center text-center">
                    {typeof feat.starter === "boolean" ? (
                      feat.starter ? (
                        <CheckCircle2 className="w-4 h-4 text-paid-text" />
                      ) : (
                        <X className="w-4 h-4 text-text-secondary/40" />
                      )
                    ) : (
                      <span className="text-xs text-text-secondary font-medium">
                        {feat.starter}
                      </span>
                    )}
                  </div>

                  {/* Pro Column */}
                  <div className="col-span-2 sm:col-span-2 flex justify-center text-center">
                    {typeof feat.pro === "boolean" ? (
                      feat.pro ? (
                        <CheckCircle2 className="w-4 h-4 text-purple stroke-[2.5]" />
                      ) : (
                        <X className="w-4 h-4 text-text-secondary/40" />
                      )
                    ) : (
                      <span className="text-xs font-bold text-purple">
                        {feat.pro}
                      </span>
                    )}
                  </div>

                  {/* Studio Column */}
                  <div className="col-span-2 sm:col-span-3 flex justify-center text-center">
                    {typeof feat.studio === "boolean" ? (
                      feat.studio ? (
                        <CheckCircle2 className="w-4 h-4 text-paid-text" />
                      ) : (
                        <X className="w-4 h-4 text-text-secondary/40" />
                      )
                    ) : (
                      <span className="text-xs text-text-primary font-bold">
                        {feat.studio}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee & Security Strip */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border shadow-xs flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-paid-text/15 text-paid-text flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-text-primary">
              14-Day Money-Back Guarantee & Fair Billing
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
              If you upgrade to Professional and decide Invio isn&apos;t the
              right fit for your workflow within 14 days, we&apos;ll refund 100%
              of your payment with no questions asked.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PricingSection;
