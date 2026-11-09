import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Home.css";
import { buildSectionHref } from "../utils/sectionNavigation";
import { PROFILE, STATIC_PROJECTS } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";
import { formatNumber } from "../i18n/digits";

const hasPublicLink = (project) =>
    Boolean(project.preview_url || project.app_store_url || project.play_store_url);

/** Active = finished and open to the public (site or store link); archived work counts only in the total. */
const PROJECT_COUNTS = {
    total: STATIC_PROJECTS.length,
    active: STATIC_PROJECTS.filter((project) => project.status === "completed" && hasPublicLink(project)).length,
    inProgress: STATIC_PROJECTS.filter((project) => project.status === "in progress").length,
};

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
        const fallbackTimer = window.setTimeout(handleSplashComplete, 1800);

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
                                style={{ "--hero-delay": "0.04s" }}
                                lang="en"
                                aria-label={`${PROFILE.firstName} ${PROFILE.lastName}`}
                            >
                                <span className="hero-name-row" dir="ltr">
                                    <span className="hero-title-first">{PROFILE.firstName}</span>
                                    <span className="hero-title-accent">{PROFILE.lastName}</span>
                                </span>
                            </h1>

                            <h2
                                className="hero-role hero-reveal"
                                style={{ "--hero-delay": "0.1s" }}
                            >
                                {roleText}
                            </h2>

                            <p
                                className="hero-text mx-auto hero-reveal"
                                style={{ "--hero-delay": "0.16s" }}
                            >
                                {leadText}
                            </p>

                            <div
                                className="d-flex flex-wrap gap-3 justify-content-center hero-actions hero-reveal"
                                style={{ "--hero-delay": "0.22s" }}
                            >
                                <Link to={buildSectionHref(location.pathname, "about")} className="btn btn-primary-modern">
                                    {t.home.about}
                                </Link>

                                <Link to={buildSectionHref(location.pathname, "project")} className="btn btn-outline-modern">
                                    <i className="bi bi-briefcase-fill me-2" aria-hidden="true"></i>
                                    {t.home.viewProjects}
                                </Link>
                            </div>

                            <ul
                                className="hero-stats hero-reveal"
                                style={{ "--hero-delay": "0.28s" }}
                                aria-label={t.home.statsLabel}
                            >
                                <li className="hero-stat">
                                    <strong>{formatNumber(PROJECT_COUNTS.total, locale)}+</strong>
                                    <span>{t.home.statTotal}</span>
                                </li>
                                <li className="hero-stat is-active">
                                    <strong>{formatNumber(PROJECT_COUNTS.active, locale)}</strong>
                                    <span>{t.home.statActive}</span>
                                </li>
                                <li className="hero-stat is-progress">
                                    <strong>{formatNumber(PROJECT_COUNTS.inProgress, locale)}</strong>
                                    <span>{t.home.statInProgress}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
