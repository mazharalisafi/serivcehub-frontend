'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookingSteps } from "@/components/booking/BookingSteps";
import { getDraft, saveDraft } from "@/lib/bookingDraft";
import { Calendar as CalendarIcon, ArrowRight, ArrowLeft } from 'lucide-react';

const SLOTS_CONFIG = [
  { time: '9:00 AM', isBooked: false },
  { time: '10:00 AM', isBooked: false },
  { time: '11:00 AM', isBooked: false },
  { time: '12:00 PM', isBooked: true },
  { time: '1:00 PM', isBooked: false },
  { time: '2:00 PM', isBooked: false },
  { time: '3:00 PM', isBooked: false },
  { time: '4:00 PM', isBooked: false },
  { time: '5:00 PM', isBooked: false },
];

function DatetimeFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const dateInputRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const currentDraft = getDraft();
    if (currentDraft?.date) setSelectedDate(currentDraft.date);
    if (currentDraft?.timeSlot) setSelectedSlot(currentDraft.timeSlot);
  }, []);

  const openDatePicker = () => {
    if (dateInputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;

    saveDraft({
      date: selectedDate,
      timeSlot: selectedSlot,
    });

    if (returnTo === 'review') {
      router.push('/booking/review');
    } else {
      router.push('/booking/contact');
    }
  };

  return (
    <form onSubmit={handleContinue} className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-teal-300">
          Preferred date <span className="text-rose-500">*</span>
        </label>
        <div className="relative flex items-center">
          <input
            ref={dateInputRef}
            type="date"
            required
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlot('');
            }}
            className="w-full p-3.5 pr-14 rounded-2xl border border-slate-700 bg-slate-950/80 text-white text-xs sm:text-sm outline-none focus:border-teal-400 cursor-pointer"
          />
          <button
            type="button"
            onClick={openDatePicker}
            className="absolute right-3 p-1.5 rounded-xl border-2 border-teal-400/80 bg-teal-950 text-teal-300 hover:bg-teal-900 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm z-10"
            title="Open Calendar"
          >
            <CalendarIcon size={18} className="stroke-[2.5]" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs sm:text-sm font-bold text-teal-300">
          Preferred time <span className="text-rose-500">*</span>
        </label>

        {!selectedDate ? (
          <p className="text-xs text-slate-400 italic">
            Choose a date first to see available times.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {SLOTS_CONFIG.map((slot) => {
              const isSelected = selectedSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={slot.isBooked}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`p-3 rounded-2xl border text-center text-xs font-semibold transition-all cursor-pointer relative ${
                    slot.isBooked
                      ? 'bg-slate-950/40 border-slate-800/80 text-slate-600 cursor-not-allowed line-through opacity-50'
                      : isSelected
                      ? 'bg-teal-500/20 border-teal-400 text-teal-200 font-bold shadow-md shadow-teal-500/10 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {slot.time} {slot.isBooked && <span className="block text-[9px] no-underline font-normal text-rose-400/80">Booked</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push(returnTo === 'review' ? '/booking/review' : '/booking/location')}
          className="px-5 py-3 rounded-2xl border border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          type="submit"
          disabled={!selectedDate || !selectedSlot}
          className="px-7 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {returnTo === 'review' ? 'Save & Return to Review' : 'Continue'} <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}

export default function BookingDatetimePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-indigo-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <BookingSteps currentStep={4} />

        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-widest px-3 py-1 bg-teal-900/60 rounded-full border border-teal-500/30">
            Step 4: Date & Time
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2">
            <CalendarIcon className="text-teal-400" size={26} /> Pick a date & time
          </h1>
          <p className="text-sm text-slate-400">
            We're available 9:00 AM - 5:00 PM. Availability is checked across all our staff.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-10 text-slate-400">Loading form...</div>}>
          <DatetimeFormContent />
        </Suspense>
      </div>
    </div>
  );
}