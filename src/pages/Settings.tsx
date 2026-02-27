import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';

 const Settings: React.FC = () => {
  const { expenses } = useExpenses();

  const downloadCSV = () => {
    if (expenses.length === 0) {
      alert("Koi data nahi hai download karne ke liye!");
      return;
    }

    // 1. CSV Headers define karein
    const headers = ["Title", "Amount", "Category", "Date"];
    
    // 2. Data rows ko map karein
    const rows = expenses.map(exp => [
      exp.title,
      exp.amount,
      exp.category,
      exp.date
    ]);

    // 3. Headers aur Rows ko join karke string banayein
    const csvContent = [
      headers.join(","), 
      ...rows.map(row => row.join(","))
    ].join("\n");

    // 4. Blob (Binary Large Object) banayein
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // 5. Temporary link banakar click trigger karein
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Expense_Report_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 text-[13px] mt-1">Manage your account and preferences</p>
      </header>

      {/* 1. Profile Information */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/20">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
             Profile Information
          </h3>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase mb-2">Full Name</label>
              <input 
                type="text" 
                defaultValue="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-[#f5f3f0] border-transparent outline-none focus:bg-white focus:border-[#00a389] transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase mb-2">Email</label>
              <input 
                type="email" 
                defaultValue="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#f5f3f0] border-transparent outline-none focus:bg-white focus:border-[#00a389] transition-all text-sm font-medium"
              />
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-100">
            Save Changes
          </button>
        </div>
      </section>

      {/* 2. Monthly Budget Setting */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/20">
          <h3 className="text-sm font-bold text-slate-800">Monthly Budget</h3>
        </div>
        <div className="p-8 space-y-6">
          <div className="max-w-xs">
            <label className="block text-[11px] font-black text-slate-500 uppercase mb-2">Budget Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input 
                type="number" 
                defaultValue="2000"
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-[#f5f3f0] border-transparent outline-none focus:bg-white focus:border-[#00a389] transition-all text-sm font-bold"
              />
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-100">
            Update Budget
          </button>
        </div>
      </section>

      {/* 3. Notifications (Toggles) */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/20">
          <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
        </div>
        <div className="p-6 divide-y divide-gray-50">
          {[
            { title: 'Budget Alerts', desc: 'Get notified when you exceed your budget', enabled: true },
            { title: 'Expense Reminders', desc: 'Daily reminder to log your expenses', enabled: false },
            { title: 'Monthly Reports', desc: 'Receive monthly spending summary', enabled: true },
          ].map((item, i) => (
            <div key={i} className="py-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                <p className="text-[11px] text-slate-400 font-medium">{item.desc}</p>
              </div>
              <button className={`w-11 h-6 rounded-full transition-colors relative ${item.enabled ? 'bg-slate-800' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.enabled ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Data Management */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/20">
          <h3 className="text-sm font-bold text-slate-800">Data Management</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Export Data</h4>
              <p className="text-[11px] text-slate-400 font-medium">Download all your expenses as CSV</p>
            </div>
            <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-gray-50 transition-all">
              <Download size={14} /> Export
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Clear All Data</h4>
              <p className="text-[11px] text-slate-400 font-medium text-red-400">Permanently delete all expenses</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-red-100 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50 transition-all">
              <Trash2 size={14} /> Clear Data
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Settings;