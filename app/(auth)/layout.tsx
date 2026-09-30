import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Invio",
  description: "Sign in or create an Invio account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-bg text-text-primary">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
