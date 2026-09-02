'use client';

import React from 'react';
import { Clock, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';

export default function WaitlistPage() {
  const mockWaitlist = [
    { id: 'W-101', name: 'Zohaib Shah', service: 'Full Hair Styling', estimatedTime: '10 mins', joinedAt: '02:15 PM', status: 'In Queue' },
    { id: 'W-102', name: 'Bilal Farooq', service: 'Beard Grooming', estimatedTime: '25 mins', joinedAt: '02:22 PM', status: 'In Queue' },
    { id: 'W-103', name: 'Ayesha Omer', service: 'Facial Treatment', estimatedTime: '40 mins', joinedAt: '02:30 PM', status: 'Serving' },
    { id: 'W-104', name: 'Tariq Mehmood', service: 'Consultation', estimatedTime: 'Completed', joinedAt: '01:45 PM', status: 'Completed' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Waitlist Queue</h1>
        <p className="text-sm text-slate-500 mt-1">Live customer wait times and queue positions.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Queue ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Joined At</th>
                <th className="py-3.5 px-4">Est. Wait Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockWaitlist.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-indigo-600">{item.id}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{item.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{item.service}</td>
                  <td className="py-3.5 px-4 text-slate-500">{item.joinedAt}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{item.estimatedTime}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'In Queue' ? 'bg-amber-100 text-amber-800' :
                      item.status === 'Serving' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs">Notify</button>
                    <button className="text-slate-400 hover:text-slate-600 text-xs">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}