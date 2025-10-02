
import type { NavLink, Product, Sale, DashboardStats, MonthlySales, TopProduct, Translation, Locale } from './types';
import React from 'react';

export const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M9 4v16M15 4v16" /></svg>;
export const IconInventory = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
export const IconSales = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;
export const IconPurchasing = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
export const IconManufacturing = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-1 4h.01M9 11h.01M15 11h.01M12 11h.01M12 15h.01M9 15h.01M15 15h.01" /></svg>;
export const IconReports = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
export const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
export const IconLogout = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


export const NAV_LINKS: NavLink[] = [
    { path: '/', labelKey: 'dashboard', icon: <IconDashboard /> },
    { path: '/inventory', labelKey: 'inventory', icon: <IconInventory /> },
    { path: '/sales', labelKey: 'sales', icon: <IconSales /> },
    { path: '/purchasing', labelKey: 'purchasing', icon: <IconPurchasing /> },
    { path: '/manufacturing', labelKey: 'manufacturing', icon: <IconManufacturing /> },
    { path: '/reports', labelKey: 'reports', icon: <IconReports /> },
    { path: '/settings', labelKey: 'settings', icon: <IconSettings /> },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'P001', name: 'Fujiplus AC Unit 1.5 Ton', sku: 'FP-AC-15T', category: 'Air Conditioners', stock: 150, price: 2500, status: 'In Stock' },
  { id: 'P002', name: 'Fujiplus Refrigerator 500L', sku: 'FP-RF-500L', category: 'Refrigerators', stock: 20, price: 3200, status: 'Low Stock' },
  { id: 'P003', name: 'Fujiplus Washing Machine 8kg', sku: 'FP-WM-8KG', category: 'Washing Machines', stock: 80, price: 1800, status: 'In Stock' },
  { id: 'P004', name: 'Fujiplus Microwave Oven 25L', sku: 'FP-MW-25L', category: 'Kitchen Appliances', stock: 0, price: 600, status: 'Out of Stock' },
  { id: 'P005', name: 'Fujiplus LED TV 55"', sku: 'FP-TV-55', category: 'Televisions', stock: 110, price: 4500, status: 'In Stock' },
  { id: 'P006', name: 'Fujiplus Vacuum Cleaner', sku: 'FP-VC-2000W', category: 'Home Appliances', stock: 45, price: 800, status: 'In Stock' },
];

export const MOCK_SALES: Sale[] = [
  { id: 'S001', customer: 'HyperMart', date: '2023-10-26', total: 125000, status: 'Paid' },
  { id: 'S002', customer: 'City Electronics', date: '2023-10-25', total: 80000, status: 'Pending' },
  { id: 'S003', customer: 'Modern Home', date: '2023-09-15', total: 250000, status: 'Overdue' },
  { id: 'S004', customer: 'Al-Futtaim Electronics', date: '2023-10-28', total: 56000, status: 'Paid' },
  { id: 'S005', customer: 'Emax', date: '2023-10-29', total: 15000, status: 'Pending' },
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
    totalSales: 1250000,
    totalPurchases: 780000,
    inventoryValue: 2300000,
    quickRatio: 1.8
};

export const MOCK_MONTHLY_SALES: MonthlySales[] = [
    { month: 'Jan', sales: 110000 },
    { month: 'Feb', sales: 130000 },
    { month: 'Mar', sales: 150000 },
    { month: 'Apr', sales: 140000 },
    { month: 'May', sales: 180000 },
    { month: 'Jun', sales: 220000 },
];

export const MOCK_TOP_PRODUCTS: TopProduct[] = [
    { name: 'AC Unit 1.5 Ton', sales: 450 },
    { name: 'LED TV 55"', sales: 320 },
    { name: 'Refrigerator 500L', sales: 280 },
    { name: 'Washing Machine', sales: 210 },
];


const ARABIC_TRANSLATIONS: Translation = {
    dashboard: 'لوحة التحكم',
    inventory: 'المخزون',
    products: 'المنتجات',
    sales: 'المبيعات',
    invoices: 'الفواتير',
    purchasing: 'المشتريات',
    purchase_orders: 'أوامر الشراء',
    manufacturing: 'التصنيع',
    production_orders: 'أوامر الإنتاج',
    reports: 'التقارير',
    financial_reports: 'التقارير المالية',
    settings: 'الإعدادات',
    company_settings: 'إعدادات الشركة',
    logout: 'تسجيل الخروج',
    fujiplus_erp: 'نظام فوجي بلس',
    total_sales: 'إجمالي المبيعات',
    total_purchases: 'إجمالي المشتريات',
    inventory_value: 'قيمة المخزون',
    quick_ratio: 'النسبة السريعة',
    monthly_sales_trend: 'اتجاه المبيعات الشهري',
    top_selling_products: 'المنتجات الأكثر مبيعًا',
    search_products: 'ابحث عن المنتجات...',
    add_product: 'إضافة منتج',
    product_name: 'اسم المنتج',
    sku: 'SKU',
    category: 'الفئة',
    stock: 'المخزون',
    price: 'السعر',
    status: 'الحالة',
    actions: 'الإجراءات',
    search_invoices: 'ابحث عن الفواتير...',
    add_invoice: 'إضافة فاتورة',
    customer: 'العميل',
    date: 'التاريخ',
    total_amount: 'المبلغ الإجمالي',
    page_not_found: 'الصفحة غير موجودة',
    go_home: 'العودة للرئيسية',
    coming_soon: 'قريباً',
    feature_in_development: 'هذه الميزة قيد التطوير حاليًا.',
};

const ENGLISH_TRANSLATIONS: Translation = {
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    products: 'Products',
    sales: 'Sales',
    invoices: 'Invoices',
    purchasing: 'Purchasing',
    purchase_orders: 'Purchase Orders',
    manufacturing: 'Manufacturing',
    production_orders: 'Production Orders',
    reports: 'Reports',
    financial_reports: 'Financial Reports',
    settings: 'Settings',
    company_settings: 'Company Settings',
    logout: 'Logout',
    fujiplus_erp: 'Fujiplus ERP',
    total_sales: 'Total Sales',
    total_purchases: 'Total Purchases',
    inventory_value: 'Inventory Value',
    quick_ratio: 'Quick Ratio',
    monthly_sales_trend: 'Monthly Sales Trend',
    top_selling_products: 'Top Selling Products',
    search_products: 'Search products...',
    add_product: 'Add Product',
    product_name: 'Product Name',
    sku: 'SKU',
    category: 'Category',
    stock: 'Stock',
    price: 'Price',
    status: 'Status',
    actions: 'Actions',
    search_invoices: 'Search invoices...',
    add_invoice: 'Add Invoice',
    customer: 'Customer',
    date: 'Date',
    total_amount: 'Total Amount',
    page_not_found: 'Page Not Found',
    go_home: 'Go Home',
    coming_soon: 'Coming Soon',
    feature_in_development: 'This feature is currently in development.',
};

export const TRANSLATIONS: Record<Locale, Translation> = {
    ar: ARABIC_TRANSLATIONS,
    en: ENGLISH_TRANSLATIONS,
};
