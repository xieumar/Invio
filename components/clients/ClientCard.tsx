"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatMoney, toMinorUnits } from "@/lib/money";
import { cn } from "@/lib/utils";

export interface ClientCardProps {
  client: Client;
  onEdit?: (client: Client) => void;
  onDelete?: (client: Client) => void;
  className?: string;
}

export function ClientCard({
  client,
  onEdit,
  onDelete,
  className,
}: ClientCardProps) {
  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const formattedTotal = formatMoney(
    toMinorUnits(client.totalInvoicedAmount || 0),
    client.currency || "GBP"
  );

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-6 bg-surface rounded-2xl",
        "border border-border/60 hover:border-purple/50 shadow-card hover:shadow-xl",
        "hover:-translate-y-1 transition-all duration-300 min-w-0 overflow-hidden",
        className
      )}
    >
      {/* Top Header: Gradient Avatar + Name + Dropdown */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple/20 via-purple/10 to-transparent text-purple dark:text-purple-light flex items-center justify-center font-bold text-base shrink-0 border border-purple/15 shadow-xs group-hover:scale-105 transition-transform">
            {initials}
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-lg text-text-primary group-hover:text-purple transition-colors truncate tracking-tight">
              {client.name}
            </h3>
            <a
              href={`mailto:${client.email}`}
              className="text-xs text-text-secondary hover:text-purple transition-colors flex items-center gap-1.5 truncate mt-0.5"
            >
              <Mail className="w-3.5 h-3.5 shrink-0 text-text-muted" />
              <span className="truncate">{client.email}</span>
            </a>
          </div>
        </div>

        {/* Dropdown Options */}
        {(onEdit || onDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-text-muted hover:text-text-primary hover:bg-surface-alt -mr-1"
                aria-label={`Options for ${client.name}`}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-surface border-border"
            >
              {onEdit && (
                <DropdownMenuItem
                  onClick={() => onEdit(client)}
                  className="cursor-pointer text-xs font-semibold"
                >
                  <Edit className="w-3.5 h-3.5 mr-2 text-text-muted" />
                  Edit Client
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(client)}
                  className="cursor-pointer text-xs font-semibold text-red focus:text-red focus:bg-red/10"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-2" />
                  Delete Client
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Contact Details & Metadata Badges */}
      <div className="space-y-2.5 my-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-alt text-text-secondary text-xs font-medium border border-border/30">
            <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
            <span className="truncate max-w-[160px]">
              {client.address.city}, {client.address.country}
            </span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-alt text-text-muted text-xs font-medium border border-border/30">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>Net {client.defaultPaymentTerms || 14}d</span>
          </span>
        </div>

        {client.phone && (
          <div className="flex items-center gap-2 text-xs text-text-secondary px-0.5 truncate">
            <Phone className="w-3.5 h-3.5 text-text-muted shrink-0" />
            <span className="truncate">{client.phone}</span>
          </div>
        )}
      </div>

      {/* Card Footer: Financial Metrics Bar */}
      <div className="-mx-6 -mb-6 mt-5 p-4 px-6 bg-surface-alt/60 dark:bg-surface-alt/30 border-t border-border/40 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
            Total Invoiced
          </span>
          <span className="text-lg font-extrabold text-text-primary tracking-tight font-sans">
            {formattedTotal}
          </span>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple/10 text-purple dark:text-purple-light">
            {client.invoiceCount || 0}{" "}
            {client.invoiceCount === 1 ? "invoice" : "invoices"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ClientCard;
