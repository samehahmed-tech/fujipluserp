import React, { useEffect, useState, useMemo } from 'react';
import { getProducts, getWarehouses } from '../services/api';
import type { Product, Warehouse } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { useTheme } from '../hooks/useTheme';
import { useCurrency } from '../hooks/useCurrency';
import { ProductModal } from '../components/ProductModal';
import type { ProductFormData } from '../components/ProductModal';

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

const SortIndicator: React.FC<{ direction: 'ascending' | 'descending' | null }> = ({ direction }) => {
    if (!direction) {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ms-1 text-[var(--text-secondary)] opacity-40 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>;
    }
    if (direction === 'ascending') {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ms-1 text-[var(--text-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>;
    }
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ms-1 text-[var(--text-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
}

const getTotalStock = (stock: { [warehouseId: string]: { available: number, reserved: number } }) => {
    return Object.values(stock).reduce((sum, current) => sum + current.available, 0);
}

export const Inventory: React.FC = () => {
  const { translations } = useLocalization();
  const { theme } = useTheme();
  const { formatCurrency } = useCurrency();
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'stock' | 'price'; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
    getWarehouses().then(setWarehouses);
  }, []);
  
  const requestSort = (key: 'name' | 'stock' | 'price') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleAddProduct = (formData: ProductFormData) => {
    const totalStock = Object.values(formData.stock).reduce((sum, qty) => sum + qty, 0);

    const newProduct: Product = {
        id: `prod-${new Date().getTime()}`,
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        itemType: formData.itemType,
        price: formData.price,
        stock: Object.entries(formData.stock).reduce((acc, [whId, qty]) => {
            acc[whId] = { available: qty, reserved: 0 };
            return acc;
        }, {} as Product['stock']),
        status: totalStock > 10 ? 'In Stock' : totalStock > 0 ? 'Low Stock' : 'Out of Stock',
        history: [{
            date: new Date().toISOString().split('T')[0],
            event: 'Adjustment',
            quantity: totalStock,
            notes: 'Initial stock added'
        }],
        itemCode: formData.sku,
        unit: 'PCS',
        avgPurchasePrice: 0,
        lastPurchasePrice: 0,
        barcode: `BC-${Math.floor(Math.random() * 1000000)}`,
        classification: formData.category,
    };

    setProducts(prev => [newProduct, ...prev]);
    setIsProductModalOpen(false);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        let valA, valB;
        if (sortConfig.key === 'stock') {
            valA = getTotalStock(a.stock);
            valB = getTotalStock(b.stock);
        } else {
            valA = a[sortConfig.key];
            valB = b[sortConfig.key];
        }
        
        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [products, searchTerm, sortConfig]);

  return (
    <PageLayout pageTitle={translations.inventory}>
      <div className="p-4 sm:p-6">
        <div className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow)] border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''}`}>
          <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder={translations.search_products}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow ps-10 pe-10"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute start-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              {searchTerm && (
                  <button
                  onClick={() => setSearchTerm('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  aria-label="Clear search"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  </button>
              )}
            </div>
            <button
              onClick={() => setIsProductModalOpen(true)}
              className="w-full sm:w-auto bg-sky-500 text-white px-4 py-2 rounded-[var(--border-radius)] font-semibold hover:bg-sky-600 transition-colors shadow-sm flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              {translations.add_product}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-[var(--text-secondary)]">
              <thead className="text-xs text-[var(--text-primary)] uppercase bg-[var(--background-table-header)]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <button onClick={() => requestSort('name')} className="group flex items-center w-full text-left">
                      {translations.product_name}
                      <SortIndicator direction={sortConfig?.key === 'name' ? sortConfig.direction : null} />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">{translations.sku}</th>
                  <th scope="col" className="px-6 py-3">{translations.category}</th>
                  <th scope="col" className="px-6 py-3">
                    <button onClick={() => requestSort('stock')} className="group flex items-center w-full text-left">
                      {translations.stock}
                      <SortIndicator direction={sortConfig?.key === 'stock' ? sortConfig.direction : null} />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <button onClick={() => requestSort('price')} className="group flex items-center w-full text-left">
                      {translations.price}
                      <SortIndicator direction={sortConfig?.key === 'price' ? sortConfig.direction : null} />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">{translations.status}</th>
                  <th scope="col" className="px-6 py-3 text-center">{translations.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[var(--border-color-light)] hover:bg-[var(--background-table-row-hover)]">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)] whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4">{product.sku}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 font-semibold">{getTotalStock(product.stock)}</td>
                    <td className="px-6 py-4">{formatCurrency(product.price)}</td>
                    <td className="px-6 py-4"><StatusBadge status={product.status} /></td>
                    <td className="px-6 py-4 text-center">
                       <button onClick={() => setSelectedProduct(product)} className="font-medium text-[var(--text-accent)] hover:underline">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedProduct && <ProductDetailModal product={selectedProduct} warehouses={warehouses} onClose={() => setSelectedProduct(null)} />}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleAddProduct}
        warehouses={warehouses}
      />
    </PageLayout>
  );
};