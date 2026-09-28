import type { Metadata, NextPage } from "next";
import { PricingPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Pricing Plans — Invio | Simple & Transparent Accounting",
  description:
    "Compare Invio's Starter, Professional, and Studio pricing tiers. Start for free or start a 14-day trial.",
};

const ExternalPricingPageRoute: NextPage = () => {
  return <PricingPage />;
};

export default ExternalPricingPageRoute;
