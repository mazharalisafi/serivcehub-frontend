'use client';

import { Check } from 'lucide-react';

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

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 px-2">
      {/* Top Stepper Circles */}
      <div className="flex items-center justify-between relative max-w-2xl mx-auto mb-8 pt-2">
        <div className="absolute top-5 left-6 right-6 h-[2px] bg-emerald-950 -z-0" />

        {STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`size-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isDone 
                    ? 'bg-emerald-400 text-slate-950' 
                    : isActive 
                    ? 'border-2 border-emerald-400 bg-emerald-950/80 text-emerald-300 ring-4 ring-emerald-500/20' 
                    : 'bg-[#0a1120] border border-slate-700 text-slate-300'
                }`}
              >
                {isDone ? <Check className="size-5 stroke-[3]" /> : step.id}
              </div>
              <span className={`text-[11px] mt-2 transition-colors ${
                isActive ? 'text-emerald-300 font-semibold' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Pill Badge & Header Title */}
      <div className="text-center space-y-2 mb-6">
        <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/90 border border-emerald-700/60 px-4 py-1 rounded-full">
          STEP {currentStep}: {current.label.toUpperCase()}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {current.headerTitle}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          {current.sub}
        </p>
      </div>
    </div>
  );
}

export default BookingSteps;