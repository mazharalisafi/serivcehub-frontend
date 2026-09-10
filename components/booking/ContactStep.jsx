'use client';

export default function ContactStep({ formData, updateFormData, onNext, onBack }) {
  return (
    <div className="bg-[#0b1329]/90 border border-slate-800/90 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 max-w-3xl mx-auto">
      <div>
        <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.fullName || ''}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={formData.email || ''}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="+61 400 000 000"
            value={formData.phone || ''}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
          Preferred Contact Method
        </label>
        <div className="flex gap-4">
          {['Phone', 'SMS', 'Email'].map((method) => (
            <label key={method} className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={(formData.preferredContact || 'Phone') === method}
                onChange={(e) => updateFormData({ preferredContact: e.target.value })}
                className="accent-emerald-400"
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-800/80">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 transition"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm transition"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}