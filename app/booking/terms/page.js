'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText, Lock, AlertCircle, Clock } from 'lucide-react';

export default function BookingTermsPage() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-indigo-950 text-white py-12 px-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link
            href="/booking/review"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Booking Review
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="border-b border-slate-800 pb-6 space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-500/10 text-teal-400 rounded-2xl border border-teal-500/20">
                <FileText size={24} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Terms & Conditions</h1>
                <p className="text-xs text-slate-400">Last updated: September 2026</p>
              </div>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Please read these terms and conditions carefully before confirming your booking.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section className="space-y-1">
              <h2 className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
                <Clock size={16} className="text-teal-400" /> 1. Booking & Scheduling
              </h2>
              <p>All bookings are subject to availability and final confirmation.</p>
            </section>

            <section className="space-y-1">
              <h2 className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
                <ShieldCheck size={16} className="text-teal-400" /> 2. Customer Responsibilities
              </h2>
              <p>The customer must ensure safe and unhindered access to the premises at the agreed appointment time.</p>
            </section>

            <section className="space-y-1">
              <h2 className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
                <AlertCircle size={16} className="text-teal-400" /> 3. Cancellations
              </h2>
              <p>You may cancel or reschedule your service free of charge up to 24 hours prior to appointment.</p>
            </section>

            <section className="space-y-1">
              <h2 className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
                <Lock size={16} className="text-teal-400" /> 4. Privacy & Data Protection
              </h2>
              <p>Your personal details are strictly used for managing and delivering your booking requests.</p>
            </section>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 text-center sm:text-left">
              Questions regarding these terms? Contact our support team.
            </p>
            <Link
              href="/booking/review"
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Back to Review & Confirm
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}