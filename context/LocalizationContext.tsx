
import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Locale, Direction, LocalizationContextType } from '../types';
import { TRANSLATIONS } from '../constants';

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('ar');
  const [direction, setDirection] = useState<Direction>('rtl');

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    const newDirection = newLocale === 'ar' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newDirection;
  }, []);

  useEffect(() => {
    // Set initial direction
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction]);

  const value = {
    locale,
    direction,
    translations: TRANSLATIONS[locale],
    setLocale,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};
