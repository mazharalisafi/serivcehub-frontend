import { FileText, Download, Plus, Search, Filter } from 'lucide-react';

export default function InvoicesPage() {
  const invoices = [
    { id: 'INV-1024', customer: 'Sarah Johnson', date: '2026-03-01', amount: '$240.00', status: 'Paid', service: 'Deep House Cleaning' },
    { id: 'INV-1023', customer: 'Michael Chen', date: '2026-02-28', amount: '$180.00', status: 'Pending', service: 'AC Maintenance' },
    { id: 'INV-1022', customer: 'Emma Wilson', date: '2026-02-26', amount: '$350.00', status: 'Paid', service: 'Plumbing Repair' },
    { id: 'INV-1021', customer: 'Robert Taylor', date: '2026-02-24', amount: '$120.00', status: 'Overdue', service: 'Lawn Care' },
    { id: 'INV-1020', customer: 'David Miller', date: '2026-02-20', amount: '$450.00', status: 'Paid', service: 'Electrical Rewiring' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Invoices</h1>
          <p className="text-xs text-slate-500 mt-1">Manage and track customer billing & invoices</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer">
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* Invoices Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoice or customer..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100 rounded-lg text-xs border border-transparent focus:border-teal-500 focus:bg-white focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-semibold text-teal-700">{inv.id}</td>
                  <td className="p-4 font-medium text-slate-900">{inv.customer}</td>
                  <td className="p-4 text-slate-500">{inv.service}</td>
                  <td className="p-4 text-slate-500">{inv.date}</td>
                  <td className="p-4 font-semibold text-slate-900">{inv.amount}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                      inv.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
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