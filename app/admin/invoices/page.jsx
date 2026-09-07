"use client";

import React, { useState } from "react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([
    {
      id: "INV-1024",
      bookingId: "BK-9021",
      customer: "Sarah Johnson",
      service: "Deep House Cleaning",
      date: "2026-03-01",
      amount: "$240.00",
      status: "PAID",
    },
    {
      id: "INV-1023",
      bookingId: "BK-9022",
      customer: "Michael Chen",
      service: "AC Maintenance",
      date: "2026-02-28",
      amount: "$180.00",
      status: "PENDING",
    },
    {
      id: "INV-1022",
      bookingId: "BK-9023",
      customer: "Emma Wilson",
      service: "Plumbing Repair",
      date: "2026-02-26",
      amount: "$350.00",
      status: "OVERDUE",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    );
  };

  const handleDownloadPDF = (invoice) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${invoice.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0d9488; padding-bottom: 15px; }
            .title { font-size: 24px; font-weight: bold; color: #0d9488; }
            .details { margin-top: 30px; line-height: 1.8; }
            .table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            .table th, .table td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
            .table th { background-color: #f8fafc; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">ServiceHub Portal</div>
              <p>Official Billing Invoice</p>
            </div>
            <div>
              <h2>${invoice.id}</h2>
              <p>Date: ${invoice.date}</p>
            </div>
          </div>
          <div class="details">
            <p><strong>Associated Booking ID:</strong> ${invoice.bookingId}</p>
            <p><strong>Customer Name:</strong> ${invoice.customer}</p>
            <p><strong>Payment Status:</strong> ${invoice.status}</p>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Service Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${invoice.service}</td>
                <td>${invoice.amount}</td>
              </tr>
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-8 min-h-screen bg-[#0b1329] text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Invoices Directory</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage and track customer billing, booking links, and downloads.
          </p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-lg">
          + Create Invoice
        </button>
      </div>

      <div className="bg-[#111c38] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#162345] border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="p-4">Invoice ID</th>
              <th className="p-4">Booking ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-800/40 transition">
                <td className="p-4 font-bold text-teal-400">{inv.id}</td>
                <td className="p-4">
                  <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-700">
                    {inv.bookingId}
                  </span>
                </td>
                <td className="p-4 font-medium text-white">{inv.customer}</td>
                <td className="p-4 text-slate-300">{inv.service}</td>
                <td className="p-4 text-slate-400">{inv.date}</td>
                <td className="p-4 font-bold text-white">{inv.amount}</td>
                <td className="p-4">
                  <select
                    value={inv.status}
                    onChange={(e) => handleStatusChange(inv.id, e.target.value)}
                    className="bg-[#0b1329] border border-slate-700 rounded-lg text-xs font-bold px-3 py-1.5 text-white cursor-pointer focus:outline-none focus:border-teal-500"
                  >
                    <option value="PAID">PAID</option>
                    <option value="PENDING">PENDING</option>
                    <option value="OVERDUE">OVERDUE</option>
                  </select>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDownloadPDF(inv)}
                    className="p-2 text-slate-400 hover:text-teal-400 hover:bg-slate-800 rounded-lg transition"
                    title="Download PDF"
                  >
                    📥
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}