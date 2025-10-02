import React, { useState } from 'react';
import { Tile } from '../components/Tile';
import { useLocalization } from '../hooks/useLocalization';
import { TILES_CONFIG } from '../constants';
import type { TileConfig } from '../types';
import { useTheme } from '../hooks/useTheme';
import { ThemeManager } from '../components/ThemeManager';
import { MainMenuHeader } from '../components/MainMenuHeader';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const { wallpaperUrl, theme } = useTheme();
    
    return (
        <div 
            id="fluent-texture-wrapper"
            className="min-h-screen w-full bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: `url(${wallpaperUrl})`}}
        >
            <div className="min-h-screen w-full bg-black/30">
                {children}
            </div>
        </div>
    );
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-white/90 mb-4 px-4 sm:px-0 tracking-wide backdrop-blur-sm bg-black/10 rounded-lg inline-block py-1">{title}</h2>
    <div className="grid grid-cols-12 gap-4">
      {children}
    </div>
  </div>
);

export const MainMenu: React.FC = () => {
  const { translations } = useLocalization();
  const [isThemeManagerOpen, setIsThemeManagerOpen] = useState(false);
  
  const renderTiles = (group: string) => {
      return TILES_CONFIG[group].map((tile: TileConfig) => (
          <Tile
              key={tile.path + tile.labelKey}
              title={translations[tile.labelKey]}
              icon={tile.icon}
              path={tile.path}
              color={tile.color}
              size={tile.size}
          />
      ));
  };

  return (
    <PageWrapper>
       <MainMenuHeader onAppearanceClick={() => setIsThemeManagerOpen(true)} />
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <main>
                <Section title={translations.main_operations}>
                    {renderTiles('main')}
                </Section>
                
                <Section title={translations.manufacturing_logistics}>
                    {renderTiles('manufacturing_logistics')}
                </Section>

                <Section title={translations.quick_actions}>
                    {renderTiles('actions')}
                </Section>

                <Section title={translations.documents}>
                    {renderTiles('documents')}
                </Section>
           </main>
       </div>
       <ThemeManager isOpen={isThemeManagerOpen} onClose={() => setIsThemeManagerOpen(false)} />
    </PageWrapper>
  );
};