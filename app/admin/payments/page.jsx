import { CreditCard, ArrowUpRight, DollarSign, Search, CheckCircle2 } from 'lucide-react';

export default function PaymentsPage() {
  const transactions = [
    { id: 'TXN-8820', customer: 'Sarah Johnson', method: 'Credit Card (**** 4242)', amount: '$240.00', date: '2026-03-01 14:32', status: 'Completed' },
    { id: 'TXN-8819', customer: 'Emma Wilson', method: 'PayPal', amount: '$350.00', date: '2026-02-26 10:15', status: 'Completed' },
    { id: 'TXN-8818', customer: 'David Miller', method: 'Bank Transfer', amount: '$450.00', date: '2026-02-20 16:45', status: 'Completed' },
    { id: 'TXN-8817', customer: 'James Anderson', method: 'Credit Card (**** 8821)', amount: '$95.00', date: '2026-02-18 09:20', status: 'Refunded' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Payments & Transactions</h1>
        <p className="text-xs text-slate-500 mt-1">Review successful payouts, transaction logs, and customer payment methods</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Processed</span>
            <h3 className="text-xl font-bold text-slate-800 mt-1">$14,850.00</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Successful Payments</span>
            <h3 className="text-xl font-bold text-slate-800 mt-1">482</h3>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Refunded</span>
            <h3 className="text-xl font-bold text-slate-800 mt-1">$280.00</h3>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search transaction ID..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100 rounded-lg text-xs border border-transparent focus:border-teal-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-semibold text-slate-800">{txn.id}</td>
                  <td className="p-4 font-medium text-slate-900">{txn.customer}</td>
                  <td className="p-4 text-slate-500">{txn.method}</td>
                  <td className="p-4 text-slate-500">{txn.date}</td>
                  <td className="p-4 font-semibold text-slate-900">{txn.amount}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      txn.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {txn.status}
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