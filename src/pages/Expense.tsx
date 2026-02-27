import React from 'react';
import { Search, Trash2 } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses'; // Context hook import karein

const Expense: React.FC = () => {

  const { expenses, deleteExpense } = useExpenses();

  // Total calculate 
  const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">All Expenses</h1>
        <p className="text-slate-500 text-[13px] mt-1">Manage and track all your expenses</p>
      </header>

      {/* Filters  */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search expenses..." 
            className="w-full pl-10 pr-4 py-2.5 bg-[#f5f3f0] border-transparent rounded-lg text-sm outline-none focus:bg-white focus:border-[#00a389] transition-all"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="flex justify-between items-center px-2 mb-4 text-[13px] font-bold text-slate-500">
        <span>Showing {expenses.length} expenses</span>
        <span className="text-slate-800 uppercase tracking-tight">
          Total: <span className="text-lg text-[#00a389] ml-1">${totalAmount.toFixed(2)}</span>
        </span>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-6 gap-4 p-5 bg-gray-50/50 border-b border-gray-100 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          <div className="col-span-2">Title</div>
          <div>Category</div>
          <div>Date</div>
          <div>Payment</div>
          <div className="text-right">Amount</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-gray-50">
          {expenses.length > 0 ? (
            expenses.map((item) => (
              <div key={item.id} className="p-4 md:p-5 hover:bg-gray-50/80 transition-all group">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                  <div className="col-span-2 flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-800">{item.title}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase bg-emerald-50 text-emerald-500">
                      {item.category}
                    </span>
                  </div>
                  <div className="hidden md:block text-[13px] text-slate-500">{item.date}</div>
                  <div className="hidden md:block text-[13px] text-slate-500">{item.paymentMethod}</div>
                  <div className="text-right flex items-center justify-end gap-4">
                    <span className="text-[15px] font-black text-slate-800">${Number(item.amount).toFixed(2)}</span>
                    
                  
                    <button 
                      onClick={() => deleteExpense(item.id)} 
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-slate-400 italic">
              No expenses added yet. Go to 'Add Expense' to start tracking.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expense;