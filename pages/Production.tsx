import React, { useEffect, useState } from 'react';
import { getProductionOrders, getProducts } from '../services/api';
import type { ProductionOrder, Product } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../hooks/useTheme';

const StatusBadge: React.FC<{ status: ProductionOrder['status'] }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';
  switch (status) {
    case 'Completed':
      return <span className={`${baseClasses} bg-green-500/10 text-green-600`}>Completed</span>;
    case 'In Progress':
      return <span className={`${baseClasses} bg-blue-500/10 text-blue-600`}>In Progress</span>;
    case 'Pending':
      return <span className={`${baseClasses} bg-yellow-500/10 text-yellow-600`}>Pending</span>;
    default:
      return null;
  }
};

export const Production: React.FC = () => {
  const { translations } = useLocalization();
  const { theme } = useTheme();
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductionOrders().then(setProductionOrders);
    getProducts().then(products => setProducts(products.filter(p => p.itemType === 'Finished Good')));
  }, []);

  const getProductName = (productId: string) => {
    return products.find(p => p.id === productId)?.name || productId;
  };

  return (
    <PageLayout pageTitle={translations.production_orders}>
      <div className="p-4 sm:p-6">
        <div className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow)] border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''}`}>
          <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{translations.production_orders}</h2>
            <button className="bg-sky-500 text-white px-4 py-2 rounded-[var(--border-radius)] font-semibold hover:bg-sky-600 transition-colors shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              {translations.new_production_order}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-[var(--text-secondary)]">
              <thead className="text-xs text-[var(--text-primary)] uppercase bg-[var(--background-table-header)]">
                <tr>
                  <th scope="col" className="px-6 py-3">Order ID</th>
                  <th scope="col" className="px-6 py-3">{translations.product_name}</th>
                  <th scope="col" className="px-6 py-3">{translations.quantity}</th>
                  <th scope="col" className="px-6 py-3">{translations.date}</th>
                  <th scope="col" className="px-6 py-3">{translations.status}</th>
                  <th scope="col" className="px-6 py-3 text-center">{translations.actions}</th>
                </tr>
              </thead>
              <tbody>
                {productionOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[var(--border-color-light)] hover:bg-[var(--background-table-row-hover)]">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{order.id}</td>
                    <td className="px-6 py-4">{getProductName(order.finishedGoodId)}</td>
                    <td className="px-6 py-4">{order.quantity}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                    <td className="px-6 py-4 text-center">
                      <a href="#" className="font-medium text-[var(--text-accent)] hover:underline">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};