import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../hooks/useExpenses';


type Category = 'Food' | 'Travel' | 'Bills' | 'Shopping' | 'Others';
type PaymentMethod = 'Credit Card' | 'Cash' | 'Bank Transfer' | 'Digital Wallet';

export const AddExpense: React.FC = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenses();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '' as Category,
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash' as PaymentMethod,
    notes: ''
  });

  // Validation Logic
  const isInvalid = !formData.title.trim() || !formData.amount || Number(formData.amount) <= 0 || !formData.category;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isInvalid) {
      alert("Please fill all required fields correctly!");
      setLoading(false);
      return;
    }

  
    const newEntry = {
      id: Date.now().toString(),
      title: formData.title,
      amount: Number(formData.amount), 
      category: formData.category,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes
    };

    try {
      addExpense(newEntry);
      setTimeout(() => {
        navigate('/expense'); 
      }, 500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Add New Expense</h1>
        <p className="text-slate-500 text-sm">Track your spending by adding a new expense</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Expense Details</h2>
        </div>

        <div className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Expense Title *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#f5f3f0] border-transparent focus:bg-white focus:border-[#00a389] transition-all text-sm outline-none"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Amount *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                step="0.01"
                required
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-[#f5f3f0] border-transparent focus:bg-white focus:border-[#00a389] transition-all text-sm outline-none font-bold"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Category *</label>
              <select 
                className="w-full px-4 py-3 rounded-xl bg-[#f5f3f0] border-transparent focus:bg-white focus:border-[#00a389] transition-all text-sm outline-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
              >
                <option value="">Select Category</option>
                <option value="Food">🍔 Food & Dining</option>
                <option value="Travel">🚗 Transport</option>
                <option value="Bills">💡 Bills & Utilities</option>
                <option value="Shopping">🛍️ Shopping</option>
                <option value="Others">📦 Others</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-[#f5f3f0] border-transparent focus:bg-white focus:border-[#00a389] transition-all text-sm outline-none"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-4 uppercase">Payment Method</label>
            <div className="grid grid-cols-2 gap-4">
              {['Credit Card', 'Cash', 'Bank Transfer', 'Digital Wallet'].map((method) => (
                <label key={method} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="w-4 h-4 text-[#00a389] focus:ring-[#00a389]"
                    checked={formData.paymentMethod === method}
                    onChange={() => setFormData({...formData, paymentMethod: method as PaymentMethod})}
                  />
                  <span className="text-sm text-slate-600 font-medium">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-8 pt-0 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="py-3 rounded-xl font-bold text-slate-500 border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isInvalid || loading}
            className={`py-3 rounded-xl font-bold text-white transition-all ${
              isInvalid || loading ? 'bg-gray-300' : 'bg-[#00a389] hover:bg-[#008f78]'
            }`}
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;