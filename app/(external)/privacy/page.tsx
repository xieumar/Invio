import type { Metadata, NextPage } from "next";
import { PrivacyPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Privacy Policy — Invio | Security & Confidentiality",
  description:
    "Learn how Invio collects, protects, and handles your financial records and personal data under GDPR and CCPA standards.",
};

const ExternalPrivacyPageRoute: NextPage = () => {
  return <PrivacyPage />;
};

export default ExternalPrivacyPageRoute;
