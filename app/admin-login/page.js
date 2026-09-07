'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password.length >= 6) {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12 relative overflow-hidden selection:bg-teal-500 selection:text-slate-950">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-slate-950/90 relative z-10 space-y-6">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-inner">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Staff & Admin Login</h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Sign in with your work email and password to manage bookings and portal services.
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 text-xs text-amber-300 text-center font-medium">
          <span className="font-bold">Demo mode:</span> Enter any valid email and password (6+ chars) to sign in to the dashboard.
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Work email <span className="text-rose-400">*</span>
            </label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@servicehub.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Password <span className="text-rose-400">*</span>
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Checkbox & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="rounded border-slate-800 bg-slate-950 text-teal-500 focus:ring-0"
              />
              Keep me signed in
            </label>

            <button type="button" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer group mt-2"
          >
            <span>Sign In</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer Note (Replaced signup with customer signin) */}
        <p className="text-[11px] text-center text-slate-500 pt-2 border-t border-slate-800/60">
          This area is for ServiceHub staff only. Customers should use the{' '}
          <Link href="/login" className="text-teal-400 hover:underline font-semibold">
            customer signin
          </Link>.
        </p>

      </div>
    </div>
  );
}