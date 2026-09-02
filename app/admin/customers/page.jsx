'use client';

import React, { useState } from 'react';
import { Search, Mail, Phone, Calendar, UserCheck } from 'lucide-react';

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockCustomers = [
    { id: 1, name: 'Ali Khan', email: 'ali.khan@example.com', phone: '+92 300 1234567', totalBookings: 8, status: 'Active', lastVisit: '2026-02-28' },
    { id: 2, name: 'Sara Ahmed', email: 'sara.a@example.com', phone: '+92 321 9876543', totalBookings: 3, status: 'Active', lastVisit: '2026-03-01' },
    { id: 3, name: 'Usman Malik', email: 'usman.m@example.com', phone: '+92 333 4567890', totalBookings: 12, status: 'VIP', lastVisit: '2026-03-02' },
    { id: 4, name: 'Zainab Bibi', email: 'zainab@example.com', phone: '+92 345 1122334', totalBookings: 1, status: 'New', lastVisit: '2026-02-15' },
    { id: 5, name: 'Hamza Hassan', email: 'hamza.h@example.com', phone: '+92 312 6677889', totalBookings: 5, status: 'Active', lastVisit: '2026-02-20' },
  ];

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage customer profiles and booking history.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Total Bookings</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 font-semibold flex items-center justify-center text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-800">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Mail size={13} className="text-slate-400" /> {customer.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Phone size={13} className="text-slate-400" /> {customer.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{customer.totalBookings} visits</td>
                  <td className="py-3.5 px-4 text-slate-500">{customer.lastVisit}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                      customer.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {customer.status}
                    </span>
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