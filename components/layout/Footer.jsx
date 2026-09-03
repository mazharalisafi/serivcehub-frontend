import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
            <span className="w-2.5 h-2.5 bg-teal-400 rounded-full"></span>
            ServiceHub
          </div>
          <p className="leading-relaxed text-slate-400">
            Reliable, fast, and professional home services. Get it fixed, not stressed.
          </p>
        </div>

        {/* Quick Links - TERMS & CONDITIONS REMOVED */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-4">Quick Links</h4> 
          <ul className="space-y-2.5">
            <li><Link href="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-teal-400 transition-colors">Book a Service</Link></li>
            <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-4">Account</h4>
          <ul className="space-y-2.5">
            <li><Link href="/signup" className="hover:text-teal-400 transition-colors">Customer Sign Up</Link></li>
            <li><Link href="/login" className="hover:text-teal-400 transition-colors">Customer Login</Link></li>
            <li><Link href="/admin/login" className="hover:text-teal-400 transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-4">Contact Us</h4>
          <ul className="space-y-2.5 text-slate-400">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>+1 (555) 019-2834</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              <span>support@servicehub.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>123 Service Street, Business Hub</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
        <p>© 2026 ServiceHub. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}