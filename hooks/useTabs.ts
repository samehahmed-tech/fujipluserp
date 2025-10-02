import { useContext } from 'react';
import { TabContext } from '../context/TabContext';
import type { TabContextType } from '../types';

export const useTabs = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabProvider');
  }
  return context;
};