import Image from "next/image";
import { CheckCircle2, Sparkles } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

const CARD =
  "bg-surface rounded-3xl p-6 sm:p-7 border border-border shadow-card h-full flex flex-col overflow-hidden group hover:border-purple/40 transition-all duration-300";
const CANVAS =
  "bg-surface-alt dark:bg-surface-alt/40 rounded-2xl p-4 sm:p-5 border border-border/70 flex-1 flex flex-col gap-3.5";
const INNER = "bg-surface rounded-xl p-4 border border-border/70";

function CardHeader({
  icon,
  alt,
  title,
  children,
}: {
  icon: string;
  alt: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[96px] flex flex-col justify-start mb-6">
      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
          <Image
            src={icon}
            alt={alt}
            width={28}
            height={28}
            className="object-contain w-7 h-7"
          />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-text-secondary text-[13px] leading-relaxed">
        {children}
      </p>
    </div>
  );
}

/** A tiny page thumbnail for the template card. */
function MiniTemplate({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
      <div className="w-full aspect-[3/4] rounded-md bg-white border border-border shadow-xs p-1.5 overflow-hidden">
        {children}
      </div>
      <span className="text-[10px] font-bold text-text-primary">{name}</span>
    </div>
  );
}

const line = "h-[3px] rounded-full bg-neutral-300";

export function BenefitsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <FadeIn
        className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        distance={40}
      >
        <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full">
          Capabilities
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
          Everything you need to invoice like a pro
        </h2>
        <p className="text-text-secondary mt-3.5 text-base sm:text-lg leading-relaxed">
          From the first draft to a branded PDF in your client&apos;s inbox,
          with AI on hand for the tedious parts.
        </p>
      </FadeIn>

      <Stagger
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        stagger={0.2}
      >
        {/* CARD 1: PDF templates & branding */}
        <StaggerItem className="h-full" distance={64} scale={0.94} hoverLift>
          <div className={CARD}>
            <CardHeader
              icon="/icons/client-invoice.png"
              alt="PDF templates"
              title="Branded PDF templates"
            >
              Pick Minimal, Classic or Bold, add your logo and payment details
              once, and every PDF comes out looking professional.
            </CardHeader>

            <div className={CANVAS}>
              <div className="flex gap-2.5">
                <MiniTemplate name="Minimal">
                  <div className="h-1.5 w-1/2 rounded-full bg-neutral-700" />
                  <div className="mt-3 space-y-1">
                    <div className={`${line} w-full bg-neutral-700`} />
                    <div className={`${line} w-5/6`} />
                    <div className={`${line} w-4/6`} />
                    <div className={`${line} w-full bg-neutral-700`} />
                  </div>
                </MiniTemplate>
                <MiniTemplate name="Classic">
                  <div className="h-1.5 w-1/3 rounded-full bg-neutral-700" />
                  <div className="mt-2 rounded-sm bg-neutral-200 p-1 space-y-1">
                    <div className={`${line} w-2/3 bg-neutral-500`} />
                    <div className={`${line} w-1/2`} />
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className={`${line} w-5/6`} />
                    <div className={`${line} w-4/6`} />
                  </div>
                </MiniTemplate>
                <MiniTemplate name="Bold">
                  <div className="h-3 rounded-sm bg-[#1E2139]" />
                  <div className="mt-2 h-1.5 rounded-sm bg-purple/20" />
                  <div className="mt-1.5 space-y-1">
                    <div className={`${line} w-5/6`} />
                    <div className={`${line} w-4/6`} />
                  </div>
                  <div className="mt-2 ml-auto h-2 w-3/5 rounded-sm bg-purple" />
                </MiniTemplate>
              </div>

              <div className={`${INNER} flex flex-col gap-2 text-[11px]`}>
                {[
                  "Your logo on every invoice",
                  "Bank & payment details",
                  "One default, used for every PDF",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-paid-text shrink-0" />
                    <span className="text-text-primary font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* CARD 2: AI assistant */}
        <StaggerItem className="h-full" distance={64} scale={0.94} hoverLift>
          <div className={CARD}>
            <CardHeader
              icon="/icons/ai.png"
              alt="AI assistant"
              title="AI that drafts, you approve"
            >
              Describe the work in plain English and the form fills itself in.
              Nothing is saved until you review it.
            </CardHeader>

            <div className={CANVAS}>
              <div className={`${INNER} text-[11px]`}>
                <span className="text-[10px] font-semibold text-text-secondary block mb-1">
                  You typed
                </span>
                <p className="text-text-primary font-medium leading-snug">
                  &quot;Logo and brand guide for Acme, 2 days at £400, 20%
                  VAT&quot;
                </p>
              </div>

              <div
                className={`${INNER} border-purple/30 bg-purple/5 text-[11px] flex flex-col gap-2`}
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-purple">
                  <Sparkles className="w-3 h-3" /> Drafted for review
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-text-primary font-medium">
                    Logo &amp; brand guide × 2
                  </span>
                  <span className="font-extrabold text-text-primary">
                    £800.00
                  </span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Tax (20%)</span>
                  <span className="font-bold text-text-primary">£160.00</span>
                </div>
              </div>

              <div className={`${INNER} text-[11px]`}>
                <span className="text-[10px] font-semibold text-text-secondary block mb-2">
                  Payment reminders, your tone
                </span>
                <div className="flex gap-1.5">
                  {["Friendly", "Firm", "Urgent"].map((t, i) => (
                    <span
                      key={t}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        i === 0
                          ? "bg-purple text-white"
                          : "bg-surface-alt text-text-secondary border border-border"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* CARD 3: Clients, currencies, tax */}
        <StaggerItem className="h-full" distance={64} scale={0.94} hoverLift>
          <div className={CARD}>
            <CardHeader
              icon="/icons/drafts.png"
              alt="Clients and currencies"
              title="Clients, tax & currencies"
            >
              Save clients once, invoice in the currency they pay in, and let
              Invio do the maths down to the last penny.
            </CardHeader>

            <div className={CANVAS}>
              <div className={`${INNER} flex items-center justify-between`}>
                <div>
                  <h4 className="text-[12px] font-bold text-text-primary">
                    Alexander Whitfield
                  </h4>
                  <p className="text-[10px] text-text-secondary">
                    Saved client · auto-fills the invoice
                  </p>
                </div>
                <div className="flex gap-1">
                  {["GBP", "USD", "EUR"].map((c, i) => (
                    <span
                      key={c}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        i === 0
                          ? "bg-purple/15 text-purple"
                          : "bg-surface-alt text-text-secondary"
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`${INNER} text-[11px] flex flex-col gap-2`}>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-bold text-text-primary">£4,250.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Discount</span>
                  <span className="font-bold text-text-primary">-£250.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tax (20%)</span>
                  <span className="font-bold text-text-primary">£850.00</span>
                </div>
                <div className="pt-2 border-t border-border/50 flex justify-between">
                  <span className="text-text-secondary font-medium">
                    Total due
                  </span>
                  <span className="font-extrabold text-text-primary">
                    £4,850.00
                  </span>
                </div>
              </div>

              <div
                className={`${INNER} flex items-center justify-between text-[11px]`}
              >
                <span className="text-text-secondary font-medium">Status</span>
                <div className="flex gap-1.5 text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded-md bg-surface-alt text-text-secondary">
                    Draft
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-pending-text/10 text-pending-text">
                    Pending
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-paid-text/10 text-paid-text">
                    Paid
                  </span>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}

export default BenefitsSection;
