import "../styles/Navbar.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "../i18n/LocaleContext";
import {
    buildSectionHref,
    getSectionBasePath,
    isKnownSectionId,
    isSectionPagePath,
} from "../utils/sectionNavigation";
import { getNavbarOffset, scrollToSectionId } from "../utils/sectionScroll";

const NAV_IDS = ["home", "about", "tools", "journey", "project", "services", "contact"];

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { role, logout } = useAuth();
    const { t, locale, setLocale } = useLocale();
    const [activeSection, setActiveSection] = useState("");
    const [isNavOpen, setIsNavOpen] = useState(false);

    const navItems = NAV_IDS.map((id) => ({ id, label: t.nav[id] }));

    const isAdmin =
        role === "admin" &&
        (location.pathname.startsWith("/admin") || location.pathname.startsWith("/project/"));
    const isSectionPage = isSectionPagePath(location.pathname);
    const sectionBasePath = getSectionBasePath(location.pathname);
    const visibleActiveSection = isSectionPage ? activeSection : "";

    const handleLogout = async () => {
        const logoutTarget = isKnownSectionId(activeSection)
            ? `/#${activeSection}`
            : "/#home";

        setIsNavOpen(false);
        navigate(logoutTarget, { replace: true });
        await logout();
    };

    const handleSectionClick = (event, sectionId) => {
        setIsNavOpen(false);

        if (!isSectionPage) {
            return;
        }

        event.preventDefault();
        navigate(buildSectionHref(location.pathname, sectionId));
        setActiveSection(sectionId);
        scrollToSectionId(sectionId, { behavior: "smooth" });
    };

    useEffect(() => {
        if (!isSectionPage) {
            return undefined;
        }

        function highlightActiveLink() {
            const sections = Array.from(document.querySelectorAll("section[id]"))
                .filter((section) => NAV_IDS.includes(section.id));

            if (!sections.length) {
                setActiveSection(location.hash.replace("#", ""));
                return;
            }

            let currentSection = sections[0]?.id ?? "";
            const activationLine =
                getNavbarOffset() + Math.min(window.innerHeight * 0.22, 160);

            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;

                if (sectionTop <= activationLine) {
                    currentSection = section.id;
                }
            });

            if (window.scrollY <= 8 && sections[0]) {
                currentSection = sections[0].id;
            }

            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2) {
                const lastSection = sections[sections.length - 1];

                if (lastSection) {
                    currentSection = lastSection.id;
                }
            }

            setActiveSection(currentSection);
        }

        const frame = window.requestAnimationFrame(highlightActiveLink);
        const hashTimer = window.setTimeout(highlightActiveLink, 180);

        window.addEventListener("scroll", highlightActiveLink, { passive: true });
        window.addEventListener("resize", highlightActiveLink);
        window.addEventListener("hashchange", highlightActiveLink);

        return () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(hashTimer);
            window.removeEventListener("scroll", highlightActiveLink);
            window.removeEventListener("resize", highlightActiveLink);
            window.removeEventListener("hashchange", highlightActiveLink);
        };
    }, [isSectionPage, location.hash, location.pathname]);

    useEffect(() => {
        if (!isSectionPage || !isKnownSectionId(visibleActiveSection)) {
            return;
        }

        const nextHash = `#${visibleActiveSection}`;

        if (location.hash === nextHash) {
            return;
        }

        window.history.replaceState(
            window.history.state,
            "",
            `${sectionBasePath}${nextHash}`,
        );
    }, [visibleActiveSection, isSectionPage, location.hash, sectionBasePath]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 992) {
                setIsNavOpen(false);
            }
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isNavOpen) return undefined;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isNavOpen]);

    return (
        <nav className="navbar navbar-expand-lg fixed-top site-nav">
            <div className="container">
                <Link className="navbar-brand" to="/#home" onClick={() => setIsNavOpen(false)} dir="ltr" lang="en">
                    Mahmood Khdir
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded={isNavOpen}
                    aria-label={t.nav.openMenu}
                    onClick={() => setIsNavOpen((current) => !current)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`.trim()} id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        {navItems.map((item) => (
                            <li className="nav-item" key={item.id}>
                                <Link
                                    className={`nav-link ${visibleActiveSection === item.id ? "active" : ""}`.trim()}
                                    to={buildSectionHref(location.pathname, item.id)}
                                    onClick={(event) => handleSectionClick(event, item.id)}
                                    aria-current={visibleActiveSection === item.id ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname.replace(/\/+$/, "") === "/cv" ? "active" : ""}`.trim()}
                                to="/cv"
                                onClick={() => setIsNavOpen(false)}
                            >
                                {t.nav.cv}
                            </Link>
                        </li>

                        <li className="nav-item lang-switch-item">
                            <div className="lang-switch" role="group" aria-label={t.nav.language}>
                                <button
                                    type="button"
                                    className={`lang-btn ${locale === "en" ? "active" : ""}`}
                                    onClick={() => setLocale("en")}
                                    aria-pressed={locale === "en"}
                                    aria-label={t.nav.langEnName}
                                    title={t.nav.langEnName}
                                >
                                    {t.nav.langEn}
                                </button>
                                <button
                                    type="button"
                                    className={`lang-btn ${locale === "ku" ? "active" : ""}`}
                                    onClick={() => setLocale("ku")}
                                    aria-pressed={locale === "ku"}
                                    aria-label={t.nav.langKuName}
                                    title={t.nav.langKuName}
                                >
                                    {t.nav.langKu}
                                </button>
                            </div>
                        </li>

                        {isAdmin && (
                            <li className="nav-item">
                                <button
                                    className="nav-link logout-btn"
                                    onClick={handleLogout}
                                    type="button"
                                >
                                    {t.nav.logout}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
