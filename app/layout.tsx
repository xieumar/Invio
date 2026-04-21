import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { InvoiceProvider } from "@/context/InvoiceContext";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Invio — Invoice Manager",
  description: "Create, manage and track your invoices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <InvoiceProvider>
            <div className="flex min-h-screen flex-col md:flex-row">
              <Sidebar />
              {/* Offset the sidebar (pl-103px) and center the inner content */}
              <main className="flex-1 flex justify-center md:pl-[103px]">
                {/* Strict max-width container matching your design */}
                <div className="w-full max-w-[730px] px-6 py-8 sm:px-10 sm:py-14 lg:py-[72px]">
                  {children}
                </div>
              </main>
            </div>
          </InvoiceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
