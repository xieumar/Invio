import type { Metadata, NextPage } from "next";
import { TermsPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Terms of Service — Invio | Agreement & Conditions",
  description:
    "Review the terms, conditions, and acceptable use policies governing your use of Invio's invoicing and billing software.",
};

const ExternalTermsPageRoute: NextPage = () => {
  return <TermsPage />;
};

export default ExternalTermsPageRoute;
