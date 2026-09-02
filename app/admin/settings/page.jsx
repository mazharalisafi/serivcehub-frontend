'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-xl space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900">Buffer time between jobs (minutes)</h3>
        <p className="text-xs text-slate-500 mt-0.5">buffer can be set per service and changed anytime.</p>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <span className="text-sm font-medium text-slate-700">Plumbing</span>
          <input type="number" defaultValue={30} className="w-20 p-2 border border-slate-200 rounded-lg text-sm text-center font-bold" />
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <span className="text-sm font-medium text-slate-700">Electrical</span>
          <input type="number" defaultValue={30} className="w-20 p-2 border border-slate-200 rounded-lg text-sm text-center font-bold" />
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-slate-700">Cleaning</span>
          <input type="number" defaultValue={15} className="w-20 p-2 border border-slate-200 rounded-lg text-sm text-center font-bold" />
        </div>
      </div>
    </div>
  );
}