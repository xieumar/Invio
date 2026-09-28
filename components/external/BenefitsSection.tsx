import Image from "next/image";
import { Flag, CheckCircle2 } from "lucide-react";

export function BenefitsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full">
          Capabilities
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight mt-4">
          Banking & billing features to bring your business to life
        </h2>
        <p className="text-text-secondary mt-3.5 text-base sm:text-lg leading-relaxed">
          Each of our features has the depth required to streamline your
          workflow from project kickoff to settled payment.
        </p>
      </div>

      {/* 3 Interactive Cards with Uniform Height and Balanced Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* CARD 1: Client-facing portal */}
        <div className="bg-surface rounded-3xl p-6 sm:p-7 border border-border shadow-card h-full flex flex-col justify-between overflow-hidden group hover:border-purple/40 transition-all duration-300">
          {/* Header with uniform min-height */}
          <div className="min-h-[84px] flex flex-col justify-start mb-6">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
                <Image
                  src="/icons/client-invoice.png"
                  alt="Client portal"
                  width={28}
                  height={28}
                  className="object-contain w-7 h-7"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight">
                Client-facing portal
              </h3>
            </div>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              Integrate with the PM tools you love, manage the internal mess
              behind.
            </p>
          </div>

          {/* Mockup Canvas */}
          <div className="bg-surface-alt dark:bg-surface-alt/40 rounded-2xl p-4 sm:p-5 border border-border/70 flex-1 flex flex-col justify-between gap-3.5">
            {/* Top Metric Card (Agreement 180 hr/mo) */}
            <div className="bg-surface rounded-xl p-4 border border-border/80 shadow-xs h-[76px] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-text-secondary block">
                  Agreement
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mt-0.5">
                  180{" "}
                  <span className="text-xs text-text-secondary font-medium">
                    hr/mo
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-pending-text bg-pending-text/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-pending-text" />
                  10 days left
                </span>
                <span className="text-[10px] text-text-secondary block mt-1">
                  Rate: £85/hr
                </span>
              </div>
            </div>

            {/* Bottom Detail Card (Client Overview & Line Items) */}
            <div className="bg-surface rounded-xl p-4 border border-border/60 flex-1 flex flex-col justify-between gap-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <div>
                  <h4 className="text-[12px] font-bold text-text-primary">
                    Alexander M. Whitfield
                  </h4>
                  <p className="text-[10px] text-text-secondary">
                    Workspace Client • Net 14
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-text-secondary block">
                    Available
                  </span>
                  <span className="text-[12px] font-extrabold text-text-primary">
                    136 hr
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-[11px] pt-0.5">
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-text-primary font-medium truncate max-w-[125px]">
                    Brand identity sprint
                  </span>
                  <span className="text-[#3b82f6] flex items-center gap-1 font-semibold text-[10px] bg-[#3b82f6]/10 px-1.5 py-0.5 rounded">
                    <Flag className="w-2.5 h-2.5 fill-[#3b82f6]" /> Med
                  </span>
                  <span className="font-extrabold text-text-primary text-[11px]">
                    £2,450
                  </span>
                </div>

                <div className="flex items-center justify-between py-0.5">
                  <span className="text-text-primary font-medium truncate max-w-[125px]">
                    Design tokens & export
                  </span>
                  <span className="text-pending-text flex items-center gap-1 font-semibold text-[10px] bg-pending-text/10 px-1.5 py-0.5 rounded">
                    <Flag className="w-2.5 h-2.5 fill-pending-text" /> High
                  </span>
                  <span className="font-extrabold text-text-primary text-[11px]">
                    £1,200
                  </span>
                </div>

                <div className="flex items-center justify-between py-0.5">
                  <span className="text-text-primary font-medium truncate max-w-[125px]">
                    Figma review & handover
                  </span>
                  <span className="text-paid-text flex items-center gap-1 font-semibold text-[10px] bg-paid-text/10 px-1.5 py-0.5 rounded">
                    <Flag className="w-2.5 h-2.5 fill-paid-text" /> Done
                  </span>
                  <span className="font-extrabold text-text-primary text-[11px]">
                    £600
                  </span>
                </div>
              </div>

              {/* Summary Footer Line */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
                <span className="text-text-secondary font-medium">
                  Total Billed:
                </span>
                <span className="font-extrabold text-text-primary">
                  £4,250.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Task collaboration */}
        <div className="bg-surface rounded-3xl p-6 sm:p-7 border border-border shadow-card h-full flex flex-col justify-between overflow-hidden group hover:border-purple/40 transition-all duration-300">
          {/* Header with uniform min-height */}
          <div className="min-h-[84px] flex flex-col justify-start mb-6">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
                <Image
                  src="/icons/drafts.png"
                  alt="Task collaboration"
                  width={28}
                  height={28}
                  className="object-contain w-7 h-7"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight">
                Task collaboration
              </h3>
            </div>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              Integrate with the PM tools you love, manage the internal mess
              behind.
            </p>
          </div>

          {/* Mockup Canvas */}
          <div className="bg-surface-alt dark:bg-surface-alt/40 rounded-2xl p-4 sm:p-5 border border-border/70 flex-1 flex flex-col justify-between gap-3.5">
            {/* Top Metric Card (Active Tasks + Avatars) */}
            <div className="bg-surface rounded-xl p-4 border border-border/80 shadow-xs h-[76px] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-text-secondary block">
                  Active Tasks
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mt-0.5">
                  32{" "}
                  <span className="text-xs text-text-secondary font-medium">
                    sprint items
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-surface shrink-0">
                    <Image
                      src="/avatar.png"
                      alt="Assignee"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple text-[10px] font-bold text-white flex items-center justify-center border-2 border-surface shrink-0">
                    JD
                  </div>
                </div>
                <span className="text-[10px] text-purple font-bold bg-purple/10 px-2 py-1 rounded-full">
                  Live Sync
                </span>
              </div>
            </div>

            {/* Bottom Detail Card (Task's status with 4 Bars & Activity) */}
            <div className="bg-surface rounded-xl p-4 border border-border/60 flex-1 flex flex-col justify-between gap-2.5">
              <div className="flex items-center justify-between pb-1">
                <h5 className="text-[12px] font-bold text-text-primary">
                  Task&apos;s status
                </h5>
                <span className="text-[10px] font-bold text-text-secondary">
                  03:30h logged
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-0.5">
                {/* To do */}
                <div>
                  <div className="flex justify-between text-[10px] font-medium text-text-secondary mb-1">
                    <span>To do</span>
                    <span className="font-bold text-text-primary">5</span>
                  </div>
                  <div className="w-full bg-border/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#4285f4] h-full rounded-full w-[45%]" />
                  </div>
                </div>

                {/* In design */}
                <div>
                  <div className="flex justify-between text-[10px] font-medium text-text-secondary mb-1">
                    <span>In design</span>
                    <span className="font-bold text-text-primary">12</span>
                  </div>
                  <div className="w-full bg-border/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple h-full rounded-full w-[85%]" />
                  </div>
                </div>

                {/* In dev */}
                <div>
                  <div className="flex justify-between text-[10px] font-medium text-text-secondary mb-1">
                    <span>In dev</span>
                    <span className="font-bold text-text-primary">10</span>
                  </div>
                  <div className="w-full bg-border/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-pending-text h-full rounded-full w-[65%]" />
                  </div>
                </div>

                {/* In client */}
                <div>
                  <div className="flex justify-between text-[10px] font-medium text-text-secondary mb-1">
                    <span>In client</span>
                    <span className="font-bold text-text-primary">5</span>
                  </div>
                  <div className="w-full bg-border/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#f4b400] h-full rounded-full w-[40%]" />
                  </div>
                </div>
              </div>

              {/* Summary Footer Line */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
                <span className="text-text-secondary font-medium">
                  Weekly Target:
                </span>
                <span className="font-extrabold text-paid-text">
                  24.5 / 30 hrs logged
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Retainer tracking (Shortened, punchy title) */}
        <div className="bg-surface rounded-3xl p-6 sm:p-7 border border-border shadow-card h-full flex flex-col justify-between overflow-hidden group hover:border-purple/40 transition-all duration-300">
          {/* Header with uniform min-height */}
          <div className="min-h-[84px] flex flex-col justify-start mb-6">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
                <Image
                  src="/icons/csv.png"
                  alt="Retainer tracking"
                  width={28}
                  height={28}
                  className="object-contain w-7 h-7"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight">
                Retainer tracking
              </h3>
            </div>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              Integrate with the PM tools you love, manage the internal mess
              behind.
            </p>
          </div>

          {/* Mockup Canvas */}
          <div className="bg-surface-alt dark:bg-surface-alt/40 rounded-2xl p-4 sm:p-5 border border-border/70 flex-1 flex flex-col justify-between gap-3.5">
            {/* Top Metric Card (Available hours 136 hr) */}
            <div className="bg-surface rounded-xl p-4 border border-border/80 shadow-xs h-[76px] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-text-secondary block">
                  Available hours
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mt-0.5">
                  136{" "}
                  <span className="text-xs text-text-secondary font-medium">
                    hr
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-pending-text bg-pending-text/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-pending-text" />
                  10 days left
                </span>
                <span className="text-[10px] text-text-secondary block mt-1">
                  Cap: 180 hr
                </span>
              </div>
            </div>

            {/* Bottom Detail Card (Hours Usage + 4 Metrics + Bank Statement Matching) */}
            <div className="bg-surface rounded-xl p-4 border border-border/60 flex-1 flex flex-col justify-between gap-2.5">
              <div className="flex items-center justify-between">
                <h5 className="text-[12px] font-bold text-text-primary">
                  Hours Usage
                </h5>
                <span className="text-[10px] font-bold text-text-secondary">
                  October Cycle
                </span>
              </div>

              {/* Segmented Colorful Bar */}
              <div className="w-full h-2 rounded-full flex gap-1 overflow-hidden bg-border/40 my-0.5">
                <div className="bg-[#4285f4] h-full w-[25%]" title="Spent" />
                <div className="bg-purple h-full w-[35%]" title="Projected" />
                <div
                  className="bg-paid-text h-full w-[25%]"
                  title="Available"
                />
                <div
                  className="bg-pending-text h-full w-[15%]"
                  title="Rollover"
                />
              </div>

              {/* 4 Usage Metric Columns */}
              <div className="grid grid-cols-4 gap-2 text-left py-1 border-b border-border/50">
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-text-primary">
                    8
                  </div>
                  <div className="text-[10px] text-text-secondary font-medium">
                    Spent
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-text-primary">
                    15
                  </div>
                  <div className="text-[10px] text-text-secondary font-medium">
                    Projected
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-text-primary">
                    23
                  </div>
                  <div className="text-[10px] text-text-secondary font-medium">
                    Available
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-text-primary">
                    12
                  </div>
                  <div className="text-[10px] text-text-secondary font-medium">
                    Rollover
                  </div>
                </div>
              </div>

              {/* Statement Matching Feed */}
              <div className="flex flex-col gap-1 text-[11px]">
                <div className="flex items-center justify-between py-0.5">
                  <span className="text-text-primary font-medium truncate max-w-[130px]">
                    Monzo Statement CSV
                  </span>
                  <span className="text-paid-text font-bold text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-paid-text" /> +£2,450
                  </span>
                </div>
              </div>

              {/* Summary Footer Line */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
                <span className="text-text-secondary font-medium">
                  CSV Reconciliation:
                </span>
                <span className="font-extrabold text-paid-text">
                  100% Cleared
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
