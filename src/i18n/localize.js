/**
 * Kurdish value of `field` (stored as `${field}Ku`) when the locale is Kurdish
 * and a translation exists; otherwise the English value. CMS rows without
 * Kurdish fields fall back to English.
 */
export function localized(item, field, locale) {
  if (!item) return undefined;

  if (locale === "ku") {
    const ku = item[`${field}Ku`];
    const hasKu = Array.isArray(ku) ? ku.length > 0 : typeof ku === "string" && ku.trim() !== "";
    if (hasKu) return ku;
  }

  return item[field];
}
