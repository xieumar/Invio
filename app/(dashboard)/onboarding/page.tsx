import type { Metadata } from "next";
import { OnboardingPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Setup Your Business | Invio",
  description:
    "Configure your business profile and default invoice preferences",
};

export default function OnboardingRoute() {
  return <OnboardingPage />;
}
