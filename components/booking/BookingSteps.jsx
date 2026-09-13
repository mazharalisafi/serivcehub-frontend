'use client';

import React from 'react';

const STEPS = [
  { id: 1, label: "Service", headerTitle: "Select a Service", sub: "Choose from our available professional services" },
  { id: 2, label: "Details", headerTitle: "Tell us about the service you need", sub: "A few details help us match you with the right professional and time slot." },
  { id: 3, label: "Location", headerTitle: "Where do you need us?", sub: "We currently service all of Australia. Select your state, then write your full address." },
  { id: 4, label: "Date & Time", headerTitle: "Pick a date & time", sub: "We're available 9:00 AM - 5:00 PM. Availability is checked across all our staff." },
  { id: 5, label: "Contact", headerTitle: "Your contact details", sub: "We'll use these to keep you updated on your booking." },
  { id: 6, label: "Review", headerTitle: "Review Your Booking", sub: "Please verify your details before final confirmation." }
];

export function BookingSteps({ currentStep }) {
  const current = STEPS[currentStep - 1] || STEPS[0];
  const progressPercent = Math.round((currentStep / STEPS.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3 mb-4">
      {/* Top Status & Percentage */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="font-semibold text-emerald-400">
          Step {currentStep} of {STEPS.length}: {current.label}
        </span>
        <span className="font-mono">{progressPercent}% Completed</span>
      </div>

      {/* Thin Compact Progress Bar */}
      <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
        <div
          className="bg-emerald-400 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Compact Horizontal Step Indicators */}
      <div className="flex justify-between items-center pt-1 px-1">
        {STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  isDone
                    ? 'bg-emerald-400 text-slate-950'
                    : isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400 ring-2 ring-emerald-400/20'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isDone ? '✓' : step.id}
              </div>
              <span
                className={`text-xs hidden sm:inline font-medium ${
                  isActive ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Minimal Context Header Title */}
      <div className="text-center pt-2 space-y-0.5">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {current.headerTitle}
        </h1>
        <p className="text-slate-400 text-xs max-w-md mx-auto">
          {current.sub}
        </p>
      </div>
    </div>
  );
}

export default BookingSteps;