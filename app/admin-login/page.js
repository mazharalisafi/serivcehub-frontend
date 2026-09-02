'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Save auth state to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAdminLoggedIn', 'true');
    }

    setTimeout(() => {
      setLoading(false);
      // Redirect directly to admin dashboard
      router.push('/admin/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6">
        
        {/* Shield Icon & Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#0f172a] text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Shield size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Staff & Admin Login</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Sign in with your work email and password to manage bookings.
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-left">
          <p className="text-[11px] text-amber-900 font-medium leading-relaxed">
            <span className="font-bold">Demo mode:</span> Enter any valid email and password (6+ chars) to sign in to the dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Work email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@servicehub.com"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00667e] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs p-3 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00667e] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-[#00667e] focus:ring-0" />
              <span>Keep me signed in</span>
            </label>
            <a href="#" className="font-bold text-[#00667e] hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00667e] hover:bg-[#005266] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-400">
          This area is for ServiceHub staff only. Customers should use the{' '}
          <Link href="/signup" className="text-[#00667e] font-bold hover:underline">
            customer signup
          </Link>.
        </p>

      </div>
    </div>
  );
}