import type { ReactNode } from 'react';

export interface ProductHistory {
  date: string;
  event: 'Purchase' | 'Sale' | 'Adjustment' | 'Transfer In' | 'Transfer Out' | 'Production';
  quantity: number;
  notes: string;
}

export type ItemType = 'Raw Material' | 'Finished Good';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  itemType: ItemType;
  stock: { [warehouseId: string]: { available: number, reserved: number } }; // warehouseId -> quantity
  price: number; // This is the Sales Price
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  history: ProductHistory[];
  // New fields for Items Management page
  itemCode: string;
  unit: string;
  avgPurchasePrice: number;
  lastPurchasePrice: number;
  barcode: string;
  classification: string;
}

export interface Sale {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Warehouse {
    id: string;
    name: string;
    location: string;
    branch: string;
    type: 'Raw Materials' | 'Work-in-Progress' | 'Finished Goods' | 'QA & Testing';
}

export interface Supplier {
    id: string;
    name: string;
    contactPerson: string;
    email: string;
}

export interface BillOfMaterials {
    id: string;
    finishedGoodId: string;
    components: {
        rawMaterialId: string;
        quantity: number;
    }[];
}

export interface ProductionOrder {
    id: string;
    finishedGoodId: string;
    quantity: number;
    bomId: string;
    date: string;
    status: 'Pending' | 'In Progress' | 'Completed';
}

// New Dashboard Types
export interface IndustrialDashboardStats {
  totalCardsProduced: number;
  overduePayments: number;
}

export interface ProductionSummary {
    name: string;
    produced: number;
    available: number;
}

export interface InventoryValueByWarehouse {
    name: string;
    value: number;
}


// New ERP Module Types
export interface PurchaseOrder {
    id: string;
    supplierId: string;
    date: string;
    total: number;
    status: 'Draft' | 'Sent' | 'Received' | 'Cancelled';
}

export interface InventoryTransfer {
    id: string;
    fromWarehouseId: string;
    toWarehouseId: string;
    productId: string;
    quantity: number;
    date: string;
    status: 'In Transit' | 'Completed';
}


export interface NavLink {
  path: string;
  labelKey: keyof Translation;
  icon: ReactNode;
  children?: NavLink[];
}

export interface TileConfig {
    path: string;
    labelKey: keyof Translation;
    icon: ReactNode;
    color: string;
    size?: 'normal' | 'wide';
}

export interface Tab {
  path: string;
  label: string;
}

export interface TabContextType {
  openTabs: Tab[];
  activeTab: string | null;
  openTab: (tab: Tab) => void;
  closeTab: (path: string) => void;
}

export type ThemeName = 'modern' | 'fluent' | 'glassy-dark' | 'nordic-light';

export interface Wallpaper {
    id: string;
    name: string;
    url: string;
}

export interface ThemeContextType {
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
    wallpaper: string; // URL or ID
    setWallpaper: (wallpaper: string) => void;
    wallpaperUrl: string;
}

export interface GoodsReceiptLineItem {
  id: string;
  productId: string | null;
  productName: string;
  quantity: number;
  unit: string;
  salesPrice: number;
  avgPurchasePrice: number;
  lastPurchasePrice: number;
  barcode: string;
  itemCode1: string;
  classification: string;
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
  home: string;
  add_purchase_order: string;
  sale: string;
  purchase: string;
  sales_return: string;
  purchase_return: string;
  quotation: string;
  main_operations: string;
  quick_actions: string;
  documents: string;
  // New keys for manufacturing
  warehouses: string;
  suppliers: string;
  bill_of_materials: string;
  inventory_transfers: string;
  manufacturing_logistics: string;
  raw_materials: string;
  finished_goods: string;
  add_warehouse: string;
  warehouse_name: string;
  location: string;
  warehouse_type: string;
  create_bom: string;
  finished_good: string;
  components: string;
  new_production_order: string;
  quantity: string;
  // New keys for theme manager
  appearance: string;
  theme: string;
  wallpaper: string;
  upload_wallpaper: string;
  modern: string;
  fluent: string;
  glassy_dark: string;
  nordic_light: string;
  // New keys for Goods Receipt / Items
  goods_receipt: string;
  items_management: string; // New
  refresh: string;
  advanced_search: string;
  close: string;
  new_item: string;
  edit: string;
  delete: string;
  share: string;
  print_items_list: string;
  item_movement_report: string;
  warehouse_goods_report: string;
  item_expiry: string;
  warehouse_movement: string;
  modify_sales_prices: string;
  print_barcode_stickers: string;
  search_by_serial: string;
  item_quantity_in_warehouses: string;
  available: string;
  reserved: string;
  search: string;
  item_no: string;
  item_name: string;
  total_quantity: string;
  unit: string;
  sales_price: string;
  avg_purchase_price: string;
  last_purchase_price: string;
  barcode: string;
  item_code_1: string; // New
  classification: string; // New
  add_item: string;
  // New keys for Add Warehouse Modal
  create_warehouse: string;
  cancel: string;
  // New keys for new dashboard
  total_cards_produced: string;
  overdue_payments: string;
  production_summary: string;
  inventory_value_by_warehouse: string;
  produced: string;
  // New keys for completed modules
  new_purchase_order: string;
  supplier: string;
  all_reports: string;
  inventory_reports: string;
  sales_reports: string;
  financials: string;
  company_profile: string;
  user_management: string;
  financial_settings: string;
  new_inventory_transfer: string;
  from_warehouse: string;
  to_warehouse: string;
  // New keys for Egypt localization
  branches_warehouses: string;
  branch: string;
  // New keys for Add Product Modal
  save: string;
  item_type: string;
  initial_stock_levels: string;
  add_new_product: string;
  product_details: string;
}

export type Locale = 'ar' | 'en';

export type Direction = 'rtl' | 'ltr';

export interface LocalizationContextType {
  locale: Locale;
  direction: Direction;
  translations: Translation;
  setLocale: (locale: Locale) => void;
}