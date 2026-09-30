"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  ArrowLeftRight,
  BarChart3,
  Settings,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/features/auth";
import { useSidebar } from "@/context/SidebarContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Invoices", href: "/invoices", icon: FileText },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Insights", href: "/insights", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { isExpanded, toggleSidebar } = useSidebar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const userInitial =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <>
      <aside
        className={cn(
          "flex flex-row lg:flex-col items-center justify-between",
          "fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out",
          "bg-sidebar-light dark:bg-sidebar-dark",
          "w-full h-18 md:h-20 lg:h-screen shadow-xl",
          isExpanded
            ? "lg:w-64 lg:rounded-r-3xl"
            : "lg:w-22 lg:rounded-r-[20px]"
        )}
        aria-label="Main workspace navigation"
      >
        {/* Top Header / Logo */}
        <div className="flex items-center justify-between w-auto lg:w-full shrink-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple rounded-r-[20px] group"
            aria-label="Invio Dashboard"
          >
            <div className="relative overflow-hidden rounded-r-[20px] shrink-0">
              <Image
                src="/logo.svg"
                alt="Invio Logo"
                width={103}
                height={103}
                priority
                className="w-18 h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-r-[20px] transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {isExpanded && (
              <div className="hidden lg:flex flex-col pr-4 animate-in fade-in duration-200">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Invio
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-text-muted">
                  Workspace
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Desktop Navigation Links (hidden on mobile/tablet) */}
        <nav
          aria-label="Workspace Sections"
          className={cn(
            "hidden lg:flex flex-col items-center gap-2 py-6 overflow-visible w-full",
            isExpanded ? "px-4" : "px-2"
          )}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <div
                key={item.href}
                className="relative group w-full flex justify-center"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center rounded-xl transition-all duration-200",
                    isExpanded
                      ? "w-full px-3.5 py-3 gap-3.5 justify-start"
                      : "w-11 h-11 justify-center",
                    isActive
                      ? "bg-purple text-white font-bold"
                      : "text-text-muted hover:text-white hover:bg-white/10 font-semibold"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />

                  {isExpanded && (
                    <span className="text-sm font-semibold tracking-tight whitespace-nowrap animate-in fade-in duration-200">
                      {item.label}
                    </span>
                  )}
                </Link>

                {/* Floating Tooltip when Collapsed on Desktop */}
                {!isExpanded && (
                  <div
                    role="tooltip"
                    className={cn(
                      "hidden lg:group-hover:flex items-center",
                      "absolute left-full ml-3.5 top-1/2 -translate-y-1/2 z-50",
                      "px-3 py-1.5 bg-sidebar-dark text-white text-xs font-bold rounded-lg shadow-2xl",
                      "border border-white/10 whitespace-nowrap pointer-events-none",
                      "animate-in fade-in zoom-in-95 duration-150"
                    )}
                  >
                    {item.label}
                    <div
                      className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-sidebar-dark"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile/Tablet Controls & Hamburger Trigger */}
        <div className="flex lg:hidden items-center gap-1 sm:gap-2 pr-4 sm:pr-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="text-text-muted hover:text-white hover:bg-transparent"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 fill-current" />
            ) : (
              <Sun className="w-5 h-5 fill-current" />
            )}
          </Button>

          <Avatar
            title={user?.displayName || user?.email || "User profile"}
            className="w-8 h-8 md:w-9 md:h-9 border-2 border-transparent hover:border-purple transition-all duration-200"
          >
            <AvatarImage
              src={user?.photoURL || "/avatar.png"}
              alt={user?.displayName || "User profile"}
            />
            <AvatarFallback className="bg-purple text-white font-bold text-xs">
              {userInitial}
            </AvatarFallback>
          </Avatar>

          {/* Hamburger Menu Trigger for Mobile/Tablet */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="text-text-muted hover:text-white hover:bg-white/10 ml-1"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-72 bg-sidebar-dark text-white border-r border-white/10 p-6 flex flex-col justify-between"
            >
              <SheetHeader className="p-0 text-left border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.svg"
                    alt="Invio Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-xl"
                  />
                  <div>
                    <SheetTitle className="text-lg font-bold text-white tracking-tight">
                      Invio
                    </SheetTitle>
                    <p className="text-xs text-text-muted">
                      Financial Workspace
                    </p>
                  </div>
                </div>
              </SheetHeader>

              {/* Mobile Navigation List */}
              <nav
                aria-label="Mobile Navigation"
                className="flex flex-col gap-2 my-6"
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-purple text-white font-bold"
                          : "text-text-muted hover:text-white hover:bg-white/10 font-semibold"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm font-semibold tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Drawer Footer with User Info */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="w-9 h-9 border border-white/20 shrink-0">
                    <AvatarImage
                      src={user?.photoURL || "/avatar.png"}
                      alt={user?.displayName || "User profile"}
                    />
                    <AvatarFallback className="bg-purple text-white font-bold text-xs">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white truncate">
                      {user?.displayName || "Account"}
                    </span>
                    <span className="text-[11px] text-text-muted truncate">
                      {user?.email || "Active User"}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="text-text-muted hover:text-white shrink-0"
                >
                  {theme === "light" ? (
                    <Moon className="w-5 h-5 fill-current" />
                  ) : (
                    <Sun className="w-5 h-5 fill-current" />
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Footer Controls */}
        <div
          className={cn(
            "hidden lg:flex flex-col items-center mt-auto w-full",
            isExpanded ? "px-4" : "px-2"
          )}
        >
          {/* Collapse / Expand Toggle Button for Desktop */}
          <div className="w-full flex items-center justify-center pb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
              className={cn(
                "text-text-muted hover:text-white hover:bg-white/10 transition-colors rounded-xl",
                isExpanded
                  ? "w-full justify-start gap-3 px-3.5 py-2.5"
                  : "w-10 h-10 justify-center"
              )}
            >
              {isExpanded ? (
                <>
                  <ChevronLeft className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-semibold">Collapse</span>
                </>
              ) : (
                <ChevronRight className="w-5 h-5 shrink-0" />
              )}
            </Button>
          </div>

          {/* Theme Toggle Button */}
          <div
            className={cn(
              "flex items-center lg:py-4 w-full",
              isExpanded ? "justify-between px-2" : "justify-center"
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="text-text-muted hover:text-white hover:bg-transparent transition-all duration-200"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 fill-current" />
              ) : (
                <Sun className="w-5 h-5 fill-current" />
              )}
            </Button>

            {isExpanded && (
              <span className="text-xs font-medium text-text-muted">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
            )}
          </div>

          {/* Divider */}
          <div
            className={cn("w-full h-px bg-white/10", isExpanded ? "my-1" : "")}
            aria-hidden="true"
          />

          {/* User Profile Avatar */}
          <div
            className={cn(
              "flex items-center lg:py-6 w-full",
              isExpanded ? "justify-start gap-3 px-2" : "justify-center"
            )}
          >
            <Avatar
              title={user?.displayName || user?.email || "User profile"}
              className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 border-2 border-transparent hover:border-purple transition-all duration-200 cursor-pointer hover:scale-105 shrink-0"
            >
              <AvatarImage
                src={user?.photoURL || "/avatar.png"}
                alt={user?.displayName || "User profile"}
              />
              <AvatarFallback className="bg-purple text-white font-bold text-sm">
                {userInitial}
              </AvatarFallback>
            </Avatar>

            {isExpanded && (
              <div className="flex flex-col min-w-0 animate-in fade-in duration-200">
                <span className="text-xs font-bold text-white truncate">
                  {user?.displayName || "Account"}
                </span>
                <span className="text-[11px] text-text-muted truncate">
                  {user?.email || "Active User"}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
