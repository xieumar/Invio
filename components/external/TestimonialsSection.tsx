import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading and Narrative (No View More button per instruction) */}
        <div className="lg:col-span-5 flex flex-col gap-4 text-left">
          <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full w-fit">
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.12]">
            What Our Customers Say About Invio
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mt-2">
            Invio&apos;s intelligent billing, integer-accurate bookkeeping, and
            clean workflow have helped thousands of freelancers and studios
            build healthier financial habits that truly last.
          </p>
        </div>

        {/* Right Column: Staggered Tilted Pill Cards (Inspired by Reference) */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 relative">
          {/* Card 1: Kira B. (Soft Sage/Emerald Tint, Shifted Right) */}
          <div
            className="
              rounded-3xl p-6 sm:p-7 
              bg-[#eaf8f2] dark:bg-[rgba(51,214,159,0.12)] 
              border border-paid-text/25 
              shadow-sm hover:shadow-md 
              sm:translate-x-6 sm:-rotate-1 hover:rotate-0 
              transition-all duration-300
            "
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-paid-text/30 border-2 border-paid-text/40 text-paid-text font-extrabold flex items-center justify-center text-sm shrink-0">
                  KB
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-text-primary">
                    Kira B.
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Product Designer & Consultant
                  </p>
                </div>
              </div>
              <Quote className="w-6 h-6 text-paid-text/40 fill-paid-text/20 shrink-0" />
            </div>
            <p className="text-sm sm:text-[15px] text-text-primary leading-relaxed pl-1">
              &quot;Invio&apos;s AI invoice drafting is the best I&apos;ve
              tried. I describe my hours in plain English and have a polished,
              branded invoice ready to send in seconds. I wake up feeling in
              complete control.&quot;
            </p>
          </div>

          {/* Card 2: Maria P. (Clean Surface Tint, Shifted Left) */}
          <div
            className="
              rounded-3xl p-6 sm:p-7 
              bg-surface dark:bg-surface-alt 
              border border-border 
              shadow-lg hover:shadow-xl 
              sm:-translate-x-3 sm:rotate-1 hover:rotate-0 
              transition-all duration-300
            "
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-red/20 border-2 border-red/40 text-red font-extrabold flex items-center justify-center text-sm shrink-0">
                  MP
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-text-primary">
                    Maria P.
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Founder, Studio Palette
                  </p>
                </div>
              </div>
              <Quote className="w-6 h-6 text-text-muted/40 fill-text-muted/20 shrink-0" />
            </div>
            <p className="text-sm sm:text-[15px] text-text-primary leading-relaxed pl-1">
              &quot;I love the bank CSV reconciliation. My studio accounting
              feels so much healthier and more automated after adding
              Invio&apos;s automatic deposit matching to our monthly
              routine.&quot;
            </p>
          </div>

          {/* Card 3: Andrew S. (Soft Purple Tint, Shifted Right) */}
          <div
            className="
              rounded-3xl p-6 sm:p-7 
              bg-[#f0edfd] dark:bg-[rgba(124,93,250,0.15)] 
              border border-purple/25 
              shadow-sm hover:shadow-md 
              sm:translate-x-5 sm:-rotate-0.5 hover:rotate-0 
              transition-all duration-300
            "
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple/25 border-2 border-purple/40 text-purple font-extrabold flex items-center justify-center text-sm shrink-0">
                  AS
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-text-primary">
                    Andrew S.
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Engineering Consultant
                  </p>
                </div>
              </div>
              <Quote className="w-6 h-6 text-purple/40 fill-purple/20 shrink-0" />
            </div>
            <p className="text-sm sm:text-[15px] text-text-primary leading-relaxed pl-1">
              &quot;Invio&apos;s integer-accurate math and automatic due alerts
              have been a true game-changer for my cash flow. I honestly
              haven&apos;t had to chase a single late client payment in
              months.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
