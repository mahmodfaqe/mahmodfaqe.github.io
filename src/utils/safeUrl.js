/**
 * Returns a safe http(s) URL string, or "" if the value is missing / unsafe.
 * Blocks javascript:, data:, and other non-web schemes.
 */
export function sanitizeHttpUrl(url) {
  if (typeof url !== "string") return "";

  const trimmed = url.trim();
  if (!trimmed) return "";

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return "";
    }
    return parsed.href;
  } catch {
    return "";
  }
}

export function hasSafeHttpUrl(url) {
  return sanitizeHttpUrl(url) !== "";
}
