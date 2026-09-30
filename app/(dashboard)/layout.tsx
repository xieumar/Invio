import Sidebar from "@/components/Sidebar";
import { AuthGuard } from "@/components/auth";
import { InvoiceProvider } from "@/context/InvoiceContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <InvoiceProvider>
        <div className="flex flex-col lg:flex-row min-h-screen">
          <Sidebar />
          <div className="shrink-0 h-18 md:h-20 lg:hidden" aria-hidden="true" />

          <main className="flex-1 flex justify-center lg:pl-25.5">
            <div className="w-full max-w-182.5 px-6 py-8 sm:px-10 sm:py-14 lg:py-18">
              {children}
            </div>
          </main>
        </div>
      </InvoiceProvider>
    </AuthGuard>
  );
}
