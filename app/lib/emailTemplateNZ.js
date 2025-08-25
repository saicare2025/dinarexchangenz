// Subject and HTML email body (NZ version)
export function buildSubject(customerName) {
  return `Dinar Exchange NZ — Order placed: ${customerName || "Customer"}`;
}

export function buildEmailHtml({
  fullName,
  email,
  mobile,
  address1,
  address2,
  city,
  state,
  postcode,
  country = "New Zealand",
  quantityLabel,
  totalLabel,
  orderId,
  dateStr,
  paymentMethod = "Bank transfer",
}) {
  const safe = (s) => (s ? String(s) : "");
  const appUrl = process.env.APP_URL || "https://www.dinarexchange.co.nz";
  const ctaUrl = `${appUrl}/login?next=${encodeURIComponent(`/dashboard/orders/${orderId}`)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Order Placed</title>
  <style>
    /* Dark mode tweaks */
    @media (prefers-color-scheme: dark) {
      .bg { background:#0b0d12 !important; }
      .card { background:#111418 !important; color:#e5e7eb !important; }
      .text-muted { color:#9ca3af !important; }
      .btn { background:#2563eb !important; }
      .divider { border-color:#1f2937 !important; }
      .table td, .table th { border-color:#1f2937 !important; }
    }
    .btn:hover { filter: brightness(1.05); }
  </style>
</head>
<body class="bg" style="margin:0;padding:0;background:#f3f4f6;">
  <span class="preheader" style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">Order received — we’re getting started. View your order online.</span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f4f6;">
    <tr>
      <td align="center" style="padding:24px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" class="card" style="width:600px;max-width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <tr>
            <td style="padding:24px 24px 8px 24px;text-align:center;background:#0f172a;color:#fff;">
              <div style="font-size:20px;font-weight:700;letter-spacing:.2px;">Dinar Exchange</div>
              <div style="font-size:12px;opacity:.85;margin-top:6px;">Order received</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 8px 0;font:16px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;">Hi ${safe(fullName)},</p>
              <p class="text-muted" style="margin:0 0 16px 0;font:14px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#4b5563;">Thanks for your order. We’ve started processing it and will email you updates.</p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:8px 0 16px 0;">
                <tr>
                  <td style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;">
                    <table width="100%" class="table" role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                      <tr>
                        <td style="padding:6px 0;font-weight:600;color:#111827;">Order #</td>
                        <td style="padding:6px 0;text-align:right;color:#111827;">${safe(orderId)}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-weight:600;color:#111827;">Placed on</td>
                        <td style="padding:6px 0;text-align:right;color:#111827;">${safe(dateStr)}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-weight:600;color:#111827;">Status</td>
                        <td style="padding:6px 0;text-align:right;color:#16a34a;">Order received</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="table" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;">
                <tr>
                  <th align="left" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#111827;">Currency</th>
                  <th align="left" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#111827;">Quantity</th>
                  <th align="left" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#111827;">Method</th>
                  <th align="right" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#111827;">Total</th>
                </tr>
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${safe(quantityLabel?.split(" ").slice(1).join(" ") || "Dinar")}</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${safe(quantityLabel)}</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${safe(paymentMethod)}</td>
                  <td align="right" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${safe(totalLabel)}</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:18px 0;">
                <tr>
                  <td align="center">
                    <a href="${ctaUrl}" class="btn" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;">View your order</a>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:6px 0 0 0;">
                <tr>
                  <td width="50%" valign="top" style="padding:12px 12px 12px 0;">
                    <div style="font-weight:600;margin-bottom:6px;color:#111827;">Customer</div>
                    <div class="text-muted" style="font:14px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#4b5563;">
                      ${safe(fullName)}<br/>
                      ${safe(email)}<br/>
                      ${safe(mobile)}
                    </div>
                  </td>
                  <td width="50%" valign="top" style="padding:12px 0 12px 12px;">
                    <div style="font-weight:600;margin-bottom:6px;color:#111827;">Delivery</div>
                    <div class="text-muted" style="font:14px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#4b5563;">
                      ${safe(address1)}${address2 ? (", " + safe(address2)) : ""}<br/>
                      ${safe(city)}, ${safe(state)} ${safe(postcode)}<br/>
                      ${safe(country)}
                    </div>
                  </td>
                </tr>
              </table>

              <hr class="divider" style="border:none;border-top:1px solid #e5e7eb;margin:18px 0;"/>
              <p class="text-muted" style="margin:0;font:12px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b7280;">This is a transactional email. If you didn’t place this order, contact dinars@dinarexchange.co.nz</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
