'use client';

import React from 'react';

export default function CalendarPage() {
  const staffSchedules = [
    {
      name: 'Marcus Lee',
      specialty: 'Plumbing',
      slots: { '9:00 AM': { name: 'John Smith', status: 'Confirmed' }, '2:00 PM': { name: 'Sara Wilson', status: 'Needs Info' } }
    },
    {
      name: 'Priya Nair',
      specialty: 'Electrical',
      slots: { '11:00 AM': { name: 'Aisha Khan', status: 'Pending' }, '3:00 PM': { name: 'Omar Farooq', status: 'Completed' } }
    },
    {
      name: 'Chloe Adams',
      specialty: 'Cleaning',
      slots: { '1:00 PM': { name: 'Liam Brown', status: 'In Progress' } }
    }
  ];

  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 overflow-x-auto">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
          <button className="bg-[#00667e] text-white px-3 py-1 rounded-md">Day</button>
          <button className="text-slate-600 px-3 py-1">Week</button>
          <button className="text-slate-600 px-3 py-1">Month</button>
        </div>
        <div className="text-sm font-bold text-slate-800">&lt; 2026-08-31 &gt;</div>
        <select className="bg-slate-50 border border-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg">
          <option>All staff</option>
        </select>
      </div>

      <table className="w-full min-w-[700px] text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-slate-400">
            <th className="py-2.5 px-3 w-32">STAFF</th>
            {times.map((t) => (
              <th key={t} className="py-2.5 px-2 text-center">{t}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {staffSchedules.map((staff) => (
            <tr key={staff.name}>
              <td className="py-4 px-3 font-bold text-slate-800 border-r border-slate-100">
                {staff.name}
                <span className="block text-[10px] font-normal text-slate-400">{staff.specialty}</span>
              </td>
              {times.map((time) => {
                const booking = staff.slots[time];
                return (
                  <td key={time} className="p-1 border-r border-slate-50 h-16 align-top">
                    {booking && (
                      <div className={`p-1.5 rounded-lg border text-[11px] ${
                        booking.status === 'Confirmed' ? 'bg-teal-50 border-teal-200 text-teal-800' :
                        booking.status === 'In Progress' ? 'bg-sky-50 border-sky-200 text-sky-800' :
                        booking.status === 'Needs Info' ? 'bg-orange-50 border-orange-200 text-orange-800' :
                        booking.status === 'Completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                        'bg-amber-50 border-amber-200 text-amber-800'
                      }`}>
                        <div className="font-semibold">{booking.name}</div>
                        <span className="text-[9px] uppercase font-bold inline-block mt-0.5">{booking.status}</span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}