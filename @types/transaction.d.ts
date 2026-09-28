import type { CurrencyCode, MinorUnitAmount } from "./money";

export type TransactionStatus = "cleared" | "pending_review" | "reconciled";

export type CategorizationMethod = "manual" | "rule" | "ai" | "unassigned";

export type TransactionType = "income" | "expense";

export interface TransactionSplit {
  id: string;
  categoryId: string;
  categoryName: string;
  amount: MinorUnitAmount;
  notes?: string | null;
}

export interface Transaction {
  id: string;
  userId: string;
  importBatchId?: string | null;
  date: string; // ISO date "YYYY-MM-DD"
  description: string;
  cleanedDescription?: string;
  amount: MinorUnitAmount; // positive = income, negative = expense
  type: TransactionType;
  currency: CurrencyCode;
  categoryId?: string | null;
  categoryName?: string | null;
  categorizationMethod: CategorizationMethod;
  confidenceScore?: number | null; // 0.0 to 1.0 for AI
  aiRationale?: string | null;
  status: TransactionStatus;
  matchedInvoiceId?: string | null;
  isSplit?: boolean;
  splits?: TransactionSplit[];
  createdAt: string;
  updatedAt: string;
}

export interface TransactionCategory {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon?: string;
  isDefault?: boolean;
  userId?: string;
}

export interface ImportBatch {
  id: string;
  userId: string;
  fileName: string;
  importedRowCount: number;
  skippedDuplicatesCount: number;
  totalAmount: MinorUnitAmount;
  importedAt: string;
  status: "active" | "rolled_back";
}

export interface TransactionFormData {
  date: string;
  description: string;
  amount: number; // Decimal in form, converted to minor unit
  type: TransactionType;
  categoryId?: string;
  status: TransactionStatus;
}
