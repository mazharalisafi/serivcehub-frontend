'use client';

import { Calendar } from 'lucide-react';

const TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM (Booked)',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM'
];

export default function DateTimeStep({ formData, updateFormData, onNext, onBack }) {
  const handleSelectSlot = (slot) => {
    if (slot.includes('Booked')) return;
    updateFormData({ timeSlot: slot });
  };

  return (
    <div className="bg-[#0b1329]/90 border border-slate-800/90 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 max-w-3xl mx-auto">
      <div>
        <label className="block text-xs font-bold text-emerald-400 mb-2">
          Preferred date <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            value={formData.date || ''}
            onChange={(e) => updateFormData({ date: e.target.value })}
            className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-emerald-400 mb-2">
          Preferred time <span className="text-red-400">*</span>
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {TIME_SLOTS.map((slot) => {
            const isBooked = slot.includes('Booked');
            const isSelected = formData.timeSlot === slot;

            return (
              <button
                key={slot}
                type="button"
                disabled={isBooked}
                onClick={() => handleSelectSlot(slot)}
                className={`py-3 px-2 text-xs rounded-xl font-medium transition text-center border ${
                  isBooked
                    ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                    : isSelected
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/20'
                    : 'bg-[#050b18] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 transition"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm transition"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}