import React, { useEffect, useState } from 'react';
import { getInventoryTransfers, getWarehouses, getProducts } from '../services/api';
import type { InventoryTransfer, Warehouse, Product } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../hooks/useTheme';

const StatusBadge: React.FC<{ status: InventoryTransfer['status'] }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';
  switch (status) {
    case 'Completed':
      return <span className={`${baseClasses} bg-green-500/10 text-green-600`}>Completed</span>;
    case 'In Transit':
      return <span className={`${baseClasses} bg-blue-500/10 text-blue-600`}>In Transit</span>;
    default:
      return null;
  }
};

export const InventoryTransfers: React.FC = () => {
  const { translations } = useLocalization();
  const { theme } = useTheme();
  const [transfers, setTransfers] = useState<InventoryTransfer[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getInventoryTransfers().then(setTransfers);
    getWarehouses().then(setWarehouses);
    getProducts().then(setProducts);
  }, []);

  const getWarehouseName = (warehouseId: string) => warehouses.find(w => w.id === warehouseId)?.name || warehouseId;
  const getProductName = (productId: string) => products.find(p => p.id === productId)?.name || productId;

  return (
    <PageLayout pageTitle={translations.inventory_transfers}>
      <div className="p-4 sm:p-6">
        <div className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow)] border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''}`}>
          <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{translations.inventory_transfers}</h2>
            <button className="bg-sky-500 text-white px-4 py-2 rounded-[var(--border-radius)] font-semibold hover:bg-sky-600 transition-colors shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              {translations.new_inventory_transfer}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-[var(--text-secondary)]">
              <thead className="text-xs text-[var(--text-primary)] uppercase bg-[var(--background-table-header)]">
                <tr>
                  <th scope="col" className="px-6 py-3">Transfer ID</th>
                  <th scope="col" className="px-6 py-3">{translations.date}</th>
                  <th scope="col" className="px-6 py-3">{translations.product_name}</th>
                  <th scope="col" className="px-6 py-3">{translations.from_warehouse}</th>
                  <th scope="col" className="px-6 py-3">{translations.to_warehouse}</th>
                   <th scope="col" className="px-6 py-3">{translations.quantity}</th>
                  <th scope="col" className="px-6 py-3">{translations.status}</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr key={transfer.id} className="border-b border-[var(--border-color-light)] hover:bg-[var(--background-table-row-hover)]">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{transfer.id}</td>
                    <td className="px-6 py-4">{transfer.date}</td>
                    <td className="px-6 py-4">{getProductName(transfer.productId)}</td>
                    <td className="px-6 py-4">{getWarehouseName(transfer.fromWarehouseId)}</td>
                    <td className="px-6 py-4">{getWarehouseName(transfer.toWarehouseId)}</td>
                    <td className="px-6 py-4 font-semibold">{transfer.quantity}</td>
                    <td className="px-6 py-4"><StatusBadge status={transfer.status} /></td>
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