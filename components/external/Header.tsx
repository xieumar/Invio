"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full pt-3 sm:pt-5 pb-3">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="External navigation"
          className="
            bg-surface/85 dark:bg-surface/85 backdrop-blur-md 
            border border-border/70 rounded-xl
            px-4 sm:px-6 py-2.5 sm:py-3 
            flex items-center justify-between 
            shadow-[0_8px_30px_rgba(72,84,159,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
            transition-colors duration-200
          "
        >
          {/* Brand Logo with App Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline group pl-1 sm:pl-2"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Image
                src="/logo.svg"
                alt="Invio"
                width={36}
                height={36}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-text-primary">
              Invio<span className="text-purple">.</span>
            </span>
          </Link>

          {/* Desktop Center Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all duration-150 no-underline
                    ${
                      isActive
                        ? "text-purple bg-purple/10 dark:bg-purple/15"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-alt"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons using Button component */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="rounded-full w-9 h-9 text-text-secondary hover:text-purple hover:bg-surface-alt cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#888EB0] hover:text-[#dfe3fa]" />
              ) : (
                <Moon className="w-4 h-4 text-[#7E88C3] hover:text-purple" />
              )}
            </Button>

            {/* Login Link as Button */}
            <Button
              asChild
              variant="ghost"
              className="hidden sm:inline-flex rounded-full text-[14px] font-bold text-text-secondary hover:text-text-primary px-3 h-9"
            >
              <Link
                href="/login"
                className="no-underline flex items-center gap-1"
              >
                <span>Login</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </Link>
            </Button>

            {/* Primary Get Started Button */}
            <Button
              asChild
              className="
                rounded-full bg-purple hover:bg-purple-light text-white 
                font-bold text-[13px] sm:text-[14px] 
                px-4 sm:px-5 h-9 sm:h-10 
                shadow-sm hover:opacity-95 
                transition-all duration-200
              "
            >
              <Link
                href="/invoices"
                className="no-underline flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </Button>

            {/* Mobile Hamburger Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden rounded-full w-9 h-9 text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className="
              md:hidden mt-2 p-5 
              bg-surface border border-border/80 rounded-2xl 
              shadow-dropdown animate-in fade-in slide-in-from-top-2 duration-200
            "
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      px-4 py-2.5 rounded-xl text-[15px] font-bold transition-colors no-underline
                      ${
                        isActive
                          ? "text-purple bg-purple/10"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-alt"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="h-px bg-border my-2" />

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  flex items-center justify-between px-4 py-2.5 
                  text-[15px] font-bold text-text-primary hover:text-purple 
                  no-underline transition-colors
                "
              >
                <span>Login</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
