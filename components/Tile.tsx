import React from 'react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useTabs } from '../hooks/useTabs';
import { useTheme } from '../hooks/useTheme';

// Helper to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        return `rgba(0,0,0,${alpha})`; // Default color if hex is invalid
    }
    let c: any = hex.substring(1).split('');
    if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${alpha})`;
}

interface TileProps {
  title: string;
  icon: ReactNode;
  path: string;
  color: string;
  size?: 'normal' | 'wide';
}

export const Tile: React.FC<TileProps> = ({ title, icon, path, color, size = 'normal' }) => {
  const sizeClasses = {
    normal: 'col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2 aspect-square',
    wide: 'col-span-12 sm:col-span-8 md:col-span-6 xl:col-span-4 aspect-[2/1]',
  };
  
  const { openTab } = useTabs();
  const { theme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openTab({ path, label: title });
  };

  const ringClass = theme === 'glassy-dark' ? 'hover:ring-sky-400/70' : 'hover:ring-white/50';

  const tileStyle: React.CSSProperties = {
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow-lg)',
    backgroundColor: color,
    border: '1px solid transparent', // Prevent layout shift on theme change
  };

  if (theme === 'glassy-dark') {
    tileStyle.backgroundColor = hexToRgba(color, 0.5);
    tileStyle.backdropFilter = 'blur(12px)';
    tileStyle.border = '1px solid rgba(255, 255, 255, 0.1)';
  }

  return (
    <Link 
        to={path} 
        onClick={handleClick}
        className={`group ${sizeClasses[size]} p-4 flex flex-col items-center justify-center text-white transition-all duration-300 ease-in-out hover:scale-[1.03] hover:z-10 ring-2 ring-transparent ${ringClass}`} 
        style={tileStyle}
        aria-label={title}
    >
      <div className="mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <span className="font-semibold text-center text-sm sm:text-base">{title}</span>
    </Link>
  );
};