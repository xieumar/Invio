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
        flex flex-row lg:flex-col
        items-center justify-between
        fixed top-0 left-0 z-[100]
        transition-all duration-200
        bg-[#373B53] dark:bg-[#1E2139]
        w-full h-[72px] md:h-[80px] lg:h-screen lg:w-[103px]
        lg:rounded-r-[20px]
      "
      aria-label="Main navigation"
    >
      <div className="flex-shrink-0">
        <Image
          src="/logo.svg"
          alt="App Logo"
          width={103}
          height={103}
          priority
          className="
            w-[72px] h-[72px]           
            md:w-[80px] md:h-[80px]     
            lg:w-[103px] lg:h-[103px]   
            rounded-r-[20px]
          "
        />
      </div>

      <div className="flex flex-row lg:flex-col items-center lg:mt-auto h-full lg:h-auto lg:w-full">
        <div className="flex items-center justify-center px-6 md:px-8 lg:px-0 lg:py-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-[#7E88C3] hover:text-[#dfe3fa] hover:bg-transparent transition-all duration-200"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 fill-current" />
            ) : (
              <Sun className="w-5 h-5 fill-current" />
            )}
          </Button>
        </div>

        <div
          className="h-full w-px lg:w-full lg:h-px bg-[#494e6e]"
          aria-hidden="true"
        />

        <div className="flex items-center justify-center px-6 md:px-8 lg:px-0 lg:py-8">
          <Avatar className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 border-2 border-transparent hover:border-purple transition-colors cursor-pointer">
            <AvatarImage src="/avatar.png" alt="User profile" />
            <AvatarFallback className="bg-purple text-white font-bold text-sm">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </aside>
  );
}
