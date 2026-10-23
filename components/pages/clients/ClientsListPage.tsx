"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, X, Users, DollarSign, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MetricCard } from "@/components/ui/metric-card";
import { ClientList, ClientFormModal } from "@/components/clients";
import { useClients, useDeleteClient } from "@/features/clients";
import { formatMoney, toMinorUnits } from "@/lib/money";

export function ClientsListPage() {
  const { data: clients = [], isLoading } = useClients();
  const deleteClientMutation = useDeleteClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  const handleOpenCreate = () => {
    setClientToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setClientToEdit(client);
    setIsModalOpen(true);
  };

  // Real-time instant search filter
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const query = searchQuery.toLowerCase().trim();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.address.city.toLowerCase().includes(query) ||
        (c.phone && c.phone.toLowerCase().includes(query))
    );
  }, [clients, searchQuery]);

  // Aggregate stats across clients
  const totalInvoicedSum = useMemo(() => {
    return clients.reduce((sum, c) => sum + (c.totalInvoicedAmount || 0), 0);
  }, [clients]);

  const handleDeleteClient = async (client: Client) => {
    if (confirm(`Are you sure you want to delete ${client.name}?`)) {
      try {
        await deleteClientMutation.mutateAsync(client.id);
        toast.success(`Client "${client.name}" deleted successfully.`);
      } catch {
        toast.error("Failed to delete client.");
      }
    }
  };

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 text-purple dark:text-purple-light text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-purple animate-pulse" />
            CRM Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            Client Directory
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {isLoading
              ? "Loading client records..."
              : `${filteredClients.length} ${
                  filteredClients.length === 1
                    ? "client record"
                    : "client records"
                } active`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={handleOpenCreate}
            className="
              relative flex items-center gap-2.5
              pl-11 pr-5 h-11
              bg-purple hover:bg-purple-light
              text-white text-xs font-bold
              rounded-full transition-all duration-200 border-0 cursor-pointer shadow-md shadow-purple/20
            "
          >
            <span className="pointer-events-none absolute left-1.5 w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <Plus className="w-4 h-4 text-purple stroke-[3px]" />
            </span>
            <span className="pointer-events-none">New Client</span>
          </Button>
        </div>
      </header>

      {/* Stats Summary Strip using shared MetricCard shell */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <MetricCard
          title="Total Clients"
          value={isLoading ? "—" : clients.length.toString()}
          subtitle="Registered customer accounts"
          badgeText="Directory"
          icon={<Users className="w-5 h-5" />}
          variant="primary"
          isLoading={isLoading}
        />

        <MetricCard
          title="Cumulative Invoiced"
          value={
            isLoading ? "—" : formatMoney(toMinorUnits(totalInvoicedSum), "GBP")
          }
          subtitle="Billed across all clients"
          badgeText="Revenue"
          icon={<DollarSign className="w-5 h-5" />}
          variant="success"
          isLoading={isLoading}
        />

        <MetricCard
          title="Avg. Revenue / Client"
          value={
            isLoading
              ? "—"
              : formatMoney(
                  toMinorUnits(
                    clients.length > 0
                      ? Math.round(totalInvoicedSum / clients.length)
                      : 0
                  ),
                  "GBP"
                )
          }
          subtitle="Average customer value"
          badgeText="Efficiency"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="warning"
          isLoading={isLoading}
        />
      </section>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-surface p-3 sm:p-4 rounded-2xl border border-border/60 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clients by name, email, or city..."
            className="pl-10 pr-9 h-11 bg-surface-alt border-border/50 rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-purple"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5 rounded"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Clients Cards Grid */}
      <ClientList
        clients={filteredClients}
        isLoading={isLoading}
        onDeleteClient={handleDeleteClient}
        onEditClient={handleOpenEdit}
        onNewClient={handleOpenCreate}
      />

      {/* Add / Edit Client Modal */}
      <ClientFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientToEdit={clientToEdit}
      />
    </div>
  );
}

export default ClientsListPage;
