// Subject and HTML email body (NZ version)
export function buildSubject(customerName) {
  // As requested, use NZ in subject (changed from AU to NZ to match NZ body)
  return `Dinar Exchange NZ Order confirmation - ${customerName || "Customer"}`;
}

export function buildEmailHtml({
  fullName,
  username,
  email,
  mobile,
  address1,
  address2,
  city,
  state,
  postcode,
  country = "New Zealand",
  quantityLabel,     // e.g. "100,000 Dinar"
  totalLabel,        // e.g. "$401.24 NZD"
  orderId,           // e.g. 3067
  dateStr,           // e.g. "August 01, 2025"
  paymentMethod = "Bank transfer",
  bank = {
    accountName: "Oz Trading Group Pty Ltd",
    bankName: "National Australia Bank Limited",
    bsb: "083004",
    accountNumber: "739384751",
  },
  portal = {
    loginUrl: "https://portal.dinarexchange.co.nz/login",
  },
  ids = {
    driversLicense: true,
    passportAlt: true,
    utilityBill: true,
  },
}) {
  const safe = (s) => (s ? String(s) : "");
  const lines = [
    `Dear ${safe(fullName)},`,
    `Thank you for ordering from DinarExchange.co.nz`,
    `Your Order Reference is : ${safe(fullName)}`,
    `The payment method you chose is: ${paymentMethod} :`,
    ``,
    `Send your bank transfer to DinarExchange.co.nz (Oz Trading Group Pty Ltd)`,
    `Account Name: ${bank.accountName}`,
    `Name of the Bank : ${bank.bankName}`,
    `BSB Number: ${bank.bsb}`,
    `Our Bank Account Number is: ${bank.accountNumber}`,
    ``,
    `Dinar Exchange New Zealand Contact Details :`,
    `Telephone (NZ): 09 951 80 20  E : dinars@dinarexchange.co.nz`,
    ``,
    `Please include your FULL NAME in the reference of your bank transfer -`,
    `We need this info to identify and process your order.`,
    ``,
    `Please provide payment receipt of your Bank Transfer by uploading it in your My Account area.`,
    `Your order will be shipped via NZ Post within 12-15 business days after we receive your bank transfer.`,
    `You will receive an e-mail confirmation as soon as your order ships with your tracking number.`,
    ``,
    `Note : Orders are shipped using Registered post and you will be required to provide a Valid Photo ID with your Full Name on it to receive your order. Examples of ID - Driver's Licence, Passport etc.`,
    ``,
    `In order to complete your order please login to your My Account Area by clicking this link below :`,
    `Login Link : ${portal.loginUrl}`,
    ``,
    `Please upload the following documents in your My Account Area section :`,
    ``,
    `Option 1`,
    `Scanned copy of your Driver's Licence, front and back.`,
    `Option 2 (if you don't have a driver's licence)`,
    `Scanned copy of your Passport or any other form of Government Identification (first and last pages).`,
    `Copy of a recent utility bill with the same address.`,
    ``,
    `Dinar Exchange is required by the anti-money laundering and counter-terrorism financing law in New Zealand to identify each of its customers.`,
    `We comply with privacy laws regarding your information. See Privacy Policy at the end of this email.`,
  ];

  // Order summary block (values from your form)
  const summary = [
    ["First name", safe(fullName?.split(" ")[0] || "")],
    ["Last name", safe(fullName?.split(" ").slice(1).join(" ") || "")],
    ["Mobile", safe(mobile)],
    ["Email", safe(email)],
    ["Address 1", safe(address1)],
    ["Address 2", safe(address2)],
    ["City", safe(city)],
    ["Country", safe(country)],
    ["State/Region", safe(state)],
    ["Zip", safe(postcode)],
    ["Quantity Desired", safe(quantityLabel)],
    ["Total Amount", safe(totalLabel)],
  ];

  const summaryRows = summary.map(([k, v]) => {
    return `<tr>
      <td style="padding:6px 10px;border:1px solid #eee;">${k}</td>
      <td style="padding:6px 10px;border:1px solid #eee;">${v}</td>
    </tr>`;
  }).join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.55;color:#222">
    <div style="padding:12px 0;">
      <img src="https://www.dinarexchange.co.nz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e45cf3bb.png&w=256&q=75" alt="Dinar Exchange" style="height:40px;"/>
    </div>

    <p style="white-space:pre-line;margin:0 0 12px 0">${lines.join("\n")}</p>

    <h3 style="margin:18px 0 8px 0;">Order details</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #eee">
      <tbody>${summaryRows}</tbody>
    </table>

    <h3 style="margin:18px 0 8px 0;">Invoice</h3>
    <p style="margin:0 0 4px 0;">Order #: <b>${safe(orderId)}</b></p>
    <p style="margin:0 0 12px 0;">Date: <b>${safe(dateStr)}</b></p>

    <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>

    <p style="font-size:12px;color:#555;white-space:pre-line">
      Dinar Exchange's Privacy Policy:
      Dinar Exchange is bound by applicable privacy laws. We collect information to provide services to you and for no other purpose. 
      We disclose information only as necessary to complete your transactions or when required by law. 
      We maintain procedures to protect your personal information.
    </p>

    <p style="margin:16px 0 0 0;">Sincerely,<br/>The DinarExchange.co.nz Team</p>
  </div>`;
}
