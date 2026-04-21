import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { InvoiceProvider } from "@/context/InvoiceContext";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Invio — Invoice Manager",
  description: "Create, manage and track your invoices",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <InvoiceProvider>
            <div className="flex min-h-screen flex-col md:flex-row">
              <Sidebar />
              <main className="flex-1 overflow-x-hidden">{children}</main>
            </div>
          </InvoiceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}