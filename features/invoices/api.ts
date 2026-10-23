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
import { generateId, calcPaymentDue, calcTotal } from "@/lib/utils";
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

function saveLocalDemoInvoices(invoices: Invoice[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_INVOICES_KEY, JSON.stringify(invoices));
  }
}

export async function fetchInvoices(
  userId?: string | null
): Promise<Invoice[]> {
  if (!userId || userId === "demo-user") {
    return getLocalDemoInvoices();
  }

  try {
    const invoicesRef = collection(db, "users", userId, "invoices");
    const q = query(invoicesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // First time user: seed initial demo invoices into Firestore
      const batchPromises = initialSeedInvoices.map((inv) => {
        const invoiceDocRef = doc(db, "users", userId, "invoices", inv.id);
        return setDoc(invoiceDocRef, {
          ...inv,
          userId,
          createdAt: inv.createdAt,
          updatedAt: new Date().toISOString(),
        });
      });
      await Promise.all(batchPromises);
      return initialSeedInvoices.map((inv) => ({ ...inv, userId }));
    }

    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
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
        discountAmount: data.discountAmount,
        total: data.total,
        notes: data.notes || null,
        paidAt: data.paidAt || null,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt || new Date().toISOString(),
      } as Invoice;
    });
  } catch (error) {
    console.warn(
      "Failed to fetch invoices from Firestore, falling back to local demo:",
      error
    );
    return getLocalDemoInvoices();
  }
}

export async function fetchInvoiceById(
  userId: string | null | undefined,
  invoiceId: string
): Promise<Invoice | null> {
  if (!userId || userId === "demo-user") {
    const local = getLocalDemoInvoices();
    return local.find((inv) => inv.id === invoiceId) || null;
  }

  try {
    const invoiceRef = doc(db, "users", userId, "invoices", invoiceId);
    const snapshot = await getDoc(invoiceRef);
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    return {
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
      discountAmount: data.discountAmount,
      total: data.total,
      notes: data.notes || null,
      paidAt: data.paidAt || null,
      updatedAt: data.updatedAt?.toDate
        ? data.updatedAt.toDate().toISOString()
        : data.updatedAt || new Date().toISOString(),
    } as Invoice;
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
  const formattedItems = data.items.map((item) => ({
    ...item,
    total: (item.quantity || 0) * (item.price || 0),
  }));
  const total = calcTotal(formattedItems);

  const newInvoice: Invoice = {
    ...data,
    id: invoiceId,
    userId: userId || "demo-user",
    status,
    paymentDue,
    items: formattedItems,
    total,
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
      const items = data.items
        ? data.items.map((item) => ({
            ...item,
            total: (item.quantity || 0) * (item.price || 0),
          }))
        : existing.items;

      const total = data.items ? calcTotal(items) : existing.total;
      const paymentDue =
        data.createdAt && data.paymentTerms
          ? calcPaymentDue(data.createdAt, data.paymentTerms)
          : existing.paymentDue;

      local[index] = {
        ...existing,
        ...data,
        items,
        total,
        paymentDue,
        status: status ?? (existing.status === "draft" ? "pending" : existing.status),
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
    const formattedItems = data.items.map((item) => ({
      ...item,
      total: (item.quantity || 0) * (item.price || 0),
    }));
    updatePayload.items = formattedItems;
    updatePayload.total = calcTotal(formattedItems);
  }

  if (data.createdAt && data.paymentTerms) {
    updatePayload.paymentDue = calcPaymentDue(data.createdAt, data.paymentTerms);
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
