import React, { useState } from "react";

export default function InputField({ label, type = "text", value, onChange, error, helpText, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-orange focus:border-orange ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {helpText && isFocused && !error && (
        <p className="text-xs text-blue-600 mt-1">{helpText}</p>
      )}
    </div>
  );
}
