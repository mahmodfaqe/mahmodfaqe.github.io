import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TRANSLATIONS } from "./translations";

const STORAGE_KEY = "portfolio:locale";
const LocaleContext = createContext(null);

function readInitialLocale() {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "ku") return saved;
  return "en";
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(readInitialLocale);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale === "ku" ? "ckb" : "en";
    root.dir = locale === "ku" ? "rtl" : "ltr";
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(() => {
    const setLocale = (next) => {
      if (next === "en" || next === "ku") {
        setLocaleState(next);
      }
    };

    const t = TRANSLATIONS[locale] ?? TRANSLATIONS.en;

    return { locale, setLocale, t, isRtl: locale === "ku" };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// Hook colocated with provider (same pattern as AuthContext).
// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
