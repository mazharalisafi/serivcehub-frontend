"use client";

import React, { useState } from "react";

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bookings, setBookings] = useState([
    {
      id: "BK-9021",
      invoiceId: "INV-1024",
      transactionId: "TXN-8820",
      customer: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 234 567 890",
      service: "Deep House Cleaning",
      dateTime: "2026-03-01 at 10:00 AM",
      amount: "$240.00",
      paymentStatus: "Paid",
      status: "Confirmed",
      notes: "Customer requested eco-friendly cleaning materials.",
    },
    {
      id: "BK-9022",
      invoiceId: "INV-1023",
      transactionId: "TXN-8819",
      customer: "Michael Chen",
      email: "m.chen@example.com",
      phone: "+1 987 654 321",
      service: "AC Maintenance",
      dateTime: "2026-02-28 at 02:30 PM",
      amount: "$180.00",
      paymentStatus: "Pending",
      status: "Pending",
      notes: "Check outdoor compressor unit.",
    },
    {
      id: "BK-9023",
      invoiceId: "INV-1022",
      transactionId: "TXN-8818",
      customer: "Emma Wilson",
      email: "emma.w@example.com",
      phone: "+1 555 019 283",
      service: "Plumbing Repair",
      dateTime: "2026-02-26 at 11:15 AM",
      amount: "$350.00",
      paymentStatus: "Paid",
      status: "In Progress",
      notes: "Main pipeline leak in bathroom.",
    },
  ]);

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    setBookings((prev) =>
      prev.map((b) => (b.id === selectedBooking.id ? selectedBooking : b))
    );
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 min-h-screen bg-[#0b1329] text-slate-100">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Bookings Directory</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage customer appointments, update statuses, and view linked invoices.
          </p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#111c38] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#162345] border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="p-4">Booking ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {bookings.map((b) => (
              <tr
                key={b.id}
                onClick={() => handleRowClick(b)}
                className="hover:bg-slate-800/40 cursor-pointer transition duration-150"
              >
                <td className="p-4 font-bold text-teal-400">{b.id}</td>
                <td className="p-4 font-medium text-white">{b.customer}</td>
                <td className="p-4 text-slate-300">{b.service}</td>
                <td className="p-4 font-bold text-white">{b.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      b.paymentStatus === "Paid"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {b.paymentStatus}
                  </span>
                </td>
                <td className="p-4">
                  <span className="bg-teal-500/10 text-teal-300 border border-teal-500/20 px-3 py-1 rounded-full text-xs font-bold">
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111c38] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-slate-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-800 bg-[#162345]">
              <div>
                <span className="text-xs text-teal-400 font-bold uppercase tracking-wider">
                  Booking Details
                </span>
                <h2 className="text-xl font-bold text-white">{selectedBooking.id}</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleStatusUpdate} className="p-6 space-y-5">
              {/* Connected Linked References */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#0b1329] rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Associated Invoice</span>
                  <span className="font-bold text-teal-400">{selectedBooking.invoiceId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Payment Transaction</span>
                  <span className="font-bold text-emerald-400">{selectedBooking.transactionId}</span>
                </div>
              </div>

              {/* Dynamic Status Pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-semibold">
                    Booking Status
                  </label>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) =>
                      setSelectedBooking({ ...selectedBooking, status: e.target.value })
                    }
                    className="w-full bg-[#0b1329] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500 font-bold"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-semibold">
                    Payment Status
                  </label>
                  <select
                    value={selectedBooking.paymentStatus}
                    onChange={(e) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        paymentStatus: e.target.value,
                      })
                    }
                    className="w-full bg-[#0b1329] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500 font-bold"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                <p>
                  <span className="text-slate-400">Customer Name:</span>{" "}
                  <strong className="text-white">{selectedBooking.customer}</strong>
                </p>
                <p>
                  <span className="text-slate-400">Service & Time:</span>{" "}
                  <strong className="text-white">
                    {selectedBooking.service} ({selectedBooking.dateTime})
                  </strong>
                </p>
                <p>
                  <span className="text-slate-400">Contact Email:</span>{" "}
                  <strong className="text-white">{selectedBooking.email}</strong>
                </p>
              </div>

              {/* Special Instructions / Notes */}
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold">
                  Customer Notes
                </label>
                <textarea
                  rows={2}
                  value={selectedBooking.notes}
                  onChange={(e) =>
                    setSelectedBooking({ ...selectedBooking, notes: e.target.value })
                  }
                  className="w-full bg-[#0b1329] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}