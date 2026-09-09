'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookingSteps } from "@/components/booking/BookingSteps";
import { getDraft, saveDraft } from "@/lib/bookingDraft";
import { ArrowRight, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

// SERVICE SPECIFIC DYNAMIC SUB-OPTIONS
const SERVICE_OPTIONS = {
  'house-cleaning': [
    'Deep Cleaning',
    'Regular Standard Cleaning',
    'Move-in / Move-out Cleaning',
    'Carpet & Upholstery Cleaning',
    'Window Cleaning',
    'Other'
  ],
  'plumbing': [
    'Leakage / Pipe Repair',
    'Blocked Drain',
    'Installation (Taps/Sinks/Toilets)',
    'Maintenance / Inspection',
    'Water Heater Service',
    'Other'
  ],
  'electrical': [
    'Wiring / Rewiring',
    'Lighting & Fixture Installation',
    'Switch & Outlet Repair',
    'Safety Switch / Circuit Breaker',
    'Appliance Installation',
    'Other'
  ],
  'decor': [
    'Event & Party Decor',
    'Interior Home Styling',
    'Wall Art & Lighting Setup',
    'Custom Furniture Setup',
    'Theme Decoration',
    'Other'
  ],
  'ndis-cleaning': [
    'Regular NDIS Home Care Cleaning',
    'Deep Sanitization',
    'Specialized Accessibility Cleaning',
    'Other'
  ],
  'dva-cleaning': [
    'DVA Approved House Cleaning',
    'Deep Sanitization',
    'Other'
  ],
  'aged-care-cleaning': [
    'Senior Home Sanitization',
    'Routine Assistance Cleaning',
    'Other'
  ],
  'insurance-cleaning': [
    'Emergency Assessment Cleaning',
    'Restoration Cleaning',
    'Other'
  ]
};

function DetailsFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const serviceQuery = searchParams.get('service');

  const [serviceId, setServiceId] = useState('plumbing');
  const [serviceName, setServiceName] = useState('Plumbing');
  const [issueType, setIssueType] = useState('');
  const [otherIssueText, setOtherIssueText] = useState('');
  const [urgency, setUrgency] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const currentDraft = getDraft();

    const activeId = serviceQuery || currentDraft?.serviceId || 'plumbing';
    setServiceId(activeId);

    const formattedName = currentDraft?.serviceName || activeId.replace('-', ' ').toUpperCase();
    setServiceName(formattedName);

    if (currentDraft?.issueType) setIssueType(currentDraft.issueType);
    if (currentDraft?.otherIssueText) setOtherIssueText(currentDraft.otherIssueText);
    if (currentDraft?.urgency) setUrgency(currentDraft.urgency);
    if (currentDraft?.details) setDetails(currentDraft.details);
  }, [searchParams, serviceQuery]);

  const subOptions = SERVICE_OPTIONS[serviceId] || [
    'Standard Repair / Service',
    'Full Maintenance',
    'New Installation',
    'Other'
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (!issueType || !urgency) return;
    if (issueType === 'Other' && !otherIssueText.trim()) return;

    saveDraft({
      serviceId,
      serviceName,
      issueType,
      otherIssueText: issueType === 'Other' ? otherIssueText : '',
      urgency,
      details
    });

    if (returnTo === 'review') {
      router.push('/booking/review');
    } else {
      router.push('/booking/location');
    }
  };

  return (
    <form onSubmit={handleNext} className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
      
      {/* Dynamic Sub-Options Dropdown based on Selected Service */}
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-teal-300">
          What type of {serviceName} issue is it? <span className="text-rose-500">*</span>
        </label>
        <select
          required
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          className="w-full p-3.5 rounded-2xl border border-slate-700 bg-slate-950 text-white text-xs sm:text-sm focus:border-teal-400 outline-none"
        >
          <option value="" disabled>Select an option</option>
          {subOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Conditionally Rendered Input Field for "Other" Selection */}
      {issueType === 'Other' && (
        <div className="space-y-2 animate-fadeIn">
          <label className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5">
            <AlertCircle size={15} /> Please specify your requirements: <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={otherIssueText}
            onChange={(e) => setOtherIssueText(e.target.value)}
            placeholder="E.g. Need urgent setup for custom event backdrop and balloon arch..."
            className="w-full p-3.5 rounded-2xl border border-amber-500/50 bg-slate-950 text-white text-xs sm:text-sm focus:border-amber-400 outline-none"
          />
        </div>
      )}

      {/* Urgency Selection */}
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-teal-300">
          How urgent is it? <span className="text-rose-500">*</span>
        </label>
        <select
          required
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className="w-full p-3.5 rounded-2xl border border-slate-700 bg-slate-950 text-white text-xs sm:text-sm focus:border-teal-400 outline-none"
        >
          <option value="" disabled>Select an option</option>
          <option value="Emergency (As soon as possible)">Emergency (As soon as possible)</option>
          <option value="Within 24-48 hours">Within 24-48 hours</option>
          <option value="Flexible / Next few days">Flexible / Next few days</option>
        </select>
      </div>

      {/* Additional Optional Details */}
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-teal-300 flex items-center gap-1.5">
          <FileText size={16} /> Anything else we should know? (optional)
        </label>
        <textarea
          rows={4}
          maxLength={500}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Example: Kitchen tap is leaking, needs a look this week."
          className="w-full p-4 rounded-2xl border border-slate-700 bg-slate-950/60 text-white text-xs sm:text-sm focus:border-teal-400 outline-none resize-none"
        />
        <div className="text-right text-[11px] text-slate-400">
          {details.length}/500 - min 10 characters if you add a note
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push(returnTo === 'review' ? '/booking/review' : '/booking')}
          className="px-5 py-3 rounded-2xl border border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          type="submit"
          disabled={!issueType || !urgency || (issueType === 'Other' && !otherIssueText.trim())}
          className="px-7 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {returnTo === 'review' ? 'Save & Return to Review' : 'Continue'} <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}

export default function BookingDetailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-indigo-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <BookingSteps currentStep={2} />

        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-widest px-3 py-1 bg-teal-900/60 rounded-full border border-teal-500/30">
            Step 2: Details
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tell us about the service you need
          </h1>
          <p className="text-sm text-slate-400">
            A few details help us match you with the right professional and time slot.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-10 text-slate-400">Loading form...</div>}>
          <DetailsFormContent />
        </Suspense>
      </div>
    </div>
  );
}