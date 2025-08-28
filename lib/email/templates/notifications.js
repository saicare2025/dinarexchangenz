import { buildLoginUrl } from "../../auth.js";

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
          Kind regards,<br/> The Dinar Exchange Team</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>?/gm, "");
}

// Helper function to extract first name
function getFirstName(fullName) {
  return fullName ? fullName.split(" ")[0] : "there";
}

// Helper function to generate magic login link for order
function getMagicLoginLink(orderId) {
  return buildLoginUrl("/");
}

// Helper function to generate AusPost tracking link
function getTrackingLink(trackingNumber) {
  return trackingNumber
    ? `https://auspost.com.au/mypost/track/search?trackingNumbers=${trackingNumber}`
    : null;
}

// 1. Order Received
export function tplOrderReceived(order) {
  const firstName = getFirstName(order.fullName);
  const subject = "Order Received - Complete Payment Within 24 Hours";

  const content = `
    <div class="greeting">Hi ${firstName},</div>
    
    <div class="message">
      We've received your order and are excited to process it for you!
    </div>
    
    <div class="order-details info">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Payment Required</div>
    </div>
    
    <div class="message">
      <strong>Important:</strong> To lock in today's rate, please complete your payment within 24 hours.
    </div>
    
    <div style="text-align: center;">
      <a href="${getMagicLoginLink(order.id)}" class="cta-button">
        Complete Payment Now
      </a>
    </div>
    
    <div class="message">
      If you have any questions about the payment process, please don't hesitate to contact us.
    </div>
  `;

  return {
    subject,
    html: getEmailWrapper(content, order.id),
    text: stripHtml(content),
  };
}

// 2. Missing ID
export function tplMissingId(order) {
  const firstName = getFirstName(order.fullName);
  const subject = "Action Required: Please upload your ID";

  const content = `
    <div class="greeting">Hi ${firstName},</div>
    
    <div class="message">
      We still need your ID to complete your order. Without this step, we won't be able to proceed further.
    </div>
    
    <div class="order-details urgent">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: ID Verification Required</div>
    </div>
    
    <div style="text-align: center;">
      <a href="${getMagicLoginLink(order.id)}" class="cta-button">
        Upload ID Securely
      </a>
    </div>
    
    <div class="message">
      Thanks for your prompt attention.
    </div>
  `;

  return {
    subject,
    html: getEmailWrapper(content, order.id),
    text: stripHtml(content),
  };
}

// 3. ID Received
export function tplIdReceived(order) {
  const firstName = getFirstName(order.fullName);
  const subject = "Your ID has been received";

  const content = `
    <div class="greeting">Hi ${firstName},</div>
    
    <div class="message">
      Thanks — we've successfully received your ID. Your order is now being processed and will move to the next stage soon.
    </div>
    
    <div class="order-details success">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: ID Verified - Processing</div>
    </div>
    
    <div class="message">
      You don't need to take any further action right now.
    </div>
  `;

  return {
    subject,
    html: getEmailWrapper(content, order.id),
    text: stripHtml(content),
  };
}

// 4. Missing Payment
export function tplMissingPayment(order) {
  const firstName = getFirstName(order.fullName);
  const subject = "Action Required: Upload Your Payment Receipt";

  const content = `
    <div class="greeting">Hi ${firstName},</div>
    
    <div class="message">
      We're still waiting on your payment receipt to confirm your order. Please upload your transfer receipt so we can proceed.
    </div>
    
    <div class="order-details urgent">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Payment Receipt Required</div>
    </div>
    
    <div style="text-align: center;">
      <a href="${getMagicLoginLink(order.id)}" class="cta-button">
        Upload Receipt Now
      </a>
    </div>
    
    <div class="message">
      Thank you for completing this step as soon as possible.
    </div>
  `;

  return {
    subject,
    html: getEmailWrapper(content, order.id),
    text: stripHtml(content),
  };
}

// 5. Payment Received
export function tplPaymentReceived(order) {
  const firstName = getFirstName(order.fullName);
  const subject = "Payment Confirmed – Order in Progress";

  const content = `
    <div class="greeting">Hi ${firstName},</div>
    
    <div class="message">
      Great news — we've received your payment. Your order is now confirmed and being prepared for shipment.
    </div>
    
    <div class="order-details success">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Payment Confirmed - Preparing</div>
    </div>
    
    <div class="message">
      We'll let you know as soon as your tracking details are available.
    </div>
  `;

  return {
    subject,
    html: getEmailWrapper(content, order.id),
    text: stripHtml(content),
  };
}

// 6. Delay Notice
export function tplDelayNotice(order) {
  const firstName = getFirstName(order.fullName);
  const subject = "Update on Your Order";

  const content = `
    <div class="greeting">Hi ${firstName},</div>
    
    <div class="message">
      We wanted to let you know that due to high demand and some delays in Iraq, your order is taking longer than expected.
    </div>
    
    <div class="order-details info">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Processing - Slight Delay</div>
    </div>
    
    <div class="message">
      Rest assured it will be shipped in the next few days. We truly appreciate your patience and understanding.
    </div>
  `;

  return {
    subject,
    html: getEmailWrapper(content, order.id),
    text: stripHtml(content),
  };
}

// 7. Tracking Added
export function tplTrackingAdded(order) {
  const firstName = getFirstName(order.fullName);
  const subject = "Your order has shipped!";
  const trackingLink = getTrackingLink(order.trackingNumber);

  const content = `
    <div class="greeting">Hi ${firstName},</div>
    
    <div class="message">
      Great news — your order has been shipped! 🎉
    </div>
    
    <div class="order-details success">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Shipped</div>
      ${
        order.trackingNumber
          ? `<div class="tracking-number">Tracking: ${order.trackingNumber}</div>`
          : ""
      }
    </div>
    
    <div class="message">
      You can track it directly with Australia Post here:
    </div>
    
    <div style="text-align: center;">
      <a href="${
        trackingLink || getMagicLoginLink(order.id)
      }" class="cta-button">
        Track My Order
      </a>
    </div>
    
    <div class="message">
      Thank you for choosing Dinar Exchange.
    </div>
  `;

  return {
    subject,
    html: getEmailWrapper(content, order.id),
    text: stripHtml(content),
  };
}

// 8. Order Completed
export function tplOrderCompleted(order) {
  const firstName = getFirstName(order.fullName);
  const subject = "Your order has been delivered";

  const content = `
    <div class="greeting">Hi ${firstName},</div>
    
    <div class="message">
      We're happy to let you know that your order has been delivered.
    </div>
    
    <div class="order-details success">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Delivered</div>
    </div>
    
    <div class="message">
      Thank you again for trusting Dinar Exchange — it's our pleasure to serve you.
    </div>
  `;

  return {
    subject,
    html: getEmailWrapper(content, order.id),
    text: stripHtml(content),
  };
}

// 9. Review Request
export function tplReviewRequest(order) {
  const firstName = getFirstName(order.fullName);
  const subject = "We'd love your feedback";

  const content = `
    <div class="greeting">Hi ${firstName},</div>
    
    <div class="message">
      We hope you're enjoying your recent order. Your feedback helps us improve and also helps other customers make informed choices.
    </div>
    
    <div class="order-details info">
      <div class="order-id">Order #${order.id}</div>
      <div class="status">Status: Delivered</div>
    </div>
    
    <div class="message">
      Would you mind leaving us a quick review?
    </div>
    
    <div style="text-align: center;">
      <a href="https://www.productreview.com.au/listings/dinar-exchange/write-review" class="cta-button">
        Leave a Review
      </a>
    </div>
    
    <div class="message">
      We really appreciate your support!
    </div>
  `;

  return {
    subject,
    html: getEmailWrapper(content, order.id),
    text: stripHtml(content),
  };
}
