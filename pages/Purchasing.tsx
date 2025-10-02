import React, { useEffect, useState } from 'react';
import { getPurchaseOrders, getSuppliers } from '../services/api';
import type { PurchaseOrder, Supplier } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../hooks/useTheme';
import { useCurrency } from '../hooks/useCurrency';

const StatusBadge: React.FC<{ status: PurchaseOrder['status'] }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';
  switch (status) {
    case 'Received':
      return <span className={`${baseClasses} bg-green-500/10 text-green-600`}>Received</span>;
    case 'Sent':
      return <span className={`${baseClasses} bg-blue-500/10 text-blue-600`}>Sent</span>;
    case 'Draft':
      return <span className={`${baseClasses} bg-gray-500/10 text-gray-600`}>Draft</span>;
    case 'Cancelled':
        return <span className={`${baseClasses} bg-red-500/10 text-red-600`}>Cancelled</span>;
    default:
      return null;
  }
};

export const Purchasing: React.FC = () => {
  const { translations } = useLocalization();
  const { theme } = useTheme();
  const { formatCurrency } = useCurrency();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    getPurchaseOrders().then(setPurchaseOrders);
    getSuppliers().then(setSuppliers);
  }, []);

  const getSupplierName = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId)?.name || supplierId;
  };

  return (
    <PageLayout pageTitle={translations.purchasing}>
      <div className="p-4 sm:p-6">
        <div className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow)] border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''}`}>
          <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{translations.purchase_orders}</h2>
            <button className="bg-sky-500 text-white px-4 py-2 rounded-[var(--border-radius)] font-semibold hover:bg-sky-600 transition-colors shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              {translations.new_purchase_order}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-[var(--text-secondary)]">
              <thead className="text-xs text-[var(--text-primary)] uppercase bg-[var(--background-table-header)]">
                <tr>
                  <th scope="col" className="px-6 py-3">Order ID</th>
                  <th scope="col" className="px-6 py-3">{translations.supplier}</th>
                  <th scope="col" className="px-6 py-3">{translations.date}</th>
                  <th scope="col" className="px-6 py-3">{translations.total_amount}</th>
                  <th scope="col" className="px-6 py-3">{translations.status}</th>
                  <th scope="col" className="px-6 py-3 text-center">{translations.actions}</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[var(--border-color-light)] hover:bg-[var(--background-table-row-hover)]">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{order.id}</td>
                    <td className="px-6 py-4">{getSupplierName(order.supplierId)}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">{formatCurrency(order.total)}</td>
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