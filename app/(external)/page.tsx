import type { Metadata, NextPage } from "next";
import { LandingPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Invio — Smart Invoicing & Small Business Finance",
  description:
    "Create professional invoices in seconds, reconcile bank statements, and manage small business finance with AI assistance.",
};

const ExternalLandingPageRoute: NextPage = () => {
  return <LandingPage />;
};

export default ExternalLandingPageRoute;
