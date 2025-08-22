import React from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";

export default function BankDetails({ details }) {
  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
      <h3 className="text-md font-semibold mb-2 text-gray-800 flex items-center gap-2">
        <BanknotesIcon className="h-5 w-5 text-orange" />
        Bank Transfer Details
      </h3>
      {Object.entries(details).map(([key, value]) => (
        <p key={key} className="text-sm">
          <strong>
            {key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}:
          </strong>{" "}
          {value}
        </p>
      ))}
    </div>
  );
}
