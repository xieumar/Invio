import type { Metadata, NextPage } from "next";
import { LandingPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Invio — AI-Assisted Invoicing for Freelancers",
  description:
    "Create professional invoices in seconds, export branded PDFs in three templates, and let AI draft invoices and payment reminders for your approval.",
};

const ExternalLandingPageRoute: NextPage = () => {
  return <LandingPage />;
};

export default ExternalLandingPageRoute;
