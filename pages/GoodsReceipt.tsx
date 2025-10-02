

import React, { useState, useEffect, useMemo } from 'react';
import { PageLayout } from '../components/PageLayout';
import { useLocalization } from '../hooks/useLocalization';
import { getProducts, getWarehouses } from '../services/api';
import type { Product, Warehouse } from '../types';

const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'icon' | 'report';
  disabled?: boolean;
  className?: string;
}> = ({ icon, label, onClick, variant = 'secondary', disabled = false, className = '' }) => {
  const baseClasses = `flex items-center p-2 rounded-md font-semibold transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed`;
  const variantClasses = {
    primary: `bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-sm`,
    secondary: `bg-white text-gray-700 hover:bg-gray-200 border border-gray-300`,
    icon: `bg-white text-gray-600 hover:bg-gray-200 border border-gray-300`,
    report: `bg-gray-100 text-gray-600 hover:bg-gray-200 justify-start w-full`,
  };
  const sizeClasses = variant === 'icon' ? 'w-10 h-10 justify-center' : 'w-full';

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${className}`} disabled={disabled}>
      <span className={`w-5 h-5 ${variant !== 'icon' ? 'me-2' : ''}`}>{icon}</span>
      {variant !== 'icon' && <span>{label}</span>}
    </button>
  );
};

export const GoodsReceipt: React.FC = () => {
    const { translations } = useLocalization();
    const [items, setItems] = useState<Product[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    useEffect(() => {
        getProducts().then(items => {
            setItems(items);
            if (items.length > 0) {
                setSelectedItemId(items[0].id);
            }
        });
        getWarehouses().then(setWarehouses);
    }, []);

    const selectedItem = useMemo(() => {
        if (!selectedItemId) return null;
        return items.find(item => item.id === selectedItemId);
    }, [selectedItemId, items]);
    
    const totalQuantity = useMemo(() => {
        // FIX: The type of `warehouseStock` was inferred as `unknown`. Refactored to use Object.keys which has better type inference for index signatures.
        return items.reduce((sum, item) => {
            const itemTotal = Object.values(item.stock).reduce((stockSum, warehouseStock: { available: number }) => {
                return stockSum + warehouseStock.available;
            }, 0);
            return sum + itemTotal;
        }, 0);
    }, [items]);

    return (
        <PageLayout pageTitle={translations.goods_receipt}>
            <div className="flex flex-col h-full bg-gray-50 text-gray-800">
                {/* Top Toolbar */}
                <div className="flex items-center justify-between p-2 bg-white border-b border-gray-200 flex-wrap gap-2 shadow-sm">
                    <div className="flex items-center gap-2">
                         <h2 className="text-xl font-bold text-green-600 px-4">{translations.goods_receipt}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <select className="appearance-none text-sm bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 py-1.5 px-3 pe-8">
                                <option>{translations.classification}</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute top-1/2 end-2 -translate-y-1/2 pointer-events-none text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                        <input type="text" placeholder={`${translations.search}...`} className="px-3 py-1.5 text-sm bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                        <ActionButton label={translations.advanced_search} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} variant="primary" className="w-auto"/>
                        <ActionButton label="..." icon={<span className="font-bold">...</span>} variant="icon" className="w-8 h-8"/>
                        <ActionButton label={translations.refresh} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5m-5 2a9 9 0 0115.55-2.84M20 20v-5h-5m5 2a9 9 0 01-15.55 2.84" /></svg>} variant="secondary" className="w-auto" />
                        <ActionButton label={translations.close} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" /></svg>} variant="secondary" className="w-auto" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Action Panel */}
                    <aside className="w-full md:w-60 p-2 bg-gray-100 border-e border-gray-200 overflow-y-auto flex-shrink-0">
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-1">
                                <ActionButton label={translations.new_item} icon={<svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>} className="flex-col h-16 text-xs"/>
                                <ActionButton label={translations.edit} disabled={!selectedItemId} icon={<svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>} className="flex-col h-16 text-xs"/>
                                <ActionButton label={translations.delete} disabled={!selectedItemId} icon={<svg xmlns="http://www.w3.org/2000/svg" className="mx-auto text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>} className="flex-col h-16 text-xs"/>
                            </div>
                            <ActionButton label={""} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.042.586.042h4.4c.196 0 .391-.017.586-.042m-5.572 2.186a2.25 2.25 0 110-2.186m0 2.186c.195.025.39.042.586.042h.447m5.572-2.186a2.25 2.25 0 100 2.186m0-2.186c-.195.025-.39.042-.586.042h-4.4c-.196 0-.391-.017-.586-.042m5.572-2.186a2.25 2.25 0 110-2.186m0 2.186c-.195.025-.39.042-.586.042h-.447m-5.572 0a2.25 2.25 0 100 2.186" /></svg>} variant="icon" className="w-10 h-10"/>
                            
                            <div className="space-y-1 pt-2">
                                {[ {labelKey: 'print_items_list', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6 18.75m10.56-4.921l-.24.03-.48.062-.72.096m.72-.096L18 18.75M3.75 9h16.5M3.75 12h16.5m-16.5 3h16.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" /></svg>}, {labelKey: 'item_movement_report'}, {labelKey: 'warehouse_goods_report'}, {labelKey: 'item_expiry'}, {labelKey: 'warehouse_movement'} ].map(btn => (
                                     <ActionButton key={btn.labelKey} label={translations[btn.labelKey as keyof typeof translations]} icon={btn.icon || <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>} variant="report"/>
                                ))}
                            </div>
                             <div className="space-y-1 pt-2">
                                {[ {labelKey: 'modify_sales_prices'}, {labelKey: 'print_barcode_stickers'}, {labelKey: 'search_by_serial'} ].map(btn => (
                                     <ActionButton key={btn.labelKey} label={translations[btn.labelKey as keyof typeof translations]} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>} variant="report"/>
                                ))}
                            </div>
                            
                            {selectedItem && (
                                <div className="p-1 mt-2">
                                    <h3 className="font-bold text-blue-600 text-xs mb-1">{translations.item_quantity_in_warehouses}</h3>
                                    <table className="w-full text-xs text-center bg-green-600 text-white rounded-md overflow-hidden">
                                        <thead className="bg-green-700">
                                            <tr>
                                                <th className="p-1 font-semibold">{translations.warehouse_name}</th>
                                                <th className="p-1 font-semibold">{translations.available}</th>
                                                <th className="p-1 font-semibold">{translations.reserved}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-green-500">
                                            {warehouses.map(wh => (
                                                <tr key={wh.id}>
                                                    <td className="p-1">{wh.name}</td>
                                                    <td className="p-1 font-mono">{selectedItem.stock[wh.id]?.available || 0}</td>
                                                    <td className="p-1 font-mono">{selectedItem.stock[wh.id]?.reserved || 0}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 flex flex-col p-2 overflow-x-auto">
                        <div className="flex-1 border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden flex flex-col">
                             <div className="overflow-auto flex-1">
                                <table className="w-full text-sm text-center text-gray-700 whitespace-nowrap">
                                    <thead className="text-xs text-gray-800 uppercase bg-gray-100 sticky top-0 z-10" style={{backgroundColor: '#F3F3F3'}}>
                                        <tr>
                                            <th className="p-2 w-10 border-s border-gray-200"><input type="checkbox" className="align-middle"/></th>
                                            {[{key: 'item_no', label: translations.item_no}, {key: 'item_name', label: translations.item_name}, {key: 'total_quantity', label: translations.total_quantity}, {key: 'unit', label: translations.unit}, {key: 'sales_price', label: translations.sales_price}, {key: 'avg_purchase_price', label: translations.avg_purchase_price}, {key: 'last_purchase_price', label: translations.last_purchase_price}, {key: 'barcode', label: translations.barcode}, {key: 'item_code_1', label: translations.item_code_1}, {key: 'classification', label: translations.classification}].map(h => 
                                                <th key={h.key} className="p-2 font-semibold border-x border-gray-200">{h.label}</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <tr key={item.id} onClick={() => setSelectedItemId(item.id)} className={`transition-colors cursor-pointer ${selectedItemId === item.id ? 'bg-green-500 text-white' : 'hover:bg-gray-100'}`}>
                                                <td className="p-2 border-e border-gray-200"><input type="checkbox" checked={selectedItemId === item.id} readOnly className="align-middle"/></td>
                                                <td className="p-2 font-mono border-e border-gray-200">{item.id}</td>
                                                <td className={`p-2 text-start font-semibold border-e border-gray-200 ${selectedItemId === item.id ? 'text-white' : 'text-gray-900'}`}>{item.name}</td>
                                                {/* FIX: The type of `w` was inferred as `unknown`. Added explicit type to fix this. */}
                                                <td className="p-2 border-e border-gray-200">{Object.values(item.stock).reduce((s, w: { available: number }) => s + w.available, 0)}</td>
                                                <td className="p-2 border-e border-gray-200">{item.unit}</td>
                                                <td className="p-2 border-e border-gray-200">{item.price.toFixed(2)}</td>
                                                <td className="p-2 border-e border-gray-200">{item.avgPurchasePrice.toFixed(4)}</td>
                                                <td className="p-2 border-e border-gray-200">{item.lastPurchasePrice.toFixed(2)}</td>
                                                <td className="p-2 border-e border-gray-200">{item.barcode}</td>
                                                <td className="p-2 border-e border-gray-200">{item.itemCode}</td>
                                                <td className="p-2 border-e border-gray-200">{item.classification}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-200 font-bold text-gray-800 sticky bottom-0">
                                        <tr>
                                            <td colSpan={3} className="p-2 text-right rtl:text-left">Total</td>
                                            <td className="p-2 text-center bg-green-200 text-green-900">{totalQuantity}</td>
                                            <td colSpan={7}></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </PageLayout>
    );
};