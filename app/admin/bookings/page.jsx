'use client';

import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, FileText, User, DollarSign, Calendar, CreditCard, ShieldAlert } from 'lucide-react';

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState([
    { id: 'BK-1001', customer: 'John Smith', service: 'Plumbing', dateTime: '2026-08-31 at 9:00 AM', address: '12 Example Street, Parramatta NSW 2150', phone: '0412 345 001', email: 'john.smith@example.com', notes: 'Kitchen tap leaking, needs a look this week.', staff: 'Marcus Lee', price: 'From $85/hr', payment: 'Paid', status: 'Confirmed' },
    { id: 'BK-1002', customer: 'Aisha Khan', service: 'Electrical', dateTime: '2026-08-31 at 11:00 AM', address: '45 Park Road, Sydney NSW 2000', phone: '0423 111 222', email: 'aisha@example.com', notes: 'Switchboard check', staff: 'Priya Nair', price: '$120', payment: 'Pending', status: 'Pending' },
    { id: 'BK-1003', customer: 'Liam Brown', service: 'Cleaning', dateTime: '2026-08-31 at 1:00 PM', address: '88 George St, Sydney NSW 2000', phone: '0433 999 888', email: 'liam@example.com', notes: 'Carpet cleaning', staff: 'Chloe Adams', price: '$150', payment: 'Unpaid', status: 'In Progress' },
    { id: 'BK-1004', customer: 'Sara Wilson', service: 'Plumbing', dateTime: '2026-08-31 at 2:00 PM', address: '10 Victoria Rd, Parramatta', phone: '0455 666 777', email: 'sara@example.com', notes: 'Bathroom pipe check', staff: 'Marcus Lee', price: '$90', payment: 'Pending', status: 'Needs Info' },
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    setBookings((prev) =>
      prev.map((b) => (b.id === selectedBooking.id ? selectedBooking : b))
    );
    setSelectedBooking(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">BOOKING ID</th>
              <th className="py-3.5 px-4">CUSTOMER</th>
              <th className="py-3.5 px-4">SERVICE</th>
              <th className="py-3.5 px-4">PAYMENT</th>
              <th className="py-3.5 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((b) => (
              <tr key={b.id} onClick={() => setSelectedBooking({ ...b })} className="hover:bg-slate-50 cursor-pointer transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">{b.id}</td>
                <td className="py-3.5 px-4 text-slate-800 font-medium">{b.customer}</td>
                <td className="py-3.5 px-4 text-slate-600">{b.service} - {b.dateTime}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${
                    b.payment === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                    b.payment === 'Unpaid' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {b.payment}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${
                    b.status === 'Confirmed' ? 'bg-teal-100 text-teal-800' :
                    b.status === 'In Progress' ? 'bg-sky-100 text-sky-800' :
                    b.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                    b.status === 'Needs Info' ? 'bg-orange-100 text-orange-800' :
                    b.status === 'Declined' || b.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editable Booking Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleUpdate} className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative border border-slate-100">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="text-xs text-slate-400 font-medium">Booking</p>
                <h3 className="text-lg font-bold text-slate-900">{selectedBooking.id}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              {/* Admin Edit Controls */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                    <ShieldAlert size={14} /> Booking Status
                  </label>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, status: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg text-xs font-semibold p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Needs Info">Needs Info</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                    <CreditCard size={14} /> Payment Status
                  </label>
                  <select
                    value={selectedBooking.payment}
                    onChange={(e) => setSelectedBooking({ ...selectedBooking, payment: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg text-xs font-semibold p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Details List */}
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Service & Slot</p>
                  <p className="font-semibold text-slate-800">{selectedBooking.service} - {selectedBooking.dateTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Address</p>
                  <p className="font-medium text-slate-800">{selectedBooking.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Customer</p>
                  <p className="font-medium text-slate-800">{selectedBooking.customer} - {selectedBooking.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="font-medium text-slate-800">{selectedBooking.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Job notes</p>
                  <p className="font-medium text-slate-800">{selectedBooking.notes}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Assigned staff</p>
                  <p className="font-semibold text-slate-800">{selectedBooking.staff}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Price</p>
                  <p className="font-semibold text-slate-800">{selectedBooking.price}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#00667e] text-white hover:bg-[#005266]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}