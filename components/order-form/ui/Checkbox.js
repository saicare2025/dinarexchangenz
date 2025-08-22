import React from "react";

export default function Checkbox({ label, checked, onChange, ...props }) {
  return (
    <div className="flex items-start">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 mr-2"
        {...props}
      />
      <label className="text-sm text-gray-600">{label}</label>
    </div>
  );
}
