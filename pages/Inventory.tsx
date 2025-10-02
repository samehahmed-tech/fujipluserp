
import React, { useEffect, useState, useMemo } from 'react';
import { getProducts } from '../services/api';
import type { Product } from '../types';
import { useLocalization } from '../hooks/useLocalization';

const StatusBadge: React.FC<{ status: Product['status'] }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';
  switch (status) {
    case 'In Stock':
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>In Stock</span>;
    case 'Low Stock':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Low Stock</span>;
    case 'Out of Stock':
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>Out of Stock</span>;
    default:
      return null;
  }
};

export const Inventory: React.FC = () => {
  const { translations } = useLocalization();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder={translations.search_products}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow ps-10"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button className="w-full sm:w-auto bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors shadow-sm flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            {translations.add_product}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">{translations.product_name}</th>
                <th scope="col" className="px-6 py-3">{translations.sku}</th>
                <th scope="col" className="px-6 py-3">{translations.category}</th>
                <th scope="col" className="px-6 py-3">{translations.stock}</th>
                <th scope="col" className="px-6 py-3">{translations.price}</th>
                <th scope="col" className="px-6 py-3">{translations.status}</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">{translations.actions}</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4">{product.sku}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">{product.price.toFixed(2)} AED</td>
                  <td className="px-6 py-4"><StatusBadge status={product.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-sky-600 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
