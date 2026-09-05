'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookingSteps } from "@/components/booking/BookingSteps";
import { getDraft, saveDraft } from "@/lib/bookingDraft";
import { User, Mail, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

function ContactFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactMethod, setContactMethod] = useState('Phone');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const currentDraft = getDraft();
    if (currentDraft?.fullName) setFullName(currentDraft.fullName);
    if (currentDraft?.phone) setPhone(currentDraft.phone);
    if (currentDraft?.email) setEmail(currentDraft.email);
    if (currentDraft?.contactMethod) setContactMethod(currentDraft.contactMethod);
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    saveDraft({
      fullName,
      phone,
      email,
      contactMethod
    });

    router.push('/booking/review');
  };

  return (
    <form onSubmit={handleNext} className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
      {/* Full Name Input */}
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-teal-300 flex items-center gap-2">
          <User size={16} /> Full name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Smith"
          className="w-full p-3.5 rounded-2xl border border-slate-700 bg-slate-950/60 text-white text-xs sm:text-sm focus:border-teal-400 outline-none"
        />
      </div>

      {/* Phone Number Input */}
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-teal-300 flex items-center gap-2">
          <Phone size={16} /> Phone number <span className="text-rose-500">*</span>
        </label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="04XX XXX XXX"
          className="w-full p-3.5 rounded-2xl border border-slate-700 bg-slate-950/60 text-white text-xs sm:text-sm focus:border-teal-400 outline-none"
        />
      </div>

      {/* Email Address Input */}
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-teal-300 flex items-center gap-2">
          <Mail size={16} /> Email address <span className="text-rose-500">*</span>
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full p-3.5 rounded-2xl border border-slate-700 bg-slate-950/60 text-white text-xs sm:text-sm focus:border-teal-400 outline-none"
        />
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-2 pt-1">
        <label className="text-xs sm:text-sm font-bold text-teal-300">
          Preferred contact method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setContactMethod('Phone')}
            className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              contactMethod === 'Phone'
                ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}
          >
            Phone
          </button>
          <button
            type="button"
            onClick={() => setContactMethod('Email')}
            className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              contactMethod === 'Email'
                ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}
          >
            Email
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push(returnTo === 'review' ? '/booking/review' : '/booking/datetime')}
          className="px-5 py-3 rounded-2xl border border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          type="submit"
          disabled={!fullName || !phone || !email}
          className="px-7 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          Confirm Booking <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}

export default function BookingContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-indigo-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <BookingSteps currentStep={5} />

        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-widest px-3 py-1 bg-teal-900/60 rounded-full border border-teal-500/30">
            Step 5: Contact
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Your contact details</h1>
          <p className="text-sm text-slate-400">We'll use these to keep you updated on your booking.</p>
        </div>

        <Suspense fallback={<div className="text-center py-10 text-slate-400">Loading form...</div>}>
          <ContactFormContent />
        </Suspense>
      </div>
    </div>
  );
}