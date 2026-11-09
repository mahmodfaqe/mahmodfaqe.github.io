const ARABIC_INDIC_ZERO = 0x0660;

/**
 * A count for the active locale: grouped Latin digits in English,
 * Eastern Arabic digits (as the Kurdish curriculum writes them) in Kurdish.
 */
export function formatNumber(value, locale) {
  if (locale === "ku") {
    return String(value).replace(/\d/g, (digit) => String.fromCharCode(ARABIC_INDIC_ZERO + Number(digit)));
  }

  return typeof value === "number" ? value.toLocaleString("en-US") : String(value);
}
