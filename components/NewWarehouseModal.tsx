import React, { useState, useEffect } from 'react';
import type { Warehouse } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useLocalization } from '../hooks/useLocalization';

interface NewWarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWarehouse: (warehouse: Omit<Warehouse, 'id'>) => void;
}

export const NewWarehouseModal: React.FC<NewWarehouseModalProps> = ({ isOpen, onClose, onAddWarehouse }) => {
  const { theme } = useTheme();
  const { translations } = useLocalization();
  
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [branch, setBranch] = useState('');
  const [type, setType] = useState<Warehouse['type']>('Finished Goods');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form on open
      setName('');
      setLocation('');
      setBranch('');
      setType('Finished Goods');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !branch.trim()) {
      setError('Warehouse name and branch are required.');
      return;
    }
    onAddWarehouse({ name, location, branch, type });
  };

  if (!isOpen) return null;

  const warehouseTypes: Warehouse['type'][] = ['Raw Materials', 'Work-in-Progress', 'Finished Goods', 'QA & Testing'];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-warehouse-title"
    >
      <div
        className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow-lg)] w-full max-w-md border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-xl' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
            <h2 id="add-warehouse-title" className="text-xl font-bold text-[var(--text-primary)]">{translations.add_warehouse}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-[var(--text-secondary)] bg-transparent hover:bg-[var(--background-table-row-hover)] hover:text-[var(--text-primary)] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="warehouse-name" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.warehouse_name}</label>
              <input
                type="text"
                id="warehouse-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow"
                required
              />
            </div>
             <div>
              <label htmlFor="warehouse-branch" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.branch}</label>
              <input
                type="text"
                id="warehouse-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow"
                required
              />
            </div>
            <div>
              <label htmlFor="warehouse-location" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.location}</label>
              <input
                type="text"
                id="warehouse-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow"
              />
            </div>
            <div>
              <label htmlFor="warehouse-type" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.warehouse_type}</label>
              <select
                id="warehouse-type"
                value={type}
                onChange={(e) => setType(e.target.value as Warehouse['type'])}
                className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow"
              >
                {warehouseTypes.map(t => <option key={t} value={t} className="bg-[var(--background-card)] text-[var(--text-primary)]">{t}</option>)}
              </select>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="flex items-center justify-end p-4 space-x-2 rtl:space-x-reverse border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--background-table-header)] border border-[var(--border-color)] rounded-[var(--border-radius)] hover:bg-[var(--background-table-row-hover)] hover:text-[var(--text-primary)] transition-colors"
            >
              {translations.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-[var(--border-radius)] hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 transition-colors disabled:opacity-50"
              disabled={!name.trim() || !branch.trim()}
            >
              {translations.create_warehouse}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};