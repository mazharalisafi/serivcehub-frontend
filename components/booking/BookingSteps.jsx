'use client';

import React from 'react';

const STEPS = [
  { id: 1, name: 'Service' },
  { id: 2, name: 'Details' },
  { id: 3, name: 'Location' },
  { id: 4, name: 'Date & Time' },
  { id: 5, name: 'Contact' },
  { id: 6, name: 'Review' },
];

export function BookingSteps({ currentStep }) {
  const percentage = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);

  return (
    <div className="w-full space-y-4">
      {/* Top Header Row */}
      <div className="flex justify-between items-center text-xs text-slate-400 font-medium px-1">
        <span>Step {currentStep} of {STEPS.length}: <strong className="text-emerald-400 font-semibold">{STEPS[currentStep - 1]?.name}</strong></span>
        <span>{percentage}% Completed</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-emerald-400 h-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stepper Dots */}
      <div className="flex items-center justify-between pt-1">
        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-400 text-slate-950'
                    : isCurrent
                    ? 'border-2 border-emerald-400 text-emerald-400 bg-[#0b1329]'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isCompleted ? '✓' : step.id}
              </div>
              <span
                className={`text-[11px] hidden sm:block ${
                  isCurrent ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}