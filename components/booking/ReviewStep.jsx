'use client';

import React, { useState } from 'react';

export default function ReviewStep({ formData, selectedService, onConfirm, onBack, goToStep }) {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const serviceName = selectedService?.title || selectedService?.name || formData.serviceCategory || 'N/A';

  const handleAcceptTermsModal = () => {
    setAgreedTerms(true);
    setShowTermsModal(false);
  };

  return (
    <div className="w-full space-y-4 relative">
      {/* Service Section */}
      <div className="bg-[#050b18]/90 border border-slate-800 rounded-xl p-4 transition hover:border-slate-700">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Service Selected
          </span>
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="text-xs font-bold text-emerald-400 hover:underline"
          >
            Edit
          </button>
        </div>
        <h4 className="text-base font-bold text-slate-100">{serviceName}</h4>
        {formData.issueType && (
          <p className="text-xs text-slate-400 mt-1">
            Type: <span className="text-slate-200 font-medium">{formData.issueType}</span>
          </p>
        )}
        {formData.urgency && (
          <p className="text-xs text-slate-400 mt-0.5">
            Urgency: <span className="text-slate-200 font-medium">{formData.urgency}</span>
          </p>
        )}
      </div>

      {/* Location Section */}
      <div className="bg-[#050b18]/90 border border-slate-800 rounded-xl p-4 transition hover:border-slate-700">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Location
          </span>
          <button
            type="button"
            onClick={() => goToStep(3)}
            className="text-xs font-bold text-emerald-400 hover:underline"
          >
            Edit
          </button>
        </div>
        <p className="text-sm font-semibold text-slate-200">{formData.address || 'N/A'}</p>
        <p className="text-xs text-slate-400 mt-0.5">
          {formData.state} {formData.postcode}
        </p>
      </div>

      {/* Schedule Section */}
      <div className="bg-[#050b18]/90 border border-slate-800 rounded-xl p-4 transition hover:border-slate-700">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Schedule
          </span>
          <button
            type="button"
            onClick={() => goToStep(4)}
            className="text-xs font-bold text-emerald-400 hover:underline"
          >
            Edit
          </button>
        </div>
        <p className="text-xs text-slate-400">
          Date: <span className="text-slate-200 font-medium">{formData.date || 'N/A'}</span>
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          Time Slot: <span className="text-slate-200 font-medium">{formData.timeSlot || 'N/A'}</span>
        </p>
      </div>

      {/* Contact Section */}
      <div className="bg-[#050b18]/90 border border-slate-800 rounded-xl p-4 transition hover:border-slate-700">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Contact Info
          </span>
          <button
            type="button"
            onClick={() => goToStep(5)}
            className="text-xs font-bold text-emerald-400 hover:underline"
          >
            Edit
          </button>
        </div>
        <p className="text-sm font-semibold text-slate-200">{formData.fullName}</p>
        <p className="text-xs text-slate-400 mt-0.5">{formData.email} • {formData.phone}</p>
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreedTerms}
            onChange={(e) => setAgreedTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-[#050b18] text-emerald-400 focus:ring-emerald-400 accent-emerald-400 cursor-pointer"
          />
          <span className="text-xs text-slate-300 group-hover:text-slate-200 transition">
            I agree to the{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowTermsModal(true);
              }}
              className="text-emerald-400 underline font-medium hover:text-emerald-300 cursor-pointer"
            >
              Terms & Conditions
            </button>{' '}
            and authorize ServiceHub to process this booking.
          </span>
        </label>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={onBack}
          type="button"
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 transition"
        >
          &larr; Back
        </button>
        <button
          onClick={onConfirm}
          type="button"
          disabled={!agreedTerms}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition ${
            agreedTerms
              ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 cursor-pointer shadow-emerald-500/10'
              : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
          }`}
        >
          Confirm & Book &rarr;
        </button>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#070e20] border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-slate-200">
            <h3 className="text-lg font-bold text-emerald-400 border-b border-slate-800/80 pb-3">
              ServiceHub Terms & Conditions[cite: 42]
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>
                <strong className="text-slate-100">1. Booking Confirmation:</strong> All service requests made through ServiceHub are subject to availability and technician assignment confirmation.[cite: 42]
              </p>
              <p>
                <strong className="text-slate-100">2. Cancellation Policy:</strong> Free cancellations are allowed up to 24 hours prior to scheduled slot. Late cancellations may incur a standard call-out fee.[cite: 42]
              </p>
              <p>
                <strong className="text-slate-100">3. Service Guarantee:</strong> All completed work includes a 14-day warranty against service defects.[cite: 42]
              </p>
              <p>
                <strong className="text-slate-100">4. Payment Terms:</strong> Payment is processed upon satisfactory completion of service or as agreed per invoice schedule.[cite: 42]
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleAcceptTermsModal}
                className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                Close & Accept[cite: 42]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}