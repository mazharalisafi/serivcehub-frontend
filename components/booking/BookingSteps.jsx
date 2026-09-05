'use client';

import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Location' },
  { id: 4, label: 'Date & Time' },
  { id: 5, label: 'Contact' },
  { id: 6, label: 'Review' },
];

export function BookingSteps({ currentStep = 2 }) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-2 sm:px-4">
      {/* Mobile & Desktop Scrollable Container */}
      <div className="flex items-center justify-between w-full overflow-x-auto pb-3 pt-1 no-scrollbar gap-2 sm:gap-4">
        {STEPS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <div className="flex flex-col items-center min-w-[60px] sm:min-w-[70px] shrink-0">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-teal-700 text-white shadow-md'
                      : isCurrent
                      ? 'bg-teal-800 text-white ring-4 ring-teal-100 shadow-lg scale-110'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check size={16} className="stroke-[3]" /> : step.id}
                </div>
                <span
                  className={`mt-1.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                    isCurrent ? 'text-teal-900 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-[2px] min-w-[16px] sm:min-w-[24px] rounded-full transition-colors ${
                    step.id < currentStep ? 'bg-teal-700' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// Default export bhi add kar diya hai
export default BookingSteps;