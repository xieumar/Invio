import Image from "next/image";
import NextLink from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-purple/15 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Badge with App Logo */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 animate-in fade-in duration-300">
        <Image
          src="/logo.svg"
          alt="Invio"
          width={16}
          height={16}
          className="w-4 h-4 object-contain"
        />
        <span>Next-Generation Invoicing & Finance</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary max-w-4xl mx-auto leading-[1.08]">
        Automate your billing. <br className="hidden sm:inline" />
        <span className="text-purple">Get paid faster</span> with AI.
      </h1>

      {/* Description */}
      <p className="mt-6 text-base sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
        The smart invoicing and small-business finance workspace. Create
        professional invoices in seconds, reconcile bank CSVs effortlessly, and
        let AI streamline your cash flow.
      </p>

      {/* CTAs */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Button
          asChild
          className="w-full sm:w-auto rounded-full bg-purple hover:bg-purple-light text-white font-bold text-base px-8 h-13 shadow-sm hover:opacity-95 transition-all duration-200"
        >
          <NextLink
            href="/invoices"
            className="no-underline flex items-center gap-2"
          >
            <span>Start Invoicing Free</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </NextLink>
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full sm:w-auto rounded-full border-border/80 hover:bg-surface-alt text-text-primary font-bold text-base px-7 h-13 transition-all duration-200"
        >
          <NextLink
            href="/features"
            className="no-underline flex items-center gap-2"
          >
            <span>Explore Features</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </Button>
      </div>

      {/* Proof Micro-badges */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-text-secondary font-medium">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5]" />
          No credit card required
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5]" />
          Free plan available
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-paid-text stroke-[2.5]" />
          Set up in 60 seconds
        </span>
      </div>

      {/* Interactive Dashboard Preview Frame */}
      <div className="mt-12 sm:mt-16 relative mx-auto max-w-5xl rounded-2xl sm:rounded-3xl border border-border/80 bg-surface/90 shadow-2xl overflow-hidden backdrop-blur-sm text-left">
        {/* Window Title Bar */}
        <div className="bg-surface-alt border-b border-border px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red/80" />
            <span className="w-3 h-3 rounded-full bg-pending-text/80" />
            <span className="w-3 h-3 rounded-full bg-paid-text/80" />
            <span className="ml-3 text-xs font-semibold text-text-secondary hidden sm:inline">
              invio.app/dashboard
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-paid-text animate-pulse" />
            <span>Live Workspace Active</span>
          </div>
        </div>

        {/* Preview Content Inside */}
        <div className="p-5 sm:p-8 flex flex-col gap-6">
          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-alt rounded-2xl p-5 border border-border/60">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Total Revenue
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                  £42,850.00
                </span>
                <span className="text-xs font-bold text-paid-text bg-paid-text/10 px-2 py-0.5 rounded-full">
                  +18.4%
                </span>
              </div>
            </div>

            <div className="bg-surface-alt rounded-2xl p-5 border border-border/60">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Paid Invoices
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                  £36,400.00
                </span>
                <span className="text-xs font-bold text-purple bg-purple/10 px-2 py-0.5 rounded-full">
                  28 Cleared
                </span>
              </div>
            </div>

            <div className="bg-surface-alt rounded-2xl p-5 border border-border/60">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Outstanding Due
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-pending-text">
                  £6,450.00
                </span>
                <span className="text-xs font-bold text-pending-text bg-pending-text/10 px-2 py-0.5 rounded-full">
                  3 Pending
                </span>
              </div>
            </div>
          </div>

          {/* Simulated Live Invoice Cards */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-bold text-text-secondary px-2">
              <span>RECENT INVOICES</span>
              <span>STATUS</span>
            </div>

            {/* Invoice Row 1 */}
            <div className="bg-surface rounded-xl p-4 sm:p-5 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs hover:border-purple/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center p-2">
                  <Image
                    src="/icons/client-invoice.png"
                    alt="Invoice"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-text-primary">
                      #RT3080
                    </span>
                    <span className="text-xs text-text-secondary">
                      Acme Global Design
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    Due in 3 days • Net 30
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                <span className="text-base font-extrabold text-text-primary">
                  £1,800.90
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-[rgba(51,214,159,0.08)] text-paid-text flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-paid-text" />
                  Paid
                </span>
              </div>
            </div>

            {/* Invoice Row 2 */}
            <div className="bg-surface rounded-xl p-4 sm:p-5 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs hover:border-purple/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center p-2">
                  <Image
                    src="/icons/drafts.png"
                    alt="Invoice"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-text-primary">
                      #XM9141
                    </span>
                    <span className="text-xs text-text-secondary">
                      Vercel Cloud Ops
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    Due in 7 days • Net 14
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                <span className="text-base font-extrabold text-text-primary">
                  £4,649.10
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-[rgba(255,143,0,0.08)] text-pending-text flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pending-text" />
                  Pending
                </span>
              </div>
            </div>
          </div>

          {/* AI Copilot Callout */}
          <div className="p-4 rounded-xl bg-purple/10 border border-purple/20 flex items-center gap-3">
            <div className="w-6 h-6 shrink-0 flex items-center justify-center">
              <Image
                src="/icons/ai.png"
                alt="AI Copilot"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-text-primary">
              <strong className="text-purple">Invio AI Copilot:</strong>{" "}
              &quot;Invoice #XM9141 payment is approaching due date. A polite
              automated email reminder has been prepared for your 1-click
              approval.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Partner Strip (Inspired by Inspo 1 & 3) */}
      <div className="mt-16 sm:mt-20 flex flex-col items-center gap-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-text-secondary">
          Trusted by fast-moving freelancers & studios worldwide
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple" /> Quikly
          </span>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-paid-text" /> Staly
          </span>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pending-text" /> Frame
          </span>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-light" /> Graby
          </span>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285f4]" /> DataSoft
          </span>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-text-primary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#33d69f]" /> Brighty
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
