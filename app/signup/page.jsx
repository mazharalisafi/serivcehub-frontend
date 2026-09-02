'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account created successfully! Redirecting to booking page...');
    router.push('/booking');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 my-8">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-8 shadow-xl space-y-6">
        
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Customer Account</h2>
          <p className="text-xs text-slate-500">Sign up to manage your service bookings effortlessly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-xs p-3 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00667e]"
              />
              <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs p-3 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00667e]"
              />
              <Mail size={16} className="absolute left-3 top-3.5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs p-3 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00667e]"
              />
              <Phone size={16} className="absolute left-3 top-3.5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full text-xs p-3 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00667e]"
              />
              <Lock size={16} className="absolute left-3 top-3.5 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00667e] hover:bg-[#005266] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Create Account</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-[#00667e] font-bold hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}