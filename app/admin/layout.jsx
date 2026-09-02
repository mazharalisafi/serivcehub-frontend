'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, LogOut, CheckSquare, List, Calendar as CalendarIcon, Settings as SettingsIcon } from 'lucide-react';

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

  const tabs = [
    { name: 'Review Queue', href: '/admin/dashboard', badge: '3', icon: CheckSquare },
    { name: 'All Bookings', href: '/admin/bookings', icon: List },
    { name: 'Calendar', href: '/admin/calendar', icon: CalendarIcon },
    { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#f3f7f8] text-slate-800 font-sans p-6 space-y-6 relative" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shadow-xs">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-slate-500 font-medium">19 total bookings</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-xs hover:shadow-sm active:scale-95 cursor-pointer"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-1.5 inline-flex gap-1.5 shadow-xs">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#00667e] text-white shadow-md shadow-teal-950/10'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <Icon size={15} />
                {tab.name}
                {tab.badge && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-teal-900/60 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}