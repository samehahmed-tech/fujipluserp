
import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, value, icon, footer, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="p-3 bg-sky-100 text-sky-500 rounded-full">
          {icon}
        </div>
      </div>
      {footer && <div className="mt-4 text-xs text-gray-400">{footer}</div>}
    </div>
  );
};
