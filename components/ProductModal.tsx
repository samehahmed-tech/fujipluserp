import React, { useState, useEffect } from 'react';
import type { Product, Warehouse } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useLocalization } from '../hooks/useLocalization';

// Simplified Product data for the form
export interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  price: number;
  itemType: Product['itemType'];
  stock: { [warehouseId: string]: number };
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: ProductFormData) => void;
  warehouses: Warehouse[];
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, warehouses }) => {
  const { theme } = useTheme();
  const { translations } = useLocalization();

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    category: '',
    price: 0,
    itemType: 'Finished Good',
    stock: {},
  });
  const [error, setError] = useState('');
  
  // Initialize stock levels when warehouses are loaded or modal opens
  useEffect(() => {
    if (isOpen) {
        const initialStock = warehouses.reduce((acc, wh) => {
            acc[wh.id] = 0;
            return acc;
        }, {} as { [warehouseId: string]: number });

        setFormData({
            name: '',
            sku: '',
            category: '',
            price: 0,
            itemType: 'Finished Good',
            stock: initialStock,
        });
        setError('');
    }
  }, [isOpen, warehouses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
  };
  
  const handleStockChange = (warehouseId: string, value: string) => {
    setFormData(prev => ({
        ...prev,
        stock: {
            ...prev.stock,
            [warehouseId]: parseInt(value, 10) || 0,
        },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim() || !formData.category.trim()) {
      setError('Name, SKU, and Category are required.');
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

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-product-title"
    >
      <div
        className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow-lg)] w-full max-w-2xl border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-xl' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
            <h2 id="add-product-title" className="text-xl font-bold text-[var(--text-primary)]">{translations.add_new_product}</h2>
            <button type="button" onClick={onClose} className="text-[var(--text-secondary)] bg-transparent hover:bg-[var(--background-table-row-hover)] hover:text-[var(--text-primary)] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" aria-label="Close modal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
             <h3 className="text-lg font-semibold text-[var(--text-secondary)]">{translations.product_details}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="product-name" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.product_name}</label>
                    <input type="text" id="product-name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--text-accent)]" required />
                </div>
                <div>
                    <label htmlFor="product-sku" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.sku}</label>
                    <input type="text" id="product-sku" name="sku" value={formData.sku} onChange={handleInputChange} className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--text-accent)]" required />
                </div>
                 <div>
                    <label htmlFor="product-category" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.category}</label>
                    <input type="text" id="product-category" name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--text-accent)]" required />
                </div>
                <div>
                    <label htmlFor="product-price" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.price}</label>
                    <input type="number" id="product-price" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--text-accent)]" min="0" step="0.01" />
                </div>
                <div>
                    <label htmlFor="product-itemType" className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{translations.item_type}</label>
                    <select id="product-itemType" name="itemType" value={formData.itemType} onChange={handleInputChange} className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--text-accent)]">
                        <option value="Finished Good" className="bg-[var(--background-card)] text-[var(--text-primary)]">{translations.finished_goods}</option>
                        <option value="Raw Material" className="bg-[var(--background-card)] text-[var(--text-primary)]">{translations.raw_materials}</option>
                    </select>
                </div>
             </div>
             
             <hr className="border-[var(--border-color)]" />
             
             <h3 className="text-lg font-semibold text-[var(--text-secondary)]">{translations.initial_stock_levels}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {warehouses.map(wh => (
                    <div key={wh.id}>
                        <label htmlFor={`stock-${wh.id}`} className="block mb-2 text-sm font-medium text-[var(--text-primary)]">{wh.name}</label>
                        <input type="number" id={`stock-${wh.id}`} value={formData.stock[wh.id] || 0} onChange={(e) => handleStockChange(wh.id, e.target.value)} className="w-full px-3 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--text-accent)]" min="0" />
                    </div>
                 ))}
             </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="flex items-center justify-end p-4 space-x-2 rtl:space-x-reverse border-t border-[var(--border-color)]">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--background-table-header)] border border-[var(--border-color)] rounded-md hover:bg-[var(--background-table-row-hover)] hover:text-[var(--text-primary)] transition-colors">
              {translations.cancel}
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 transition-colors disabled:opacity-50">
              {translations.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};