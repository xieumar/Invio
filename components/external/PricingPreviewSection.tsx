import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingPreviewSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-purple text-xs font-bold uppercase tracking-wider">
          Simple & Transparent
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-2">
          Choose the plan that fits your growth
        </h2>
        <p className="text-text-secondary mt-3 text-base">
          Start for free. Upgrade when you need advanced AI and unlimited
          reconciliations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Free Tier */}
        <div className="bg-surface rounded-3xl p-8 border border-border flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase text-text-secondary">
              Starter
            </span>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-text-primary">
                £0
              </span>
              <span className="text-sm text-text-secondary">/month</span>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Ideal for solo freelancers starting out.
            </p>

            <ul className="mt-8 flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Up to 5 active invoices/mo
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                PDF exports & shareable links
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Basic AI drafting (10 queries/mo)
              </li>
            </ul>
          </div>

          <Button
            asChild
            variant="outline"
            className="mt-8 rounded-full w-full font-bold h-11 border-border"
          >
            <Link href="/invoices">Start Free</Link>
          </Button>
        </div>

        {/* Pro Tier (Popular) */}
        <div className="bg-surface rounded-3xl p-8 border-2 border-purple relative flex flex-col justify-between shadow-xl">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
          <div>
            <span className="text-xs font-bold uppercase text-purple">
              Professional
            </span>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-text-primary">
                £14
              </span>
              <span className="text-sm text-text-secondary">/month</span>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              For active freelancers and growing businesses.
            </p>

            <ul className="mt-8 flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Unlimited invoices & clients
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Unlimited bank CSV imports
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Full AI Copilot & auto-reminders
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Multi-currency conversions
              </li>
            </ul>
          </div>

          <Button
            asChild
            className="mt-8 rounded-full w-full font-bold h-11 bg-purple hover:bg-purple-light text-white shadow-sm hover:opacity-95"
          >
            <Link href="/invoices">Get Started with Pro</Link>
          </Button>
        </div>

        {/* Business Tier */}
        <div className="bg-surface rounded-3xl p-8 border border-border flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase text-text-secondary">
              Studio & Agency
            </span>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-text-primary">
                £39
              </span>
              <span className="text-sm text-text-secondary">/month</span>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              For creative agencies with team collaboration.
            </p>

            <ul className="mt-8 flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Everything in Pro
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Up to 5 team member seats
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Custom invoice branding & domains
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                Priority dedicated support
              </li>
            </ul>
          </div>

          <Button
            asChild
            variant="outline"
            className="mt-8 rounded-full w-full font-bold h-11 border-border"
          >
            <Link href="/pricing">View Details</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PricingPreviewSection;
