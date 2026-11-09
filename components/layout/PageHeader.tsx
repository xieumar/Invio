import React from "react";
import { cn } from "@/lib/utils";

/**
 * Page title + action buttons that stay pinned while the page scrolls.
 * On small screens the fixed sidebar bar (h-18 / md:h-20) sits above it,
 * so it pins just below that bar; on lg the sidebar is on the side.
 * z-40 keeps it under the sidebar (z-50), dialogs and drawers.
 */
export function PageHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "sticky top-18 md:top-20 lg:top-0 z-40 bg-bg/95 backdrop-blur-sm py-3",
        className
      )}
    >
      {children}
    </header>
  );
}
