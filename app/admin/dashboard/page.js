'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, ShoppingBag, AlertCircle, DollarSign, PlusCircle, FileText, CreditCard, ArrowUpRight, X } from 'lucide-react';

export default function SaaSAdminDashboard() {
  const router = useRouter();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = [40, 65, 80, 55, 70, 95, 60, 85, 50, 75, 45, 90];

  // Active Popup Modal State
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="space-y-6 relative">
      
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Customers</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">320</h3>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
              <ArrowUpRight size={12} /> +12% Last 30 days
            </span>
          </div>
          <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Bookings</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">500</h3>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
              <ArrowUpRight size={12} /> +18% Last 30 days
            </span>
          </div>
          <div className="w-11 h-11 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center text-teal-600">
            <ShoppingBag size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Cancelled / Declined</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">20</h3>
            <span className="text-[11px] font-bold text-rose-500 mt-1 block">-2% lower than average</span>
          </div>
          <div className="w-11 h-11 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500">
            <AlertCircle size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Earnings</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">$14,850</h3>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
              <ArrowUpRight size={12} /> +24% growth
            </span>
          </div>
          <div className="w-11 h-11 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-600">
            <DollarSign size={20} />
          </div>
        </div>
      </div>

      {/* Quick Admin Actions (Interactive Buttons) */}
      <div className="bg-gradient-to-r from-[#00667e] to-teal-700 p-4 rounded-2xl text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm">Quick Admin Actions</h4>
          <p className="text-xs text-teal-100">Perform direct actions on bookings and invoices</p>
        </div>
        <div className="flex flex-wrap gap-2">
          
          <button 
            onClick={() => router.push('/booking')}
            className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <PlusCircle size={14} /> Add Booking
          </button>

          <button 
            onClick={() => setActiveModal('quote')}
            className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileText size={14} /> Create Quote
          </button>

          <button 
            onClick={() => setActiveModal('payment')}
            className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <CreditCard size={14} /> Enter Payment
          </button>

        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Revenue Report</h3>
              <p className="text-xs text-slate-400">Monthly earnings and job stats breakdown</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-teal-700"><span className="w-3 h-3 rounded-xs bg-[#00667e]"></span> Earnings</span>
              <span className="flex items-center gap-1.5 text-amber-600"><span className="w-3 h-3 rounded-xs bg-amber-400"></span> Expenses</span>
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-100">
            {revenueData.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full max-w-[28px] bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end h-full relative">
                  <div style={{ height: `${val}%` }} className="w-full bg-[#00667e] group-hover:bg-teal-600 transition-all rounded-t-sm"></div>
                  <div style={{ height: `${val / 3}%` }} className="w-full bg-amber-400 opacity-90"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{months[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Sessions By Channel</h3>
            <p className="text-xs text-slate-400">Booking sources & conversions</p>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-36 h-36 rounded-full border-[14px] border-teal-600 border-t-amber-400 border-r-sky-500 flex items-center justify-center shadow-inner">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-slate-900 block leading-tight">8.234</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Total Leads</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <span className="flex items-center gap-2 text-slate-700"><span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span> Online Website</span>
              <span className="text-slate-900 font-bold">65%</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <span className="flex items-center gap-2 text-slate-700"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Phone Call</span>
              <span className="text-slate-900 font-bold">25%</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <span className="flex items-center gap-2 text-slate-700"><span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Walk-In</span>
              <span className="text-slate-900 font-bold">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP ACTION MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {activeModal === 'quote' ? 'Create New Quote' : 'Enter Customer Payment'}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setActiveModal(null); alert('Action saved successfully!'); }} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Customer Name</label>
                <input type="text" required placeholder="e.g. John Doe" className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  {activeModal === 'quote' ? 'Estimated Amount ($)' : 'Payment Amount ($)'}
                </label>
                <input type="number" required placeholder="0.00" className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#00667e] hover:bg-[#005266] text-white shadow-sm"
                >
                  Save Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}