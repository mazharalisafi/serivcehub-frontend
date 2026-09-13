'use client';
import React from 'react';

export default function LocationStep({ formData, updateFormData, onNext, onBack }) {
  
  // Form Validation Logic
  const isFormValid = formData.state && formData.state !== 'Select your state' && formData.postcode?.trim() && formData.address?.trim();

  return (
    <div className="bg-[#0b1329]/70 border border-slate-700/50 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl max-w-3xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            State <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.state || ''}
            onChange={(e) => updateFormData({ state: e.target.value })}
            className="w-full bg-[#050b18]/80 border border-slate-600/50 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
          >
            <option value="" disabled>Select your state</option>
            <option value="NSW">New South Wales (NSW)</option>
            <option value="VIC">Victoria (VIC)</option>
            <option value="QLD">Queensland (QLD)</option>
            <option value="WA">Western Australia (WA)</option>
            <option value="SA">South Australia (SA)</option>
            <option value="TAS">Tasmania (TAS)</option>
            <option value="ACT">Australian Capital Territory (ACT)</option>
            <option value="NT">Northern Territory (NT)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            Postcode <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 2150"
            value={formData.postcode || ''}
            onChange={(e) => updateFormData({ postcode: e.target.value })}
            className="w-full bg-[#050b18]/80 border border-slate-600/50 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
          Full Address <span className="text-red-400">*</span>
        </label>
        <textarea
          rows="3"
          placeholder="e.g. Unit 4, 12 Example Street, Parramatta NSW 2150"
          value={formData.address || ''}
          onChange={(e) => updateFormData({ address: e.target.value })}
          className="w-full bg-[#050b18]/80 border border-slate-600/50 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
        <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm hover:bg-slate-800 transition">
          &larr; Back
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition ${isFormValid ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 cursor-pointer' : 'bg-slate-700 text-slate-400 opacity-50 cursor-not-allowed'}`}
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}