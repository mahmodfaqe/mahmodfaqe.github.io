import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import "../styles/SoftPage.css";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="soft-page">
      <div className="soft-page-card" data-aos="zoom-in-up">
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.body}</p>
        <div className="soft-page-actions">
          <Link to="/" className="btn btn-primary-modern">
            {t.notFound.home}
          </Link>
          <Link to="/cv" className="btn btn-outline-modern">
            {t.nav.cv}
          </Link>
        </div>
      </div>
    </div>
  );
}
