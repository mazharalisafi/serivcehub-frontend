"use client";

import React, { useState } from "react";
import { 
  Search, 
  DollarSign, 
  CheckCircle2, 
  CreditCard, 
  RefreshCw 
} from "lucide-react";

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [transactions, setTransactions] = useState([
    {
      id: "TXN-8820",
      customer: "Sarah Johnson",
      method: "Credit Card (**** 4242)",
      datetime: "2026-03-01 14:32",
      amount: "$240.00",
      status: "COMPLETED",
    },
    {
      id: "TXN-8819",
      customer: "Emma Wilson",
      method: "PayPal",
      datetime: "2026-02-26 10:15",
      amount: "$350.00",
      status: "COMPLETED",
    },
    {
      id: "TXN-8818",
      customer: "David Miller",
      method: "Bank Transfer",
      datetime: "2026-02-20 16:45",
      amount: "$450.00",
      status: "COMPLETED",
    },
    {
      id: "TXN-8817",
      customer: "James Anderson",
      method: "Credit Card (**** 8821)",
      datetime: "2026-02-18 09:20",
      amount: "$95.00",
      status: "REFUNDED",
    },
    {
      id: "TXN-8816",
      customer: "Ali Khan",
      method: "Credit Card (**** 1102)",
      datetime: "2026-02-15 11:10",
      amount: "$180.00",
      status: "COMPLETED",
    },
  ]);

  // Search Filter
  const filteredTransactions = transactions.filter((txn) => {
    const q = searchQuery.toLowerCase();
    return (
      txn.id.toLowerCase().includes(q) ||
      txn.customer.toLowerCase().includes(q) ||
      txn.method.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#030712] text-slate-100 space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Payments & Transactions
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review successful payouts, transaction logs, and customer payment methods.
        </p>
      </div>

      {/* 3 Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Processed */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Total Processed</span>
            <div className="text-2xl font-bold text-white">$14,850.00</div>
          </div>
          <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign size={20} />
          </div>
        </div>

        {/* Card 2: Successful Payments */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Successful Payments</span>
            <div className="text-2xl font-bold text-white">482</div>
          </div>
          <div className="w-11 h-11 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* Card 3: Refunded */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Refunded</span>
            <div className="text-2xl font-bold text-white">$280.00</div>
          </div>
          <div className="w-11 h-11 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <CreditCard size={20} />
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Table Search Bar Header */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Search transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-slate-900/40">
                <th className="py-4 px-5">Transaction ID</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Payment Method</th>
                <th className="py-4 px-5">Date & Time</th>
                <th className="py-4 px-5">Amount</th>
                <th className="py-4 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-200">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                    No transactions found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-5 font-medium text-slate-300">
                      {txn.id}
                    </td>

                    <td className="py-4 px-5 font-bold text-white">
                      {txn.customer}
                    </td>

                    <td className="py-4 px-5 text-slate-400">
                      {txn.method}
                    </td>

                    <td className="py-4 px-5 text-slate-400">
                      {txn.datetime}
                    </td>

                    <td className="py-4 px-5 font-bold text-slate-100">
                      {txn.amount}
                    </td>

                    <td className="py-4 px-5">
                      {txn.status === "COMPLETED" ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          COMPLETED
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          REFUNDED
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}