import { useEffect } from "react";

/**
 * Optional privacy-friendly analytics.
 * Set VITE_PLAUSIBLE_DOMAIN (e.g. mahmodfaqe.github.io) to enable Plausible.
 * Nothing loads when the env var is empty.
 */
export default function Analytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim();
    if (!domain || document.querySelector("script[data-portfolio-analytics]")) {
      return undefined;
    }

    const script = document.createElement("script");
    script.defer = true;
    script.dataset.portfolioAnalytics = "plausible";
    script.dataset.domain = domain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
