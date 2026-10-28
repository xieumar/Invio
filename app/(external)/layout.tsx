import type { Metadata } from "next";
import { Header, Footer, AmbientBackground } from "@/components/external";
import { ScrollProgress } from "@/components/motion";

export const metadata: Metadata = {
  title: "Invio — Smart Invoicing & Small Business Finance",
  description:
    "Create invoices, track expenses, and manage small business finance with AI assistance.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-primary selection:bg-purple/20 selection:text-purple">
      <Header />
      <ScrollProgress />
      <main className="relative isolate flex-1 w-full overflow-x-clip">
        <AmbientBackground />
        {children}
      </main>
      <Footer />
    </div>
  );
}
