import React from "react";

export default function Alert({ icon, title, message, type = "info" }) {
  const containerClasses = {
    info: "bg-blue-50 border-blue-500",
    warning: "bg-orange-50 border-orange",
    error: "bg-red-50 border-red-500",
    success: "bg-green-50 border-green-500",
  };
  const textClasses = {
    info: "text-blue-800",
    warning: "text-orange",
    error: "text-red-800",
    success: "text-green-800",
  };

  return (
    <div className={`border-l-4 ${containerClasses[type]} ${textClasses[type]} py-1 rounded-r-lg`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {React.cloneElement(icon, { className: `h-5 w-5 ${textClasses[type]}` })}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="mt-2 text-sm">
            {typeof message === "string" ? <p>{message}</p> : message}
          </div>
        </div>
      </div>
    </div>
  );
}
