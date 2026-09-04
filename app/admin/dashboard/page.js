'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  Calendar as CalendarIcon, 
  Users, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  Star,
  ArrowRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  // Calendar dynamic state
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Sept 2026
  const [selectedDay, setSelectedDay] = useState(15);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Status Badge State (Clickable & Dynamic)
  const [recentBookings, setRecentBookings] = useState([
    { id: 'BK-9021', customer: 'John Smith', service: 'Home Cleaning', date: 'Sept 04, 2026', amount: '$120', status: 'Confirmed' },
    { id: 'BK-9022', customer: 'Aisha Khan', service: 'Plumbing Repair', date: 'Sept 04, 2026', amount: '$85', status: 'Pending' },
    { id: 'BK-9023', customer: 'Sara Wilson', service: 'AC Maintenance', date: 'Sept 05, 2026', amount: '$150', status: 'Needs Info' },
    { id: 'BK-9024', customer: 'Liam Brown', service: 'Electrical Check', date: 'Sept 05, 2026', amount: '$95', status: 'In Progress' },
    { id: 'BK-9025', customer: 'Omar Farooq', service: 'Deep Cleaning', date: 'Sept 06, 2026', amount: '$200', status: 'Completed' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setRecentBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
    );
  };

  const [reviews] = useState([
    { id: 1, name: 'Michael R.', rating: 5, comment: 'Excellent home cleaning service! Very professional staff.', date: '2 hours ago' },
    { id: 2, name: 'Fatima Z.', rating: 5, comment: 'Plumber arrived right on time and fixed the leak quickly.', date: 'Yesterday' },
  ]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">Overview of system activities, bookings, revenue, and customer feedback.</p>
      </div>

      {/* Top 4 Stat Cards with Hover Scale Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Total Revenue */}
        <Link 
          href="/admin/payments"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">Total Revenue</span>
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">$16,800</div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+15% vs last month</span>
          </div>
        </Link>

        {/* 2. Total Bookings */}
        <Link 
          href="/admin/bookings"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">Total Bookings</span>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <CalendarIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">1,248</div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8.4% growth</span>
          </div>
        </Link>

        {/* 3. Active Services */}
        <Link 
          href="/admin/services"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-amber-500 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">Active Services</span>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">2</div>
          <div className="text-[11px] font-semibold text-teal-600 mt-2">
            Ready for Booking
          </div>
        </Link>

        {/* 4. Satisfaction Card */}
        <Link 
          href="/admin/customers"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-500 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">Satisfaction</span>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">98.4%</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-2">
            High Customer Rating
          </div>
        </Link>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">Revenue & Growth Report</h3>
              <p className="text-xs text-slate-500">Monthly revenue trends with percentage performance</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-600">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              Monthly Revenue
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 border-b border-slate-100 px-4">
            {[
              { month: 'Oct', height: 'h-28', val: '+8%' },
              { month: 'Nov', height: 'h-36', val: '+12%' },
              { month: 'Dec', height: 'h-48', val: '+18%' },
              { month: 'Jan', height: 'h-32', val: '-4%', badge: '$11,200 (-4%)' },
              { month: 'Feb', height: 'h-56', val: '+22%' },
              { month: 'Mar', height: 'h-52', val: '+15%' },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                {bar.badge && (
                  <div className="absolute -top-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                    {bar.badge}
                  </div>
                )}
                <span className="text-[10px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">{bar.val}</span>
                <div className={`w-full ${bar.height} bg-teal-500 rounded-t-lg group-hover:bg-teal-600 transition-all shadow-sm`}></div>
                <span className="text-xs font-semibold text-slate-500">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Calendar Box */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-800">Bookings Calendar</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevMonth} 
                className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-700">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button 
                onClick={handleNextMonth} 
                className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-400 mb-2">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <span key={`empty-${i}`}></span>
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`py-2 rounded-lg transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-teal-600 text-white font-bold shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100 font-medium'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Recent Bookings Table with Interactive Status Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Recent Bookings</h3>
              <p className="text-xs text-slate-500">Latest customer booking requests</p>
            </div>
            <Link href="/admin/bookings" className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                  <th className="py-2.5">ID</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Service</th>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold text-slate-900">{b.id}</td>
                    <td className="py-3">{b.customer}</td>
                    <td className="py-3">{b.service}</td>
                    <td className="py-3 text-slate-500">{b.date}</td>
                    <td className="py-3">
                      {/* Interactive Status Badge Dropdown */}
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer outline-none border-0 transition-transform active:scale-95 ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' :
                          b.status === 'Pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                          b.status === 'In Progress' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                          b.status === 'Needs Info' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                          'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Needs Info">Needs Info</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="py-3 text-right font-bold text-slate-900">{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-800 mb-1">Customer Reviews</h3>
          <p className="text-xs text-slate-500 mb-4">Recent feedback from clients</p>

          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{r.name}</span>
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">"{r.comment}"</p>
                <span className="text-[10px] text-slate-400 block">{r.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}