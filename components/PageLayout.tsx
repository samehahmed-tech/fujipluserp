import React, { ReactNode } from 'react';
import { Header } from './Header';
import { TabNav } from './TabNav';
import { useTheme } from '../hooks/useTheme';

interface PageLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, pageTitle }) => {
    const { theme, wallpaperUrl } = useTheme();

    return (
        <div 
            className="w-full min-h-screen bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: `url(${wallpaperUrl})`}}
        >
          <div id="fluent-texture-wrapper" className="w-full min-h-screen">
            <div className="flex flex-col h-screen overflow-hidden">
                <div className={`flex-shrink-0 z-10 bg-[var(--background-header)] ${theme === 'glassy-dark' ? 'backdrop-blur-md' : ''}`}>
                    <Header pageTitle={pageTitle} />
                    <TabNav />
                </div>
                <main className="flex-1 overflow-y-auto bg-[var(--background-page)]">
                    {children}
                </main>
            </div>
          </div>
        </div>
    );
};