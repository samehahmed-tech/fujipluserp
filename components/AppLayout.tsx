import React, { useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useLocalization } from '../hooks/useLocalization';
import { NAV_LINKS } from '../constants';
import type { Translation } from '../types';

export const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const location = useLocation();
    const { translations } = useLocalization();

    const getCurrentPageTitle = () => {
        const currentLink = NAV_LINKS.find(link => link.path === location.pathname);
        if (currentLink) {
            return translations[currentLink.labelKey as keyof Translation];
        }
        
        const placeholderTitle = NAV_LINKS.find(link => location.pathname.startsWith(link.path) && link.path !== '/');
        if(placeholderTitle) return translations[placeholderTitle.labelKey as keyof Translation];
        
        return translations.fujiplus_erp;
    };
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header pageTitle={getCurrentPageTitle()} onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};
