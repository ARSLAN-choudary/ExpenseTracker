import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import Expense from './pages/Expense';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ExpenseProvider>
      <Router>
        <div className="flex min-h-screen bg-[#f8fafc]">
          
          
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile Header*/}
            <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-50">
              <div className="flex items-center gap-2">
                <div className="bg-[#00a389] p-1 rounded text-white font-bold text-xs">E</div>
                <span className="font-bold text-slate-800 text-sm">Expensy</span>
              </div>
              
              {/* Hamburger Menu Icon Button */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 bg-slate-50 rounded-lg text-slate-600 hover:text-[#00a389] transition-colors"
              >
                <Menu size={20} />
              </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ExpenseProvider>
  );
}

export default App;