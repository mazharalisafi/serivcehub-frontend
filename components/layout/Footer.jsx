'use client';

import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs pt-12 pb-8 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Wrench className="size-4" />
            </div>
            <span className="font-display text-base font-extrabold text-white">
              Service<span className="text-teal-400">Hub</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Reliable, fast, and professional home services. Get it fixed, not stressed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-teal-400 transition-colors">Book a Service</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Account Section (Only Admin Login) */}
        <div>
          <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-3">Account</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/admin-login" className="hover:text-teal-400 transition-colors">Admin Login</Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-3">Contact Us</h4>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2">
              <Phone className="size-3.5 text-teal-400" />
              <span>+1 (555) 019-2834</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-3.5 text-teal-400" />
              <span>support@servicehub.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-3.5 text-teal-400" />
              <span>123 Service Street, Business Hub</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}