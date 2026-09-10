'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

export default function ReviewStep({ formData, selectedService, onConfirm, onBack, goToStep }) {
  const [agreed, setAgreed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <div className="bg-[#0b1329]/90 border border-slate-800/90 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Review & Confirm Booking</h2>

      <div className="space-y-4">
        {/* Service Section */}
        <div className="bg-[#050b18] p-4 rounded-xl border border-slate-800 flex justify-between items-start">
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Service Selected</h4>
            <p className="text-slate-100 font-semibold text-base mt-1">{formData.serviceCategory || selectedService?.title}</p>
            {formData.issueType && <p className="text-xs text-slate-400 mt-0.5">Type: {formData.issueType}</p>}
            {formData.urgency && <p className="text-xs text-slate-400">Urgency: {formData.urgency}</p>}
            {formData.requirements && <p className="text-xs text-slate-300 mt-2 bg-slate-900/60 p-2 rounded">Note: {formData.requirements}</p>}
          </div>
          <button onClick={() => goToStep(2)} className="text-xs text-emerald-400 font-medium hover:underline">
            Edit
          </button>
        </div>

        {/* Location Section */}
        <div className="bg-[#050b18] p-4 rounded-xl border border-slate-800 flex justify-between items-start">
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Location</h4>
            <p className="text-slate-200 text-sm mt-1">{formData.address || 'N/A'}</p>
            <p className="text-xs text-slate-400">{formData.state} - {formData.postcode}</p>
          </div>
          <button onClick={() => goToStep(3)} className="text-xs text-emerald-400 font-medium hover:underline">
            Edit
          </button>
        </div>

        {/* Date & Time Section */}
        <div className="bg-[#050b18] p-4 rounded-xl border border-slate-800 flex justify-between items-start">
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Schedule</h4>
            <p className="text-slate-200 text-sm mt-1">Date: {formData.date || 'Not specified'}</p>
            <p className="text-xs text-slate-400">Time Slot: {formData.timeSlot || 'Not specified'}</p>
          </div>
          <button onClick={() => goToStep(4)} className="text-xs text-emerald-400 font-medium hover:underline">
            Edit
          </button>
        </div>

        {/* Contact Section */}
        <div className="bg-[#050b18] p-4 rounded-xl border border-slate-800 flex justify-between items-start">
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Contact Details</h4>
            <p className="text-slate-200 text-sm mt-1">{formData.fullName}</p>
            <p className="text-xs text-slate-400">{formData.email} | {formData.phone}</p>
          </div>
          <button onClick={() => goToStep(5)} className="text-xs text-emerald-400 font-medium hover:underline">
            Edit
          </button>
        </div>
      </div>

      {/* Terms & Conditions Checkbox with Clickable Link */}
      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="accent-emerald-400 w-4 h-4 rounded"
          />
          <span>
            I agree to the{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-emerald-400 underline hover:text-emerald-300 font-semibold"
            >
              Terms & Conditions
            </button>
          </span>
        </label>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 transition"
        >
          &larr; Back
        </button>
        <button
          disabled={!agreed}
          onClick={onConfirm}
          className={`px-6 py-2.5 rounded-xl text-slate-950 font-bold text-sm shadow-lg transition ${
            agreed ? 'bg-emerald-400 hover:bg-emerald-300 cursor-pointer' : 'bg-slate-700 opacity-50 cursor-not-allowed'
          }`}
        >
          Confirm & Book &rarr;
        </button>
      </div>

      {/* Terms & Conditions Mock Data Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1329] border border-slate-700 max-w-xl w-full rounded-2xl p-6 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-emerald-400 border-b border-slate-800 pb-2">
              ServiceHub Terms & Conditions
            </h3>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>
                <strong>1. Booking Confirmation:</strong> All service requests made through ServiceHub are subject to availability and technician assignment confirmation.
              </p>
              <p>
                <strong>2. Cancellation Policy:</strong> Free cancellations are allowed up to 24 hours prior to scheduled slot. Late cancellations may incur a standard call-out fee.
              </p>
              <p>
                <strong>3. Service Guarantee:</strong> All completed work includes a 14-day warranty against service defects.
              </p>
              <p>
                <strong>4. Payment Terms:</strong> Payment is processed upon satisfactory completion of service or as agreed per invoice schedule.
              </p>
            </div>
            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs"
              >
                Close & Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}