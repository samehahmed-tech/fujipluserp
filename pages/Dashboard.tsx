import React, { useEffect, useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Card } from '../components/Card';
import { ChartCard } from '../components/ChartCard';
import { getIndustrialDashboardStats, getProductionSummary, getInventoryValueByWarehouse } from '../services/api';
import type { IndustrialDashboardStats, ProductionSummary, InventoryValueByWarehouse } from '../types';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell, Sector } from 'recharts';
import { PageLayout } from '../components/PageLayout';
import { useCurrency } from '../hooks/useCurrency';

const COLORS = ['#0ea5e9', '#10b981', '#f97316', '#8b5cf6'];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, formatCurrency } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="var(--text-primary)">{formatCurrency(value)}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="var(--text-secondary)">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const Dashboard: React.FC = () => {
  const { translations } = useLocalization();
  const { formatCurrency } = useCurrency();
  const [stats, setStats] = useState<IndustrialDashboardStats | null>(null);
  const [productionData, setProductionData] = useState<ProductionSummary[]>([]);
  const [inventoryValueData, setInventoryValueData] = useState<InventoryValueByWarehouse[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setStats(await getIndustrialDashboardStats());
      setProductionData(await getProductionSummary());
      setInventoryValueData(await getInventoryValueByWarehouse());
    };
    fetchData();
  }, []);

  const onPieEnter = (_: any, index: number) => setActiveIndex(index);

  const renderContent = () => {
    if (!stats) {
      return <div className="flex items-center justify-center h-full"><div className="w-16 h-16 border-4 border-sky-500 border-dashed rounded-full animate-spin"></div></div>;
    }
    return (
        <div className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title={translations.total_cards_produced} value={stats.totalCardsProduced} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>} />
          <Card title={translations.overdue_payments} value={formatCurrency(stats.overduePayments)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title={translations.production_summary}>
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={productionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--background-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
                <Legend wrapperStyle={{ color: 'var(--text-primary)' }}/>
                <Bar dataKey="produced" fill="#0ea5e9" name={translations.produced} radius={[4, 4, 0, 0]} />
                <Bar dataKey="available" fill="#8b5cf6" name={translations.available} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title={translations.inventory_value_by_warehouse}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={<renderActiveShape formatCurrency={formatCurrency} />}
                  data={inventoryValueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                {inventoryValueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    );
  }

  return (
    <PageLayout pageTitle={translations.dashboard}>
      {renderContent()}
    </PageLayout>
  );
};