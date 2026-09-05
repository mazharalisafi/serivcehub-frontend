'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShieldCheck, LogIn, Phone, Mail, MapPin, Wrench } from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdminPage = pathname?.startsWith('/admin');

  // Home Click: Smooth scroll to top
  const handleHomeClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Book Navigation
  const handleBookClick = (e) => {
    if (pathname === '/') {
      const bookingSection = document.getElementById('booking-section') || document.getElementById('services');
      if (bookingSection) {
        e.preventDefault();
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    router.push('/booking');
  };

  // Admin Login Navigation
  const handleAdminLoginClick = (e) => {
    e.preventDefault();
    if (!mounted) return;
    
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin-login');
    }
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <body suppressHydrationWarning={true} className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col justify-between selection:bg-teal-500 selection:text-slate-950">
        
        {/* NAVBAR */}
        {mounted && !isAdminPage && (
          <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
              
              {/* Logo */}
              <Link
                href="/"
                onClick={handleHomeClick}
                className="group flex items-center gap-2.5 transition-transform active:scale-95"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
                  <Wrench className="size-5 stroke-[2.5]" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Service<span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Hub</span>
                </span>
              </Link>

              {/* Nav Links */}
              <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/80 p-1.5 shadow-inner backdrop-blur-md">
                <Link
                  href="/"
                  onClick={handleHomeClick}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    pathname === '/' 
                      ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Home
                </Link>

                <button
                  onClick={handleBookClick}
                  className="px-5 py-2 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-300 cursor-pointer"
                >
                  Book a Service
                </button>

                <Link
                  href="/about"
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    pathname === '/about' 
                      ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  About
                </Link>
              </nav>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdminLoginClick}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-teal-500/40 hover:text-white transition-all cursor-pointer"
                >
                  <ShieldCheck size={14} className="text-teal-400" />
                  Admin Login
                </button>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold px-5 py-2 text-xs shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <LogIn size={14} />
                  Sign In
                </Link>
              </div>

            </div>
          </header>
        )}

        {/* PAGE CONTENT */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        {mounted && !isAdminPage && (
          <footer className="relative border-t border-slate-800/80 bg-slate-950 text-slate-400 overflow-hidden mt-20">
            
            {/* Top Cyan Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-teal-500 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                
                {/* Brand Info */}
                <div className="space-y-4">
                  <Link
                    href="/"
                    onClick={handleHomeClick}
                    className="flex items-center gap-2.5 group"
                  >
                    <div className="flex size-8 items-center justify-center rounded-lg bg-teal-400 text-slate-950 font-bold">
                      <Wrench className="size-4" />
                    </div>
                    <span className="text-xl font-extrabold text-white">
                      Service<span className="text-teal-400">Hub</span>
                    </span>
                  </Link>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Reliable, fast, and professional home services. Get it fixed, not stressed.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-3">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Quick Links</h4>
                  <ul className="space-y-2.5 text-xs">
                    <li>
                      <Link href="/" onClick={handleHomeClick} className="hover:text-teal-300 transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleBookClick} className="hover:text-teal-300 transition-colors cursor-pointer text-left">
                        Book a Service
                      </button>
                    </li>
                    <li>
                      <Link href="/about" className="hover:text-teal-300 transition-colors">
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Account Links */}
                <div className="space-y-3">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Account</h4>
                  <ul className="space-y-2.5 text-xs">
                    <li>
                      <Link href="/login" className="hover:text-teal-300 transition-colors">
                        Customer Sign In
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleAdminLoginClick} className="hover:text-teal-300 transition-colors cursor-pointer text-left">
                        Admin Login
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Contact Us</h4>
                  <ul className="space-y-2.5 text-xs">
                    <li className="flex items-center gap-2 text-slate-300">
                      <Phone size={14} className="text-teal-400 shrink-0" />
                      <span>+1 (555) 019-2834</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <Mail size={14} className="text-teal-400 shrink-0" />
                      <span>support@servicehub.com</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <MapPin size={14} className="text-teal-400 shrink-0" />
                      <span>123 Service Street, Business Hub</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Copyright */}
              <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                <p>© {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                <div className="flex gap-6">
                  <Link href="/term" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
                  <Link href="/term" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
                </div>
              </div>

            </div>
          </footer>
        )}

      </body>
    </html>
  );
}