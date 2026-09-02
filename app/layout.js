'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShieldCheck, UserPlus, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
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

<<<<<<< HEAD
  // Book Navigation Fix
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
=======
  // Services Click Handler: Smooth Scroll to Services Section
  const handleServicesClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Safe Navigation Handler
>>>>>>> 7e18783265cc1633bfa7bae25f3a6ae4a76ed1b6
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
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-slate-50 antialiased min-h-screen flex flex-col justify-between">
        
        {/* NAVBAR */}
        {mounted && !isAdminPage && (
          <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-50/80 py-3 transition-all border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4">
              <header className="bg-white/90 border border-slate-200/80 px-6 py-2.5 rounded-2xl shadow-sm flex items-center justify-between">
                
                {/* Logo */}
                <Link
                  href="/"
                  onClick={handleHomeClick}
                  className="text-lg font-extrabold text-slate-900 bg-teal-50/80 hover:bg-teal-100/80 text-teal-800 px-4 py-1.5 rounded-xl flex items-center gap-2 border border-teal-200/60 transition-all hover:scale-105 active:scale-95"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
                  ServiceHub
                </Link>

                {/* Nav Links */}
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

<<<<<<< HEAD
                  {/* Fixed Book a Service Button */}
                  <button
                    onClick={handleBookClick}
                    className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white/60 hover:font-bold transition-all duration-200 cursor-pointer"
=======
                  <Link
                    href="/#services"
                    onClick={handleServicesClick}
                    className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white/60 hover:font-bold transition-all duration-200"
>>>>>>> 7e18783265cc1633bfa7bae25f3a6ae4a76ed1b6
                  >
                    Book a Service
                  </button>

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

                {/* Right Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAdminLoginClick}
                    className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200/80 hover:bg-teal-100/80 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ShieldCheck size={14} className="text-teal-600" />
                    Admin Login
                  </button>

                  {/* New Sign Up Button */}
                  <Link
<<<<<<< HEAD
                    href="/signup"
                    className="bg-[#00667e] hover:bg-[#005266] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-teal-900/10 flex items-center gap-1.5 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
=======
                    href="/#services"
                    onClick={handleServicesClick}
                    className="bg-[#00667e] hover:bg-[#005266] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-teal-900/10 flex items-center gap-1.5 transition-all hover:gap-2 active:scale-95"
>>>>>>> 7e18783265cc1633bfa7bae25f3a6ae4a76ed1b6
                  >
                    <UserPlus size={14} />
                    Sign Up
                  </Link>
                </div>
              </header>
            </div>
          </div>
        )}

        {/* PAGE CONTENT */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        {mounted && !isAdminPage && (
          <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* Brand Info */}
                <div className="space-y-4">
                  <Link
                    href="/"
                    onClick={handleHomeClick}
                    className="text-xl font-extrabold text-white flex items-center gap-2 hover:scale-105 transition-transform duration-200 origin-left inline-block"
                  >
                    <span className="w-3 h-3 rounded-full bg-teal-500 inline-block animate-pulse"></span>
                    ServiceHub
                  </Link>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Reliable, fast, and professional home services. Get it fixed, not stressed.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Quick Links</h4>
                  <ul className="space-y-2.5 text-xs">
                    <li>
                      <Link href="/" onClick={handleHomeClick} className="hover:text-teal-400 hover:font-bold hover:scale-105 transition-all duration-200 inline-block">
                        Home
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleBookClick} className="hover:text-teal-400 hover:font-bold hover:scale-105 transition-all duration-200 cursor-pointer inline-block text-left">
                        Book a Service
                      </button>
                    </li>
                    <li>
                      <Link href="/about" className="hover:text-teal-400 hover:font-bold hover:scale-105 transition-all duration-200 inline-block">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/term" className="hover:text-teal-400 hover:font-bold hover:scale-105 transition-all duration-200 inline-block">
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Account Links */}
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Account</h4>
                  <ul className="space-y-2.5 text-xs">
                    <li>
                      <Link href="/signup" className="hover:text-teal-400 hover:font-bold hover:scale-105 transition-all duration-200 inline-block">
                        Customer Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" className="hover:text-teal-400 hover:font-bold hover:scale-105 transition-all duration-200 inline-block">
                        Customer Login
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleAdminLoginClick} className="hover:text-teal-400 hover:font-bold hover:scale-105 transition-all duration-200 cursor-pointer inline-block text-left">
                        Admin Login
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Contact Us</h4>
                  <ul className="space-y-3 text-xs">
                    <li className="flex items-center gap-2 hover:text-teal-400 transition-colors cursor-pointer group">
                      <Phone size={14} className="text-teal-500 group-hover:scale-125 transition-transform" />
                      <span>+1 (555) 019-2834</span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-teal-400 transition-colors cursor-pointer group">
                      <Mail size={14} className="text-teal-500 group-hover:scale-125 transition-transform" />
                      <span>support@servicehub.com</span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-teal-400 transition-colors cursor-pointer group">
                      <MapPin size={14} className="text-teal-500 group-hover:scale-125 transition-transform" />
                      <span>123 Service Street, Business Hub</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Copyright */}
              <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                <p>© {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                <div className="flex gap-4">
                  <Link href="/term" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
                  <Link href="/term" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
                </div>
              </div>

            </div>
          </footer>
        )}

      </body>
    </html>
  );
}