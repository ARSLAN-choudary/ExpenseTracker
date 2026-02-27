import React, { useMemo, useState } from 'react';
import { TrendingDown, CheckCircle2 } from 'lucide-react';
import type { Expense } from '../types';
import { useExpenses } from '../hooks/useExpenses';
import { useDateFilter } from '../hooks/useDateFilter';
import { CategoryPieChart } from '@/components/CategoryPieChart';
import { TrendLineChart } from '@/components/TrendLineChart';

const Analytics: React.FC = () => {
  const { expenses } = useExpenses();
  const { filteredExpenses, selectedMonth, setSelectedMonth } = useDateFilter(expenses as Expense[]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Colors mapping for consistent UI
  const categoryColors: Record<string, string> = {
    'Food': 'bg-red-400',
    'Transport': 'bg-cyan-400',
    'Shopping': 'bg-pink-400',
    'Entertainment': 'bg-orange-400',
    'Bills': 'bg-indigo-400',
    'Health': 'bg-rose-400',
    'Education': 'bg-sky-400',
    'Others': 'bg-slate-400'
  };

  const displayData = useMemo(() => {
    return selectedCategory === 'All'
      ? filteredExpenses
      : filteredExpenses.filter(e => e.category === selectedCategory);
  }, [filteredExpenses, selectedCategory]);

  const breakdown = useMemo(() => {
    const total = displayData.reduce((sum, e) => sum + Number(e.amount), 0);
    const groups = displayData.reduce((acc, e) => {
      if (!acc[e.category]) acc[e.category] = { amount: 0, count: 0 };
      acc[e.category].amount += Number(e.amount);
      acc[e.category].count += 1;
      return acc;
    }, {} as any);

    return Object.keys(groups).map(cat => ({
      name: cat,
      amount: groups[cat].amount,
      count: groups[cat].count,
      percentage: total > 0 ? (groups[cat].amount / total) * 100 : 0,
      color: categoryColors[cat] || 'bg-emerald-400'
    })).sort((a, b) => b.amount - a.amount);
  }, [displayData]);

  // const totalSpend = displayData.reduce((sum, e) => sum + Number(e.amount), 0);
  const highestCat = breakdown.length > 0 ? breakdown[0] : { name: 'N/A', amount: 0 };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8 bg-[#fdfcfb] min-h-screen">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Analytics & Insights</h1>
        <p className="text-slate-500 text-[13px] mt-1">Detailed spending analysis and trends</p>
      </header>

      {/* --- FILTERS --- */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="bg-white border border-gray-100 shadow-sm rounded-lg px-4 py-2 text-sm font-medium text-slate-700 outline-none min-w-[150px]"
        >
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
            <option key={i} value={i}>{m} 2026</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white border border-gray-100 shadow-sm rounded-lg px-4 py-2 text-sm font-medium text-slate-700 outline-none min-w-[150px]"
        >
          <option value="All">All Categories</option>
          <option value="Food">🍔 Food & Dining</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Bills">💡 Bills & Utilities</option>
        </select>
      </div>

      {/* --- OVERVIEW CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Monthly Comparison</p>
            <h3 className="text-2xl font-black text-slate-800">0.0%</h3>
            <p className="text-[11px] text-slate-400 mt-1">vs last month</p>
          </div>
          <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-500 rotate-180">
            <TrendingDown size={20} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Highest Category</p>
            <h3 className="text-xl font-black text-slate-800">{highestCat.name}</h3>
            <p className="text-[11px] text-slate-400 mt-1">${highestCat.amount.toFixed(2)} spent</p>
          </div>
          <div className="text-2xl">🍔</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Budget Status</p>
            <h3 className="text-2xl font-black text-slate-800">56%</h3>
            <p className="text-[11px] text-slate-400 mt-1">Within budget</p>
          </div>
          <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-500">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart (Image Match) */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-6">6-Month Spending Trend</h4>
          <TrendLineChart />
        </div>

        {/* Category Distribution (Image Match) */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-2">Category Distribution</h4>
          <CategoryPieChart />
        </div>
      </div>

      {/* --- CATEGORY BREAKDOWN LIST  --- */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <h4 className="text-sm font-bold text-slate-800">Category Breakdown</h4>
        </div>
        <div className="p-6 space-y-8">
          {breakdown.length > 0 ? breakdown.map((cat, i) => (
            <div key={i} className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700">{cat.name}</span>
                  <span className="text-[11px] font-medium text-slate-400">({cat.count} expenses)</span>
                </div>
                <span className="text-sm font-black text-slate-800">${cat.amount.toFixed(2)}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${cat.percentage}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-tighter">
                {cat.percentage.toFixed(1)}% of total spending
              </p>
            </div>
          )) : (
            <div className="py-10 text-center text-slate-400 italic">No data available for this month</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;