/**
 * Formats a numeric price into a currency string with appropriate symbol and commas.
 * Default currency is GYD (Guyana Dollar) as required by KanooX specs.
 */
export function formatPrice(
  amount: number,
  currency: string = "GYD"
): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "GYD" ? "USD" : currency, // Fallback formatting with custom prefix for GYD
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace("$", currency === "GYD" ? "GYD $" : "$");
  } catch {
    return `${currency} $${amount.toLocaleString()}`;
  }
}

/**
 * Calculates discount percentage given original and current price.
 */
export function calculateDiscount(originalPrice: number, price: number): number {
  if (originalPrice <= price || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
