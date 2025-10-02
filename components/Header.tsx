import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '../hooks/useLocalization';
import { useTheme } from '../hooks/useTheme';
import { ThemeManager } from './ThemeManager';

interface HeaderProps {
  pageTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const { locale, setLocale, direction, translations } = useLocalization();
  const { theme } = useTheme();
  const [isThemeManagerOpen, setIsThemeManagerOpen] = useState(false);

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  const backIcon = direction === 'rtl' 
    ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg> 
    : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>;

  return (
    <>
    <header className={`bg-[var(--background-header)] sticky top-0 z-20 w-full border-b border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-md' : ''}`}>
      <div className="flex items-center justify-between h-20 px-4 sm:px-6">
        <div className="flex items-center">
            <Link
                to="/"
                className="text-[var(--text-secondary)] hover:text-[var(--text-accent)] me-4 p-2 rounded-full hover:bg-[var(--background-table-row-hover)]"
                aria-label="Go back to main menu"
            >
                {backIcon}
            </Link>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">{pageTitle}</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={() => setIsThemeManagerOpen(true)}
            className="text-[var(--text-secondary)] hover:text-[var(--text-accent)] p-2 rounded-full hover:bg-[var(--background-table-row-hover)] transition-colors"
            aria-label={translations.appearance}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </button>
          <button onClick={toggleLocale} className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-colors px-2">
            {locale === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>
    </header>
    <ThemeManager isOpen={isThemeManagerOpen} onClose={() => setIsThemeManagerOpen(false)} />
    </>
  );
};
