'use client';

import React, { useRef } from 'react';

const TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

export default function DateTimeStep({ formData, updateFormData, onNext, onBack }) {
  const dateInputRef = useRef(null);

  const handleDateChange = (e) => {
    updateFormData({ date: e.target.value });
  };

  const handleTimeSelect = (slot) => {
    updateFormData({ timeSlot: slot });
    setTimeout(() => {
      onNext();
    }, 150);
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Date Field */}
      <div>
        <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
          Preferred Date <span className="text-red-400">*</span>
        </label>
        <div 
          onClick={openDatePicker}
          className="relative flex items-center justify-between bg-[#050b18]/90 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-emerald-400/60 transition group"
        >
          <input
            ref={dateInputRef}
            type="date"
            name="date"
            value={formData.date || ''}
            onChange={handleDateChange}
            className="w-full bg-transparent text-slate-100 text-sm focus:outline-none cursor-pointer [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openDatePicker();
            }}
            className="text-emerald-400 group-hover:text-emerald-300 p-1 pointer-events-none"
            aria-label="Select Date"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Time Slots - Appears after selecting Date */}
      {formData.date ? (
        <div className="space-y-3 transition-all duration-300 ease-in-out">
          <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Preferred Time <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIME_SLOTS.map((slot) => {
              const isSelected = formData.timeSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleTimeSelect(slot)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                    isSelected
                      ? 'bg-emerald-400 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-[#050b18]/80 text-slate-300 border-slate-800 hover:border-slate-600 hover:bg-[#081226]'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">
          Please select a date above to view available time slots.
        </p>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-800">
        <button
          onClick={onBack}
          type="button"
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 transition"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          type="button"
          disabled={!formData.date || !formData.timeSlot}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition ${
            formData.date && formData.timeSlot
              ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 cursor-pointer'
              : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
          }`}
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}