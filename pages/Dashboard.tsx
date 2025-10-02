
import React, { useEffect, useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Card } from '../components/Card';
import { ChartCard } from '../components/ChartCard';
import { getDashboardStats, getMonthlySales, getTopProducts } from '../services/api';
import type { DashboardStats, MonthlySales, TopProduct } from '../types';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';

export const Dashboard: React.FC = () => {
  const { translations, locale } = useLocalization();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [salesData, setSalesData] = useState<MonthlySales[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setStats(await getDashboardStats());
      setSalesData(await getMonthlySales());
      setTopProducts(await getTopProducts());
    };
    fetchData();
  }, []);

  const formatCurrency = (value: number) => new Intl.NumberFormat(locale === 'ar' ? 'ar-AE' : 'en-US', { style: 'currency', currency: 'AED' }).format(value);

  if (!stats) {
    return <div className="flex items-center justify-center h-full"><div className="w-16 h-16 border-4 border-sky-500 border-dashed rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title={translations.total_sales} value={formatCurrency(stats.totalSales)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
        <Card title={translations.total_purchases} value={formatCurrency(stats.totalPurchases)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} />
        <Card title={translations.inventory_value} value={formatCurrency(stats.inventoryValue)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>} />
        <Card title={translations.quick_ratio} value={stats.quickRatio} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title={translations.monthly_sales_trend}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip formatter={(value: number) => [formatCurrency(value), translations.sales]} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title={translations.top_selling_products}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={100} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: number) => [value, translations.sales]} />
              <Bar dataKey="sales" fill="#38bdf8" barSize={20} radius={[0, 10, 10, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
