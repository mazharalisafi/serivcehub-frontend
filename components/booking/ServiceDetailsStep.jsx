'use client';

import React, { useState, useEffect } from 'react';

const SERVICE_ISSUE_OPTIONS = {
  housecleaning: [
    'Standard Regular Cleaning',
    'Deep Home Cleaning',
    'Kitchen & Bathroom Cleaning',
    'Dusting & Vacuuming',
    'Other'
  ],
  plumbing: [
    'Leaking Pipe / Tap Repair',
    'Drain Unblocking / Clog Removal',
    'Toilet Repair / Replacement',
    'Water Heater Maintenance',
    'Other'
  ],
  electrical: [
    'Switchboard & Breaker Repair',
    'Lighting & Power Socket Installation',
    'Wiring Inspection & Fault Finding',
    'Appliance Connection',
    'Other'
  ],
  decor: [
    'Interior Wall Painting',
    'Wallpaper Installation / Removal',
    'Home Staging & Interior Touch-ups',
    'Decorative Feature Wall Setup',
    'Other'
  ],
  commercial: [
    'Office Desk & Workspace Sanitization',
    'Commercial Carpet & Floor Cleaning',
    'Restroom Hygiene & Sanitization',
    'Trash & Recycling Removal',
    'Window Cleaning',
    'Other'
  ],
  ndis: [
    'NDIS Home Maintenance & Cleaning',
    'Support Worker Assistance Cleaning',
    'Bathroom & Kitchen Hygiene Support',
    'Laundry & Linen Care',
    'Wheelchair Accessible Area Deep Cleaning',
    'Other'
  ],
  dva: [
    'DVA Approved Domestic Cleaning',
    'Veterans Assistance Maintenance',
    'Spring Deep Cleaning for Veterans',
    'Heavy Duty Surface Sanitization',
    'Other'
  ],
  agedcare: [
    'Gentle Home Sanitization & Dusting',
    'Mobility Path & Floor Safety Cleaning',
    'Bedding & Personal Laundry Care',
    'Kitchen & Meal Prep Area Hygiene',
    'Other'
  ],
  insurance: [
    'Water & Flood Damage Restoration Cleaning',
    'Fire & Smoke Damage Cleaning',
    'Mold Remediation & Treatment',
    'Storm Damage Cleanup',
    'Other'
  ],
  deepclean: [
    'Full House Deep Sanitization',
    'Grout & Tile Scrubbing',
    'Behind Appliances & Cupboard Cleaning',
    'Wall Wash & Paint Care',
    'Other'
  ],
  moveinout: [
    'Full Bond Return Guarantee Cleaning',
    'Oven & Rangehood Deep Clean',
    'Inside Cabinet & Drawers Cleaning',
    'Carpet Steam Cleaning',
    'Other'
  ]
};

const DEFAULT_OPTIONS = [
  'General Maintenance / Repair',
  'Urgent Inspection & Quote',
  'Specialized Consultation',
  'Other'
];

export default function ServiceDetailsStep({ formData, updateFormData, selectedService, onNext, onBack }) {
  const serviceName = selectedService?.title || selectedService?.name || 'Service';
  const rawSlug = (selectedService?.slug || selectedService?.id || '').toLowerCase();

  const getOptionsKey = () => {
    if (rawSlug.includes('plumb')) return 'plumbing';
    if (rawSlug.includes('electr')) return 'electrical';
    if (rawSlug.includes('decor') || rawSlug.includes('paint')) return 'decor';
    if (rawSlug.includes('ndis')) return 'ndis';
    if (rawSlug.includes('dva')) return 'dva';
    if (rawSlug.includes('aged') || rawSlug.includes('senior')) return 'agedcare';
    if (rawSlug.includes('insur')) return 'insurance';
    if (rawSlug.includes('commerc') || rawSlug.includes('office')) return 'commercial';
    if (rawSlug.includes('deep')) return 'deepclean';
    if (rawSlug.includes('move') || rawSlug.includes('lease') || rawSlug.includes('bond')) return 'moveinout';
    if (rawSlug.includes('clean') || rawSlug.includes('house')) return 'housecleaning';
    return null;
  };

  const currentKey = getOptionsKey();
  const options = currentKey ? SERVICE_ISSUE_OPTIONS[currentKey] : DEFAULT_OPTIONS;

  const [issueType, setIssueType] = useState(formData.issueType || '');
  const [urgency, setUrgency] = useState(formData.urgency || '');
  const [otherRequirements, setOtherRequirements] = useState(formData.requirements || '');

  useEffect(() => {
    if (formData.issueType && options.includes(formData.issueType)) {
      setIssueType(formData.issueType);
    }
    if (formData.urgency) {
      setUrgency(formData.urgency);
    }
  }, [selectedService]);

  const checkAndAutoNext = (newIssue, newUrgency) => {
    if (newIssue && newUrgency && newIssue !== 'Other') {
      setTimeout(() => {
        onNext();
      }, 250);
    }
  };

  const handleIssueChange = (e) => {
    const val = e.target.value;
    setIssueType(val);
    updateFormData({ issueType: val });
    checkAndAutoNext(val, urgency);
  };

  const handleUrgencyChange = (e) => {
    const val = e.target.value;
    setUrgency(val);
    updateFormData({ urgency: val });
    checkAndAutoNext(issueType, val);
  };

  const isFormValid =
    issueType !== '' &&
    urgency !== '' &&
    (issueType !== 'Other' || otherRequirements.trim().length > 0);

  return (
    <div className="w-full space-y-6">
      <div>
        <label className="block text-sm font-semibold text-emerald-400 mb-2">
          What type of {serviceName} requirement do you have? <span className="text-red-400">*</span>
        </label>
        <select
          value={issueType}
          onChange={handleIssueChange}
          className="w-full bg-[#050b18]/90 border border-slate-700 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 transition"
        >
          <option value="" disabled>Select an option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {issueType === 'Other' && (
        <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl space-y-2">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
            ⚠️ Please specify your requirements: <span className="text-red-400">*</span>
          </label>
          <textarea
            value={otherRequirements}
            onChange={(e) => {
              const val = e.target.value;
              setOtherRequirements(val);
              updateFormData({ requirements: val });
            }}
            rows={3}
            placeholder={`Describe your specific ${serviceName} requirements...`}
            className="w-full bg-[#050b18]/90 border border-amber-500/40 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-emerald-400 mb-2">
          How urgent is it? <span className="text-red-400">*</span>
        </label>
        <select
          value={urgency}
          onChange={handleUrgencyChange}
          className="w-full bg-[#050b18]/90 border border-slate-700 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 transition"
        >
          <option value="" disabled>Select an option</option>
          <option value="Emergency (As soon as possible)">Emergency (As soon as possible)</option>
          <option value="Within 24-48 hours">Within 24-48 hours</option>
          <option value="Flexible / Next few days">Flexible / Next few days</option>
        </select>
      </div>

      <div className="flex justify-between items-center pt-5 border-t border-slate-800">
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