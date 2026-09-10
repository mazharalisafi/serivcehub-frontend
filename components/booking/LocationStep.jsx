'use client';

export default function LocationStep({ formData, updateFormData, onNext, onBack }) {
  return (
    <div className="bg-[#0b1329]/90 border border-slate-800/90 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-emerald-400 mb-2">
            State <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.state || ''}
            onChange={(e) => updateFormData({ state: e.target.value })}
            className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
          >
            <option value="">Select your state</option>
            <option value="NSW">New South Wales (NSW)</option>
            <option value="VIC">Victoria (VIC)</option>
            <option value="QLD">Queensland (QLD)</option>
            <option value="WA">Western Australia (WA)</option>
            <option value="SA">South Australia (SA)</option>
            <option value="TAS">Tasmania (TAS)</option>
            <option value="ACT">Australian Capital Territory (ACT)</option>
            <option value="NT">Northern Territory (NT)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-400 mb-2">
            Postcode <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 2150"
            value={formData.postcode || ''}
            onChange={(e) => updateFormData({ postcode: e.target.value })}
            className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-emerald-400 mb-2">
          Full address <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Unit 4, 12 Example Street, Parramatta NSW 2150"
          value={formData.address || ''}
          onChange={(e) => updateFormData({ address: e.target.value })}
          className="w-full bg-[#050b18] border border-slate-700/80 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-400"
        />
      </div>

      <div className="flex justify-between items-center pt-2">
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