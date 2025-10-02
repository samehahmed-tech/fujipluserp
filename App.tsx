
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LocalizationProvider } from './context/LocalizationContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Sales } from './pages/Sales';
import { NotFound } from './pages/NotFound';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { useLocalization } from './hooks/useLocalization';
import { NAV_LINKS } from './constants';
import type { Translation } from './types';

const PageTitleManager: React.FC = () => {
    const location = useLocation();
    const { translations } = useLocalization();

    const getCurrentPageTitle = () => {
        const currentLink = NAV_LINKS.find(link => link.path === location.pathname);
        if (currentLink) {
            return translations[currentLink.labelKey as keyof Translation];
        }
        if (location.pathname === '/') return translations.dashboard;
        
        // Find title for placeholder pages
        const placeholderTitle = NAV_LINKS.find(link => location.pathname.startsWith(link.path) && link.path !== '/');
        if(placeholderTitle) return translations[placeholderTitle.labelKey as keyof Translation];
        
        return 'Fujiplus ERP';
    };
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header pageTitle={getCurrentPageTitle()} onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/sales" element={<Sales />} />
                        <Route path="/purchasing" element={<PlaceholderPage title={translations.purchasing} />} />
                        <Route path="/manufacturing" element={<PlaceholderPage title={translations.manufacturing} />} />
                        <Route path="/reports" element={<PlaceholderPage title={translations.reports} />} />
                        <Route path="/settings" element={<PlaceholderPage title={translations.settings} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  return (
    <LocalizationProvider>
      <HashRouter>
          <PageTitleManager />
      </HashRouter>
    </LocalizationProvider>
  );
};

export default App;
