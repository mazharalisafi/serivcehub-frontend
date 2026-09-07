'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';

export default function AdminCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(15);

  const bookings = [
    { id: 1, time: '09:00 AM', customer: 'John Doe', service: 'Plumbing Repair', location: '123 Main St, Sydney' },
    { id: 2, time: '11:30 AM', customer: 'Sarah Jenkins', service: 'Home Cleaning', location: '45 Park Ave, Sydney' },
    { id: 3, time: '03:00 PM', customer: 'Michael Ross', service: 'Electrical Inspection', location: '78 Broadway, Sydney' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Booking Calendar</h1>
        <p className="text-xs text-slate-400 mt-1">Manage and schedule appointments across your team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white">September 2026</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 hover:text-white"><ChevronLeft size={16} /></button>
              <button className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 hover:text-white"><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDate === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`h-16 rounded-xl border p-2 flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300 font-bold' 
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs">{day}</span>
                  {day % 5 === 0 && <span className="w-2 h-2 rounded-full bg-teal-400 self-end" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock size={16} className="text-teal-400" /> Schedule for Sept {selectedDate}
          </h3>

          <div className="space-y-3">
            {bookings.map(b => (
              <div key={b.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-teal-300">
                  <span>{b.time}</span>
                  <span className="text-slate-400 font-normal">{b.service}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-200">
                  <User size={13} className="text-slate-500" /> {b.customer}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <MapPin size={13} /> {b.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}