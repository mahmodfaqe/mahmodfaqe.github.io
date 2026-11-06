import "../styles/Footer.css";
import { PROFILE } from "../data/profile";

export default function Footer() {
    return (
        <section id="contact">
            <footer className="footer text-white site-footer">
                <div className="container footer-grid">
                    <div className="footer-info" data-aos="fade-up">
                        <h3 className="footer-title">Let’s Work Together</h3>
                        <p className="footer-subtitle">{PROFILE.footerNote}</p>
                        <ul className="footer-list">
                            <li>
                                <i className="bi bi-geo-alt-fill"></i>
                                <span>{PROFILE.location}</span>
                            </li>
                            <li>
                                <i className="bi bi-telephone-fill"></i>
                                <a href={`tel:${PROFILE.phoneDisplay.replace(/\s+/g, "")}`}>
                                    {PROFILE.phoneDisplay}
                                </a>
                            </li>
                            <li>
                                <i className="bi bi-envelope-fill"></i>
                                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-social" data-aos="fade-up" data-aos-delay="100">
                        <h3 className="footer-title">Find Me Online</h3>
                        <div className="footer-social-grid">
                            <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-whatsapp"></i>
                                <span>WhatsApp</span>
                            </a>
                            <a href={PROFILE.telegram} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-telegram"></i>
                                <span>Telegram</span>
                            </a>
                            <a href={`mailto:${PROFILE.email}`} className="social-item">
                                <i className="bi bi-envelope-fill"></i>
                                <span>Email</span>
                            </a>
                            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-github"></i>
                                <span>Github</span>
                            </a>
                            <a href={PROFILE.facebook} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-facebook"></i>
                                <span>Facebook</span>
                            </a>
                            <a href={PROFILE.messenger} target="_blank" rel="noopener noreferrer" className="social-item">
                                <i className="bi bi-messenger"></i>
                                <span>Messenger</span>
                            </a>
                            {PROFILE.snapchat ? (
                                <a href={PROFILE.snapchat} target="_blank" rel="noopener noreferrer" className="social-item">
                                    <i className="bi bi-snapchat"></i>
                                    <span>Snapchat</span>
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 {PROFILE.firstName} Khdir ✦ All rights reserved.</p>
                </div>
            </footer>
        </section>
    );
}
