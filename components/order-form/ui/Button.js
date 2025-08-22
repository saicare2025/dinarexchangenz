import React from "react";

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  isLoading = false, 
  icon, 
  variant = "primary", 
  ...props 
}) {
  const baseClasses = "inline-flex items-center gap-2 text-sm font-medium py-2 px-5 rounded-md transition-colors";
  const variantClasses = {
    primary: `text-white ${
      disabled || isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange hover:bg-orange"
    }`,
    secondary: `text-gray-600 hover:text-gray-800 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled || isLoading} 
      className={`${baseClasses} ${variantClasses[variant]}`} 
      {...props}
    >
      {isLoading ? <span className="animate-spin">🌀</span> : icon && React.cloneElement(icon, { className: "w-4 h-4" })}
      {children}
    </button>
  );
}
