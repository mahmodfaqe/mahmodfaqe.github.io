import "../styles/Services.css";
import { SERVICES } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";
import { localized } from "../i18n/localize";

export default function Services() {
  const { t, locale } = useLocale();

  return (
    <section id="services" className="services-section" aria-labelledby="services-title">
      <div className="container">
        <div className="services-heading" data-aos="fade-up">
          <h2 id="services-title">{t.services.title}</h2>
          <p>{t.services.lead}</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <article className="service-card" key={service.title} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="service-icon"><i className={`bi ${service.icon}`} aria-hidden="true"></i></div>
              <h3>{localized(service, "title", locale)}</h3>
              <p>{localized(service, "description", locale)}</p>
              <ul>
                {localized(service, "points", locale).map((point) => (
                  <li key={point}><i className="bi bi-check2" aria-hidden="true"></i>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
