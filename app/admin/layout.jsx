'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, LogOut, CheckSquare, List, Calendar as CalendarIcon, Settings as SettingsIcon, LayoutDashboard } from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn');
    if (!loggedIn) {
      router.replace('/admin-login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('isAdminLoggedIn');
    router.replace('/');
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#00667e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { name: 'Review Queue', href: '/admin/dashboard', badge: '3', icon: CheckSquare },
    { name: 'All Bookings', href: '/admin/bookings', icon: List },
    { name: 'Calendar', href: '/admin/calendar', icon: CalendarIcon },
    { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#f3f7f8] text-slate-800 font-sans flex" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      
      {/* 4. LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200/80 p-6 flex flex-col justify-between shrink-0 min-h-screen">
        <div className="space-y-6">
          
          {/* 1. Clickable Admin Dashboard Title */}
          <Link href="/admin/dashboard" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-all group">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shadow-xs group-hover:scale-105 transition-transform">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-[#00667e] transition-colors">Admin Dashboard</h1>
              <p className="text-[11px] text-slate-500 font-medium">19 total bookings</p>
            </div>
          </Link>

          {/* Sidebar Navigation */}
          <nav className="space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase px-3 mb-2">Main Menu</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#00667e] text-white shadow-md shadow-teal-950/10'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-teal-900/60 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer mt-6"
        >
          <LogOut size={15} /> Sign out
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}