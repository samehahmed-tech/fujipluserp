
import type { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface Sale {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface DashboardStats {
  totalSales: number;
  totalPurchases: number;
  inventoryValue: number;
  quickRatio: number;
}

export interface MonthlySales {
  month: string;
  sales: number;
}

export interface TopProduct {
  name: string;
  sales: number;
}

export interface NavLink {
  path: string;
  labelKey: keyof Translation;
  icon: ReactNode;
  children?: NavLink[];
}

export interface Translation {
  dashboard: string;
  inventory: string;
  products: string;
  sales: string;
  invoices: string;
  purchasing: string;
  purchase_orders: string;
  manufacturing: string;
  production_orders: string;
  reports: string;
  financial_reports: string;
  settings: string;
  company_settings: string;
  logout: string;
  fujiplus_erp: string;
  total_sales: string;
  total_purchases: string;
  inventory_value: string;
  quick_ratio: string;
  monthly_sales_trend: string;
  top_selling_products: string;
  search_products: string;
  add_product: string;
  product_name: string;
  sku: string;
  category: string;
  stock: string;
  price: string;
  status: string;
  actions: string;
  search_invoices: string;
  add_invoice: string;
  customer: string;
  date: string;
  total_amount: string;
  page_not_found: string;
  go_home: string;
  coming_soon: string;
  feature_in_development: string;
}

export type Locale = 'ar' | 'en';

export type Direction = 'rtl' | 'ltr';

export interface LocalizationContextType {
  locale: Locale;
  direction: Direction;
  translations: Translation;
  setLocale: (locale: Locale) => void;
}
