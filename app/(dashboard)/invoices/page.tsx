import type { Metadata, NextPage } from "next";
import { InvoicesPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Invoices | Invio",
  description: "Manage, track, and filter your business invoices.",
};

const InvoicesRoute: NextPage = () => {
  return <InvoicesPage />;
};

export default InvoicesRoute;
