import type { Metadata, NextPage } from "next";
import { FeaturesPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Features — Invio | Intelligent Billing & Finance Tools",
  description:
    "Explore Invio's invoicing, conversational AI drafting, client CRM, and automated bank CSV reconciliation workflows.",
};

const ExternalFeaturesPageRoute: NextPage = () => {
  return <FeaturesPage />;
};

export default ExternalFeaturesPageRoute;
