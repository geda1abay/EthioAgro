import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage } from '../types';
import { translations, getTranslation } from '../utils/translations';

const isSupportedLanguage = (value: string | null): value is SupportedLanguage =>
  value === 'en' || value === 'om' || value === 'am';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (typeof translations)['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const saved = window.localStorage.getItem('agroai_lang');
    return isSupportedLanguage(saved) ? saved : 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('agroai_lang', lang);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
