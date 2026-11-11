import type { Metadata, NextPage } from "next";
import { FeaturesPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Features — Invio | Intelligent Billing & Finance Tools",
  description:
    "Explore Invio's invoice builder, AI drafting and payment reminders, client directory, and branded PDF templates.",
};

const ExternalFeaturesPageRoute: NextPage = () => {
  return <FeaturesPage />;
};

export default ExternalFeaturesPageRoute;
