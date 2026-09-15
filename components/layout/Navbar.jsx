'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck, LogIn, Wrench, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleHomeClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMenu();
  };

  const handleAdminLoginClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (!mounted) return;
    
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin-login');
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Book a Service", href: "/booking" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
        
        {/* BRAND LOGO */}
        <Link href="/" onClick={handleHomeClick} className="group flex items-center gap-2">
          <div className="flex size-8 sm:size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
            <Wrench className="size-4 sm:size-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              Service<span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Hub</span>
            </span>
            <span className="text-[8px] sm:text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Verified Pros</span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 p-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.href === '/' ? handleHomeClick : closeMenu}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Protected Admin Button */}
          <Button
  onClick={handleAdminLoginClick}
  variant="ghost"
  size="sm"
  className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-slate-300 hover:border-teal-500/40 hover:text-white cursor-pointer"
>
  <ShieldCheck className="size-3.5 text-teal-400" />
  <span>Admin Login</span>
</Button>

          {/* Sign In Button */}
          <Link href="/login" onClick={closeMenu}>
            <Button
              size="sm"
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-extrabold text-slate-950 shadow-md shadow-teal-500/20"
            >
              <LogIn className="size-3.5" />
              <span>Sign In</span>
            </Button>
          </Link>

          {/* Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden size-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={link.href === '/' ? handleHomeClick : closeMenu}
              className="block rounded-lg px-4 py-2.5 text-sm font-bold text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}