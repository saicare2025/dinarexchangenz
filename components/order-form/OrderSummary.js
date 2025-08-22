import React from "react";
import SummaryRow from "./ui/SummaryRow";

export default function OrderSummary({ 
  currency, 
  unitPrice, 
  shippingFee, 
  totalAmount, 
  qualifiesForBonus, 
  bonusConfig 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
      <div className="space-y-3">
        <SummaryRow label="Currency:" value={currency || "Not selected"} />
        <SummaryRow label="Unit Price:" value={`$${unitPrice.toFixed(2)} AUD`} />
        {qualifiesForBonus && bonusConfig && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <span className="text-sm font-medium text-green-700">
              🎁 Bonus: {bonusConfig.bonusLabel} (FREE)
            </span>
          </div>
        )}
        <SummaryRow label="Shipping:" value={`$${shippingFee.toFixed(2)} AUD`} />
        <hr className="my-3" />
        <SummaryRow
          label={<span className="font-bold">Total:</span>}
          value={<span className="text-orange font-bold">${totalAmount.toFixed(2)} AUD</span>}
        />
      </div>
      <div className="mt-6 p-4 bg-orange-50 rounded-lg">
        <p className="text-sm text-orange">
          <strong>Note:</strong> Your order will be processed within 24–48 hours.
        </p>
      </div>
    </div>
  );
}
