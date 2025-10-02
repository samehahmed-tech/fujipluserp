
import React from 'react';
import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <div className="w-full h-72">
        {children}
      </div>
    </div>
  );
};
