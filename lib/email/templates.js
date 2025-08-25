export function stripHtml(html = "") {
  return html.replace(/<[^>]*>?/gm, "");
}

// Common email template wrapper
function getEmailWrapper(content, orderId = null) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dinar Exchange</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 30px 40px;
          text-align: center;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .tagline {
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 40px;
        }
        .greeting {
          font-size: 18px;
          color: #2a5298;
          margin-bottom: 20px;
        }
        .message {
          font-size: 16px;
          margin-bottom: 25px;
          color: #555;
        }
        .order-details {
          background-color: #f8f9fa;
          border-left: 4px solid #2a5298;
          padding: 20px;
          margin: 25px 0;
          border-radius: 4px;
        }
        .order-id {
          font-size: 18px;
          font-weight: bold;
          color: #2a5298;
          margin-bottom: 10px;
        }
        .status {
          font-size: 16px;
          color: #28a745;
          font-weight: 600;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
          color: #ffffff !important;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
          box-shadow: 0 4px 6px rgba(42, 82, 152, 0.3);
          transition: all 0.3s ease;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(42, 82, 152, 0.4);
        }
        .footer {
          background-color: #f8f9fa;
          padding: 30px 40px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        .footer-text {
          color: #6c757d;
          font-size: 14px;
          margin-bottom: 15px;
        }
        .social-links {
          margin-top: 20px;
        }
        .social-link {
          display: inline-block;
          margin: 0 10px;
          color: #2a5298;
          text-decoration: none;
          font-weight: 600;
        }
        .urgent {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
        }
        .urgent .order-id {
          color: #856404;
        }
        .success {
          background-color: #d4edda;
          border-left: 4px solid #28a745;
        }
        .success .order-id {
          color: #155724;
        }
        .info {
          background-color: #d1ecf1;
          border-left: 4px solid #17a2b8;
        }
        .info .order-id {
          color: #0c5460;
        }
        .tracking-number {
          background-color: #e2e3e5;
          padding: 10px 15px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          color: #495057;
          margin: 10px 0;
        }
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 0;
            box-shadow: none;
          }
          .header, .content, .footer {
            padding: 20px;
          }
          .logo {
            font-size: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div class="logo">Dinar Exchange</div>
          <div class="tagline">Your Trusted Currency Exchange Partner</div>
        </div>
        
        <div class="content">
          ${content}
        </div>
        
        <div class="footer">
          <div class="footer-text">
            Thank you for choosing Dinar Exchange
          </div>
          <div class="footer-text">
            For support, contact us at support@dinarexchange.co.nz
          </div>
          <div class="social-links">
            <a href="#" class="social-link">Website</a> |
            <a href="#" class="social-link">Support</a> |
            <a href="#" class="social-link">Privacy Policy</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function tplMissing(kind, order) {
  const subject = `Action Required: ${kind === "ID" ? "ID Verification" : "Payment Receipt"} Needed for Order #${order.id}`;
  
  const content = `
    <div class="greeting">Hello ${order.fullName || "Valued Customer"},</div>
    
    <div class="message">
      We hope this email finds you well. We're reaching out regarding your recent order with Dinar Exchange.
    </div>
    
    <div class="order-details urgent">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Awaiting ${kind === "ID" ? "ID Verification" : "Payment Receipt"}</div>
    </div>
    
    <div class="message">
      To proceed with your order, we require your <strong>${kind === "ID" ? "identification document" : "payment receipt"}</strong>. 
      This is a standard security requirement to ensure safe and compliant transactions.
    </div>
    
    <div class="message">
      <strong>What you need to do:</strong><br>
      1. Log into your account<br>
      2. Navigate to your order details<br>
      3. Upload the required document<br>
      4. Submit for verification
    </div>
    
    <div style="text-align: center;">
      <a href="${process.env.APP_URL}/dashboard/orders/${order.id}" class="cta-button">
        Upload ${kind === "ID" ? "ID Document" : "Payment Receipt"}
      </a>
    </div>
    
    <div class="message">
      <strong>Need help?</strong> Our support team is available to assist you with the upload process. 
      Simply reply to this email or contact us at support@dinarexchange.co.nz
    </div>
  `;
  
  return { subject, html: getEmailWrapper(content, order.id), text: stripHtml(content) };
}

export function tplStatusUpdate(order, newStatus, trackingNumber) {
  const subject = `Order Update: #${order.id} - Status Changed to ${newStatus}`;
  
  const content = `
    <div class="greeting">Hello ${order.fullName || "Valued Customer"},</div>
    
    <div class="message">
      Great news! Your order status has been updated. Here are the latest details:
    </div>
    
    <div class="order-details info">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">New Status: ${newStatus}</div>
      ${trackingNumber ? `<div class="tracking-number">Tracking: ${trackingNumber}</div>` : ""}
    </div>
    
    <div class="message">
      We're working diligently to process your order and ensure a smooth experience. 
      You can track the progress of your order in real-time through your dashboard.
    </div>
    
    <div style="text-align: center;">
      <a href="${process.env.APP_URL}/dashboard/orders/${order.id}" class="cta-button">
        View Order Details
      </a>
    </div>
    
    <div class="message">
      <strong>What's next?</strong> We'll keep you informed of any further updates. 
      If you have any questions, don't hesitate to reach out to our support team.
    </div>
  `;
  
  return { subject, html: getEmailWrapper(content, order.id), text: stripHtml(content) };
}

export function tplTracking(order, trackingNumber, updated = false) {
  const subject = `Tracking Information ${updated ? "Updated" : "Available"}: Order #${order.id}`;
  
  const content = `
    <div class="greeting">Hello ${order.fullName || "Valued Customer"},</div>
    
    <div class="message">
      ${updated ? "Your tracking information has been updated!" : "Excellent! Your order is now on its way to you."} 
      We've ${updated ? "updated" : "added"} tracking information to your order.
    </div>
    
    <div class="order-details success">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Shipped with Tracking</div>
      ${trackingNumber ? `<div class="tracking-number">Tracking Number: ${trackingNumber}</div>` : ""}
    </div>
    
    <div class="message">
      You can now track your package in real-time and know exactly when it will arrive. 
      Our secure shipping ensures your order reaches you safely and on time.
    </div>
    
    <div style="text-align: center;">
      <a href="${process.env.APP_URL}/dashboard/orders/${order.id}" class="cta-button">
        Track Your Order
      </a>
    </div>
    
    <div class="message">
      <strong>Delivery Information:</strong><br>
      • Estimated delivery: 3-5 business days<br>
      • Signature required upon delivery<br>
      • Package insured for full value
    </div>
  `;
  
  return { subject, html: getEmailWrapper(content, order.id), text: stripHtml(content) };
}

export function tplCompleted(order, eta = "3–5 business days") {
  const subject = `Order Completed: #${order.id} - Ready for Shipping`;
  
  const content = `
    <div class="greeting">Hello ${order.fullName || "Valued Customer"},</div>
    
    <div class="message">
      Fantastic news! Your order has been completed and is now ready for shipping.
    </div>
    
    <div class="order-details success">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Completed & Ready for Shipping</div>
    </div>
    
    <div class="message">
      Your order has been processed successfully and will be shipped within the next 24 hours. 
      You'll receive tracking information as soon as it's available.
    </div>
    
    <div style="text-align: center;">
      <a href="${process.env.APP_URL}/dashboard/orders/${order.id}" class="cta-button">
        View Order Details
      </a>
    </div>
    
    <div class="message">
      <strong>Shipping Details:</strong><br>
      • Estimated delivery: ${eta}<br>
      • Secure packaging with full insurance<br>
      • Signature required for delivery<br>
      • Real-time tracking updates
    </div>
    
    <div class="message">
      Thank you for choosing Dinar Exchange. We appreciate your business and look forward to serving you again!
    </div>
  `;
  
  return { subject, html: getEmailWrapper(content, order.id), text: stripHtml(content) };
}

