import type { Metadata, NextPage } from "next";
import { DashboardPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Dashboard | Invio",
  description:
    "Overview of your business metrics, revenue, and active invoices.",
};

const DashboardRoute: NextPage = () => {
  return <DashboardPage />;
};

export default DashboardRoute;
