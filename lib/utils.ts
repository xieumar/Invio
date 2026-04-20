import { format, addDays } from "date-fns";

export function generateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letters = Array.from({ length: 2 }, () => chars[Math.floor(Math.random() * 26)]).join("");
  const numbers = String(Math.floor(Math.random() * 9000) + 1000);
  return `${letters}${numbers}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return format(new Date(dateStr), "dd MMM yyyy");
  } catch {
    return dateStr;
  }
}

export function calcPaymentDue(createdAt: string, terms: number): string {
  if (!createdAt) return "";
  try {
    return addDays(new Date(createdAt), terms).toISOString().split("T")[0];
  } catch {
    return "";
  }
}

export function calcTotal(items: { quantity: number; price: number }[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}