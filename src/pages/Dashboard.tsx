// src/pages/Dashboard.tsx
import { DollarSign, TrendingUp, Target, Calendar } from 'lucide-react';
import { useMemo } from 'react';
import { useExpenses } from '../hooks/useExpenses';

export const Dashboard = () => {
   const { expenses } = useExpenses();

    // Total Expenses Calculation
    const totalAmount = useMemo(() => {
        return expenses.reduce((acc, curr) => acc + curr.amount, 0);
    }, [expenses]);

    // Recent 5 Expenses
    // const recentExpenses = useMemo(() => {
    //     return [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    // }, [expenses]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {[
                    { label: 'Total Expenses', value: `$${totalAmount.toFixed(2)}`, icon: <DollarSign size={18} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Highest Category', value: highestCategory, icon: <TrendingUp size={18} />, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: 'Budget Status', value: budgetStatus, sub: totalAmount <= budget ? 'Good Standing' : 'Limit Reached', icon: <Target size={18} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
                    { label: 'Avg. Daily Spend', value: `$${avgDailySpend.toFixed(2)}`, icon: <Calendar size={18} />, color: 'text-orange-500', bg: 'bg-orange-50' },
                ].map((card, i) => (
                    <div key={i} className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-[12px] md:text-[13px] font-medium mb-1">{card.label}</p>
                            <h3 className="text-lg md:text-[22px] font-extrabold text-slate-800 tracking-tight leading-tight">{card.value}</h3>
                            {card.label === 'Budget Status' && (
                                <p className={`text-[11px] font-semibold mt-1 ${totalAmount <= budget ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {card.sub}
                                </p>
                            )}
                        </div>
                        <div className={`p-2.5 rounded-xl border border-gray-50 ${card.bg} ${card.color}`}>
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Bar Graph Section */}
                <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
                    <h4 className="text-sm font-bold text-slate-800 mb-8 md:mb-10">Last 7 Days Spending</h4>
                    <div className="relative h-48 flex items-end justify-between px-2 md:px-4 border-l border-b border-gray-100 min-w-[300px]">
                        {/* Bars with dynamic height or dummy data */}
                        {[45, 95, 85, 30, 48, 130, 60].map((h, i) => (
                            <div key={i} className="relative z-10 w-8 md:w-12 bg-[#00a389] rounded-t-md hover:opacity-80 transition-all cursor-pointer" style={{ height: `${h}px` }}>
                                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase">
                                    {['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pie Chart Section */}
                <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-8">Spending by Category</h4>
                    <div className="w-40 h-40 md:w-48 md:h-48 mx-auto relative mb-8">
                        <div className="w-full h-full rounded-full border-[15px] md:border-[20px] border-emerald-400 border-t-pink-400 border-r-indigo-400 border-l-cyan-400 rotate-45 flex items-center justify-center">
                            <div className="rotate-[-45deg] text-center">
                                <span className="block text-xs font-bold text-slate-400 uppercase">Total</span>
                                <span className="text-sm font-black text-slate-800">${totalAmount.toFixed(0)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
                        {['Food', 'Travel', 'Ent.', 'Bills'].map((l, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${['bg-pink-400', 'bg-cyan-400', 'bg-red-400', 'bg-indigo-400'][i]}`}></div>
                                <span className="text-[10px] font-bold text-slate-400">{l}</span>
                            </div>
                        ))}
                    </div>
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