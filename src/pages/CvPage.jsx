import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PROFILE, SERVICES, STATIC_PROJECTS, STATIC_SKILLS, JOURNEY_CONTENT } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/CvPage.css";

export default function CvPage() {
  const { t, locale } = useLocale();
  const completed = STATIC_PROJECTS.filter((p) => p.status === "completed");
  const skills = STATIC_SKILLS.map((s) => s.nama).join(" · ");

  useEffect(() => {
    const previous = document.title;
    document.title = `${PROFILE.fullName} — CV`;
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="cv-page">
      <div className="cv-toolbar no-print">
        <Link to="/" className="btn btn-outline-modern">
          {t.cv.back}
        </Link>
        <button type="button" className="btn btn-primary-modern" onClick={() => window.print()}>
          {t.cv.print}
        </button>
      </div>

      <article className="cv-sheet">
        <header className="cv-header">
          <h1>{PROFILE.fullName}</h1>
          <p className="cv-role">{locale === "ku" ? PROFILE.roleKu : PROFILE.role}</p>
          <p className="cv-meta">
            {PROFILE.affiliation}
            <br />
            {PROFILE.location} · {PROFILE.email} · {PROFILE.phoneDisplay}
            <br />
            <a href={PROFILE.siteUrl}>{PROFILE.siteUrl}</a>
            {" · "}
            <a href={PROFILE.github}>{PROFILE.github.replace("https://", "")}</a>
          </p>
        </header>

        <section>
          <h2>{locale === "ku" ? "پوختە" : "Profile"}</h2>
          <p>{locale === "ku" ? PROFILE.aboutKu : PROFILE.about}</p>
        </section>

        <section>
          <h2>{locale === "ku" ? "خوێندن" : "Education"}</h2>
          {JOURNEY_CONTENT.education.map((item) => (
            <div className="cv-block" key={item.title}>
              <h3>{item.title}</h3>
              <p className="cv-muted">
                {item.place} · {item.period}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>{locale === "ku" ? "ئەزموون" : "Experience"}</h2>
          {JOURNEY_CONTENT.experience.map((item) => (
            <div className="cv-block" key={item.title}>
              <h3>{item.title}</h3>
              <p className="cv-muted">
                {item.place} · {item.period}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>{locale === "ku" ? "پڕۆژە دیارەکان" : "Selected projects"}</h2>
          <ul className="cv-list">
            {completed.slice(0, 8).map((project) => (
              <li key={project.id}>
                <strong>{project.nama}</strong>
                {project.preview_url ? (
                  <>
                    {" — "}
                    <a href={project.preview_url}>{project.preview_url.replace(/^https?:\/\//, "")}</a>
                  </>
                ) : null}
                <div className="cv-muted">{project.deskripsi}</div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{locale === "ku" ? "خزمەتگوزارییەکان" : "Services"}</h2>
          <ul className="cv-list">
            {SERVICES.map((service) => (
              <li key={service.title}>
                <strong>{service.title}</strong> — {service.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{locale === "ku" ? "ئامرازەکان" : "Tools"}</h2>
          <p>{skills}</p>
        </section>
      </article>
    </div>
  );
}
