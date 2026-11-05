/**
 * Formats a numeric price into a currency string with appropriate symbol and formatting.
 * Supports Trinidad & Tobago (TTD - TT$), Bahamas (BSD - B$), Guyana (GYD - GYD $),
 * Suriname (SRD - SRD $), Barbados (BBD - Bds$), Jamaica (JMD - J$), USD.
 */
/**
 * Real-time Caribbean exchange rates relative to USD / BSD base currency.
 * Bahamas Dollar (BSD) is pegged 1:1 to USD.
 */
export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  BSD: 1.0,      // Bahamas Dollar (1:1 with USD)
  INR: 83.5,     // Indian Rupee
  TTD: 6.78,     // Trinidad & Tobago Dollar
  GYD: 209.2,    // Guyanese Dollar
  BBD: 2.02,     // Barbadian Dollar
  JMD: 156.4,    // Jamaican Dollar
  SRD: 35.5,     // Surinamese Dollar
};

/**
 * Converts a base USD/BSD price to the target country currency using current exchange rates.
 */
export function convertPrice(amountInBaseUSD: number, targetCurrency: string): number {
  const rate = EXCHANGE_RATES[targetCurrency.toUpperCase()] || 1.0;
  return Math.round(amountInBaseUSD * rate);
}

/**
 * Formats a numeric price into a currency string with appropriate symbol,
 * applying the active country's real-time exchange rate.
 */
export function formatPrice(
  amount: number,
  currency: string = "BSD",
  convert: boolean = true
): string {
  try {
    const finalAmount = convert ? convertPrice(amount, currency) : amount;

    const formattedNum = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(finalAmount);

    switch (currency.toUpperCase()) {
      case "INR":
        return `₹ ${formattedNum}`;
      case "TTD":
        return `TT$ ${formattedNum}`;
      case "BSD":
        return `B$ ${formattedNum}`;
      case "GYD":
        return `GYD $ ${formattedNum}`;
      case "SRD":
        return `SRD $ ${formattedNum}`;
      case "BBD":
        return `Bds$ ${formattedNum}`;
      case "JMD":
        return `J$ ${formattedNum}`;
      case "USD":
      default:
        return `$ ${formattedNum}`;
    }
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

/**
 * Calculates discount percentage given original and current price.
 */
export function calculateDiscount(originalPrice: number, price: number): number {
  if (originalPrice <= price || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
