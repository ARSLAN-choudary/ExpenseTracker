import { LayoutDashboard, PlusCircle, Wallet, BarChart3, Settings, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Sidebar ke props define karein
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18}/>, path: '/' },
    { name: 'Add Expense', icon: <PlusCircle size={18}/>, path: '/add-expense' },
    { name: 'Expenses', icon: <Wallet size={18}/>, path: '/expense' },
    { name: 'Analytics', icon: <BarChart3 size={18}/>, path: '/analytics' },
    { name: 'Settings', icon: <Settings size={18}/>, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-[60] lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-[70] h-screen bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#00a389] p-1.5 rounded-lg text-white">
              <Wallet size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-[17px] text-slate-800 tracking-tight">Expensy</span>
          </div>
          
          {/* Mobile Close Button */}
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 p-1">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)} 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
                location.pathname === item.path 
                ? 'bg-[#f0fdfa] text-[#00a389]' 
                : 'text-slate-500 hover:bg-gray-50'
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-black shadow-sm">JD</div>
            <div className="overflow-hidden">
              <p className="text-[13px] font-bold text-slate-800 truncate">John Doe</p>
              <p className="text-[11px] text-slate-400 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;