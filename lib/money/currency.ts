export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    decimals: 2,
    locale: "en-GB",
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    decimals: 2,
    locale: "en-US",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    decimals: 2,
    locale: "de-DE",
  },
};

export const DEFAULT_CURRENCY: CurrencyCode = "GBP";

export function getCurrencyConfig(
  code: CurrencyCode = DEFAULT_CURRENCY
): CurrencyConfig {
  const upperCode = (code || DEFAULT_CURRENCY).toUpperCase();
  return (
    SUPPORTED_CURRENCIES[upperCode] ?? {
      code: upperCode,
      symbol: upperCode,
      name: upperCode,
      decimals: 2,
      locale: "en-GB",
    }
  );
}

export function formatMoney(
  amountMinor: MinorUnitAmount,
  currency: CurrencyCode = DEFAULT_CURRENCY,
  locale?: string
): string {
  const config = getCurrencyConfig(currency);
  const majorAmount = amountMinor / Math.pow(10, config.decimals);

  try {
    return new Intl.NumberFormat(locale || config.locale, {
      style: "currency",
      currency: config.code,
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    }).format(majorAmount);
  } catch {
    return `${config.symbol}${majorAmount.toFixed(config.decimals)}`;
  }
}
