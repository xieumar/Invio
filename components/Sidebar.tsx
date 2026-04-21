"use client";

import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className="
        flex flex-row md:flex-col
        items-center justify-between
        w-full md:w-[103px]
        h-[72px] md:h-screen
        sticky md:fixed top-0 left-0 z-50
        md:rounded-r-[20px]
        overflow-hidden
        transition-colors duration-200
      "
      style={{ backgroundColor: "var(--sidebar)" }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div
        className="relative flex items-center justify-center flex-shrink-0
          w-[72px] h-[72px] md:w-[103px] md:h-[103px]
          rounded-r-[12px] md:rounded-r-[20px] bg-purple overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-light rounded-tl-[20px]" />
        {/* Replace "/logo.svg" with your actual logo filename in the public directory */}
        <Image
          src="/logo.svg"
          alt="App Logo"
          width={103}
          height={103}
          className="relative z-10"
        />
      </div>

      {/* Bottom controls */}
      <div className="flex flex-row md:flex-col items-center gap-6 pr-6 md:pr-0 md:pb-6">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="text-slate hover:text-[#dfe3fa] hover:bg-transparent transition-all duration-200 hover:rotate-12 rounded-full"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>

        {/* Divider */}
        <Separator
          decorative
          className="w-px h-[72px] md:w-full md:h-px bg-[#494e6e]"
        />

        {/* Avatar */}
        <Avatar className="w-10 h-10 border-2 border-purple cursor-pointer">
          {/* Replace "/avatar.png" with your actual avatar filename in the public directory */}
          <AvatarImage src="/avatar.png" alt="User profile" />
          <AvatarFallback className="bg-gradient-to-br from-purple to-purple-light text-white font-bold text-sm">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </aside>
  );
}
