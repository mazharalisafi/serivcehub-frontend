'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';

// Comprehensive options mapping for all services
const SERVICE_ISSUE_OPTIONS = {
  // 1. House Cleaning
  housecleaning: [
    'Standard Regular Cleaning',
    'Deep Home Cleaning',
    'Kitchen & Bathroom Cleaning',
    'Dusting & Vacuuming',
    'Other'
  ],

  // 2. Plumbing Services
  plumbing: [
    'Leaking Pipe / Tap Repair',
    'Drain Unblocking / Clog Removal',
    'Toilet Repair / Replacement',
    'Water Heater Maintenance',
    'Other'
  ],

  // 3. Electrical Services
  electrical: [
    'Switchboard & Breaker Repair',
    'Lighting & Power Socket Installation',
    'Wiring Inspection & Fault Finding',
    'Appliance Connection',
    'Other'
  ],

  // 4. Decor & Painting / Renovation
  decor: [
    'Interior Wall Painting',
    'Wallpaper Installation / Removal',
    'Home Staging & Interior Touch-ups',
    'Decorative Feature Wall Setup',
    'Other'
  ],

  // 5. Commercial & Office Cleaning
  commercial: [
    'Office Desk & Workspace Sanitization',
    'Commercial Carpet & Floor Cleaning',
    'Restroom Hygiene & Sanitization',
    'Trash & Recycling Removal',
    'Window Cleaning',
    'Other'
  ],

  // 6. NDIS Approved Cleaning
  ndis: [
    'NDIS Home Maintenance & Cleaning',
    'Support Worker Assistance Cleaning',
    'Bathroom & Kitchen Hygiene Support',
    'Laundry & Linen Care',
    'Wheelchair Accessible Area Deep Cleaning',
    'Other'
  ],

  // 7. DVA Specialized Cleaning
  dva: [
    'DVA Approved Domestic Cleaning',
    'Veterans Assistance Maintenance',
    'Spring Deep Cleaning for Veterans',
    'Heavy Duty Surface Sanitization',
    'Other'
  ],

  // 8. Aged Care Home Support
  agedcare: [
    'Gentle Home Sanitization & Dusting',
    'Mobility Path & Floor Safety Cleaning',
    'Bedding & Personal Laundry Care',
    'Kitchen & Meal Prep Area Hygiene',
    'Other'
  ],

  // 9. Insurance Assessment Cleaning
  insurance: [
    'Water & Flood Damage Restoration Cleaning',
    'Fire & Smoke Damage Cleaning',
    'Mold Remediation & Treatment',
    'Storm Damage Cleanup',
    'Other'
  ],

  // 10. Deep Cleaning
  deepclean: [
    'Full House Deep Sanitization',
    'Grout & Tile Scrubbing',
    'Behind Appliances & Cupboard Cleaning',
    'Wall Wash & Paint Care',
    'Other'
  ],

  // 11. Move In / End of Lease Cleaning
  moveinout: [
    'Full Bond Return Guarantee Cleaning',
    'Oven & Rangehood Deep Clean',
    'Inside Cabinet & Drawers Cleaning',
    'Carpet Steam Cleaning',
    'Other'
  ]
};

// Fallback options if a service slug is completely unknown
const DEFAULT_OPTIONS = [
  'General Maintenance / Repair',
  'Urgent Inspection & Quote',
  'Specialized Consultation',
  'Other'
];

export default function ServiceDetailsStep({ formData, updateFormData, selectedService, onNext, onBack }) {
  const serviceName = selectedService?.title || selectedService?.name || 'Service';
  const rawSlug = (selectedService?.slug || selectedService?.id || '').toLowerCase();

  // Improved matching mechanism that correctly maps slugs
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
  const [additionalNotes, setAdditionalNotes] = useState(formData.notes || '');

  // Reset/sync selection state when switching between services
  useEffect(() => {
    if (formData.issueType && options.includes(formData.issueType)) {
      setIssueType(formData.issueType);
    } else {
      setIssueType('');
    }
  }, [selectedService]);

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

  const isFormValid =
    issueType !== '' &&
    urgency !== '' &&
    (issueType !== 'Other' || otherRequirements.trim().length > 0);

  return (
    <Card className="bg-[#0b1329]/70 border border-slate-700/50 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl max-w-3xl mx-auto space-y-6">
      {/* Dynamic Requirement Selection */}
      <div>
        <label className="block text-sm font-semibold text-emerald-400 mb-2">
          What type of {serviceName} requirement do you have? <span className="text-red-400">*</span>
        </label>
        <select
          value={issueType}
          onChange={handleIssueChange}
          className="w-full bg-[#050b18]/80 border border-slate-600/50 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400 transition"
        >
          <option value="" disabled>Select an option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional Custom Requirement Input */}
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
            className="w-full bg-[#050b18]/80 border border-amber-500/40 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-amber-400 transition"
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
          className="w-full bg-[#050b18]/80 border border-slate-600/50 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400 transition"
        >
          <option value="" disabled>Select an option</option>
          <option value="Emergency (As soon as possible)">Emergency (As soon as possible)</option>
          <option value="Within 24-48 hours">Within 24-48 hours</option>
          <option value="Flexible / Next few days">Flexible / Next few days</option>
        </select>
      </div>

      {/* Additional Information */}
      <div>
        <label className="block text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
          <span>📄</span> Anything else we should know? <span className="text-slate-400 font-normal text-xs">(optional)</span>
        </label>
        <textarea
          value={additionalNotes}
          onChange={(e) => {
            const val = e.target.value;
            setAdditionalNotes(val);
            updateFormData({ notes: val });
          }}
          rows={3}
          placeholder="Example: Gate code, parking info, or specific instructions."
          className="w-full bg-[#050b18]/80 border border-slate-600/50 rounded-xl p-3.5 text-slate-200 text-sm focus:outline-none focus:border-emerald-400 transition"
        />
      </div>

      {/* Action Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-medium hover:bg-slate-800 transition"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition ${
            isFormValid
              ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 cursor-pointer'
              : 'bg-slate-700 text-slate-400 opacity-50 cursor-not-allowed'
          }`}
        >
          Continue &rarr;
        </button>
      </div>
    </Card>
  );
}