import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';

export const NotFound: React.FC = () => {
  const { translations } = useLocalization();

  return (
    <PageLayout pageTitle={translations.page_not_found}>
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <h1 className="text-9xl font-black text-sky-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">{translations.page_not_found}</h2>
        <p className="text-gray-500 mt-2 mb-6">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors shadow-sm"
        >
          {translations.go_home}
        </Link>
      </div>
    </PageLayout>
  );
};