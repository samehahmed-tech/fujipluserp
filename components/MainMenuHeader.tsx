import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface MainMenuHeaderProps {
  onAppearanceClick: () => void;
}

export const MainMenuHeader: React.FC<MainMenuHeaderProps> = ({ onAppearanceClick }) => {
  const { locale, setLocale, translations } = useLocalization();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
            <h1 className="text-3xl font-bold text-sky-400">FUJI<span className="text-white">PLUS</span></h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={onAppearanceClick}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={translations.appearance}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </button>
          <button onClick={toggleLocale} className="text-sm font-semibold text-white/80 hover:text-white transition-colors px-2">
            {locale === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
};
