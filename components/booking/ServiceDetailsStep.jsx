'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';

// Har service category ke apne specific issue options
const SERVICE_ISSUE_OPTIONS = {
  plumbing: [
    'Leaking Tap / Pipe',
    'Blocked Drain / Toilet',
    'Hot Water System Issue',
    'Pipe Installation / Replacement',
    'Bathroom Fittings',
    'Other'
  ],
  electrical: [
    'Power Outage / Trip Switch',
    'Light Fixture / Ceiling Fan',
    'Power Point / Switch Repair',
    'Wiring / Safety Switch Check',
    'Appliance Installation',
    'Other'
  ],
  'house-cleaning': [
    'Deep Cleaning',
    'Standard Cleaning',
    'End of Lease / Move-in Cleaning',
    'Post-Construction Cleaning',
    'Other'
  ],
  cleaning: [
    'Deep Cleaning',
    'Standard Cleaning',
    'End of Lease / Move-in Cleaning',
    'Post-Construction Cleaning',
    'Other'
  ],
  handyman: [
    'Furniture Assembly',
    'TV Wall Mounting',
    'Door / Window Repair',
    'Drywall / Painting Touch-up',
    'General Repairs',
    'Other'
  ],
  'pest-control': [
    'General Pest Control',
    'Termite Inspection & Treatment',
    'Rodent Control',
    'Bed Bug Treatment',
    'Other'
  ]
};

// Fallback options agar koi unknown service select ho
const DEFAULT_OPTIONS = [
  'General Maintenance / Repair',
  'Urgent Inspection',
  'Installation Service',
  'Replacement',
  'Other'
];

export default function ServiceDetailsStep({ formData, updateFormData, selectedService, onNext, onBack }) {
  const serviceName = selectedService?.title || selectedService?.name || 'Service';
  const serviceSlug = (selectedService?.slug || selectedService?.id || '').toLowerCase();

  // Dynamic service key pick karna
  const getOptionsKey = () => {
    if (serviceSlug.includes('plumb')) return 'plumbing';
    if (serviceSlug.includes('electr')) return 'electrical';
    if (serviceSlug.includes('clean')) return 'house-cleaning';
    if (serviceSlug.includes('handy')) return 'handyman';
    if (serviceSlug.includes('pest')) return 'pest-control';
    return null;
  };

  const currentKey = getOptionsKey();
  const options = currentKey ? SERVICE_ISSUE_OPTIONS[currentKey] : DEFAULT_OPTIONS;

  // Selected option ya first option default assign karna
  const [issueType, setIssueType] = useState(
    formData.issueType && options.includes(formData.issueType) ? formData.issueType : options[0]
  );
  const [urgency, setUrgency] = useState(formData.urgency || 'Emergency (As soon as possible)');
  const [otherRequirements, setOtherRequirements] = useState(formData.requirements || '');
  const [additionalNotes, setAdditionalNotes] = useState(formData.notes || '');

  // Reset issueType state when service changes
  useEffect(() => {
    const initialOption = options[0];
    setIssueType(initialOption);
    updateFormData({ issueType: initialOption });
  }, [serviceSlug]);

  const handleIssueChange = (e) => {
    const val = e.target.value;
    setIssueType(val);
    updateFormData({ issueType: val });
  };

  const handleUrgencyChange = (e) => {
    const val = e.target.value;
    setUrgency(val);
    updateFormData({ urgency: val });
  };

  const handleRequirementsChange = (e) => {
    const val = e.target.value;
    setOtherRequirements(val);
    updateFormData({ requirements: val });
  };

  return (
    <Card className="bg-[#0b1329]/90 border border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-sm max-w-3xl mx-auto space-y-6">
      {/* Service Specific Dynamic Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-emerald-400 mb-2">
          What type of {serviceName} issue is it? <span className="text-red-400">*</span>
        </label>
        <select
          value={issueType}
          onChange={handleIssueChange}
          className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400 transition"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional Textarea jab "Other" select ho */}
      {issueType === 'Other' && (
        <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl space-y-2">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <span>⚠️</span> Please specify your requirements: <span className="text-red-400">*</span>
          </label>
          <textarea
            value={otherRequirements}
            onChange={handleRequirementsChange}
            rows={3}
            placeholder={`Describe your specific ${serviceName} requirements...`}
            className="w-full bg-[#050b18] border border-amber-500/40 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      )}

      {/* Urgency Selection */}
      <div>
        <label className="block text-sm font-semibold text-emerald-400 mb-2">
          How urgent is it? <span className="text-red-400">*</span>
        </label>
        <select
          value={urgency}
          onChange={handleUrgencyChange}
          className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400 transition"
        >
          <option value="Select an option" disabled>Select an option</option>
          <option value="Emergency (As soon as possible)">Emergency (As soon as possible)</option>
          <option value="Within 24-48 hours">Within 24-48 hours</option>
          <option value="Flexible / Next few days">Flexible / Next few days</option>
        </select>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
          <span>📄</span> Anything else we should know? <span className="text-slate-400 font-normal text-xs">(optional)</span>
        </label>
        <textarea
          value={additionalNotes}
          onChange={(e) => {
            setAdditionalNotes(e.target.value);
            updateFormData({ notes: e.target.value });
          }}
          rows={3}
          placeholder="Example: Gate code, parking info, or specific instructions."
          className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400 transition"
        />
      </div>

      {/* Form Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800/80">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 transition"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm shadow-lg transition"
        >
          Continue &rarr;
        </button>
      </div>
    </Card>
  );
}