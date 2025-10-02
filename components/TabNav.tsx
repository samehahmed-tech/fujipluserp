import React from 'react';
import { Link } from 'react-router-dom';
import { useTabs } from '../hooks/useTabs';

export const TabNav: React.FC = () => {
  const { openTabs, activeTab, closeTab } = useTabs();

  if (openTabs.length === 0) {
    return null;
  }

  const handleClose = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    closeTab(path);
  };

  return (
    <div className="bg-[var(--background-content)] border-b border-[var(--border-color)] shadow-sm">
      <div className="flex items-center overflow-x-auto whitespace-nowrap">
        {openTabs.map(tab => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`relative flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.path
                ? 'border-[var(--text-accent)] text-[var(--text-accent)] bg-[var(--background-table-row-hover)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-table-row-hover)]'
            }`}
          >
            {tab.label}
            <button
              onClick={(e) => handleClose(e, tab.path)}
              className="ms-3 text-[var(--text-secondary)] opacity-60 hover:opacity-100 hover:text-[var(--text-primary)] hover:bg-[var(--background-table-row-hover)] rounded-full p-0.5"
              aria-label={`Close ${tab.label} tab`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};