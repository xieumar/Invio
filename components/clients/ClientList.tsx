"use client";

import React from "react";
import { Users, Plus } from "lucide-react";
import { ClientCard } from "./ClientCard";
import { Button } from "@/components/ui/button";

export interface ClientListProps {
  clients: Client[];
  isLoading?: boolean;
  onEditClient?: (client: Client) => void;
  onDeleteClient?: (client: Client) => void;
  onNewClient?: () => void;
}

export function ClientList({
  clients,
  isLoading = false,
  onEditClient,
  onDeleteClient,
  onNewClient,
}: ClientListProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
        aria-busy="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 w-full bg-surface rounded-2xl border border-border/40 p-6 flex flex-col justify-between animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-muted/50" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 bg-muted/60 rounded" />
                <div className="h-3 w-1/2 bg-muted/40 rounded" />
              </div>
            </div>
            <div className="space-y-2 py-3 border-y border-border/40">
              <div className="h-3 w-2/3 bg-muted/40 rounded" />
              <div className="h-3 w-1/2 bg-muted/40 rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-muted/50 rounded" />
              <div className="h-4 w-16 bg-muted/40 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="py-16 sm:py-24 bg-surface rounded-2xl border border-border/60 flex flex-col items-center justify-center text-center p-6 shadow-card">
        <div className="w-14 h-14 rounded-2xl bg-purple/10 text-purple flex items-center justify-center mb-4">
          <Users className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-1">
          No clients found
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
          No client profiles match your current search criteria. Try a different
          query or register a new client.
        </p>

        {onNewClient && (
          <Button
            onClick={onNewClient}
            className="
              relative flex items-center gap-2
              pl-10 pr-5 h-10
              bg-purple hover:bg-purple-light
              text-white text-xs font-bold
              rounded-full transition-colors border-0 cursor-pointer shadow-md shadow-purple/20
            "
          >
            <span className="absolute left-1 w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <Plus className="w-3.5 h-3.5 text-purple stroke-[3px]" />
            </span>
            <span>New Client</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      aria-label="Client Directory"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
    >
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onEdit={onEditClient}
          onDelete={onDeleteClient}
        />
      ))}
    </div>
  );
}
