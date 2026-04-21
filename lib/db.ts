import { openDB, DBSchema, IDBPDatabase } from "idb";
import { Invoice } from "./types";

const DB_NAME = "invio-db";
const DB_VERSION = 1;
const STORE_NAME = "invoices";

interface InvioDB extends DBSchema {
  invoices: {
    key: string;
    value: Invoice;
    indexes: { "by-status": string };
  };
}

let dbPromise: Promise<IDBPDatabase<InvioDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<InvioDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("by-status", "status");
      },
    });
  }
  return dbPromise;
}

export async function getAllInvoices(): Promise<Invoice[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function saveInvoice(invoice: Invoice): Promise<void> {
  const db = await getDB();
  await db.put(STORE_NAME, invoice);
}

export async function deleteInvoice(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

export async function seedInvoices(invoices: Invoice[]): Promise<void> {
  const db = await getDB();

  const hasSeeded = localStorage.getItem("invio_seeded");

  if (!hasSeeded) {
    const existing = await db.getAll(STORE_NAME);
    if (existing.length === 0) {
      const tx = db.transaction(STORE_NAME, "readwrite");
      await Promise.all(invoices.map((inv) => tx.store.put(inv)));
      await tx.done;
    }
    localStorage.setItem("invio_seeded", "true");
  }
}
