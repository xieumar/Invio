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

/**
 * Invoice amounts in MAJOR units (e.g. 12.50), the unit persisted on invoices.
 * Maths runs in integer minor units to avoid float drift, then converts back.
 */
export interface InvoiceAmounts {
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}

export function calculateInvoiceAmounts(
  items: Array<{ quantity: number; price: number }>,
  taxRatePercent = 0,
  discountMajor = 0
): InvoiceAmounts {
  const minor = calculateInvoice(items, taxRatePercent, discountMajor);
  return {
    subtotal: toMajorUnits(minor.subtotal),
    taxAmount: toMajorUnits(minor.taxAmount),
    discountAmount: toMajorUnits(minor.discountAmount),
    total: toMajorUnits(minor.total),
  };
}

/**
 * Derives the amounts for a stored invoice from its line items, tax rate and
 * discount, ignoring any stored totals. Older records saved totals without
 * tax/discount and subtotal/tax/discount in minor units, so stored values
 * cannot be trusted.
 *
 * Legacy records have `discountAmount` (minor units) but no `discount`;
 * records written by the current code always have `discount` (major units).
 */
export function getInvoiceAmounts(
  invoice: Pick<Invoice, "items" | "taxRate" | "discountAmount"> & {
    discount?: number;
  }
): InvoiceAmounts {
  const discountMajor =
    typeof invoice.discount === "number"
      ? invoice.discount
      : typeof invoice.discountAmount === "number"
        ? toMajorUnits(invoice.discountAmount)
        : 0;

  return calculateInvoiceAmounts(
    (invoice.items ?? []).map((i) => ({
      quantity: Number(i.quantity) || 0,
      price: Number(i.price) || 0,
    })),
    Number(invoice.taxRate) || 0,
    discountMajor
  );
}
