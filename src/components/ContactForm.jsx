import { useState } from "react";
import { PROFILE } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/ContactForm.css";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID?.trim() || "";

export default function ContactForm() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const whatsappHref = (() => {
    const text = encodeURIComponent(
      `Hello Mahmood — message from the portfolio.\n\nName: ${name || "—"}\nEmail: ${email || "—"}\n\n${message || ""}`.trim()
    );
    const joiner = PROFILE.whatsapp.includes("?") ? "&" : "?";
    return `${PROFILE.whatsapp}${joiner}text=${text}`;
  })();

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setFeedback("");

    try {
      if (FORMSPREE_ID) {
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
        return;
      }

      const subject = encodeURIComponent(`Portfolio message from ${name || "visitor"}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setFeedback(t.contact.formSuccess);
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
          <span>{t.contact.email}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          <button type="submit" className="btn btn-primary-modern" disabled={status === "sending"}>
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
