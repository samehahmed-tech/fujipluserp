import React, { useEffect, useState } from 'react';
import { getBOMs, getProducts } from '../services/api';
// FIX: Rename imported type to avoid conflict with component name.
import type { BillOfMaterials as BillOfMaterialsType, Product } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../hooks/useTheme';

export const BillOfMaterials: React.FC = () => {
  const { translations } = useLocalization();
  const { theme } = useTheme();
  // FIX: Use renamed type.
  const [boms, setBoms] = useState<BillOfMaterialsType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getBOMs().then(setBoms);
    getProducts().then(setProducts);
  }, []);

  const getProductName = (productId: string) => {
    return products.find(p => p.id === productId)?.name || productId;
  };

  return (
    <PageLayout pageTitle={translations.bill_of_materials}>
      <div className="p-4 sm:p-6">
        <div className={`bg-[var(--background-card)] rounded-[var(--border-radius)] shadow-[var(--shadow)] border border-[var(--border-color)] ${theme === 'glassy-dark' ? 'backdrop-blur-sm' : ''}`}>
          <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{translations.bill_of_materials}</h2>
            <button className="bg-sky-500 text-white px-4 py-2 rounded-[var(--border-radius)] font-semibold hover:bg-sky-600 transition-colors shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              {translations.create_bom}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-[var(--text-secondary)]">
              <thead className="text-xs text-[var(--text-primary)] uppercase bg-[var(--background-table-header)]">
                <tr>
                  <th scope="col" className="px-6 py-3">BOM ID</th>
                  <th scope="col" className="px-6 py-3">{translations.finished_good}</th>
                  <th scope="col" className="px-6 py-3">{translations.components}</th>
                  <th scope="col" className="px-6 py-3 text-center">{translations.actions}</th>
                </tr>
              </thead>
              <tbody>
                {boms.map((bom) => (
                  <tr key={bom.id} className="border-b border-[var(--border-color-light)] hover:bg-[var(--background-table-row-hover)]">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{bom.id}</td>
                    <td className="px-6 py-4 font-semibold">{getProductName(bom.finishedGoodId)}</td>
                    <td className="px-6 py-4">
                        <ul className="list-disc ps-5 space-y-1">
                            {bom.components.map(comp => (
                                <li key={comp.rawMaterialId}>
                                    {getProductName(comp.rawMaterialId)}: <span className="font-mono">{comp.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a href="#" className="font-medium text-[var(--text-accent)] hover:underline">View Details</a>
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