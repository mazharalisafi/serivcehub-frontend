'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, LogIn, Sparkles, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Book a Service", href: "/booking" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* BRAND LOGO */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
            <Wrench className="size-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              Service<span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Hub</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Verified Pros</span>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 p-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
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
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs font-semibold text-slate-300 hover:border-teal-500/40 hover:bg-slate-800 hover:text-white transition-all"
            >
              <ShieldCheck className="size-3.5 text-teal-400" />
              Admin Portal
            </Button>
          </Link>

          <Link href="/login">
            <Button
              size="sm"
              className="items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 px-5 text-xs font-extrabold text-slate-950 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all"
            >
              <LogIn className="size-3.5" />
              Sign In
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}