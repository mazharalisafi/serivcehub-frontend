'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('isCustomerLoggedIn', 'true');
      localStorage.setItem('customerEmail', formData.email);
    }

    setTimeout(() => {
      setLoading(false);
      alert('Login successful!');
      router.push('/booking');
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 my-8">
      <div className="bg-white border border-slate-200/80 rounded-3xl max-w-md w-full p-8 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-teal-50 text-[#00667e] rounded-2xl flex items-center justify-center mx-auto border border-teal-100 shadow-xs">
            <UserCheck size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Customer Login</h2>
          <p className="text-xs text-slate-500">Sign in to track your service requests and bookings.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="customer@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs p-3 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00667e] transition-colors"
              />
              <Mail size={16} className="absolute left-3 top-3.5 text-slate-400" />
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
                className="w-full text-xs p-3 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00667e] transition-colors"
              />
              <Lock size={16} className="absolute left-3 top-3.5 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-[#00667e] focus:ring-0" />
              <span>Remember me</span>
            </label>
            <a href="#" className="font-bold text-[#00667e] hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00667e] hover:bg-[#005266] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Logging in...' : 'Sign In'}</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-[11px] text-center text-slate-500">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#00667e] font-bold hover:underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}