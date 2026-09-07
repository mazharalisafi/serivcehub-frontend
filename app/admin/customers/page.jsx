"use client";

import React, { useState } from "react";
import { 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  Eye, 
  X, 
  UserPlus 
} from "lucide-react";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([
    {
      id: "CUST-101",
      name: "Ali Khan",
      email: "ali.khan@example.com",
      phone: "+92 300 1234567",
      bookings: 8,
      totalSpent: "$1,200.00",
      lastVisit: "2026-02-28",
      status: "Active",
    },
    {
      id: "CUST-102",
      name: "Sara Ahmed",
      email: "sara.a@example.com",
      phone: "+92 321 9876543",
      bookings: 3,
      totalSpent: "$360.00",
      lastVisit: "2026-03-01",
      status: "Active",
    },
    {
      id: "CUST-103",
      name: "Usman Malik",
      email: "usman.m@example.com",
      phone: "+92 333 4567890",
      bookings: 12,
      totalSpent: "$2,450.00",
      lastVisit: "2026-03-02",
      status: "VIP",
    },
    {
      id: "CUST-104",
      name: "Zainab Bibi",
      email: "zainab.b@example.com",
      phone: "+92 345 1122334",
      bookings: 1,
      totalSpent: "$80.00",
      lastVisit: "2026-02-15",
      status: "New",
    },
    {
      id: "CUST-105",
      name: "Hamza Hassan",
      email: "hamza.h@example.com",
      phone: "+92 312 6677889",
      bookings: 5,
      totalSpent: "$750.00",
      lastVisit: "2026-02-20",
      status: "Active",
    },
    {
      id: "CUST-106",
      name: "Michael Chen",
      email: "m.chen@example.com",
      phone: "+1 987 654 321",
      bookings: 2,
      totalSpent: "$220.00",
      lastVisit: "2026-01-10",
      status: "Inactive",
    },
  ]);

  // Modal States
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  // Filter customers
  const filteredCustomers = customers.filter((cust) => {
    const q = searchQuery.toLowerCase();
    return (
      cust.id.toLowerCase().includes(q) ||
      cust.name.toLowerCase().includes(q) ||
      cust.email.toLowerCase().includes(q) ||
      cust.phone.toLowerCase().includes(q)
    );
  });

  // Avatar color generator
  const getAvatarColor = (name) => {
    const colors = [
      "bg-indigo-600 text-indigo-100",
      "bg-teal-600 text-teal-100",
      "bg-purple-600 text-purple-100",
      "bg-rose-600 text-rose-100",
      "bg-amber-600 text-amber-100",
    ];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  // Add Customer Submit Handler
  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    if (!newCustomerForm.name || !newCustomerForm.email) return;

    const nextIdNumber = customers.length + 101;
    const todayDate = new Date().toISOString().split("T")[0];

    const createdCustomer = {
      id: `CUST-${nextIdNumber}`,
      name: newCustomerForm.name,
      email: newCustomerForm.email,
      phone: newCustomerForm.phone || "N/A",
      bookings: 0,
      totalSpent: "$0.00",
      lastVisit: todayDate,
      status: newCustomerForm.status,
    };

    setCustomers([createdCustomer, ...customers]);
    setIsAddModalOpen(false);
    setNewCustomerForm({ name: "", email: "", phone: "", status: "Active" });
  };

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#030712] text-slate-100 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>👥</span> Customers Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage customer profiles, contact info, total spend, and booking histories.
          </p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition text-sm shadow-lg shadow-teal-500/20"
        >
          <UserPlus size={18} /> Add Customer
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search by ID, name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
          />
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold">
          <span>Total Customers: <strong className="text-teal-400">{customers.length}</strong></span>
          <span>•</span>
          <span>Filtered: <strong className="text-white">{filteredCustomers.length}</strong></span>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-slate-900/50">
                <th className="py-4 px-5">Customer ID</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Contact Details</th>
                <th className="py-4 px-5">Total Bookings</th>
                <th className="py-4 px-5">Total Spent</th>
                <th className="py-4 px-5">Last Visit</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-200">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No customers found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-5 font-mono font-bold text-teal-400">
                      {cust.id}
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md ${getAvatarColor(cust.name)}`}>
                          {cust.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-white">{cust.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                        <Mail size={13} className="text-slate-500" />
                        {cust.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Phone size={13} className="text-slate-500" />
                        {cust.phone}
                      </div>
                    </td>

                    <td className="py-4 px-5 font-medium text-slate-300">
                      <span className="font-bold text-white">{cust.bookings}</span> visits
                    </td>

                    <td className="py-4 px-5 font-bold text-emerald-400">
                      {cust.totalSpent}
                    </td>

                    <td className="py-4 px-5 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-500" />
                        {cust.lastVisit}
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      {cust.status === "Active" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      )}
                      {cust.status === "VIP" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          VIP
                        </span>
                      )}
                      {cust.status === "New" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          New
                        </span>
                      )}
                      {cust.status === "Inactive" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        title="View Details"
                        className="p-1.5 text-slate-400 hover:text-teal-300 rounded-lg hover:bg-slate-800 transition inline-flex items-center gap-1 font-semibold"
                      >
                        <Eye size={15} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. ADD NEW CUSTOMER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleAddCustomerSubmit}
            className="bg-[#0b0f19] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus size={18} className="text-teal-400" /> Add New Customer
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bilal Ahmed"
                  value={newCustomerForm.name}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. bilal@example.com"
                  value={newCustomerForm.email}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +92 300 0000000"
                  value={newCustomerForm.phone}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Initial Status</label>
                <select
                  value={newCustomerForm.status}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, status: e.target.value })}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Active">Active</option>
                  <option value="New">New</option>
                  <option value="VIP">VIP</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition"
              >
                Save Customer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. VIEW CUSTOMER DETAILS MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getAvatarColor(selectedCustomer.name)}`}>
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedCustomer.name}</h3>
                  <span className="text-xs font-mono text-teal-400">{selectedCustomer.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#030712] border border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Email:</span>
                  <span className="text-white font-medium">{selectedCustomer.email}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Phone:</span>
                  <span className="text-white font-medium">{selectedCustomer.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#030712] border border-slate-800 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Total Bookings</span>
                  <span className="text-lg font-bold text-white">{selectedCustomer.bookings}</span>
                </div>
                <div className="p-3 bg-[#030712] border border-slate-800 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase">Total Spent</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedCustomer.totalSpent}</span>
                </div>
              </div>

              <div className="p-3 bg-[#030712] border border-slate-800 rounded-xl flex justify-between items-center">
                <span className="text-slate-400">Last Visit Date:</span>
                <span className="text-slate-200 font-semibold">{selectedCustomer.lastVisit}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}