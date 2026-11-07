import { useState } from "react";
import "../styles/Journey.css";
import { JOURNEY_CONTENT } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";
import { localized } from "../i18n/localize";

export default function Journey() {
  const { t, locale } = useLocale();
  const [activeTab, setActiveTab] = useState("education");
  const items = JOURNEY_CONTENT[activeTab];

  return (
    <section
      id="journey" className="journey-section"
      aria-labelledby="journey-title"
    >
      <div className="container">
        <div className="journey-heading" data-aos="fade-up">

          <h2 id="journey-title">
            {t.journey.title}
          </h2>

          <p>
            {t.journey.lead}
          </p>
        </div>

        <div
          className="journey-tabs"
          role="tablist"
          aria-label={t.journey.tabsLabel}
        >
          {["education", "experience"].map((tab) => (
            <button
              key={tab}
              id={`${tab}-tab`}
              className={`journey-tab ${activeTab === tab ? "active" : ""
                }`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={activeTab === tab ? `${tab}-panel` : undefined}
              onClick={() => setActiveTab(tab)}
            >
              <i
                className={`bi ${tab === "education"
                    ? "bi-mortarboard"
                    : "bi-briefcase"
                  }`}
                aria-hidden="true"
              />

              {tab === "education"
                ? t.journey.education
                : t.journey.experience}
            </button>
          ))}
        </div>

        <div
          id={`${activeTab}-panel`}
          className="journey-panel"
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          key={activeTab}
        >
          {items.map((item) => (
            <article
              className="journey-card"
              key={item.title}
            >
              <div className="journey-icon">
                <i
                  className={`bi ${item.icon}`}
                  aria-hidden="true"
                />
              </div>

              <div className="journey-card-content">
                <span className="journey-period">
                  {localized(item, "period", locale)}
                </span>

                <h3>{localized(item, "title", locale)}</h3>

                <p className="journey-place">
                  {localized(item, "place", locale)}
                </p>

                <p>{localized(item, "description", locale)}</p>

                {item.projects && item.projects.length > 0 && (
                  <div className="journey-projects">
                    <h4>{t.journey.contributions}</h4>

                    {item.projects.map((project) => (
                      <div
                        className="journey-project"
                        key={project.name}
                      >
                        <span className="journey-project-dot" />

                        <div>
                          <h5>{localized(project, "name", locale)}</h5>
                          <p>{localized(project, "description", locale)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
