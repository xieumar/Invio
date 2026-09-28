import type { Metadata, NextPage } from "next";
import { FaqPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Invio",
  description:
    "Find answers to common questions about Invio's invoicing, integer money math, AI copilot, and CSV reconciliations.",
};

const ExternalFaqPageRoute: NextPage = () => {
  return <FaqPage />;
};

export default ExternalFaqPageRoute;
