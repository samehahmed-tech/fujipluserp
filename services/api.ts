import { MOCK_PRODUCTS, MOCK_SALES, WAREHOUSES, SUPPLIERS, BOMS, PRODUCTION_ORDERS, MOCK_INDUSTRIAL_DASHBOARD_STATS, MOCK_PRODUCTION_SUMMARY, MOCK_INVENTORY_VALUE_BY_WAREHOUSE, MOCK_PURCHASE_ORDERS, MOCK_INVENTORY_TRANSFERS } from '../constants';
import type { Product, Sale, Warehouse, Supplier, BillOfMaterials, ProductionOrder, IndustrialDashboardStats, ProductionSummary, InventoryValueByWarehouse, PurchaseOrder, InventoryTransfer } from '../types';

const simulateDelay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export const getProducts = async (): Promise<Product[]> => {
  await simulateDelay(500);
  return MOCK_PRODUCTS;
};

export const getSales = async (): Promise<Sale[]> => {
  await simulateDelay(500);
  return MOCK_SALES;
};

export const getIndustrialDashboardStats = async (): Promise<IndustrialDashboardStats> => {
  await simulateDelay(300);
  return MOCK_INDUSTRIAL_DASHBOARD_STATS;
};

export const getProductionSummary = async (): Promise<ProductionSummary[]> => {
  await simulateDelay(700);
  return MOCK_PRODUCTION_SUMMARY;
};

export const getInventoryValueByWarehouse = async (): Promise<InventoryValueByWarehouse[]> => {
  await simulateDelay(800);
  return MOCK_INVENTORY_VALUE_BY_WAREHOUSE;
};

export const getPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
    await simulateDelay(400);
    return MOCK_PURCHASE_ORDERS;
};

export const getInventoryTransfers = async (): Promise<InventoryTransfer[]> => {
    await simulateDelay(400);
    return MOCK_INVENTORY_TRANSFERS;
};

export const getWarehouses = async (): Promise<Warehouse[]> => {
    await simulateDelay(200);
    return WAREHOUSES;
}

export const getSuppliers = async (): Promise<Supplier[]> => {
    await simulateDelay(200);
    return SUPPLIERS;
}

export const getBOMs = async (): Promise<BillOfMaterials[]> => {
    await simulateDelay(200);
    return BOMS;
}

export const getProductionOrders = async (): Promise<ProductionOrder[]> => {
    await simulateDelay(200);
    return PRODUCTION_ORDERS;
}