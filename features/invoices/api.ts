import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { generateId, calcPaymentDue } from "@/lib/utils";
import { calculateInvoiceAmounts, getInvoiceAmounts } from "@/lib/money";
import { getEffectiveStatus } from "@/lib/invoice-status";
import { seedData } from "@/lib/seeddata";

const DEMO_INVOICES_KEY = "invio_demo_invoices";

export const initialSeedInvoices: Invoice[] = seedData;

function getLocalDemoInvoices(): Invoice[] {
  if (typeof window === "undefined") return initialSeedInvoices;
  const stored = localStorage.getItem(DEMO_INVOICES_KEY);
  if (!stored) {
    localStorage.setItem(
      DEMO_INVOICES_KEY,
      JSON.stringify(initialSeedInvoices)
    );
    return initialSeedInvoices;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return initialSeedInvoices;
  }
}

/**
 * Money convention: every amount persisted on an invoice (item price/total,
 * subtotal, taxAmount, discount, discountAmount, total) is in MAJOR units.
 */
function lineTotal(item: { quantity: number; price: number }): number {
  return calculateInvoiceAmounts([
    { quantity: Number(item.quantity) || 0, price: Number(item.price) || 0 },
  ]).total;
}

function buildAmountFields(items: InvoiceItem[], taxRate = 0, discount = 0) {
  const normalizedItems = items.map((item) => ({
    ...item,
    total: lineTotal(item),
  }));
  const amounts = calculateInvoiceAmounts(
    normalizedItems.map((i) => ({
      quantity: Number(i.quantity) || 0,
      price: Number(i.price) || 0,
    })),
    taxRate,
    discount
  );
  return {
    items: normalizedItems,
    taxRate,
    discount: amounts.discountAmount,
    subtotal: amounts.subtotal,
    taxAmount: amounts.taxAmount,
    discountAmount: amounts.discountAmount,
    total: amounts.total,
  };
}

/**
 * Re-derives amounts from the line items on every read. Records saved by
 * older versions stored a total without tax/discount and mixed minor/major
 * units, so stored totals are not trusted.
 */
function normalizeInvoice(invoice: Invoice): Invoice {
  const amounts = getInvoiceAmounts(invoice);
  return {
    ...invoice,
    // Overdue is derived from the due date; the stored status stays as-is.
    status: getEffectiveStatus(invoice),
    items: (invoice.items ?? []).map((item) => ({
      ...item,
      total: lineTotal(item),
    })),
    taxRate: invoice.taxRate ?? 0,
    subtotal: amounts.subtotal,
    taxAmount: amounts.taxAmount,
    discount: amounts.discountAmount,
    discountAmount: amounts.discountAmount,
    total: amounts.total,
  };
}

function saveLocalDemoInvoices(invoices: Invoice[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_INVOICES_KEY, JSON.stringify(invoices));
  }
}

export async function fetchInvoices(
  userId?: string | null
): Promise<Invoice[]> {
  if (!userId || userId === "demo-user") {
    return getLocalDemoInvoices().map(normalizeInvoice);
  }

  try {
    const invoicesRef = collection(db, "users", userId, "invoices");
    const q = query(invoicesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((d) => {
      const data = d.data();
      return normalizeInvoice({
        id: d.id,
        userId,
        clientId: data.clientId || null,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString().split("T")[0]
          : data.createdAt || new Date().toISOString().split("T")[0],
        paymentDue: data.paymentDue,
        description: data.description,
        paymentTerms: data.paymentTerms,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        status: data.status,
        senderAddress: data.senderAddress,
        clientAddress: data.clientAddress,
        items: data.items || [],
        currency: data.currency || "GBP",
        subtotal: data.subtotal,
        taxRate: data.taxRate,
        taxAmount: data.taxAmount,
        discount: data.discount,
        discountAmount: data.discountAmount,
        total: data.total,
        notes: data.notes || null,
        issuer: data.issuer || null,
        paymentInfo: data.paymentInfo || null,
        paidAt: data.paidAt || null,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt || new Date().toISOString(),
      } as Invoice);
    });
  } catch (error) {
    console.warn("Failed to fetch invoices from Firestore:", error);
    return [];
  }
}

export async function fetchInvoiceById(
  userId: string | null | undefined,
  invoiceId: string
): Promise<Invoice | null> {
  if (!userId || userId === "demo-user") {
    const local = getLocalDemoInvoices();
    const found = local.find((inv) => inv.id === invoiceId);
    return found ? normalizeInvoice(found) : null;
  }

  try {
    const invoiceRef = doc(db, "users", userId, "invoices", invoiceId);
    const snapshot = await getDoc(invoiceRef);
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    return normalizeInvoice({
      id: snapshot.id,
      userId,
      clientId: data.clientId || null,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString().split("T")[0]
        : data.createdAt || new Date().toISOString().split("T")[0],
      paymentDue: data.paymentDue,
      description: data.description,
      paymentTerms: data.paymentTerms,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: data.status,
      senderAddress: data.senderAddress,
      clientAddress: data.clientAddress,
      items: data.items || [],
      currency: data.currency || "GBP",
      subtotal: data.subtotal,
      taxRate: data.taxRate,
      taxAmount: data.taxAmount,
      discount: data.discount,
      discountAmount: data.discountAmount,
      total: data.total,
      notes: data.notes || null,
      issuer: data.issuer || null,
      paymentInfo: data.paymentInfo || null,
      paidAt: data.paidAt || null,
      updatedAt: data.updatedAt?.toDate
        ? data.updatedAt.toDate().toISOString()
        : data.updatedAt || new Date().toISOString(),
    } as Invoice);
  } catch {
    return null;
  }
}

export async function createInvoiceRecord(
  userId: string | null | undefined,
  data: InvoiceFormData,
  status: InvoiceStatus = "pending"
): Promise<Invoice> {
  const invoiceId = generateId();
  const paymentDue = calcPaymentDue(data.createdAt, data.paymentTerms);
  const amountFields = buildAmountFields(
    data.items,
    Number(data.taxRate) || 0,
    Number(data.discount) || 0
  );

  const newInvoice: Invoice = {
    ...data,
    ...amountFields,
    id: invoiceId,
    userId: userId || "demo-user",
    status,
    paymentDue,
    currency: data.currency || "GBP",
    notes: data.notes || null,
    clientId: data.clientId || null,
    createdAt: data.createdAt,
    updatedAt: new Date().toISOString(),
  };

  if (!userId || userId === "demo-user") {
    const local = getLocalDemoInvoices();
    saveLocalDemoInvoices([newInvoice, ...local]);
    return newInvoice;
  }

  const invoiceRef = doc(db, "users", userId, "invoices", invoiceId);
  await setDoc(invoiceRef, {
    ...newInvoice,
    createdAt: data.createdAt,
    updatedAt: serverTimestamp(),
  });

  return newInvoice;
}

export async function updateInvoiceRecord(
  userId: string | null | undefined,
  invoiceId: string,
  data: Partial<InvoiceFormData>,
  status?: InvoiceStatus
): Promise<void> {
  const now = new Date().toISOString();

  if (!userId || userId === "demo-user") {
    const local = getLocalDemoInvoices();
    const index = local.findIndex((inv) => inv.id === invoiceId);
    if (index !== -1) {
      const existing = local[index];
      const amountFields = data.items
        ? buildAmountFields(
            data.items,
            Number(data.taxRate ?? existing.taxRate) || 0,
            Number(data.discount ?? existing.discount) || 0
          )
        : {};
      const paymentDue =
        data.createdAt && data.paymentTerms
          ? calcPaymentDue(data.createdAt, data.paymentTerms)
          : existing.paymentDue;

      local[index] = {
        ...existing,
        ...data,
        ...amountFields,
        paymentDue,
        status:
          status ?? (existing.status === "draft" ? "pending" : existing.status),
        updatedAt: now,
      };
      saveLocalDemoInvoices(local);
    }
    return;
  }

  const invoiceRef = doc(db, "users", userId, "invoices", invoiceId);
  const updatePayload: Record<string, unknown> = {
    ...data,
    updatedAt: serverTimestamp(),
  };

  if (data.items) {
    Object.assign(
      updatePayload,
      buildAmountFields(
        data.items,
        Number(data.taxRate) || 0,
        Number(data.discount) || 0
      )
    );
  }

  if (data.createdAt && data.paymentTerms) {
    updatePayload.paymentDue = calcPaymentDue(
      data.createdAt,
      data.paymentTerms
    );
  }

  if (status) {
    updatePayload.status = status;
  }

  await setDoc(invoiceRef, updatePayload, { merge: true });
}

export async function updateInvoiceStatus(
  userId: string | null | undefined,
  invoiceId: string,
  status: InvoiceStatus
): Promise<void> {
  const now = new Date().toISOString();

  if (!userId || userId === "demo-user") {
    const local = getLocalDemoInvoices();
    const index = local.findIndex((inv) => inv.id === invoiceId);
    if (index !== -1) {
      local[index] = {
        ...local[index],
        status,
        paidAt: status === "paid" ? now : null,
        updatedAt: now,
      };
      saveLocalDemoInvoices(local);
    }
    return;
  }

  const invoiceRef = doc(db, "users", userId, "invoices", invoiceId);
  await setDoc(
    invoiceRef,
    {
      status,
      paidAt: status === "paid" ? now : null,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function deleteInvoiceRecord(
  userId: string | null | undefined,
  invoiceId: string
): Promise<void> {
  if (!userId || userId === "demo-user") {
    const local = getLocalDemoInvoices();
    saveLocalDemoInvoices(local.filter((inv) => inv.id !== invoiceId));
    return;
  }

  const invoiceRef = doc(db, "users", userId, "invoices", invoiceId);
  await deleteDoc(invoiceRef);
}
