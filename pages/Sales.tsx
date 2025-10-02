import React, { useEffect, useState, useMemo } from 'react';
import { getSales } from '../services/api';
import type { Sale } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../hooks/useTheme';
import { useCurrency } from '../hooks/useCurrency';
import { NewInvoiceModal } from '../components/NewInvoiceModal';
import type { InvoiceFormData } from '../components/NewInvoiceModal';

const StatusBadge: React.FC<{ status: Sale['status'] }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';
  switch (status) {
    case 'Paid':
      return <span className={`${baseClasses} bg-green-500/10 text-green-600`}>Paid</span>;
    case 'Pending':
      return <span className={`${baseClasses} bg-blue-500/10 text-blue-600`}>Pending</span>;
    case 'Overdue':
      return <span className={`${baseClasses} bg-red-500/10 text-red-600`}>Overdue</span>;
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

export const Sales: React.FC = () => {
  const { translations } = useLocalization();
  const { theme } = useTheme();
  const { formatCurrency } = useCurrency();
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: 'customer' | 'date' | 'total'; direction: 'ascending' | 'descending' } | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  useEffect(() => {
    getSales().then(setSales);
  }, []);
  
  const handleAddInvoice = (formData: InvoiceFormData) => {
    const newSale: Sale = {
        id: `INV-${Math.floor(Math.random() * 10000)}`,
        customer: formData.customer,
        date: formData.date,
        total: formData.total,
        status: formData.status,
    };
    setSales(prev => [newSale, ...prev]);
    setIsInvoiceModalOpen(false);
  };

  const requestSort = (key: 'customer' | 'date' | 'total') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedSales = useMemo(() => {
    let filtered = sales.filter(sale =>
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        
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
  }, [sales, searchTerm, sortConfig]);

  return (
    <PageLayout pageTitle={translations.sales}>
      <div className="p-4 sm:p-6">
        <div className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow)] border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''}`}>
          <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder={translations.search_invoices}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-[var(--border-radius)] focus:ring-2 focus:ring-[var(--text-accent)] focus:border-[var(--text-accent)] transition-shadow ps-10"
              />
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute start-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button 
              onClick={() => setIsInvoiceModalOpen(true)}
              className="w-full sm:w-auto bg-sky-500 text-white px-4 py-2 rounded-[var(--border-radius)] font-semibold hover:bg-sky-600 transition-colors shadow-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              {translations.add_invoice}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-[var(--text-secondary)]">
              <thead className="text-xs text-[var(--text-primary)] uppercase bg-[var(--background-table-header)]">
                <tr>
                  <th scope="col" className="px-6 py-3">Invoice ID</th>
                  <th scope="col" className="px-6 py-3">
                    <button onClick={() => requestSort('customer')} className="group flex items-center w-full text-left">
                      {translations.customer}
                      <SortIndicator direction={sortConfig?.key === 'customer' ? sortConfig.direction : null} />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <button onClick={() => requestSort('date')} className="group flex items-center w-full text-left">
                      {translations.date}
                      <SortIndicator direction={sortConfig?.key === 'date' ? sortConfig.direction : null} />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <button onClick={() => requestSort('total')} className="group flex items-center w-full text-left">
                      {translations.total_amount}
                      <SortIndicator direction={sortConfig?.key === 'total' ? sortConfig.direction : null} />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">{translations.status}</th>
                  <th scope="col" className="px-6 py-3"><span className="sr-only">{translations.actions}</span></th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-[var(--border-color-light)] hover:bg-[var(--background-table-row-hover)]">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)] whitespace-nowrap">{sale.id}</td>
                    <td className="px-6 py-4">{sale.customer}</td>
                    <td className="px-6 py-4">{sale.date}</td>
                    <td className="px-6 py-4">{formatCurrency(sale.total)}</td>
                    <td className="px-6 py-4"><StatusBadge status={sale.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <a href="#" className="font-medium text-[var(--text-accent)] hover:underline">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <NewInvoiceModal 
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSave={handleAddInvoice}
      />
    </PageLayout>
  );
};