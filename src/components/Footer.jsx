import "../styles/Footer.css";
import { PROFILE } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";
import ContactForm from "./ContactForm";
import { Link } from "react-router-dom";

export default function Footer() {
    const { t, locale } = useLocale();

    return (
        <section id="contact">
            <footer className="footer text-white site-footer">
                <div className="container footer-grid footer-grid-with-form">
                    <div className="footer-info" data-aos="fade-up">
                        <h3 className="footer-title">{t.contact.title}</h3>
                        <p className="footer-subtitle">
                            {locale === "ku" ? PROFILE.footerNoteKu : PROFILE.footerNote}
                        </p>
                        <ul className="footer-list">
                            <li>
                                <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                                <span>{PROFILE.location}</span>
                            </li>
                            <li>
                                <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                <a href={`tel:${PROFILE.phoneDisplay.replace(/\s+/g, "")}`}>
                                    {PROFILE.phoneDisplay}
                                </a>
                            </li>
                            <li>
                                <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                            </li>
                            {PROFILE.orcid ? (
                                <li>
                                    <i className="bi bi-journal-bookmark-fill" aria-hidden="true"></i>
                                    <a href={PROFILE.orcid} target="_blank" rel="noopener noreferrer">
                                        ORCID
                                    </a>
                                </li>
                            ) : null}
                            {PROFILE.googleScholar ? (
                                <li>
                                    <i className="bi bi-mortarboard-fill" aria-hidden="true"></i>
                                    <a href={PROFILE.googleScholar} target="_blank" rel="noopener noreferrer">
                                        Google Scholar
                                    </a>
                                </li>
                            ) : null}
                        </ul>

                        <div className="footer-cv-link">
                            <Link to="/cv" className="btn btn-outline-modern">
                                {t.nav.cv}
                            </Link>
                        </div>
                    </div>

                    <div className="footer-form-col" data-aos="fade-up" data-aos-delay="60">
                        <ContactForm />
                    </div>

                    <div className="footer-social" data-aos="fade-up" data-aos-delay="100">
                        <h3 className="footer-title">{t.contact.findOnline}</h3>
                        <div className="footer-social-grid">
                            <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-whatsapp" aria-hidden="true"></i>
                                <span>WhatsApp</span>
                            </a>
                            <a href={PROFILE.telegram} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-telegram" aria-hidden="true"></i>
                                <span>Telegram</span>
                            </a>
                            <a href={`mailto:${PROFILE.email}`} className="social-item">
                                <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                                <span>Email</span>
                            </a>
                            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-github" aria-hidden="true"></i>
                                <span>Github</span>
                            </a>
                            <a href={PROFILE.facebook} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-facebook" aria-hidden="true"></i>
                                <span>Facebook</span>
                            </a>
                            <a href={PROFILE.messenger} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-messenger" aria-hidden="true"></i>
                                <span>Messenger</span>
                            </a>
                            {PROFILE.snapchat ? (
                                <a href={PROFILE.snapchat} target="_blank" rel="noopener noreferrer" className="social-item">
                                    <i className="bi bi-snapchat" aria-hidden="true"></i>
                                    <span>Snapchat</span>
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        <span dir="ltr" lang="en">&copy; 2026 {PROFILE.firstName} {PROFILE.lastName}</span>
                        {" · "}
                        {t.contact.rights}
                    </p>
                </div>
            </footer>
        </section>
    );
}
