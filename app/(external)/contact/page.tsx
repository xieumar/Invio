import type { Metadata, NextPage } from "next";
import { ContactPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Contact Us — Invio | Get in Touch with Support & Sales",
  description:
    "Have questions about Invio, need help with your invoices, or want a custom agency plan? Reach out to our team.",
};

const ExternalContactPageRoute: NextPage = () => {
  return <ContactPage />;
};

export default ExternalContactPageRoute;
