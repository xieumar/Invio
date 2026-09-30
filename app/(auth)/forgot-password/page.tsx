import type { Metadata } from "next";
import { ForgotPasswordPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Reset Password | Invio",
  description: "Reset your Invio account password",
};

export default function ForgotPasswordRoute() {
  return <ForgotPasswordPage />;
}
