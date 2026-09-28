import { PricingSection, FaqPreviewSection } from "@/components/external";

export function PricingPage() {
  return (
    <div className="w-full flex flex-col pb-24 overflow-hidden">
      <PricingSection />
      <div className="py-16 sm:py-24">
        <FaqPreviewSection />
      </div>
    </div>
  );
}

export default PricingPage;
