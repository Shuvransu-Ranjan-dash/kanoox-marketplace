/**
 * Formats a numeric price into a standard dollar format.
 */
export function formatPrice(amount: number, _unusedLegacyParam?: string): string {
  try {
    const formattedNum = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);

    return `$${formattedNum}`;
  } catch {
    return `$${amount.toLocaleString()}`;
  }
}

/**
 * Calculates discount percentage given original and current price.
 */
export function calculateDiscount(originalPrice: number, price: number): number {
  if (originalPrice <= price || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
