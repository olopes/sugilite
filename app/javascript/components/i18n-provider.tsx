export { useTranslation } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import i18n from "@/lib/i18n";

type Language = "system" | string;

type LanguageProviderProps = {
  children: ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  availableLanguages: Record<string, string> | null;
};

const initialState: LanguageProviderState = {
  language: "system",
  setLanguage: () => null,
  availableLanguages: null,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "system",
  storageKey = "sugilite-ui-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );
  const [availableLanguages, setAvailableLanguages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    fetch("/locales")
      .then((resp) => resp.json())
      .then(setAvailableLanguages);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (language === "system") {
      // TODO Use browser detection
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    } else {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, language);
      setLanguage(language);
    },
    availableLanguages,
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProviderContext.Provider {...props} value={value}>
        {children}
      </LanguageProviderContext.Provider>
    </I18nextProvider>
  );
}

export const useLanguageContext = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined) throw new Error("useLanguageContext must be used within a LanguageProvider");

  return context;
};
