import React, { createContext, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Tab, TabContextType } from '../types';

export const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  const activeTab = location.pathname;

  const openTab = (tab: Tab) => {
    // If tab is not already open, add it
    if (!openTabs.some(t => t.path === tab.path)) {
      setOpenTabs(prevTabs => [...prevTabs, tab]);
    }
    // Navigate to the tab's path
    navigate(tab.path);
  };

  const closeTab = (path: string) => {
    const tabIndex = openTabs.findIndex(t => t.path === path);
    if (tabIndex === -1) return;

    const newTabs = openTabs.filter(t => t.path !== path);
    setOpenTabs(newTabs);

    // If the closed tab was the active one, navigate to a different tab
    if (activeTab === path) {
      if (newTabs.length > 0) {
        // Navigate to the previous tab, or the first tab if the closed one was the first
        const newActiveIndex = Math.max(0, tabIndex - 1);
        navigate(newTabs[newActiveIndex].path);
      } else {
        // If no tabs are left, go to the main menu
        navigate('/');
      }
    }
  };

  const value = {
    openTabs,
    activeTab,
    openTab,
    closeTab,
  };

  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  );
};