import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../hooks/useTheme';
import type { ReactNode } from 'react';

const ReportCard: React.FC<{ title: string; description: string; icon: ReactNode; }> = ({ title, description, icon }) => {
    const { theme } = useTheme();
    return (
        <div className={`bg-[var(--background-card)] p-6 rounded-[var(--border-radius)] shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300 border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''} flex items-start space-x-4 rtl:space-x-reverse`}>
            <div className="flex-shrink-0 p-3 bg-sky-500/10 text-[var(--text-accent)] rounded-lg">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{description}</p>
                 <a href="#" className="text-sm font-semibold text-[var(--text-accent)] hover:underline mt-4 inline-block">View Reports &rarr;</a>
            </div>
        </div>
    );
};

export const Reports: React.FC = () => {
  const { translations } = useLocalization();

  return (
    <PageLayout pageTitle={translations.reports}>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{translations.all_reports}</h2>
            <p className="text-[var(--text-secondary)] mt-1">Select a category to view detailed reports.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReportCard 
                title={translations.inventory_reports}
                description="Analyze stock levels, movement, and valuation."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>}
            />
            <ReportCard 
                title={translations.sales_reports}
                description="Track sales performance, customer trends, and product profitability."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            />
            <ReportCard 
                title={translations.financials}
                description="View financial statements, expense tracking, and profit/loss analysis."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
            />
        </div>
      </div>
    </PageLayout>
  );
};