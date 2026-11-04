import "../styles/About.css";
import me from "../assets/images/me1.png";
import { PROFILE } from "../data/profile";

export default function About() {
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
                                About Me
                            </h1>

                            <p
                                className="about-sub-title"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                {PROFILE.about}
                            </p>
                        </div>

                        <div
                            className="col-lg-6 text-center mt-4 mt-lg-0 order-2"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                            data-aos-easing="ease-out-cubic"
                        >
                            <div className="profile-wrap">
                                <img
                                    src={me}
                                    alt={PROFILE.fullName}
                                    className="profile-img"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
