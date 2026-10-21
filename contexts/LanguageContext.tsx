"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "ID" | "EN";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (id: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ID",
  setLang: () => {},
  toggleLang: () => {},
  t: (id: string) => id,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ID");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sora_lang") as Lang | null;
      if (stored === "ID" || stored === "EN") {
        setLangState(stored);
      }
    } catch {}
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("sora_lang", next);
    } catch {}
  };

  const toggleLang = () => setLang(lang === "ID" ? "EN" : "ID");

  const t = (id: string, en: string) => (lang === "EN" ? en : id);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
