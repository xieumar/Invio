// Only two-decimal currencies are listed: the money helpers default to two
// decimals, so zero- and three-decimal currencies (JPY, KRW, KWD...) would
// be scaled incorrectly.
const EXTRA_CURRENCIES: [code: string, symbol: string, name: string][] = [
  ["AED", "د.إ", "UAE Dirham"],
  ["ARS", "$", "Argentine Peso"],
  ["AUD", "A$", "Australian Dollar"],
  ["BDT", "৳", "Bangladeshi Taka"],
  ["BGN", "лв", "Bulgarian Lev"],
  ["BRL", "R$", "Brazilian Real"],
  ["CAD", "CA$", "Canadian Dollar"],
  ["CHF", "CHF", "Swiss Franc"],
  ["CNY", "CN¥", "Chinese Yuan"],
  ["COP", "$", "Colombian Peso"],
  ["CZK", "Kč", "Czech Koruna"],
  ["DKK", "kr", "Danish Krone"],
  ["EGP", "E£", "Egyptian Pound"],
  ["GEL", "₾", "Georgian Lari"],
  ["GHS", "GH₵", "Ghanaian Cedi"],
  ["HKD", "HK$", "Hong Kong Dollar"],
  ["HUF", "Ft", "Hungarian Forint"],
  ["IDR", "Rp", "Indonesian Rupiah"],
  ["ILS", "₪", "Israeli New Shekel"],
  ["INR", "₹", "Indian Rupee"],
  ["KES", "KSh", "Kenyan Shilling"],
  ["MAD", "MAD", "Moroccan Dirham"],
  ["MXN", "MX$", "Mexican Peso"],
  ["MYR", "RM", "Malaysian Ringgit"],
  ["NGN", "₦", "Nigerian Naira"],
  ["NOK", "kr", "Norwegian Krone"],
  ["NZD", "NZ$", "New Zealand Dollar"],
  ["PEN", "S/", "Peruvian Sol"],
  ["PHP", "₱", "Philippine Peso"],
  ["PKR", "₨", "Pakistani Rupee"],
  ["PLN", "zł", "Polish Złoty"],
  ["QAR", "QAR", "Qatari Riyal"],
  ["RON", "lei", "Romanian Leu"],
  ["RSD", "RSD", "Serbian Dinar"],
  ["SAR", "SAR", "Saudi Riyal"],
  ["SEK", "kr", "Swedish Krona"],
  ["SGD", "S$", "Singapore Dollar"],
  ["THB", "฿", "Thai Baht"],
  ["TRY", "₺", "Turkish Lira"],
  ["TWD", "NT$", "New Taiwan Dollar"],
  ["TZS", "TSh", "Tanzanian Shilling"],
  ["UAH", "₴", "Ukrainian Hryvnia"],
  ["ZAR", "R", "South African Rand"],
];

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
  ...Object.fromEntries(
    EXTRA_CURRENCIES.map(([code, symbol, name]) => [
      code,
      { code, symbol, name, decimals: 2, locale: "en-US" },
    ])
  ),
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
