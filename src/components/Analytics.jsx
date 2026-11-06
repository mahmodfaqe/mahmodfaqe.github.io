import { useEffect } from "react";

/** Loads Plausible only when VITE_PLAUSIBLE_DOMAIN is set. */
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
