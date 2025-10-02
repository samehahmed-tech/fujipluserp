import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';

interface PlaceholderPageProps {
    title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
    const { translations } = useLocalization();

    return (
        <PageLayout pageTitle={title}>
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="bg-sky-100 text-sky-500 p-6 rounded-full mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477zM12 9a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{title} - {translations.coming_soon}</h1>
                <p className="text-gray-500 max-w-md">{translations.feature_in_development}</p>
            </div>
        </PageLayout>
    );
};