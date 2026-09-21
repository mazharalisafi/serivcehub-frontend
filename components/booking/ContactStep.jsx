'use client';

import React from 'react';

export default function ContactStep({ formData, updateFormData, onNext, onBack }) {
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  const isPhoneValid = formData.phone.trim().length >= 8;
  const isNameValid = formData.fullName.trim() !== '';

  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="w-full space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full bg-[#050b18]/90 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 transition placeholder-slate-600"
        />
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#050b18]/90 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 transition placeholder-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+61 400 000 000"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#050b18]/90 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 transition placeholder-slate-600"
          />
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
          Preferred Contact Method
        </label>
        <div className="flex items-center gap-6 pt-1">
          {['Phone', 'SMS', 'Email'].map((method) => (
            <label key={method} className="flex items-center gap-2 cursor-pointer text-sm text-slate-300 hover:text-white transition">
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={formData.preferredContact === method}
                onChange={handleChange}
                className="accent-emerald-400 w-4 h-4 cursor-pointer"
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
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