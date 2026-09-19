'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';

const TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM'
];

export default function DateTimeStep({ formData, updateFormData, onNext, onBack }) {
  const existingBookings = [
    { date: '2026-09-24', time: '12:00 PM' },
    { date: '2026-09-25', time: '10:00 AM' },
    { date: '2026-09-25', time: '2:00 PM' }
  ];

  const [selectedDate, setSelectedDate] = useState(formData.date || '');
  const [selectedTime, setSelectedTime] = useState(formData.time || '');

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const isStillAvailable = !isTimeSlotBooked(selectedDate, selectedTime);
      if (!isStillAvailable) {
        setSelectedTime('');
        updateFormData({ time: '' });
      }
    }
  }, [selectedDate]);

  const isTimeSlotBooked = (date, time) => {
    if (!date) return false;
    return existingBookings.some(
      (b) => b.date === date && b.time.trim() === time.trim()
    );
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    updateFormData({ date: newDate });
  };

  const handleTimeSelect = (time) => {
    if (isTimeSlotBooked(selectedDate, time)) return;
    setSelectedTime(time);
    updateFormData({ time });
  };

  const isFormValid = selectedDate !== '' && selectedTime !== '';

  return (
    <Card className="bg-[#0b1329]/70 border border-slate-700/50 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl max-w-3xl mx-auto space-y-6">
      {/* Date Picker Input */}
      <div>
        <label className="block text-xs font-semibold text-emerald-400 mb-2">
          Preferred date <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-[#050b18]/80 border border-slate-600/50 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400 transition cursor-pointer [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.8] [&::-webkit-calendar-picker-indicator]:opacity-100"
          />
        </div>
      </div>

      {/* Time Slots Grid */}
      <div>
        <label className="block text-xs font-semibold text-emerald-400 mb-2">
          Preferred time <span className="text-red-400">*</span>
        </label>
        
        {!selectedDate ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-700 text-center text-slate-400 text-sm bg-[#050b18]/40">
            📅 Please select a date above to view available time slots.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIME_SLOTS.map((time) => {
              const booked = isTimeSlotBooked(selectedDate, time);
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  type="button"
                  disabled={booked}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    booked
                      ? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/10'
                      : 'bg-[#050b18]/80 border-slate-700/60 text-slate-300 hover:border-emerald-400/50 hover:text-white'
                  }`}
                >
                  {time} {booked ? '(Booked)' : ''}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-medium hover:bg-slate-800 transition"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition ${
            isFormValid
              ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 cursor-pointer'
              : 'bg-slate-700 text-slate-400 opacity-50 cursor-not-allowed'
          }`}
        >
          Continue &rarr;
        </button>
      </div>
    </Card>
  );
}