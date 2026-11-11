import type { Metadata, NextPage } from "next";
import { FaqPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Invio",
  description:
    "Find answers to common questions about Invio's invoicing, accurate money maths, AI assistant, PDF templates, and what's coming next.",
};

const ExternalFaqPageRoute: NextPage = () => {
  return <FaqPage />;
};

export default ExternalFaqPageRoute;
