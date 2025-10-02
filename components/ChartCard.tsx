import React from 'react';
import type { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  const { theme } = useTheme();
  return (
    <div className={`bg-[var(--background-card)] p-6 rounded-[var(--border-radius)] shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300 border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''}`}>
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{title}</h3>
      <div className="w-full h-72 text-[var(--text-secondary)]">
        {children}
      </div>
    </div>
  );
};