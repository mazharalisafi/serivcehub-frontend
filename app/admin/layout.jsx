'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Grid, 
  Calendar as CalendarIcon, 
  BookOpen, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Wrench,
  Menu,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Services & Categories', href: '/admin/services', icon: Grid },
  { name: 'Calendar', href: '/admin/calendar', icon: CalendarIcon },
  { name: 'Bookings', href: '/admin/bookings', icon: BookOpen },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Invoices', href: '/admin/invoices', icon: FileText },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Booking', desc: 'John Doe booked Plumbing Repair for tomorrow', time: '10m ago', unread: true },
    { id: 2, title: 'Payment Received', desc: 'Invoice #INV-2024-001 paid ($120.00)', time: '1h ago', unread: true },
    { id: 3, title: 'System Notice', desc: 'Weekly backup completed successfully', time: '5h ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleDirectLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row selection:bg-teal-500 selection:text-slate-950 font-sans">
      
      {/* Mobile Dark Overlay Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar (Responsive Drawer) */}
      <aside className={`w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between p-4 fixed top-0 bottom-0 left-0 z-50 backdrop-blur-md transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="space-y-6">
          
          {/* Admin Brand Header & Mobile Close */}
          <div className="flex items-center justify-between">
            <Link 
              href="/admin/dashboard" 
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 bg-slate-950/80 rounded-2xl border border-teal-500/20 hover:border-teal-500/50 transition-all group shadow-lg shadow-teal-500/5 cursor-pointer w-full"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform shrink-0">
                <Wrench size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight block text-white group-hover:text-teal-300 transition-colors">AdminPortal</span>
                <span className="text-[10px] text-teal-400 font-mono tracking-widest uppercase font-semibold">ServiceHub</span>
              </div>
            </Link>

            <button 
              type="button" 
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-slate-400 hover:text-white lg:hidden ml-2"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-md shadow-teal-500/10 font-bold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-teal-400' : 'text-slate-500'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Footer & Logout */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <Link 
            href="/admin/settings"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-800/60 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 text-xs font-extrabold group-hover:border-teal-400 transition-colors shrink-0">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors truncate">Admin User</p>
              <p className="text-[10px] text-slate-400 truncate">admin@servicehub.com</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleDirectLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 gap-4">
          
          {/* Mobile Sidebar Toggle Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-300 hover:text-white rounded-xl border border-slate-800 bg-slate-950/80 lg:hidden shrink-0"
            aria-label="Open Sidebar"
          >
            <Menu size={20} />
          </button>

          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-xs sm:max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-all"
            />
          </form>

          {/* Notifications Dropdown Container */}
          <div className="relative shrink-0">
            <button 
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition-colors border border-slate-800/80 cursor-pointer"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <button 
                      type="button"
                      onClick={markAllAsRead} 
                      className="text-[10px] text-teal-400 hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3.5 space-y-1 transition-colors ${n.unread ? 'bg-teal-500/5' : 'bg-transparent'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 bg-slate-950 text-center border-t border-slate-800">
                  <button 
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 w-full overflow-x-hidden">
          {children}
        </main>
      </div>

    </div>
  );
}