/**
 * Formats a number as Nigerian Naira (NGN).
 *
 * @param amount - The numeric value to format.
 * @param options - Optional Intl.NumberFormatOptions overrides.
 * @returns A formatted string, e.g. "₦1,500.00"
 */
export function formatCurrency(
  amount: number,
  options?: Partial<Intl.NumberFormatOptions>,
): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
}

/**
 * Formats a number as a compact Naira value for dashboard cards.
 * e.g. 1_500_000 → "₦1.5M"
 */
export function formatCurrencyCompact(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}
