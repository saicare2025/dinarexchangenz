import { pruneUndefined, numberOrUndef } from "./object";

export function toDbOrderRow(orderData, base44Result = {}) {
  const id =
    (base44Result && (base44Result.id || base44Result._id)) ||
    orderData?.id ||
    `ORDER-${Date.now()}`;

  // Map to exact schema columns only
  const row = pruneUndefined({
    id,
    // Contact info
    fullName: orderData?.personalInfo?.fullName,
    email: orderData?.personalInfo?.email,
    mobile: orderData?.personalInfo?.mobile,
    
    // Address info
    country: orderData?.personalInfo?.country,
    address: orderData?.personalInfo?.address,
    city: orderData?.personalInfo?.city,
    state: orderData?.personalInfo?.state,
    postcode: orderData?.personalInfo?.postcode,
    
    // Order details
    currency: orderData?.orderDetails?.currency,
    quantity: numberOrUndef(orderData?.orderDetails?.quantity),
    
    // File URLs
    idFileUrl: orderData?.verification?.id_document_url,
    receiptUrl: orderData?.payment?.receipt_url,
    
    // Payment & verification info
    method: orderData?.payment?.method,
    comments: orderData?.payment?.comments,
    idExpiry: orderData?.verification?.idExpiry,
    idNumber: orderData?.verification?.idNumber,
    acceptTerms: orderData?.verification?.acceptTerms,
    skipReceipt: orderData?.payment?.skipReceipt,

    // timestamps: let DB set createdAt and updatedAt via defaults/triggers
  });

  return row;
}

