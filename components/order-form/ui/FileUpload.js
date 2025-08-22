import React from "react";

export default function FileUpload({ label, description, accept, onChange, file, disabled = false }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        {file && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Uploaded
          </span>
        )}
      </div>

      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <div className="space-y-1 text-center">
          <div className="flex text-sm text-gray-600">
            <label
              className={`relative cursor-pointer rounded-md font-medium text-orange hover:text-orange focus-within:outline-none ${
                disabled ? "cursor-not-allowed" : ""
              }`}
            >
              <span>Upload a file</span>
              <input
                type="file"
                accept={accept}
                onChange={(e) => onChange(e.target.files?.[0])}
                disabled={disabled}
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">{description}</p>
          {file && (
            <p className="text-sm text-green-600 mt-2">
              {file.name} ({Math.round(file.size / 1024)} KB)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
