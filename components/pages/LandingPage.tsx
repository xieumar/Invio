import {
  HeroSection,
  BenefitsSection,
  HowItWorksSection,
  TestimonialsSection,
  PricingPreviewSection,
  FaqPreviewSection,
} from "@/components/external";

export function LandingPage() {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <HeroSection />
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
      <div className="py-16 sm:py-24">
        <FaqPreviewSection />
      </div>
    </div>
  );
}

export default LandingPage;
