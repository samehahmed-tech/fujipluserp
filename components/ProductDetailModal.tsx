import React, { useEffect } from 'react';
import type { Product, ProductHistory, Warehouse } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useCurrency } from '../hooks/useCurrency';

interface ProductDetailModalProps {
  product: Product | null;
  warehouses: Warehouse[];
  onClose: () => void;
}

const StatusBadge: React.FC<{ status: Product['status'] }> = ({ status }) => {
    const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';
    switch (status) {
      case 'In Stock':
        return <span className={`${baseClasses} bg-green-500/10 text-green-600`}>In Stock</span>;
      case 'Low Stock':
        return <span className={`${baseClasses} bg-yellow-500/10 text-yellow-600`}>Low Stock</span>;
      case 'Out of Stock':
        return <span className={`${baseClasses} bg-red-500/10 text-red-600`}>Out of Stock</span>;
      default:
        return null;
    }
};

const HistoryEvent: React.FC<{ item: ProductHistory }> = ({ item }) => {
    const isPositive = ['Purchase', 'Transfer In', 'Production'].includes(item.event);
    const quantityColor = isPositive ? 'text-green-600' : 'text-red-600';
    const quantitySign = isPositive ? '+' : '';
    return (
        <tr className="border-b border-[var(--border-color-light)]">
            <td className="p-3 text-sm text-[var(--text-secondary)]">{item.date}</td>
            <td className="p-3 text-sm text-[var(--text-secondary)]">{item.event}</td>
            <td className={`p-3 text-sm font-mono ${quantityColor}`}>{quantitySign}{item.quantity}</td>
            <td className="p-3 text-sm text-[var(--text-secondary)] opacity-80">{item.notes}</td>
        </tr>
    );
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, warehouses, onClose }) => {
  const { theme } = useTheme();
  const { formatCurrency } = useCurrency();

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

  if (!product) return null;

  const getTotalStock = (stock: { [warehouseId: string]: { available: number, reserved: number } }) => {
    return Object.values(stock).reduce((sum, current) => sum + current.available, 0);
  }

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
    >
      <div 
        className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow-lg)] w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-scale ${theme === 'glassy-dark' ? 'backdrop-blur-xl border border-white/10' : ''}`}
        onClick={e => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)] rounded-t-[var(--border-radius)] bg-[var(--background-table-header)]">
          <h2 id="product-detail-title" className="text-xl font-bold text-[var(--text-primary)]">{product.name}</h2>
          <button 
            onClick={onClose} 
            className="text-[var(--text-secondary)] bg-transparent hover:bg-[var(--background-table-row-hover)] hover:text-[var(--text-primary)] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        <div>
                            <div className="text-[var(--text-secondary)] font-semibold">SKU</div>
                            <div className="text-[var(--text-primary)]">{product.sku}</div>
                        </div>
                        <div>
                            <div className="text-[var(--text-secondary)] font-semibold">Category</div>
                            <div className="text-[var(--text-primary)]">{product.category}</div>
                        </div>
                        <div>
                            <div className="text-[var(--text-secondary)] font-semibold">Item Type</div>
                            <div className="text-[var(--text-primary)] font-medium">{product.itemType}</div>
                        </div>
                        <div>
                            <div className="text-[var(--text-secondary)] font-semibold">Price</div>
                            <div className="text-[var(--text-primary)] font-bold text-lg">{formatCurrency(product.price)}</div>
                        </div>
                        <div>
                            <div className="text-[var(--text-secondary)] font-semibold">Total Stock</div>
                            <div className="text-[var(--text-primary)] font-bold text-lg">{getTotalStock(product.stock)}</div>
                        </div>
                        <div>
                            <div className="text-[var(--text-secondary)] font-semibold">Status</div>
                            <div><StatusBadge status={product.status}/></div>
                        </div>
                    </div>

                    {/* History Section */}
                    <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Product History</h3>
                        <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
                            <div className="max-h-60 overflow-y-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[var(--background-table-header)] sticky top-0">
                                        <tr>
                                            <th className="p-3 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">Date</th>
                                            <th className="p-3 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">Event</th>
                                            <th className="p-3 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">Quantity</th>
                                            <th className="p-3 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-transparent">
                                        {product.history.length > 0 ? (
                                            product.history.map((item, index) => <HistoryEvent key={index} item={item} />)
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center p-4 text-[var(--text-secondary)]">No history available.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1">
                     <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Stock by Warehouse</h3>
                     <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
                         <table className="w-full text-left">
                             <thead className="bg-[var(--background-table-header)]">
                                 <tr>
                                    <th className="p-3 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">Warehouse</th>
                                    <th className="p-3 text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider text-right">Quantity</th>
                                 </tr>
                             </thead>
                             <tbody className="bg-transparent divide-y divide-[var(--border-color-light)]">
                                 {warehouses.map(wh => (
                                     <tr key={wh.id}>
                                         <td className="p-3 text-sm text-[var(--text-secondary)]">{wh.name}</td>
                                         <td className="p-3 text-sm text-[var(--text-primary)] font-mono text-right">{product.stock[wh.id]?.available || 0}</td>
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                     </div>
                </div>
            </div>
        </div>
      </div>
       <style>{`
            @keyframes fadeInScale {
                from {
                    transform: scale(0.95);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            .animate-fade-in-scale {
                animation: fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
        `}</style>
    </div>
  );
};