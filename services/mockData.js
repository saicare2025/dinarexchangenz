export const mockOrders = [
  {
    id: "ORD-12327",
    date: "2023-05-20",
    status: "Order Received",
    amount: 2800,
    currency: "GBP",
    idPhotoUrl: null,
    receiptUrl: null,
  },
  {
    id: "ORD-12345",
    date: "2023-05-15",
    status: "Shipped",
    amount: 1500,
    currency: "USD",
    trackingNumber: "DHL123456789",
    idPhotoUrl: "/sample-id.jpg",
    receiptUrl: "/sample-receipt.jpg",
  },
  {
    id: "ORD-12346",
    date: "2023-05-18",
    status: "Payment Received",
    amount: 2500,
    currency: "EUR",
    idPhotoUrl: "/sample-id.jpg",
    receiptUrl: null,
  },
  {
    id: "ORD-12347",
    date: "2023-05-20",
    status: "Order Received",
    amount: 1800,
    currency: "GBP",
    idPhotoUrl: null,
    receiptUrl: null,
  },
];

export const orderStatuses = [
  "Order Received",
  "ID Received",
  "Payment Received",
  "Ready to Ship",
  "Shipped",
];
