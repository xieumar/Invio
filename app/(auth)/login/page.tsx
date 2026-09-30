import type { Metadata } from "next";
import { LoginPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Sign In | Invio",
  description: "Sign in to your Invio account to manage invoices and finances",
};

export default function LoginRoute() {
  return <LoginPage />;
}
