import { AuthGuard, OnboardingGuard } from "@/components/auth";
import { InvoiceProvider } from "@/context/InvoiceContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { DashboardShell } from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <OnboardingGuard>
        <InvoiceProvider>
          <SidebarProvider>
            <DashboardShell>{children}</DashboardShell>
          </SidebarProvider>
        </InvoiceProvider>
      </OnboardingGuard>
    </AuthGuard>
  );
}
