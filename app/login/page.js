'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';

export default function CustomerLoginPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-teal-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Wrench size={20} />
            </div>
            <span>Service<span className="text-teal-400">Hub</span></span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/admin-login"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 border border-slate-800 hover:bg-slate-800/80 hover:text-white transition-all flex items-center gap-1.5"
            >
              <ShieldCheck size={15} className="text-teal-400" /> Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-slate-950/80 relative z-10">
          <div className="text-center space-y-2 mb-8">
            <div className="w-12 h-12 bg-teal-500/10 rounded-2xl border border-teal-500/20 flex items-center justify-center mx-auto mb-4 text-teal-400 shadow-inner">
              <Mail size={24} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Sign In</h1>
            <p className="text-xs text-slate-400">
              Enter your email to receive a passwordless magic link.
            </p>
          </div>

          {submitted ? (
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-6 text-center space-y-3">
              <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto text-teal-300">
                ✓
              </div>
              <h3 className="text-sm font-bold text-teal-300">Magic Link Sent!</h3>
              <p className="text-xs text-slate-400">
                Check <span className="text-white font-medium">{email}</span> for your login link.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-teal-400 underline hover:text-teal-300 transition-colors pt-2 block mx-auto"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Send Magic Link</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-600 border-t border-slate-900">
        © {new Date().getFullYear()} ServiceHub. All rights reserved.
      </footer>
    </div>
  );
}