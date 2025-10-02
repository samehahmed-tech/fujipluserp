import React from 'react';
import type { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';

interface CardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, value, icon, footer, className = '' }) => {
  const { theme } = useTheme();
  return (
    <div className={`bg-[var(--background-card)] p-6 rounded-[var(--border-radius)] shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300 border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''} ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)]">{title}</p>
          <p className="text-3xl font-bold text-[var(--text-primary)]">{value}</p>
        </div>
        <div className="p-3 bg-sky-500/10 text-[var(--text-accent)] rounded-full">
          {icon}
        </div>
      </div>
      {footer && <div className="mt-4 text-xs text-[var(--text-secondary)] opacity-70">{footer}</div>}
    </div>
  );
};