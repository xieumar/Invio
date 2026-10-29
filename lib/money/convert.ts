/** Rates are units of each currency per 1 unit of `base`. */
export interface ExchangeRates {
  base: CurrencyCode;
  rates: Record<string, number>;
  updatedAt?: string;
}

/**
 * Convert a major-unit amount from one currency into `to`, which must be the
 * rates' base currency. Returns null when no rate is known.
 */
export function convertAmount(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  rates?: ExchangeRates | null
): number | null {
  const source = from.toUpperCase();
  if (source === to.toUpperCase()) return amount;
  if (!rates || rates.base.toUpperCase() !== to.toUpperCase()) return null;
  const rate = rates.rates[source];
  if (!rate || !Number.isFinite(rate)) return null;
  return amount / rate;
}
