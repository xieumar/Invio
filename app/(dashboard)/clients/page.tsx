import type { Metadata, NextPage } from "next";
import { ClientsListPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Clients | Invio",
  description:
    "Manage client directory, billing contacts, and payment histories.",
};

const ClientsRoute: NextPage = () => {
  return <ClientsListPage />;
};

export default ClientsRoute;
