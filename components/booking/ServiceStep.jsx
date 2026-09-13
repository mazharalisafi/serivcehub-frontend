'use client';

import React from 'react';
import { SERVICES_DATA } from '@/lib/servicesData';

export default function ServiceStep({ formData, updateFormData, onNext, selectedService, setSelectedService }) {
  
  const handleSelect = (service) => {
    setSelectedService(service);
    updateFormData({
      serviceCategory: service.title || service.name,
      serviceSlug: service.slug,
      serviceId: service.id,
    });
  };

  const isFormValid = formData.serviceCategory && formData.serviceCategory !== '';

  return (
    <div className="bg-[#0b1329]/70 border border-slate-700/50 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-3">Select a Service</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES_DATA.map((service) => {
          const isSelected = selectedService?.id === service.id;
          return (
            <div
              key={service.id}
              onClick={() => handleSelect(service)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-400/10'
                  : 'border-slate-700/50 bg-[#050b18]/80 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-100">{service.title || service.name}</h3>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-emerald-400 bg-emerald-400' : 'border-slate-600'}`}>
                  {isSelected && <svg className="w-3 h-3 text-[#0b1329]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {service.shortDesc || `Professional ${service.title || service.name} tailored to your requirements.`}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-700/50">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg transition ${isFormValid ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 cursor-pointer' : 'bg-slate-700 text-slate-400 opacity-50 cursor-not-allowed'}`}
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}