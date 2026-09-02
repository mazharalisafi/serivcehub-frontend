'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'; // 'link' nahi, 'next/link' hona chahiye
import { useEffect, useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdminPage = pathname?.startsWith('/admin');

  // Home Click Handler: Smooth Scroll to Top
  const handleHomeClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Safe Navigation Handler
  const handleAdminLoginClick = (e) => {
    e.preventDefault();
    if (!mounted) return;
    
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn) {
      router.push('/admin/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-slate-50 antialiased">
        {mounted && !isAdminPage && (
          <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-50/80 py-3 transition-all border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4">
              <header className="bg-white/90 border border-slate-200/80 px-6 py-2.5 rounded-2xl shadow-sm flex items-center justify-between">
                
                {/* Brand Logo */}
                <Link
                  href="/"
                  onClick={handleHomeClick}
                  className="text-lg font-extrabold text-slate-900 bg-teal-50/80 hover:bg-teal-100/80 text-teal-800 px-4 py-1.5 rounded-xl flex items-center gap-2 border border-teal-200/60 transition-all hover:scale-105 active:scale-95"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
                  ServiceHub
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/50">
                  <Link
                    href="/"
                    onClick={handleHomeClick}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      pathname === '/' 
                        ? 'bg-white text-slate-900 shadow-xs font-bold' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 hover:font-bold'
                    }`}
                  >
                    Home
                  </Link>

                  <Link
                    href="/#services"
                    className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white/60 hover:font-bold transition-all duration-200"
                  >
                    Book a Service
                  </Link>

                  <Link
                    href="/about"
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      pathname === '/about' 
                        ? 'bg-white text-slate-900 shadow-xs font-bold' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 hover:font-bold'
                    }`}
                  >
                    About
                  </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all"
                  >
                    Log in
                  </Link>

                  <button
                    onClick={handleAdminLoginClick}
                    className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200/80 hover:bg-teal-100/80 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                  >
                    <ShieldCheck size={14} className="text-teal-600" />
                    Admin Login
                  </button>

                  <Link
                    href="/#services"
                    className="bg-[#00667e] hover:bg-[#005266] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-teal-900/10 flex items-center gap-1.5 transition-all hover:gap-2 active:scale-95"
                  >
                    Book Now
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </header>
            </div>
          </div>
        )}

        <main>{children}</main>
      </body>
    </html>
  );
}