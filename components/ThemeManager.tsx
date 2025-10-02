import React, { useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { PRESELECTED_WALLPAPERS } from '../constants';
import type { ThemeName } from '../types';
import { useLocalization } from '../hooks/useLocalization';

interface ThemeManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemePreview: React.FC<{ colors: [string, string, string] }> = ({ colors }) => (
  <div className="w-full h-16 rounded-lg overflow-hidden flex shadow-inner">
    <div style={{ backgroundColor: colors[0] }} className="w-2/5 h-full"></div>
    <div style={{ backgroundColor: colors[1] }} className="w-3/5 h-full flex items-center justify-end p-2">
       <div style={{ backgroundColor: colors[2] }} className="w-5 h-5 rounded-full"></div>
    </div>
  </div>
);

export const ThemeManager: React.FC<ThemeManagerProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, wallpaper, setWallpaper } = useTheme();
  const { translations } = useLocalization();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleWallpaperUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setWallpaper(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const themes: { name: ThemeName; labelKey: keyof typeof translations; colors: [string, string, string] }[] = [
    { name: 'modern', labelKey: 'modern', colors: ['#f9fafb', '#ffffff', '#0284c7'] },
    { name: 'fluent', labelKey: 'fluent', colors: ['#f8f9fa', '#ffffff', '#0078d4'] },
    { name: 'glassy-dark', labelKey: 'glassy_dark', colors: ['#111827', '#1f2937', '#38bdf8'] },
    { name: 'nordic-light', labelKey: 'nordic_light', colors: ['#f2f4f8', '#ffffff', '#5a67d8'] },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow-lg)] w-full max-w-lg m-4 border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-xl' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{translations.appearance}</h3>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-full hover:bg-[var(--background-table-row-hover)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          <div>
            <h4 className="text-md font-semibold text-[var(--text-primary)] mb-4">{translations.theme}</h4>
            <div className="grid grid-cols-2 gap-4">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name)}
                  className={`p-3 text-sm font-semibold rounded-lg transition-all border-2 ${
                    theme === t.name
                      ? 'border-sky-500 ring-2 ring-sky-500/20'
                      : 'border-transparent bg-[var(--background-table-header)] hover:border-sky-500/50'
                  }`}
                >
                  <ThemePreview colors={t.colors} />
                  <span className="mt-3 block text-center text-[var(--text-primary)]">{translations[t.labelKey]}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold text-[var(--text-primary)] mb-4">{translations.wallpaper}</h4>
            <div className="grid grid-cols-2 gap-4">
              {PRESELECTED_WALLPAPERS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  className={`relative aspect-video rounded-lg overflow-hidden transition-all group ring-2 ${
                    wallpaper === wp.id ? 'ring-sky-500 ring-offset-2 ring-offset-[var(--background-card)]' : 'ring-transparent hover:ring-sky-500/50'
                  }`}
                >
                  <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                  {wp.id === 'default' && <div className="absolute inset-0 bg-gray-200" />}
                   {wallpaper === wp.id && (
                       <div className="absolute inset-0 bg-sky-500/50 flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                       </div>
                   )}
                </button>
              ))}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video rounded-lg flex flex-col items-center justify-center bg-[var(--background-table-header)] border-2 border-dashed border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--text-accent)] hover:text-[var(--text-accent)] transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-sm font-semibold">{translations.upload_wallpaper}</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleWallpaperUpload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};