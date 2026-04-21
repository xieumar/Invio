import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { InvoiceProvider } from "@/context/InvoiceContext";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

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
      <body className="antialiased">
        <ThemeProvider>
          <InvoiceProvider>
            <div className="flex flex-col lg:flex-row min-h-screen">
              <Sidebar />

              {/* This Spacer ensures the main content CANNOT go under the fixed Sidebar */}
              <div
                className="flex-shrink-0 h-[72px] md:h-[80px] lg:hidden"
                aria-hidden="true"
              />

              <main className="flex-1 flex justify-center lg:pl-[103px]">
                <div className="w-full max-w-[730px] px-6 py-8 sm:px-10 sm:py-14 lg:py-[72px]">
                  {children}
                </div>
              </main>
            </div>
            <Toaster position="top-center" richColors />
          </InvoiceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
