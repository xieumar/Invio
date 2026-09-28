type TransactionStatus = "cleared" | "pending_review" | "reconciled";

type CategorizationMethod = "manual" | "rule" | "ai" | "unassigned";

type TransactionType = "income" | "expense";

interface TransactionSplit {
  id: string;
  categoryId: string;
  categoryName: string;
  amount: MinorUnitAmount;
  notes?: string | null;
}

interface Transaction {
  id: string;
  userId: string;
  importBatchId?: string | null;
  date: string;
  description: string;
  cleanedDescription?: string;
  amount: MinorUnitAmount;
  type: TransactionType;
  currency: CurrencyCode;
  categoryId?: string | null;
  categoryName?: string | null;
  categorizationMethod: CategorizationMethod;
  confidenceScore?: number | null;
  aiRationale?: string | null;
  status: TransactionStatus;
  matchedInvoiceId?: string | null;
  isSplit?: boolean;
  splits?: TransactionSplit[];
  createdAt: string;
  updatedAt: string;
}

interface TransactionCategory {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon?: string;
  isDefault?: boolean;
  userId?: string;
}

interface ImportBatch {
  id: string;
  userId: string;
  fileName: string;
  importedRowCount: number;
  skippedDuplicatesCount: number;
  totalAmount: MinorUnitAmount;
  importedAt: string;
  status: "active" | "rolled_back";
}

interface TransactionFormData {
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
  status: TransactionStatus;
}
