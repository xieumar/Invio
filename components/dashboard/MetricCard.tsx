import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MetricVariant = "primary" | "warning" | "success" | "danger";

export interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  badgeText?: string;
  icon: ReactNode;
  variant?: MetricVariant;
  isLoading?: boolean;
  className?: string;
}

const variantConfig: Record<
  MetricVariant,
  {
    iconBg: string;
    iconColor: string;
    topBorder: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  primary: {
    iconBg: "bg-purple/10 text-purple dark:text-purple-light",
    iconColor: "text-purple dark:text-purple-light",
    topBorder: "border-t-purple",
    badgeBg: "bg-purple/10",
    badgeText: "text-purple dark:text-purple-light",
  },
  warning: {
    iconBg: "bg-pending-bg text-pending-text",
    iconColor: "text-pending-text",
    topBorder: "border-t-pending-text",
    badgeBg: "bg-pending-bg",
    badgeText: "text-pending-text",
  },
  success: {
    iconBg: "bg-paid-bg text-paid-text",
    iconColor: "text-paid-text",
    topBorder: "border-t-paid-text",
    badgeBg: "bg-paid-bg",
    badgeText: "text-paid-text",
  },
  danger: {
    iconBg: "bg-red/10 text-red",
    iconColor: "text-red",
    topBorder: "border-t-red",
    badgeBg: "bg-red/10",
    badgeText: "text-red",
  },
};

export function MetricCard({
  title,
  value,
  subtitle,
  badgeText,
  icon,
  variant = "primary",
  isLoading = false,
  className,
}: MetricCardProps) {
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-5 sm:p-6 lg:p-7 bg-surface rounded-2xl min-w-0 overflow-hidden",
        "border border-border/60 border-t-4",
        config.topBorder,
        "shadow-card hover:shadow-xl dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "hover:-translate-y-1 transition-all duration-300",
        className
      )}
      aria-busy={isLoading}
    >
      {/* Top Header: Label + Icon */}
      <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
        <span className="text-xs font-bold uppercase tracking-wider text-text-secondary truncate">
          {title}
        </span>
        <div
          className={cn(
            "w-10 h-10 lg:w-11 lg:h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110",
            config.iconBg
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      {/* Main Metric Value & Context */}
      <div className="flex flex-col gap-1.5 mt-auto min-w-0">
        {isLoading ? (
          <>
            <div className="h-9 w-32 bg-muted/60 dark:bg-muted/30 rounded-lg animate-pulse my-1" />
            <div className="h-4 w-24 bg-muted/40 dark:bg-muted/20 rounded animate-pulse" />
          </>
        ) : (
          <>
            <span
              title={value}
              className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-text-primary tracking-tight font-sans truncate"
            >
              {value}
            </span>

            <div className="flex items-center gap-2 flex-wrap pt-0.5 min-w-0">
              {badgeText && (
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider shrink-0",
                    config.badgeBg,
                    config.badgeText
                  )}
                >
                  {badgeText}
                </span>
              )}
              {subtitle && (
                <span className="text-xs sm:text-[13px] text-text-secondary font-medium truncate">
                  {subtitle}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
