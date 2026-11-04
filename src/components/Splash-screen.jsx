import { useEffect, useState } from "react";
import "../styles/Splash-screen.css";
import { PROFILE } from "../data/profile";

const SPLASH_DONE_KEY = "portfolio:splash-done";

function hasCompletedSplash() {
    if (typeof window === "undefined") return false;
    return (
        document.body.dataset.splash === "done" ||
        window.sessionStorage.getItem(SPLASH_DONE_KEY) === "1"
    );
}

export default function SplashScreen() {
    const [hidden, setHidden] = useState(() => hasCompletedSplash());
    const [isLeaving, setIsLeaving] = useState(false);
    const [texts] = useState([
        "Welcome to My Portfolio",
        "Biology Student & Developer",
        "Web · Mobile · Research Tools",
        "Kurdish · English · Arabic Platforms",
    ]);
    const [text, setText] = useState(texts[0]);

    useEffect(() => {
        if (hidden) return undefined;

        let i = 0;
        let char = 0;
        let deleting = false;
        let typingTimer;
        let pauseTimer;
        let isCancelled = false;

        function type() {
            if (isCancelled) {
                return;
            }

            const current = texts[i];

            if (!deleting) {
                char++;
            } else {
                char--;
            }

            setText(current.substring(0, char));

            if (!deleting && char === current.length) {
                pauseTimer = window.setTimeout(() => {
                    deleting = true;
                    type();
                }, 900);
                return;
            }

            if (deleting && char === 0) {
                deleting = false;
                i = (i + 1) % texts.length;
            }

            typingTimer = window.setTimeout(type, deleting ? 40 : 70);
        }

        type();

        return () => {
            isCancelled = true;
            window.clearTimeout(typingTimer);
            window.clearTimeout(pauseTimer);
        };
    }, [hidden, texts]);

    useEffect(() => {
        if (hidden) {
            document.body.dataset.splash = "done";
            return undefined;
        }

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;

        document.body.dataset.splash = "active";
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        window.dispatchEvent(new Event("viewport:change"));

        const leaveTimer = window.setTimeout(() => {
            setIsLeaving(true);
        }, 2200);

        const timer = window.setTimeout(() => {
            document.body.dataset.splash = "done";
            window.sessionStorage.setItem(SPLASH_DONE_KEY, "1");
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            window.dispatchEvent(new Event("viewport:change"));
            window.dispatchEvent(new Event("splashscreen:complete"));
            setHidden(true);
        }, 2850);

        return () => {
            window.clearTimeout(leaveTimer);
            window.clearTimeout(timer);

            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;

            if (document.body.dataset.splash !== "done") {
                delete document.body.dataset.splash;
            }
        };
    }, [hidden]);

    if (hidden) return null;

    return (
        <div className={`splash ${isLeaving ? "is-leaving" : ""}`}>
            <div className="glow-bg"></div>

            <div className="particles">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i}></span>
                ))}
            </div>

            <div className="content">
                <h1 className="title">{PROFILE.firstName} Portfolio</h1>
                <p className="subtitle">{PROFILE.splashRole}</p>

                <div className="spinner">
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                </div>

                <p className="typing">{text}</p>
            </div>
        </div>
    );
}
