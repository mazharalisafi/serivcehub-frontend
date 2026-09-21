'use client';

import React from 'react';

export default function ConfirmationStep({ formData, selectedService, onReset }) {
  const serviceName = selectedService?.title || selectedService?.name || formData.serviceCategory || 'Service';
  const refId = `SH-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="w-full text-center space-y-6 py-2">
      <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider">
        Booking Confirmed
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Thank You, {formData.fullName || 'Valued Customer'}!
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Your booking request has been successfully recorded. Reference ID: <strong className="text-emerald-400">{refId}</strong>
        </p>
      </div>

      <div className="bg-[#050b18]/90 border border-slate-800 rounded-xl p-5 text-left space-y-4 max-w-lg mx-auto">
        <div className="border-b border-slate-800/80 pb-3">
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-0.5">
            Service Required
          </span>
          <p className="text-base font-bold text-slate-100">{serviceName}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b border-slate-800/80 pb-3">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-0.5">
              Date
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-200">{formData.date || 'Scheduled'}</p>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-0.5">
              Time Slot
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-200">{formData.timeSlot || 'Scheduled'}</p>
          </div>
        </div>

        <div>
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-0.5">
            Location
          </span>
          <p className="text-xs sm:text-sm font-semibold text-slate-200">
            {formData.address}, {formData.state} {formData.postcode}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <button
          onClick={onReset}
          className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/10"
        >
          Return to Home &rarr;
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium text-sm hover:bg-slate-800 transition"
        >
          Save Receipt
        </button>
      </div>
    </div>
  );
}