import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NotFound from "../components/NotFound";
import { CASE_STUDIES, getCaseStudy } from "../data/caseStudies";
import { PROFILE, STATIC_PROJECTS } from "../data/profile";
import { formatNumber } from "../i18n/digits";
import { useLocale } from "../i18n/LocaleContext";
import { localized } from "../i18n/localize";
import { hasSafeHttpUrl, sanitizeHttpUrl } from "../utils/safeUrl";
import { getAppleStoreLabel } from "../utils/storeLinks";
import { buildWhatsappHref } from "../utils/whatsapp";
import "../styles/CaseStudy.css";

function imagePath(slug, name, width) {
  return `/projects/${slug}/${name}${width ? `-${width}` : ""}.webp`;
}

function WideImage({ slug, image, alt, eager = false }) {
  return (
    <img
      src={imagePath(slug, image.name, 1600)}
      srcSet={`${imagePath(slug, image.name, 800)} 800w, ${imagePath(slug, image.name, 1600)} 1600w`}
      sizes="(max-width: 1200px) 100vw, 1140px"
      width={image.width}
      height={image.height}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
    />
  );
}

function BrowserFrame({ children }) {
  return (
    <div className="case-frame">
      <div className="case-frame-bar" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      {children}
    </div>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const { t, locale } = useLocale();
  const study = getCaseStudy(slug);
  const project = study ? STATIC_PROJECTS.find((item) => item.id === study.projectId) : undefined;
  const name = project ? localized(project, "nama", locale) : "";

  useEffect(() => {
    if (!name) return undefined;

    document.title = `${name} — ${PROFILE.firstName} ${PROFILE.lastName}`;
    return () => {
      document.title = `${PROFILE.firstName} ${PROFILE.lastName} — Portfolio`;
    };
  }, [name]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!study || !project) {
    return <NotFound />;
  }

  const links = [
    { url: project.preview_url, label: t.project.visitSite, icon: "bi-box-arrow-up-right", primary: true },
    { url: project.app_store_url, label: getAppleStoreLabel(project.app_store_url, t), icon: "bi-apple" },
    { url: project.play_store_url, label: t.project.googlePlay, icon: "bi-google-play" },
  ].filter((link) => hasSafeHttpUrl(link.url));

  const webShots = study.gallery.filter((shot) => shot.kind === "web");
  const phoneShots = study.gallery.filter((shot) => shot.kind === "phone");

  const next = CASE_STUDIES[(CASE_STUDIES.indexOf(study) + 1) % CASE_STUDIES.length];
  const nextProject = STATIC_PROJECTS.find((item) => item.id === next.projectId);

  const heroImage = (
    <WideImage slug={study.slug} image={study.hero} alt={localized(study.hero, "alt", locale)} eager />
  );

  return (
    <>
      <article className="case-study">
        <div className="container">
          <header className="case-header">
            <Link className="case-back" to="/#project">
              <i className="bi bi-arrow-left" aria-hidden="true"></i>
              {t.caseStudy.back}
            </Link>
            <p className="case-eyebrow">{t.caseStudy.label}</p>
            <h1>{name}</h1>
            <p className="case-summary">{localized(study, "summary", locale)}</p>

            {links.length > 0 && (
              <div className="case-links">
                {links.map((link) => (
                  <a
                    key={link.url}
                    className={`btn ${link.primary ? "btn-primary-modern" : "btn-outline-modern"}`}
                    href={sanitizeHttpUrl(link.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`bi ${link.icon}`} aria-hidden="true"></i>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </header>

          <figure className="case-hero">
            {study.hero.framed ? <BrowserFrame>{heroImage}</BrowserFrame> : heroImage}
          </figure>

          <dl className="case-meta">
            <div>
              <dt>{t.project.myRole}</dt>
              <dd>{localized(project, "role", locale)}</dd>
            </div>
            <div>
              <dt>{t.project.audience}</dt>
              <dd>{localized(project, "audience", locale)}</dd>
            </div>
            <div>
              <dt>{t.project.technologies}</dt>
              <dd>
                <ul className="case-tools">
                  {project.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <ul className="case-facts">
            {study.facts.map((fact) => (
              <li key={fact.label}>
                <strong>
                  {formatNumber(fact.value, locale)}
                  {fact.suffix ?? ""}
                </strong>
                <span>{localized(fact, "label", locale)}</span>
              </li>
            ))}
          </ul>

          <section className="case-section">
            <h2>{t.caseStudy.brief}</h2>
            <p>{localized(study, "brief", locale)}</p>
          </section>

          <section className="case-section">
            <h2>{t.caseStudy.built}</h2>
            <div className="case-groups">
              {study.built.map((group) => (
                <div className="case-group" key={group.title}>
                  <h3>{localized(group, "title", locale)}</h3>
                  <ul>
                    {localized(group, "items", locale).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="case-section">
            <h2>{t.caseStudy.screens}</h2>

            <div className="case-shots">
              {webShots.map((shot) => (
                <figure key={shot.name}>
                  <BrowserFrame>
                    <WideImage slug={study.slug} image={shot} alt={localized(shot, "alt", locale)} />
                  </BrowserFrame>
                  <figcaption>{localized(shot, "caption", locale)}</figcaption>
                </figure>
              ))}
            </div>

            {phoneShots.length > 0 && (
              <div className="case-phones">
                {phoneShots.map((shot) => (
                  <figure key={shot.name}>
                    <img
                      src={imagePath(study.slug, shot.name)}
                      width={shot.width}
                      height={shot.height}
                      alt={localized(shot, "alt", locale)}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{localized(shot, "caption", locale)}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>

          <section className="case-section">
            <h2>{t.caseStudy.approach}</h2>
            <ul className="case-points">
              {localized(study, "approach", locale).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="case-section">
            <h2>{t.caseStudy.outcome}</h2>
            <p>{localized(study, "outcome", locale)}</p>
          </section>

          <nav className="case-next" aria-label={t.caseStudy.next}>
            <Link className="case-next-card" to={`/projects/${next.slug}`}>
              <span>{t.caseStudy.next}</span>
              <strong>{localized(nextProject, "nama", locale)}</strong>
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
            <div className="case-contact">
              <p>{t.services.ctaLead}</p>
              <a
                className="btn btn-primary-modern"
                href={buildWhatsappHref(t.services.ctaMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp" aria-hidden="true"></i>
                {t.services.cta}
              </a>
            </div>
          </nav>
        </div>
      </article>
      <Footer />
    </>
  );
}
