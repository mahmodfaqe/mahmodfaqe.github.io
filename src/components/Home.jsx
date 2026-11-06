import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Home.css";
import { buildSectionHref } from "../utils/sectionNavigation";
import { PROFILE } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";

export default function Home() {
    const location = useLocation();
    const { t, locale } = useLocale();
    const [isVisible, setIsVisible] = useState(
        () => document.body.dataset.splash === "done"
    );

    useEffect(() => {
        if (document.body.dataset.splash === "done") {
            const frame = window.requestAnimationFrame(() => {
                setIsVisible(true);
            });

            return () => window.cancelAnimationFrame(frame);
        }

        const handleSplashComplete = () => setIsVisible(true);
        const fallbackTimer = window.setTimeout(handleSplashComplete, 3200);

        window.addEventListener("splashscreen:complete", handleSplashComplete);

        return () => {
            window.clearTimeout(fallbackTimer);
            window.removeEventListener("splashscreen:complete", handleSplashComplete);
        };
    }, []);

    const roleText = locale === "ku" ? PROFILE.roleKu : PROFILE.role;
    const leadText = locale === "ku" ? PROFILE.homeLeadKu : PROFILE.homeLead;

    return (
        <section id="home" className="hero-section d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-8">
                        <div className={`hero-content ${isVisible ? "is-visible" : ""}`}>
                            <h1
                                className="hero-title hero-reveal"
                                style={{ "--hero-delay": "0.08s" }}
                                dir="ltr"
                                lang="en"
                            >
                                <span className="hero-title-first">{PROFILE.firstName}</span>{" "}
                                <span className="hero-title-accent">{PROFILE.lastName}</span>
                            </h1>

                            <h2
                                className="hero-role hero-reveal"
                                style={{ "--hero-delay": "0.18s" }}
                            >
                                {roleText}
                            </h2>

                            <p
                                className="hero-text mx-auto hero-reveal"
                                style={{ "--hero-delay": "0.28s" }}
                            >
                                {leadText}
                            </p>

                            <div
                                className="d-flex flex-wrap gap-3 justify-content-center hero-actions hero-reveal"
                                style={{ "--hero-delay": "0.4s" }}
                            >
                                <Link to={buildSectionHref(location.pathname, "about")} className="btn btn-primary-modern">
                                    {t.home.about}
                                </Link>

                                <Link to={buildSectionHref(location.pathname, "project")} className="btn btn-outline-modern">
                                    <i className="bi bi-briefcase-fill me-2" aria-hidden="true"></i>
                                    {t.home.viewProjects}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
