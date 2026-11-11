import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { PLANS } from "./plans";

export function PricingPreviewSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <FadeIn className="text-center max-w-2xl mx-auto mb-16" distance={40}>
        <span className="text-purple text-xs font-bold uppercase tracking-wider">
          Simple & Transparent
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-2">
          Free today, more on the way
        </h2>
        <p className="text-text-secondary mt-3 text-base">
          Everything in Invio is free while we build. Paid plans for bank import
          and teams are coming, and we&apos;ll publish prices first.
        </p>
      </FadeIn>

      <Stagger
        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        stagger={0.22}
      >
        {PLANS.map((plan) => (
          <StaggerItem
            key={plan.id}
            className="h-full"
            distance={plan.available ? 40 : 60}
            scale={plan.available ? 0.86 : undefined}
            hoverLift
          >
            <div
              className={`h-full bg-surface rounded-3xl p-8 flex flex-col justify-between relative ${
                plan.available
                  ? "border-2 border-purple shadow-xl"
                  : "border border-border shadow-xs"
              }`}
            >
              {plan.available && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  {plan.badge}
                </span>
              )}
              <div>
                <span
                  className={`text-xs font-bold uppercase ${
                    plan.available ? "text-purple" : "text-text-secondary"
                  }`}
                >
                  {plan.name}
                  {!plan.available && ` · ${plan.badge}`}
                </span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-text-primary">
                    {plan.available ? "£0" : "TBA"}
                  </span>
                  {plan.available && (
                    <span className="text-sm text-text-secondary">
                      free for now
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  {plan.tagline}
                </p>

                <ul className="mt-8 flex flex-col gap-3 text-sm text-text-primary list-none p-0 m-0">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      {plan.available ? (
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-purple shrink-0" />
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
                  className="mt-8 rounded-full w-full font-bold h-11 bg-purple hover:bg-purple-light text-white shadow-sm hover:opacity-95"
                >
                  <Link href="/invoices">Start Invoicing Free</Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="mt-8 rounded-full w-full font-bold h-11 border-border"
                >
                  <Link href="/pricing">View Details</Link>
                </Button>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export default PricingPreviewSection;
