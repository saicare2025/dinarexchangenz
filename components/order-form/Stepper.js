import React from "react";

export default function Stepper({ currentStep, steps }) {
  return (
    <div className="flex justify-center gap-10 lg:gap-20 mb-4 relative">
      {steps.map((step) => {
        const isCompleted = step.id <= currentStep;
        return (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              isCompleted ? "text-[#008080]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                isCompleted
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-gray-100"
              }`}
            >
              <step.icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">{step.title}</span>
          </div>
        );
      })}
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
        <div
          className="h-full bg-orange transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
