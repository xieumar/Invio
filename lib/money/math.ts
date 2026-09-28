import type { MinorUnitAmount, InvoiceCalculationResult } from "@/@types";

export function toMinorUnits(
  majorAmount: number,
  decimals = 2
): MinorUnitAmount {
  if (!Number.isFinite(majorAmount)) return 0;
  return Math.round(majorAmount * Math.pow(10, decimals));
}

export function toMajorUnits(
  minorAmount: MinorUnitAmount,
  decimals = 2
): number {
  if (!Number.isFinite(minorAmount)) return 0;
  return minorAmount / Math.pow(10, decimals);
}

export function calcLineItemTotal(
  quantity: number,
  unitPriceMinor: MinorUnitAmount
): MinorUnitAmount {
  const safeQty = Number.isFinite(quantity) && quantity > 0 ? quantity : 0;
  const safePrice = Number.isFinite(unitPriceMinor) ? unitPriceMinor : 0;
  return Math.round(safeQty * safePrice);
}

export function calcSubtotal(items: Array<{ total: number }>): MinorUnitAmount {
  return items.reduce(
    (sum, item) => sum + (Number.isFinite(item.total) ? item.total : 0),
    0
  );
}

export function calcTaxAmount(
  subtotalMinor: MinorUnitAmount,
  taxRatePercent = 0
): MinorUnitAmount {
  if (taxRatePercent <= 0 || !Number.isFinite(taxRatePercent)) return 0;
  return Math.round((subtotalMinor * taxRatePercent) / 100);
}

export function calcInvoiceTotal(
  subtotalMinor: MinorUnitAmount,
  taxAmountMinor: MinorUnitAmount,
  discountAmountMinor = 0
): MinorUnitAmount {
  const safeDiscount = Math.max(
    0,
    Number.isFinite(discountAmountMinor) ? discountAmountMinor : 0
  );
  const net = subtotalMinor + taxAmountMinor - safeDiscount;
  return Math.max(0, net);
}

export function calculateInvoice(
  items: Array<{ quantity: number; price: number }>,
  taxRatePercent = 0,
  discountMajor = 0
): InvoiceCalculationResult {
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = calcLineItemTotal(
      item.quantity,
      toMinorUnits(item.price)
    );
    return sum + itemTotal;
  }, 0);

  const taxAmount = calcTaxAmount(subtotal, taxRatePercent);
  const discountAmount = toMinorUnits(discountMajor);
  const total = calcInvoiceTotal(subtotal, taxAmount, discountAmount);

  return {
    subtotal,
    taxAmount,
    discountAmount,
    total,
  };
}
