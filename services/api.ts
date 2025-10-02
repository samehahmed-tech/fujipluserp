
import { MOCK_PRODUCTS, MOCK_SALES, MOCK_DASHBOARD_STATS, MOCK_MONTHLY_SALES, MOCK_TOP_PRODUCTS } from '../constants';
import type { Product, Sale, DashboardStats, MonthlySales, TopProduct } from '../types';

const simulateDelay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export const getProducts = async (): Promise<Product[]> => {
  await simulateDelay(500);
  return MOCK_PRODUCTS;
};

export const getSales = async (): Promise<Sale[]> => {
  await simulateDelay(500);
  return MOCK_SALES;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  await simulateDelay(300);
  return MOCK_DASHBOARD_STATS;
};

export const getMonthlySales = async (): Promise<MonthlySales[]> => {
  await simulateDelay(700);
  return MOCK_MONTHLY_SALES;
};

export const getTopProducts = async (): Promise<TopProduct[]> => {
  await simulateDelay(800);
  return MOCK_TOP_PRODUCTS;
};
