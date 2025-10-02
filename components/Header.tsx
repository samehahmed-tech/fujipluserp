
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface HeaderProps {
  pageTitle: string;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ pageTitle, onMenuClick }) => {
  const { locale, setLocale } = useLocalization();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 w-full border-b border-gray-200">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6">
        <div className="flex items-center">
            <button
                onClick={onMenuClick}
                className="lg:hidden text-gray-500 hover:text-gray-700 me-4"
                aria-label="Open sidebar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleLocale} className="text-sm font-semibold text-gray-600 hover:text-sky-500 transition-colors">
            {locale === 'en' ? 'العربية' : 'English'}
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
             <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};
