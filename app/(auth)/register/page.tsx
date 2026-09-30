import type { Metadata } from "next";
import { RegisterPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Create Account | Invio",
  description:
    "Create an Invio account to manage invoices and business finances",
};

export default function RegisterRoute() {
  return <RegisterPage />;
}
