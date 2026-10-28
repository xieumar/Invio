import {
  HeroSection,
  BenefitsSection,
  HowItWorksSection,
  TestimonialsSection,
  PricingPreviewSection,
  FaqPreviewSection,
} from "@/components/external";
import { FadeIn } from "@/components/motion";

export function LandingPage() {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <HeroSection />

      {/* Each section below animates its own contents */}
      <div className="py-16 sm:py-24">
        <BenefitsSection />
      </div>
      <HowItWorksSection />
      <div className="py-16 sm:py-24">
        <TestimonialsSection />
      </div>
      <div className="py-16 sm:py-24">
        <PricingPreviewSection />
      </div>
      <FadeIn className="py-16 sm:py-24" distance={40} duration={0.8}>
        <FaqPreviewSection />
      </FadeIn>
    </div>
  );
}

export default LandingPage;
