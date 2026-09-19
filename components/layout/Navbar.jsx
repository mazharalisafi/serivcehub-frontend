'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Wrench, ShieldCheck, CalendarCheck2 } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Scroll to services section or navigate to home
  const handleBookServiceClick = (e) => {
    e.preventDefault();
    if (pathname === '/') {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 600, behavior: 'smooth' });
      }
    } else {
      router.push('/#services');
    }
  };

  // Smooth scroll to top when center logo is clicked
  const handleLogoClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-2xl transition-all shadow-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LEFT: Book a Service Button */}
        <div className="flex-1 flex items-center justify-start">
          <button
            onClick={handleBookServiceClick}
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-slate-900/80 border border-teal-500/30 text-teal-300 font-bold text-xs tracking-wide shadow-lg shadow-teal-500/5 hover:bg-teal-500/10 hover:border-teal-400 hover:text-white hover:shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <CalendarCheck2 className="size-4 text-teal-400 group-hover:scale-110 transition-transform" />
            <span>Book a Service</span>
          </button>
        </div>

        {/* CENTER: Attractive Logo Button (Scrolls to Top) */}
        <div className="flex-1 flex justify-center">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group relative flex items-center gap-3.5 px-5 py-2 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900/90 transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-teal-500/10 hover:scale-105 active:scale-95 cursor-pointer"
            title="Click to scroll to top"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/20 via-emerald-500/20 to-teal-600/10 border border-teal-500/40 text-teal-300 group-hover:border-teal-300 group-hover:text-white transition-all duration-300">
              <Wrench className="size-5 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-lg font-extrabold text-white tracking-tight leading-tight group-hover:text-teal-300 transition-colors">
                Service Hub
              </span>
              <span className="text-[9px] font-extrabold tracking-widest text-teal-400 uppercase">
                Verified Pros
              </span>
            </div>
          </Link>
        </div>

        {/* RIGHT: Admin Login Button (Matching Style) */}
        <div className="flex-1 flex justify-end items-center">
          <Link
            href="/admin-login"
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-slate-900/80 border border-teal-500/30 text-teal-300 font-bold text-xs tracking-wide shadow-lg shadow-teal-500/5 hover:bg-teal-500/10 hover:border-teal-400 hover:text-white hover:shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <ShieldCheck className="size-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Admin Login</span>
          </Link>
        </div>

      </div>
    </header>
  );
}