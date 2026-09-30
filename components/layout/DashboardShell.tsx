"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bg">
      <Sidebar />
      <div className="shrink-0 h-18 md:h-20 lg:hidden" aria-hidden="true" />

      <main
        className={cn(
          "flex-1 flex justify-center min-w-0 transition-all duration-300 ease-in-out",
          isExpanded ? "lg:pl-64" : "lg:pl-22"
        )}
      >
        <div className="w-full max-w-7xl px-4 sm:px-8 lg:px-12 py-6 sm:py-10 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
