type CurrencyCode = "GBP" | "USD" | "EUR" | string;

type MinorUnitAmount = number;

type TaxRatePercent = number;

interface InvoiceCalculationResult {
  subtotal: MinorUnitAmount;
  taxAmount: MinorUnitAmount;
  discountAmount: MinorUnitAmount;
  total: MinorUnitAmount;
}

interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  decimals: number;
  locale: string;
}
