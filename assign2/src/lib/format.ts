// ============================================================
// Price formatting utilities.
// Used by PreferencesContext to format prices in different currencies.
// ============================================================

export type Currency = "USD" | "EUR" | "INR";

// Simple fixed exchange rates (not live – for simulation only)
const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  INR: 83,
};

const symbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  INR: "₹",
};

/**
 * Format a USD price into the chosen currency.
 * e.g. formatPrice(149, "EUR") -> "€137.08"
 */
export function formatPrice(usdAmount: number, currency: Currency = "USD"): string {
  const converted = usdAmount * rates[currency];
  const symbol = symbols[currency];

  // For INR show no decimals; for others show 2 decimals.
  if (currency === "INR") {
    return `${symbol}${Math.round(converted).toLocaleString("en-IN")}`;
  }
  return `${symbol}${converted.toFixed(2)}`;
}
