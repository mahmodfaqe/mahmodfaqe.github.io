import { PROFILE } from "../data/profile";

/** WhatsApp chat link to the portfolio owner with a pre-filled message. */
export function buildWhatsappHref(text) {
  const joiner = PROFILE.whatsapp.includes("?") ? "&" : "?";
  return `${PROFILE.whatsapp}${joiner}text=${encodeURIComponent(text)}`;
}
