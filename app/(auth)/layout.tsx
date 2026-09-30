import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication | Invio",
  description:
    "Sign in or create an Invio account to manage invoices and cashflow",
};

function AuthShowcase() {
  return (
    <div className="relative w-full h-full rounded-[2.25rem] bg-gradient-to-br from-[#4338ca] via-[#5b4deb] to-[#7c5dfa] p-8 lg:p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Decorative ambient background rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-light/20 blur-3xl pointer-events-none" />

      {/* Background geometric curve watermark */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="90%"
          cy="10%"
          r="280"
          fill="none"
          stroke="currentColor"
          strokeWidth="60"
        />
        <circle
          cx="90%"
          cy="10%"
          r="420"
          fill="none"
          stroke="currentColor"
          strokeWidth="40"
        />
        <circle
          cx="10%"
          cy="90%"
          r="320"
          fill="none"
          stroke="currentColor"
          strokeWidth="50"
        />
      </svg>

      {/* Header text */}
      <div className="relative z-10 max-w-lg mb-8">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Effortlessly manage your invoices and cashflow.
        </h2>
        <p className="text-white/80 text-sm lg:text-base mt-3 font-normal leading-relaxed">
          Log in to access your financial dashboard, track client settlements,
          and streamline payments with precision.
        </p>
      </div>

      {/* Layered Dashboard Mockup Preview */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg bg-surface/95 dark:bg-[#1e2139]/95 backdrop-blur-md rounded-2xl p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-white/20 dark:border-white/10 text-text-primary">
          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Metric 1 */}
            <div className="p-3 rounded-xl bg-purple text-white shadow-md">
              <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold block">
                Total Revenue
              </span>
              <div className="text-base font-extrabold mt-1 tracking-tight">
                £189,374
              </div>
              <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-white/90 bg-white/20 px-1.5 py-0.5 rounded mt-1.5">
                <TrendingUp className="w-2.5 h-2.5" /> +14.2%
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-3 rounded-xl bg-surface-alt dark:bg-[#252945] border border-border/60">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold block">
                Settlement
              </span>
              <div className="text-base font-extrabold mt-1 tracking-tight text-text-primary">
                1.8 Days
              </div>
              <div className="mt-2 h-4 w-full">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 15 Q 25 5, 50 12 T 100 4"
                    fill="none"
                    stroke="#7c5dfa"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-3 rounded-xl bg-surface-alt dark:bg-[#252945] border border-border/60">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold block">
                Paid Invoices
              </span>
              <div className="text-base font-extrabold mt-1 tracking-tight text-text-primary">
                £25,684
              </div>
              <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-paid-text bg-paid-bg px-1.5 py-0.5 rounded mt-1.5">
                <ArrowUpRight className="w-2.5 h-2.5" /> 98.4%
              </span>
            </div>
          </div>

          {/* Middle Row with Trendline & Floating Donut Badge */}
          <div className="grid grid-cols-5 gap-3 mb-4 items-stretch">
            {/* Chart Area */}
            <div className="col-span-3 p-3 rounded-xl bg-surface-alt dark:bg-[#252945] border border-border/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-bold text-text-primary mb-2">
                <span>Revenue Flow</span>
                <span className="text-[10px] text-text-muted font-normal">
                  Monthly
                </span>
              </div>
              <div className="h-16 flex items-end justify-between gap-1.5 pt-2">
                {[35, 60, 45, 80, 65, 95, 85].map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                  >
                    <div
                      className={`w-full rounded-t-sm transition-all ${
                        idx === 5
                          ? "bg-purple"
                          : "bg-purple/30 dark:bg-purple/40"
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Donut Chart Badge */}
            <div className="col-span-2 p-3 rounded-xl bg-surface dark:bg-[#1e2139] border border-purple/30 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden">
              <span className="text-[10px] font-semibold text-text-muted">
                Invoices Breakdown
              </span>
              {/* Mini SVG Donut */}
              <div className="relative w-14 h-14 my-1 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-border dark:text-[#252945]"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple"
                    strokeDasharray="80, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] font-extrabold text-text-primary">
                  80%
                </span>
              </div>
              <span className="text-[10px] font-bold text-paid-text">
                6,248 Units
              </span>
            </div>
          </div>

          {/* Bottom Table Strip Preview */}
          <div className="rounded-xl border border-border/60 bg-surface dark:bg-[#1e2139] overflow-hidden text-[11px]">
            <div className="px-3 py-1.5 border-b border-border/60 font-semibold text-text-muted text-[10px] uppercase tracking-wider flex justify-between">
              <span>Recent Invoices</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-border/40">
              <div className="px-3 py-2 flex items-center justify-between">
                <div>
                  <div className="font-bold text-text-primary">
                    Apple iPad Pro 13
                  </div>
                  <div className="text-[10px] text-text-muted">
                    #INV-0019 • 10 Feb
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-text-primary">
                    £849.00
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-paid-text bg-paid-bg px-1.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Paid
                  </span>
                </div>
              </div>
              <div className="px-3 py-2 flex items-center justify-between">
                <div>
                  <div className="font-bold text-text-primary">
                    Design Retainer
                  </div>
                  <div className="text-[10px] text-text-muted">
                    #INV-0020 • 12 Feb
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-text-primary">
                    £1,250.00
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-pending-text bg-pending-bg px-1.5 py-0.5 rounded-full">
                    <Clock className="w-2.5 h-2.5" /> Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-strip */}
      <div className="relative z-10 flex items-center justify-between text-xs text-white/70 pt-6">
        <span>Trusted by over 10,000+ businesses worldwide</span>
        <div className="flex -space-x-2">
          {["bg-amber-400", "bg-emerald-400", "bg-rose-400", "bg-sky-400"].map(
            (bg, idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-full border-2 border-indigo-900 ${bg} flex items-center justify-center text-[9px] font-bold text-white shadow-sm`}
              >
                {String.fromCharCode(65 + idx)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-surface dark:bg-bg flex text-text-primary">
      {/* Left Column: Form & Navigation */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 min-h-screen">
        {/* Top Brand Logo */}
        <header className="w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group no-underline"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Image
                src="/logo.svg"
                alt="Invio"
                width={36}
                height={36}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-text-primary">
              Invio<span className="text-purple">.</span>
            </span>
          </Link>
        </header>

        {/* Center Content Form */}
        <main className="w-full max-w-md mx-auto my-auto py-8">{children}</main>

        {/* Bottom Footer */}
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-2 pt-4">
          <p>© {new Date().getFullYear()} Invio Technologies Inc.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>

      {/* Right Column: Hero Showcase */}
      <div className="hidden lg:flex lg:w-1/2 p-4 lg:p-6 sticky top-0 h-screen">
        <AuthShowcase />
      </div>
    </div>
  );
}
