'use client';

import Link from "next/link";
import { Phone, Mail, MapPin, Wrench, Shield, ArrowUpRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 text-slate-400">
      
      {/* GLOW EFFECT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          
          {/* COLUMN 1: BRAND INFO */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-teal-500 text-slate-950 font-bold">
                <Wrench className="size-4" />
              </div>
              <span className="font-display text-xl font-extrabold text-white">
                Service<span className="text-teal-400">Hub</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Book vetted, licensed local professionals for plumbing, electrical, and house cleaning in under 2 minutes.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 bg-teal-950/40 border border-teal-500/20 px-3 py-1.5 rounded-full w-fit">
              <Shield className="size-3.5" /> 100% Insured & Verified
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  Home <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  Book a Service <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  About Us <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SERVICES */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">Top Services</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/booking?service=house-cleaning" className="hover:text-teal-300 transition-colors">Residential Cleaning</Link></li>
              <li><Link href="/booking?service=plumbing" className="hover:text-teal-300 transition-colors">Plumbing Repairs</Link></li>
              <li><Link href="/booking?service=electrical" className="hover:text-teal-300 transition-colors">Electrical Works</Link></li>
              <li><Link href="/booking?service=ndis-cleaning" className="hover:text-teal-300 transition-colors">NDIS Care Support</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">Get In Touch</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li className="flex items-center gap-2.5 text-slate-300">
                <Phone className="size-4 text-teal-400 shrink-0" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="size-4 text-teal-400 shrink-0" />
                <span>support@servicehub.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="size-4 text-teal-400 shrink-0 mt-0.5" />
                <span>123 Service Street, Business Hub</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© 2026 ServiceHub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}