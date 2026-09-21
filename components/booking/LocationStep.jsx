'use client';

import React from 'react';

const STATES = [
  'Australian Capital Territory (ACT)',
  'New South Wales (NSW)',
  'Northern Territory (NT)',
  'Queensland (QLD)',
  'South Australia (SA)',
  'Tasmania (TAS)',
  'Victoria (VIC)',
  'Western Australia (WA)'
];

export default function LocationStep({ formData, updateFormData, onNext, onBack }) {
  const isFormValid =
    formData.state.trim() !== '' &&
    formData.postcode.trim() !== '' &&
    formData.address.trim() !== '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="w-full space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            State <span className="text-red-400">*</span>
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full bg-[#050b18]/90 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 transition"
          >
            <option value="">Select State</option>
            {STATES.map((st) => (
              <option key={st} value={st} className="bg-[#0b1329] text-slate-100">
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Postcode <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="postcode"
            placeholder="e.g. 3000"
            value={formData.postcode}
            onChange={handleChange}
            className="w-full bg-[#050b18]/90 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 transition placeholder-slate-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
          Full Address <span className="text-red-400">*</span>
        </label>
        <textarea
          name="address"
          rows={3}
          placeholder="Enter street address, unit/suite number"
          value={formData.address}
          onChange={handleChange}
          className="w-full bg-[#050b18]/90 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 transition placeholder-slate-600 resize-none"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
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
          disabled={!isFormValid}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition ${
            isFormValid
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