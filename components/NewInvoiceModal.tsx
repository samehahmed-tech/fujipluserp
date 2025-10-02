import React, { useState, useEffect } from 'react';
import type { Sale } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useLocalization } from '../hooks/useLocalization';

export interface InvoiceFormData {
  customer: string;
  date: string;
  total: number;
  status: Sale['status'];
}

interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoiceData: InvoiceFormData) => void;
}

export const NewInvoiceModal: React.FC<NewInvoiceModalProps> = ({ isOpen, onClose, onSave }) => {
  const { theme } = useTheme();
  const { translations } = useLocalization();
  
  const [formData, setFormData] = useState<InvoiceFormData>({
    customer: '',
    date: new Date().toISOString().split('T')[0],
    total: 0,
    status: 'Pending',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form on open
      setFormData({
        customer: '',
        date: new Date().toISOString().split('T')[0],
        total: 0,
        status: 'Pending',
      });
      setError('');
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'total' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer.trim() || formData.total <= 0) {
      setError('Customer name and a valid total amount are required.');
      return;
    }
    onSave(formData);
  };

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

  if (!isOpen) return null;

  const saleStatuses: Sale['status'][] = ['Paid', 'Pending', 'Overdue'];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-invoice-title"
    >
      <div
        className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow-lg)] w-full max-w-md border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-xl' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
            <h2 id="add-invoice-title" className="text-xl font-bold text-[var(--text-primary)]">{translations.add_invoice}</h2>
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
              <label htmlFor="invoice-customer" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.customer}</label>
              <input
                type="text"
                id="invoice-customer"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow"
                required
              />
            </div>
             <div>
              <label htmlFor="invoice-date" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.date}</label>
              <input
                type="date"
                id="invoice-date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow"
                required
              />
            </div>
            <div>
              <label htmlFor="invoice-total" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.total_amount}</label>
              <input
                type="number"
                id="invoice-total"
                name="total"
                value={formData.total}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="invoice-status" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.status}</label>
              <select
                id="invoice-status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow"
              >
                {saleStatuses.map(s => <option key={s} value={s} className="bg-[var(--background-card)] text-[var(--text-primary)]">{s}</option>)}
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
              disabled={!formData.customer.trim() || formData.total <= 0}
            >
              {translations.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};