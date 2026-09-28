export type CurrencyCode = "GBP" | "USD" | "EUR" | string;

export type MinorUnitAmount = number;

export type TaxRatePercent = number;

export interface InvoiceCalculationResult {
  subtotal: MinorUnitAmount;
  taxAmount: MinorUnitAmount;
  discountAmount: MinorUnitAmount;
  total: MinorUnitAmount;
}

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  decimals: number;
  locale: string;
}
