import React, { useEffect, useState } from 'react';
import { getWarehouses } from '../services/api';
import type { Warehouse } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../hooks/useTheme';
import { NewWarehouseModal } from '../components/NewWarehouseModal';

export const Warehouses: React.FC = () => {
  const { translations } = useLocalization();
  const { theme } = useTheme();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getWarehouses().then(setWarehouses);
  }, []);

  const handleAddWarehouse = (newWarehouse: Omit<Warehouse, 'id'>) => {
    const warehouseWithId: Warehouse = {
        ...newWarehouse,
        id: `wh-${new Date().getTime()}`
    };
    setWarehouses(prev => [warehouseWithId, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <PageLayout pageTitle={translations.branches_warehouses}>
      <div className="p-4 sm:p-6">
        <div className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow)] border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''}`}>
          <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{translations.branches_warehouses}</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-sky-500 text-white px-4 py-2 rounded-[var(--border-radius)] font-semibold hover:bg-sky-600 transition-colors shadow-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              {translations.add_warehouse}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-[var(--text-secondary)]">
              <thead className="text-xs text-[var(--text-primary)] uppercase bg-[var(--background-table-header)]">
                <tr>
                  <th scope="col" className="px-6 py-3">{translations.warehouse_name}</th>
                  <th scope="col" className="px-6 py-3">{translations.branch}</th>
                  <th scope="col" className="px-6 py-3">{translations.warehouse_type}</th>
                  <th scope="col" className="px-6 py-3">{translations.location}</th>
                  <th scope="col" className="px-6 py-3 text-center">{translations.actions}</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map((warehouse) => (
                  <tr key={warehouse.id} className="border-b border-[var(--border-color-light)] hover:bg-[var(--background-table-row-hover)]">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{warehouse.name}</td>
                    <td className="px-6 py-4">{warehouse.branch}</td>
                    <td className="px-6 py-4">{warehouse.type}</td>
                    <td className="px-6 py-4">{warehouse.location}</td>
                    <td className="px-6 py-4 text-center">
                      <a href="#" className="font-medium text-[var(--text-accent)] hover:underline">Edit</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <NewWarehouseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddWarehouse={handleAddWarehouse}
      />
    </PageLayout>
  );
};