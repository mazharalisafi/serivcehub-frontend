'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function AdminCalendarPage() {
  const [viewMode, setViewMode] = useState('Day'); // Day, Week, Month
  const [selectedStaff, setSelectedStaff] = useState('All staff');
  const [currentDate, setCurrentDate] = useState(new Date('2026-08-31'));

  const staffMembers = [
    { id: 1, name: 'Marcus Lee', role: 'Plumbing' },
    { id: 2, name: 'Priya Nair', role: 'Electrical' },
    { id: 3, name: 'Chloe Adams', role: 'Cleaning' },
  ];

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  const bookings = [
    { staffId: 1, name: 'John Smith', status: 'CONFIRMED', time: '9:00 AM', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { staffId: 1, name: 'Sara Wilson', status: 'NEEDS INFO', time: '2:00 PM', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
    { staffId: 2, name: 'Aisha Khan', status: 'PENDING', time: '11:00 AM', bg: 'bg-orange-50 text-orange-800 border-orange-200' },
    { staffId: 2, name: 'Omar Farooq', status: 'COMPLETED', time: '3:00 PM', bg: 'bg-teal-50 text-teal-800 border-teal-200' },
    { staffId: 3, name: 'Liam Brown', status: 'IN PROGRESS', time: '1:00 PM', bg: 'bg-sky-50 text-sky-800 border-sky-200' },
  ];

  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const filteredStaff = selectedStaff === 'All staff' 
    ? staffMembers 
    : staffMembers.filter(s => s.name === selectedStaff);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      
      {/* 3. CALENDAR CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        
        {/* Day / Week / Month View Switcher */}
        <div className="bg-slate-100 p-1 rounded-2xl flex gap-1 border border-slate-200/60">
          {['Day', 'Week', 'Month'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === mode
                  ? 'bg-[#00667e] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Date Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDateChange(-1)}
            className="p-1.5 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-extrabold text-slate-800 tracking-wide min-w-[100px] text-center">
            {currentDate.toISOString().split('T')[0]}
          </span>
          <button
            onClick={() => handleDateChange(1)}
            className="p-1.5 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Staff Dropdown Filter */}
        <div>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-teal-600 cursor-pointer"
          >
            <option>All staff</option>
            {staffMembers.map((staff) => (
              <option key={staff.id} value={staff.name}>{staff.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Calendar Grid View */}
      {viewMode === 'Day' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                <th className="py-3 px-4 w-40">STAFF</th>
                {timeSlots.map((time) => (
                  <th key={time} className="py-3 px-2 text-center">{time}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-4">
                    <p className="text-xs font-bold text-slate-900">{staff.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{staff.role}</p>
                  </td>
                  {timeSlots.map((time) => {
                    const booking = bookings.find(b => b.staffId === staff.id && b.time === time);
                    return (
                      <td key={time} className="p-1.5 align-top h-16 border-l border-slate-100/80">
                        {booking && (
                          <div className={`p-2 rounded-xl border text-[10px] font-bold shadow-2xs space-y-0.5 ${booking.bg}`}>
                            <p className="truncate">{booking.name}</p>
                            <span className="text-[8px] opacity-80 block tracking-tight">{booking.status}</span>
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
      )}

      {viewMode !== 'Day' && (
        <div className="p-12 text-center space-y-2">
          <User className="mx-auto text-slate-300" size={32} />
          <p className="text-xs font-bold text-slate-600">{viewMode} View Active</p>
          <p className="text-[11px] text-slate-400">Displaying scheduled bookings for selected {viewMode.toLowerCase()}.</p>
        </div>
      )}

    </div>
  );
}