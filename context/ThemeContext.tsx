import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { ThemeContextType, ThemeName, Wallpaper } from '../types';
import { PRESELECTED_WALLPAPERS } from '../constants';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeName>(() => {
        return (localStorage.getItem('theme') as ThemeName) || 'modern';
    });

    const [wallpaper, setWallpaperState] = useState<string>(() => {
        return localStorage.getItem('wallpaper') || PRESELECTED_WALLPAPERS[0].id;
    });

    const [wallpaperUrl, setWallpaperUrl] = useState<string>('');
    
    useEffect(() => {
        const themeFromStorage = localStorage.getItem('theme') as ThemeName;
        if (themeFromStorage) {
            setThemeState(themeFromStorage);
        }
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    useEffect(() => {
        const wallpaperFromStorage = localStorage.getItem('wallpaper');
        if (wallpaperFromStorage) {
            setWallpaperState(wallpaperFromStorage);
        }
    }, []);

    useEffect(() => {
        if (wallpaper.startsWith('data:image')) {
            setWallpaperUrl(wallpaper);
        } else {
            const preselected = PRESELECTED_WALLPAPERS.find(w => w.id === wallpaper);
            setWallpaperUrl(preselected ? preselected.url : PRESELECTED_WALLPAPERS[0].url);
        }
    }, [wallpaper]);

    const setTheme = (newTheme: ThemeName) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const setWallpaper = (newWallpaper: string) => {
        setWallpaperState(newWallpaper);
        localStorage.setItem('wallpaper', newWallpaper);
    };

    const value = {
        theme,
        setTheme,
        wallpaper,
        setWallpaper,
        wallpaperUrl,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};