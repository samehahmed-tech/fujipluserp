import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../hooks/useTheme';
import type { ReactNode } from 'react';

const SettingsSection: React.FC<{ title: string; description: string; children: ReactNode }> = ({ title, description, children }) => {
    const { theme } = useTheme();
    return (
        <div className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow)] border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''} overflow-hidden`}>
            <div className="p-6 border-b border-[var(--border-color)]">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{description}</p>
            </div>
            <div className="p-6 space-y-4">
                {children}
            </div>
        </div>
    );
}

const SettingRow: React.FC<{ label: string; children: ReactNode }> = ({ label, children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <label className="text-sm font-semibold text-[var(--text-primary)]">{label}</label>
            <div className="md:col-span-2">
                {children}
            </div>
        </div>
    )
}

export const Settings: React.FC = () => {
  const { translations } = useLocalization();

  return (
    <PageLayout pageTitle={translations.settings}>
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-8">
        
        <SettingsSection title={translations.company_profile} description="Manage your company's information.">
            <SettingRow label="Company Name">
                <input type="text" defaultValue="Fujiplus Inc." className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--text-accent)]" />
            </SettingRow>
            <SettingRow label="Contact Email">
                <input type="email" defaultValue="contact@fujiplus.com" className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--text-accent)]" />
            </SettingRow>
        </SettingsSection>

        <SettingsSection title={translations.user_management} description="Add, remove, and manage users.">
             <div className="flex justify-between items-center">
                <p className="text-sm text-[var(--text-secondary)]">You have 3 users on your plan.</p>
                <button className="bg-sky-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-sky-600 text-sm">Invite User</button>
             </div>
        </SettingsSection>
        
        <SettingsSection title={translations.financial_settings} description="Configure currency and tax settings.">
             <SettingRow label="Base Currency">
                <select className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--text-accent)]">
                    <option>AED - UAE Dirham</option>
                    <option>USD - US Dollar</option>
                </select>
            </SettingRow>
        </SettingsSection>

      </div>
    </PageLayout>
  );
};