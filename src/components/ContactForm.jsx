import { useState } from "react";
import { PROFILE } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";
import { buildWhatsappHref } from "../utils/whatsapp";
import "../styles/ContactForm.css";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID?.trim() || "";

function composeWhatsappText(t, name, email, message) {
  const details = [`${t.contact.name}: ${name || "—"}`];
  if (email) details.push(`${t.contact.email}: ${email}`);
  return [t.contact.whatsappGreeting, details.join("\n"), message.trim()].filter(Boolean).join("\n\n");
}

/**
 * Without a Formspree form the message goes out through the visitor's own
 * WhatsApp (the main button) or email app, so a phone with no mail account
 * set up can still send it.
 */
export default function ContactForm() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const whatsappHref = buildWhatsappHref(composeWhatsappText(t, name, email, message));

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const channel = event.nativeEvent?.submitter?.value || (FORMSPREE_ID ? "form" : "whatsapp");

    if (channel === "whatsapp") {
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
      setStatus("success");
      setFeedback(t.contact.whatsappOpened);
      return;
    }

    if (channel === "email" || !FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio message from ${name || "visitor"}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setFeedback(t.contact.formSuccess);
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio message from ${name || email}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      setStatus("success");
      setFeedback(t.contact.formspreeSuccess);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setFeedback(t.contact.formError);
    }
  }

  return (
    <div className="contact-form-panel" data-aos="fade-up" data-aos-delay="80">
      <h4 className="contact-form-title">{t.contact.formTitle}</h4>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          <span>{t.contact.name}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>{FORMSPREE_ID ? t.contact.email : `${t.contact.email} (${t.contact.optional})`}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={Boolean(FORMSPREE_ID)}
          />
        </label>
        <label>
          <span>{t.contact.message}</span>
          <textarea
            name="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>

        <div className="contact-form-actions">
          {FORMSPREE_ID ? (
            <>
              <button type="submit" value="form" className="btn btn-primary-modern" disabled={status === "sending"}>
                {status === "sending" ? t.contact.sending : t.contact.send}
              </button>
              <a
                className="btn btn-outline-modern"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp" aria-hidden="true"></i>
                {t.contact.whatsappCta}
              </a>
            </>
          ) : (
            <>
              <button type="submit" value="whatsapp" className="btn btn-primary-modern">
                <i className="bi bi-whatsapp" aria-hidden="true"></i>
                {t.contact.sendWhatsapp}
              </button>
              <button type="submit" value="email" className="btn btn-outline-modern">
                <i className="bi bi-envelope" aria-hidden="true"></i>
                {t.contact.sendEmail}
              </button>
            </>
          )}
        </div>
      </form>

      {feedback ? (
        <p className={`contact-form-feedback ${status === "error" ? "is-error" : "is-ok"}`} role="status">
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
