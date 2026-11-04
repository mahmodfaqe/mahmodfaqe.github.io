import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Home.css";
import { buildSectionHref } from "../utils/sectionNavigation";
import { PROFILE } from "../data/profile";

export default function Home() {
    const location = useLocation();
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

    return (
        <section id="home" className="hero-section d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-8">
                        <div className={`hero-content ${isVisible ? "is-visible" : ""}`}>
                            <h4
                                className="hero-eyebrow hero-reveal"
                                style={{ "--hero-delay": "0.08s" }}
                            >
                                Hello, it's me
                            </h4>

                            <h1
                                className="hero-title hero-reveal"
                                style={{ "--hero-delay": "0.18s" }}
                            >
                                <span className="hero-title-first">{PROFILE.firstName}</span>{" "}
                                <span className="hero-title-accent">{PROFILE.lastName}</span>
                            </h1>

                            <h3
                                className="hero-role hero-reveal"
                                style={{ "--hero-delay": "0.28s" }}
                            >
                                And I am a {PROFILE.role.toLowerCase()}
                            </h3>

                            <p
                                className="hero-text mx-auto hero-reveal"
                                style={{ "--hero-delay": "0.38s" }}
                            >
                                {PROFILE.homeLead}
                            </p>

                            <div
                                className="d-flex flex-wrap gap-3 justify-content-center hero-actions hero-reveal"
                                style={{ "--hero-delay": "0.5s" }}
                            >
                                <Link to={buildSectionHref(location.pathname, "about")} className="btn btn-primary-modern">
                                    Learn More
                                </Link>

                                <Link to={buildSectionHref(location.pathname, "project")} className="btn btn-outline-modern">
                                    <i className="fas fa-briefcase me-2"></i>
                                    View Projects
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
