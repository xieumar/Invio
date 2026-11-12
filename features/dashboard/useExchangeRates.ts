import type { ExchangeRates } from "@/lib/money";

export async function fetchExchangeRates(
  base: CurrencyCode
): Promise<ExchangeRates | null> {
  try {
    const res = await fetch(`/api/rates?base=${encodeURIComponent(base)}`);
    if (!res.ok) return null;
    return (await res.json()) as ExchangeRates;
  } catch {
    return null;
  }
}
