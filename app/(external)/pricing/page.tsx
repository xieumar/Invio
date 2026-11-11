import type { Metadata, NextPage } from "next";
import { PricingPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Pricing — Invio | Free While in Development",
  description:
    "Everything in Invio is free today. See what's available now and which paid features are planned.",
};

const ExternalPricingPageRoute: NextPage = () => {
  return <PricingPage />;
};

export default ExternalPricingPageRoute;
