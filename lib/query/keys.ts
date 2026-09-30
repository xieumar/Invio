/**
 * Centralized, strongly typed Query Keys factory for TanStack Query v5.
 * Follows the hierarchical query key pattern recommended by TanStack Query.
 */
export const queryKeys = {
  // Invoices
  invoices: {
    all: ["invoices"] as const,
    list: (userId?: string | null) =>
      ["invoices", userId ?? "anonymous"] as const,
    filtered: (userId?: string | null, filter?: string) =>
      ["invoices", userId ?? "anonymous", { filter }] as const,
    detail: (userId?: string | null, invoiceId?: string) =>
      ["invoices", userId ?? "anonymous", invoiceId ?? ""] as const,
  },

  // Dashboard & Financial Metrics
  metrics: {
    all: ["metrics"] as const,
    overview: (userId?: string | null) =>
      ["metrics", "overview", userId ?? "anonymous"] as const,
    summary: (
      userId?: string | null,
      dateRange?: { start?: string; end?: string }
    ) => ["metrics", "summary", userId ?? "anonymous", { dateRange }] as const,
  },

  // Clients
  clients: {
    all: ["clients"] as const,
    list: (userId?: string | null) =>
      ["clients", userId ?? "anonymous"] as const,
    detail: (userId?: string | null, clientId?: string) =>
      ["clients", userId ?? "anonymous", clientId ?? ""] as const,
  },

  // Transactions
  transactions: {
    all: ["transactions"] as const,
    list: (userId?: string | null, filter?: Record<string, unknown>) =>
      ["transactions", userId ?? "anonymous", { filter }] as const,
    detail: (userId?: string | null, transactionId?: string) =>
      ["transactions", userId ?? "anonymous", transactionId ?? ""] as const,
  },

  // Analytics
  analytics: {
    all: ["analytics"] as const,
    byUser: (
      userId?: string | null,
      dateRange?: { start?: string; end?: string }
    ) => ["analytics", userId ?? "anonymous", { dateRange }] as const,
  },

  // User Profile & Preferences
  user: {
    all: ["user"] as const,
    profile: (userId?: string | null) =>
      ["user", "profile", userId ?? "anonymous"] as const,
    preferences: (userId?: string | null) =>
      ["user", "preferences", userId ?? "anonymous"] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
