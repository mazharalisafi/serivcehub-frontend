import React from 'react';

export function Select({ 
  options = [], 
  value = '', 
  onChange, 
  placeholder = "Select an option", 
  className = "", 
  ...props 
}) {
  return (
    <select
      value={typeof value === 'object' && value !== null ? value.value || '' : value}
      onChange={onChange}
      className={`w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none transition-all ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}

      {options.map((opt, index) => {
        // String / Object / Nested object safety extraction
        let optValue = opt;
        let optLabel = opt;

        if (typeof opt === 'object' && opt !== null) {
          optValue = opt.value ?? opt.id ?? opt.name ?? JSON.stringify(opt);
          optLabel = opt.label ?? opt.name ?? opt.title ?? optValue;
        }

        // Ensuring uniqueKey is ALWAYS a clean string, never [object Object]
        const cleanKey = typeof optValue === 'object' 
          ? `select-opt-${index}` 
          : String(optValue || index);

        return (
          <option key={`${cleanKey}-${index}`} value={optValue}>
            {String(optLabel)}
          </option>
        );
      })}
    </select>
  );
}