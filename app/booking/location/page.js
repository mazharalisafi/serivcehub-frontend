'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookingSteps } from "@/components/booking/BookingSteps";
import { getDraft, saveDraft } from "@/lib/bookingDraft";
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';

const AUSTRALIAN_STATES = [
  { value: 'NSW', label: 'New South Wales (NSW)' },
  { value: 'VIC', label: 'Victoria (VIC)' },
  { value: 'QLD', label: 'Queensland (QLD)' },
  { value: 'WA', label: 'Western Australia (WA)' },
  { value: 'SA', label: 'South Australia (SA)' },
  { value: 'TAS', label: 'Tasmania (TAS)' },
  { value: 'ACT', label: 'Australian Capital Territory (ACT)' },
  { value: 'NT', label: 'Northern Territory (NT)' },
];

export default function BookingLocationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [state, setState] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [postcode, setPostcode] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const currentDraft = getDraft();
    if (currentDraft?.state) setState(currentDraft.state);
    if (currentDraft?.fullAddress) setFullAddress(currentDraft.fullAddress);
    if (currentDraft?.postcode) setPostcode(currentDraft.postcode);
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (!state || !fullAddress || !postcode) return;

    saveDraft({
      state,
      fullAddress,
      postcode,
      address: `${fullAddress}, ${state} ${postcode}`
    });

    if (returnTo === 'review') {
      router.push('/booking/review');
    } else {
      router.push('/booking/datetime');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-indigo-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <BookingSteps currentStep={3} />

        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-widest px-3 py-1 bg-teal-900/60 rounded-full border border-teal-500/30">
            Step 3: Location
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2">
            <MapPin className="text-teal-400" size={26} /> Where do you need us?
          </h1>
          <p className="text-sm text-slate-400">
            We currently service all of Australia. Select your state, then write your full address.
          </p>
        </div>

        <form onSubmit={handleNext} className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* State Selection */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs sm:text-sm font-bold text-teal-300">
                State <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-3.5 rounded-2xl border border-slate-700 bg-slate-950 text-white text-xs sm:text-sm focus:border-teal-400 outline-none cursor-pointer"
              >
                <option value="" disabled className="bg-slate-900 text-slate-400">Select your state</option>
                {AUSTRALIAN_STATES.map((s) => (
                  <option key={s.value} value={s.value} className="bg-slate-900 text-white py-2">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Postcode Input */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-teal-300">
                Postcode <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g. 2150"
                className="w-full p-3.5 rounded-2xl border border-slate-700 bg-slate-950/60 text-white text-xs sm:text-sm focus:border-teal-400 outline-none"
              />
            </div>
          </div>

          {/* Full Address Textarea */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-teal-300">
              Full address <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              placeholder="e.g. Unit 4, 12 Example Street, Parramatta NSW 2150"
              className="w-full p-4 rounded-2xl border border-slate-700 bg-slate-950/60 text-white text-xs sm:text-sm focus:border-teal-400 outline-none resize-none"
            />
            <p className="text-[11px] text-slate-400">
              Include unit/house number, street, suburb and postcode
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push(returnTo === 'review' ? '/booking/review' : '/booking/details')}
              className="px-5 py-3 rounded-2xl border border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <button
              type="submit"
              disabled={!state || !fullAddress || !postcode}
              className="px-7 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {returnTo === 'review' ? 'Save & Return to Review' : 'Continue'} <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}