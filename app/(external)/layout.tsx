import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invio — Smart Invoicing & Small Business Finance",
  description:
    "Create invoices, track expenses, and manage small business finance with AI assistance.",
};

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-primary">
      {children}
    </div>
  );
}
