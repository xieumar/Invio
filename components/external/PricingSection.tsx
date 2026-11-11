import Link from "next/link";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { FEATURE_STATUS, PLANS } from "./plans";

export function PricingSection() {
  return (
    <div className="w-full flex flex-col gap-20 sm:gap-28">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center pt-8 sm:pt-14">
        <Stagger immediate stagger={0.12}>
          <StaggerItem>
            <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full">
              Free While in Development
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary tracking-tight mt-4">
              Invoice for free. <br />
              <span className="text-purple">Paid plans</span> are on the way.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-text-secondary mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Everything Invio does today is free to use, with no credit card
              and no invoice limits. We&apos;re building bank import, scheduled
              reminders and team features next; they&apos;ll be listed here with
              prices before they launch.
            </p>
          </StaggerItem>
        </Stagger>

        {/* Plan cards */}
        <Stagger
          className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left"
          stagger={0.2}
          delay={0.35}
          immediate
        >
          {PLANS.map((plan) => (
            <StaggerItem
              key={plan.id}
              className="h-full"
              distance={plan.available ? 40 : 60}
              hoverLift
            >
              <div
                className={`h-full bg-surface rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  plan.available
                    ? "border-2 border-purple relative shadow-xl"
                    : "border border-border shadow-card"
                }`}
              >
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                      plan.available
                        ? "bg-purple text-white"
                        : "bg-surface-alt text-text-secondary border border-border"
                    }`}
                  >
                    {!plan.available && <Clock className="w-3 h-3" />}
                    {plan.badge}
                  </span>

                  <h2 className="mt-4 text-2xl font-extrabold text-text-primary">
                    {plan.name}
                  </h2>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-text-primary">
                      {plan.available ? "£0" : "TBA"}
                    </span>
                    {plan.available && (
                      <span className="text-sm text-text-secondary font-medium">
                        /free for now
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="h-px bg-border my-6" />

                  <ul className="flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        {plan.available ? (
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-purple shrink-0 stroke-[2.5]" />
                        ) : (
                          <Clock className="w-4 h-4 mt-0.5 text-text-secondary/60 shrink-0" />
                        )}
                        <span
                          className={
                            plan.available ? undefined : "text-text-secondary"
                          }
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.available ? (
                  <Button
                    asChild
                    className="mt-8 rounded-full w-full font-bold h-12 bg-purple hover:bg-purple-light text-white shadow-sm hover:opacity-95"
                  >
                    <Link href="/invoices">Start Invoicing Free</Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    disabled
                    className="mt-8 rounded-full w-full font-bold h-12 border-border"
                  >
                    Coming soon
                  </Button>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* What's available today */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12" distance={40}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            What you get today, and what&apos;s next
          </h2>
          <p className="text-text-secondary mt-3 text-base">
            A plain list of what works now and what&apos;s still being built.
          </p>
        </FadeIn>

        <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
          {FEATURE_STATUS.map((cat) => (
            <div key={cat.category} className="divide-y divide-border/60">
              <div className="bg-surface-alt/40 dark:bg-surface-alt/20 px-5 sm:px-6 py-3 text-xs font-black uppercase tracking-wider text-purple">
                {cat.category}
              </div>

              {cat.features.map((feat) => (
                <FadeIn
                  key={feat.name}
                  direction="right"
                  distance={24}
                  duration={0.5}
                >
                  <div className="flex items-center justify-between gap-4 p-4 sm:p-5 text-xs sm:text-sm text-text-primary hover:bg-surface-alt/30 transition-colors">
                    <span className="font-semibold">{feat.name}</span>
                    {feat.available ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-paid-text shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary shrink-0">
                        <Clock className="w-4 h-4" /> Coming soon
                      </span>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <FadeIn
        className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full"
        distance={40}
      >
        <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border shadow-xs flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-paid-text/15 text-paid-text flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-text-primary">
              No surprise bills
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
              Invio doesn&apos;t ask for payment details today, and prices will
              be published here before any paid plan launches.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default PricingSection;
