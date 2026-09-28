import { FeaturesHero, FeatureDetailSection } from "@/components/external";

export function FeaturesPage() {
  return (
    <div className="w-full flex flex-col pb-24 overflow-hidden">
      <FeaturesHero />
      <div className="py-12 sm:py-16">
        <FeatureDetailSection />
      </div>
    </div>
  );
}

export default FeaturesPage;
