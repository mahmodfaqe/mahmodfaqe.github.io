import "../styles/About.css";
import mePng from "../assets/images/me1.png";
import meWebp from "../assets/images/me1.webp";
import { PROFILE } from "../data/profile";
import { useLocale } from "../i18n/LocaleContext";

export default function About() {
    const { t, locale } = useLocale();

    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="about">
                    <div className="row align-items-center">
                        <div
                            className="col-lg-6 mt-4 mt-lg-0 text-center text-lg-start order-1"
                            data-aos="fade-right"
                            data-aos-duration="900"
                            data-aos-easing="ease-out-cubic"
                        >
                            <h1
                                className="about-title"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                {t.about.title}
                            </h1>

                            <p
                                className="about-sub-title"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                {locale === "ku" ? PROFILE.aboutKu : PROFILE.about}
                            </p>
                        </div>

                        <div
                            className="col-lg-6 text-center mt-4 mt-lg-0 order-2"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                            data-aos-easing="ease-out-cubic"
                        >
                            <div className="profile-wrap">
                                <picture>
                                    <source srcSet={meWebp} type="image/webp" />
                                    <img
                                        src={mePng}
                                        alt={PROFILE.fullName}
                                        className="profile-img"
                                        width="420"
                                        height="420"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
