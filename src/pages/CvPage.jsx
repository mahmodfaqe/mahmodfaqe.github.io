import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PROFILE, SERVICES, STATIC_PROJECTS, STATIC_SKILLS, JOURNEY_CONTENT } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";
import { localized } from "../i18n/localize";
import "../styles/CvPage.css";

export default function CvPage() {
  const { t, locale } = useLocale();
  const completed = STATIC_PROJECTS.filter((p) => p.status === "completed");
  const skills = STATIC_SKILLS.map((s) => s.nama).join(" · ");

  useEffect(() => {
    document.title = `${PROFILE.fullName} — CV`;
    return () => {
      document.title = `${PROFILE.firstName} ${PROFILE.lastName} — Portfolio`;
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
          <h1 dir="ltr" lang="en">{PROFILE.fullName}</h1>
          <p className="cv-role">{locale === "ku" ? PROFILE.roleKu : PROFILE.role}</p>
          <p className="cv-meta">
            {localized(PROFILE, "affiliation", locale)}
            <br />
            {localized(PROFILE, "location", locale)}
            {" · "}
            <span dir="ltr">{PROFILE.email}</span>
            {" · "}
            <span dir="ltr">{PROFILE.phoneDisplay}</span>
            <br />
            <a href={PROFILE.siteUrl} dir="ltr">{PROFILE.siteUrl}</a>
            {" · "}
            <a href={PROFILE.github} dir="ltr">{PROFILE.github.replace("https://", "")}</a>
          </p>
        </header>

        <section>
          <h2>{t.cv.profile}</h2>
          <p>{locale === "ku" ? PROFILE.aboutKu : PROFILE.about}</p>
        </section>

        <section>
          <h2>{t.cv.education}</h2>
          {JOURNEY_CONTENT.education.map((item) => (
            <div className="cv-block" key={item.title}>
              <h3>{localized(item, "title", locale)}</h3>
              <p className="cv-muted">
                {localized(item, "place", locale)} · {localized(item, "period", locale)}
              </p>
              <p>{localized(item, "description", locale)}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>{t.cv.experience}</h2>
          {JOURNEY_CONTENT.experience.map((item) => (
            <div className="cv-block" key={item.title}>
              <h3>{localized(item, "title", locale)}</h3>
              <p className="cv-muted">
                {localized(item, "place", locale)} · {localized(item, "period", locale)}
              </p>
              <p>{localized(item, "description", locale)}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>{t.cv.projects}</h2>
          <ul className="cv-list">
            {completed.slice(0, 8).map((project) => (
              <li key={project.id}>
                <strong>{localized(project, "nama", locale)}</strong>
                {project.preview_url ? (
                  <>
                    {" — "}
                    <a href={project.preview_url} dir="ltr">{project.preview_url.replace(/^https?:\/\//, "")}</a>
                  </>
                ) : null}
                <div className="cv-muted">{localized(project, "deskripsi", locale)}</div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.cv.services}</h2>
          <ul className="cv-list">
            {SERVICES.map((service) => (
              <li key={service.title}>
                <strong>{localized(service, "title", locale)}</strong> — {localized(service, "description", locale)}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.cv.tools}</h2>
          <p>{skills}</p>
        </section>
      </article>
    </div>
  );
}
