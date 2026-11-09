import type { Metadata, NextPage } from "next";
import { SettingsPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Settings | Invio",
  description:
    "Manage your business profile, invoice defaults and payment details.",
};

const SettingsRoute: NextPage = () => {
  return <SettingsPage />;
};

export default SettingsRoute;
