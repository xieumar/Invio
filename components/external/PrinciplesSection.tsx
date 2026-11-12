import {
  Calculator,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Float, Stagger, StaggerItem } from "@/components/motion";

const PRINCIPLES: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  card: string;
  badge: string;
  offset: string;
  duration: number;
  delay: number;
}> = [
  {
    icon: UserCheck,
    title: "AI that never acts on its own",
    body: "The assistant drafts invoices and payment reminders, but nothing is saved or sent until you review it and click. You stay in control of every invoice.",
    card: "bg-[#eaf8f2] dark:bg-[rgba(51,214,159,0.12)] border border-paid-text/25 shadow-sm hover:shadow-md sm:translate-x-6 sm:-rotate-1",
    badge: "bg-paid-text/30 border-paid-text/40 text-paid-text",
    offset: "left",
    duration: 6,
    delay: 0,
  },
  {
    icon: Calculator,
    title: "Maths that always adds up",
    body: "Every amount is calculated in whole pence and cents, never floating point, so subtotals, tax, discounts and totals match to the last digit, in GBP, USD or EUR.",
    card: "bg-surface dark:bg-surface-alt border border-border shadow-lg hover:shadow-xl sm:-translate-x-3 sm:rotate-1",
    badge: "bg-red/20 border-red/40 text-red",
    offset: "right",
    duration: 7,
    delay: 0.8,
  },
  {
    icon: ShieldCheck,
    title: "Your data stays yours",
    body: "Your invoices, clients and business details are stored per account, and AI requests run on the server with rate limiting. Try the demo first; no sign-up needed.",
    card: "bg-[#f0edfd] dark:bg-[rgba(124,93,250,0.15)] border border-purple/25 shadow-sm hover:shadow-md sm:translate-x-5 sm:-rotate-0.5",
    badge: "bg-purple/25 border-purple/40 text-purple",
    offset: "left",
    duration: 8,
    delay: 1.6,
  },
];

export function PrinciplesSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Stagger
          className="lg:col-span-5 flex flex-col gap-4 text-left"
          stagger={0.15}
        >
          <StaggerItem direction="right" distance={40}>
            <span className="text-purple text-xs font-extrabold uppercase tracking-widest bg-purple/10 px-3.5 py-1 rounded-full w-fit">
              Built on Trust
            </span>
          </StaggerItem>
          <StaggerItem direction="right" distance={40}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.12]">
              Invoicing you can rely on
            </h2>
          </StaggerItem>
          <StaggerItem direction="right" distance={40}>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mt-2">
              Invio is designed so the numbers are right, the AI works for you
              rather than instead of you, and your business details stay safe.
            </p>
          </StaggerItem>
        </Stagger>

        <Stagger
          className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 relative"
          stagger={0.3}
          delay={0.15}
        >
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem
                key={p.title}
                direction={p.offset as "left" | "right"}
                distance={90}
                scale={0.94}
              >
                <Float amplitude={6} duration={p.duration} delay={p.delay}>
                  <div
                    className={`rounded-3xl p-6 sm:p-7 hover:rotate-0 transition-all duration-300 ${p.card}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-11 h-11 rounded-full border-2 flex items-center justify-center shrink-0 ${p.badge}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-text-primary">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-[15px] text-text-primary leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </Float>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export default PrinciplesSection;
