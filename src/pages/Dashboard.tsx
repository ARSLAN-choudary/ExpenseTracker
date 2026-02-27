// src/pages/Dashboard.tsx
import { DollarSign, TrendingUp, Target, Calendar } from 'lucide-react';
import { useMemo } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { WeeklyBarChart } from '@/components/WeeklyBarChart';
import { CategoryPieChart } from '@/components/CategoryPieChart';

export const Dashboard = () => {
    const { expenses } = useExpenses();

    // Total Expenses Calculation
    const totalAmount = useMemo(() => {
        return expenses.reduce((acc, curr) => acc + curr.amount, 0);
    }, [expenses]);




    // Highest Category logic
    const highestCategory = useMemo(() => {
        if (expenses.length === 0) return "N/A";
        const cats = expenses.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {} as Record<string, number>);
        return Object.keys(cats).reduce((a, b) => cats[a] > cats[b] ? a : b);
    }, [expenses]);

    // Average Daily Spend Calculation
    const avgDailySpend = useMemo(() => {
        if (expenses.length === 0) return 0;
        const days = new Set(expenses.map(e => new Date(e.date).toDateString())).size;
        return days > 0 ? totalAmount / days : totalAmount;
    }, [expenses, totalAmount]);

    // Budget Status (example: if you have a fixed budget of $2000)
    const budget = 2000;
    const budgetStatus = useMemo(() => {
        return ((totalAmount / budget) * 100).toFixed(1) + '%';
    }, [totalAmount]);


    return (
        <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            {/* Header  */}
            <header className="flex justify-between items-center mb-6 md:mb-10">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800">Dashboard</h1>
                    <p className="text-slate-400 text-[12px] md:text-[13px] mt-0.5">February 2026</p>
                </div>
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">JD</div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Bar Graph Section */}
                <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-6">Last 7 Days Spending</h4>
                    <WeeklyBarChart />
                </div>

                {/* Pie Chart Section */}
                <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-2">Spending by Category</h4>
                    <CategoryPieChart total={Math.round(totalAmount)} />
                </div>
            </div>



            {/* Recent Expenses List - Scrollable on mobile */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 md:p-6 border-b border-gray-50 flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-800">Recent Expenses</h4>
                    <button className="text-[11px] font-bold text-[#00a389] uppercase tracking-wider">View All</button>
                </div>
                <div className="divide-y divide-gray-50">
                    {expenses.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 md:p-5 hover:bg-gray-50 transition-all">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-lg bg-emerald-50 text-emerald-500`}>
                                    {item.category.charAt(0)}
                                </div>
                                <div>
                                    <h5 className="text-[13px] md:text-[14px] font-bold text-slate-700 leading-none">{item.title}</h5>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase">{item.category}</span>
                                        <span className="text-[9px] font-medium text-slate-300">{item.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[14px] md:text-[15px] font-black text-slate-700">${Number(item.amount).toFixed(2)}</div>
                        </div>
                    ))}
                    {expenses.length === 0 && (
                        <div className="p-10 text-center text-slate-400 text-sm italic">No recent expenses found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Dashboard;