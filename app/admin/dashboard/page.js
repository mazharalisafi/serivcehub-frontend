"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState(15);

  const [recentBookings, setRecentBookings] = useState([
    {
      id: "BK-9021",
      customer: "John Smith",
      service: "Home Cleaning",
      date: "Sept 04, 2026",
      status: "Confirmed",
      amount: "$120",
    },
    {
      id: "BK-9022",
      customer: "Aisha Khan",
      service: "Plumbing Repair",
      date: "Sept 04, 2026",
      status: "Pending",
      amount: "$85",
    },
    {
      id: "BK-9023",
      customer: "Sara Wilson",
      service: "AC Maintenance",
      date: "Sept 05, 2026",
      status: "Needs Info",
      amount: "$150",
    },
    {
      id: "BK-9024",
      customer: "Liam Brown",
      service: "Electrical Check",
      date: "Sept 05, 2026",
      status: "In Progress",
      amount: "$95",
    },
    {
      id: "BK-9025",
      customer: "Omar Farooq",
      service: "Deep Cleaning",
      date: "Sept 06, 2026",
      status: "Completed",
      amount: "$200",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setRecentBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Needs Info":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "In Progress":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "Completed":
        return "bg-teal-500/10 text-teal-300 border-teal-500/20";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#030712] text-slate-100 space-y-6">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">
          Overview of system activities, bookings, revenue, and customer feedback.
        </p>
      </div>

      {/* 4 Clickable Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/payments"
          className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 hover:border-teal-500/50 transition cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-base font-bold group-hover:scale-110 transition">
              $
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-white">$16,800</h3>
            <span className="text-[11px] font-bold text-emerald-400 mt-1 inline-block">
              ↗ +15% vs last month
            </span>
          </div>
        </Link>

        <Link
          href="/admin/bookings"
          className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 hover:border-blue-500/50 transition cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400">Total Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-base font-bold group-hover:scale-110 transition">
              📅
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-white">1,248</h3>
            <span className="text-[11px] font-bold text-emerald-400 mt-1 inline-block">
              ↗ +8.4% growth
            </span>
          </div>
        </Link>

        <Link
          href="/admin/services"
          className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 hover:border-amber-500/50 transition cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400">Active Services</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-base font-bold group-hover:scale-110 transition">
              👥
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-white">2</h3>
            <span className="text-[11px] font-bold text-teal-400 mt-1 inline-block">
              Ready for Booking
            </span>
          </div>
        </Link>

        <Link
          href="/admin/customers"
          className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/50 transition cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400">Satisfaction</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-base font-bold group-hover:scale-110 transition">
              📈
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-white">98.4%</h3>
            <span className="text-[11px] font-bold text-teal-400 mt-1 inline-block">
              High Customer Rating
            </span>
          </div>
        </Link>
      </div>

      {/* Monthly Revenue Chart & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Monthly Revenue Performance
            </h2>
            <p className="text-2xl font-extrabold text-white mt-1">
              $19,400 <span className="text-xs font-normal text-teal-400">Peak Sep 2026</span>
            </p>
          </div>

          <div className="flex items-end justify-between h-44 mt-6 px-4 pb-2 border-b border-slate-800">
            {[
              { month: "Mar", height: "h-20" },
              { month: "Apr", height: "h-28" },
              { month: "May", height: "h-36" },
              { month: "Jun", height: "h-24" },
              { month: "Jul", height: "h-40" },
              { month: "Aug", height: "h-38" },
              { month: "Sep", height: "h-42" },
            ].map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 group">
                <div
                  className={`w-10 ${bar.height} bg-teal-500/80 group-hover:bg-teal-400 rounded-t-lg transition-all duration-200 shadow-lg shadow-teal-500/10`}
                />
                <span className="text-xs text-slate-400 font-medium">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 pt-3">
            <span>Lowest: <strong className="text-slate-200">$9,200 (Mar)</strong></span>
            <span>Peak Revenue: <strong className="text-teal-400">$19,400 (Sep)</strong></span>
          </div>
        </div>

        {/* Calendar Box */}
        <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white">September 2026</h3>
              <div className="flex gap-1 text-slate-400 text-xs">
                <button className="px-2 py-1 hover:text-white bg-slate-800/50 rounded-md">‹</button>
                <button className="px-2 py-1 hover:text-white bg-slate-800/50 rounded-md">›</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 mb-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`py-2 rounded-xl font-medium transition ${
                    selectedDate === day
                      ? "bg-teal-500 text-slate-950 font-extrabold shadow-md shadow-teal-500/20"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#0f1629] rounded-xl border border-slate-800/80 text-xs space-y-1">
            <div className="flex justify-between font-bold text-white">
              <span>Selected:</span>
              <span className="text-teal-400">Sep {selectedDate}, 2026</span>
            </div>
            <p className="text-slate-400 text-[11px]">3 Bookings scheduled for this day.</p>
          </div>
        </div>
      </div>

      {/* Bookings Table + Customer Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Bookings</h2>
              <p className="text-xs text-slate-400">Latest customer booking requests</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-teal-400 hover:text-teal-300 transition"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-2">ID</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Service</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs text-slate-200">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-2 font-bold text-teal-400">{b.id}</td>
                    <td className="py-3.5 px-2 font-medium text-white">{b.customer}</td>
                    <td className="py-3.5 px-2 text-slate-300">{b.service}</td>
                    <td className="py-3.5 px-2 text-slate-400">{b.date}</td>
                    <td className="py-3.5 px-2">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`border rounded-lg text-[11px] font-bold px-2.5 py-1 focus:outline-none cursor-pointer ${getStatusBadgeClass(
                          b.status
                        )}`}
                      >
                        <option value="Confirmed" className="bg-[#0b0f19] text-white">Confirmed</option>
                        <option value="Pending" className="bg-[#0b0f19] text-white">Pending</option>
                        <option value="Needs Info" className="bg-[#0b0f19] text-white">Needs Info</option>
                        <option value="In Progress" className="bg-[#0b0f19] text-white">In Progress</option>
                        <option value="Completed" className="bg-[#0b0f19] text-white">Completed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-2 text-right font-bold text-white">{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white">Customer Reviews</h2>
            <p className="text-xs text-slate-400">Recent feedback from clients</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-[#0f1629] border border-slate-800/80 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">Michael R.</span>
                <span className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-xs text-slate-300 italic">
                "Excellent home cleaning service! Very professional staff."
              </p>
              <span className="text-[10px] text-slate-500 block">2 hours ago</span>
            </div>

            <div className="p-4 bg-[#0f1629] border border-slate-800/80 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">Fatima Z.</span>
                <span className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-xs text-slate-300 italic">
                "Plumber arrived right on time and fixed the leak quickly."
              </p>
              <span className="text-[10px] text-slate-500 block">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}