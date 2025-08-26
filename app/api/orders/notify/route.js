import { getMailer } from "@/app/lib/mailer";
import { buildEmailHtml, buildSubject } from "@/app/lib/emailTemplateNZ";
import { buildInvoicePdfBuffer } from "@/app/lib/invoiceNZ";

export async function POST(req) {
  try {
    const order = await req.json();
    // Expect fields from your form/Base44:
    // order: { id, personalInfo{fullName,email,mobile,address,city,state,postcode,country}, orderDetails{currency, quantity}, totalAmount, createdAt? }
    if (!order?.id || !order?.personalInfo?.email || !order?.totalAmount) {
      return new Response(JSON.stringify({ ok:false, error:"Missing: id, personalInfo.email, totalAmount"}), { status: 400 });
    }

    const fullName = order.personalInfo.fullName || "Customer";
    const subject = buildSubject(fullName);

    const html = buildEmailHtml({
      fullName,
      username: order.personalInfo.email,
      email: order.personalInfo.email,
      mobile: order.personalInfo.mobile,
      address1: order.personalInfo.address,
      address2: order.personalInfo.address2 || "",
      city: order.personalInfo.city,
      state: order.personalInfo.state,
      postcode: order.personalInfo.postcode,
      country: order.personalInfo.country || "New Zealand",
      quantityLabel: `${order.orderDetails?.quantity || 1} ${order.orderDetails?.currency || ""}`.trim(),
      totalLabel: `${order.totalAmount} AUD`,
      orderId: order.id,
      dateStr: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
      paymentMethod: order.payment?.method || "Bank transfer",
    });

    const pdf = await buildInvoicePdfBuffer({
      orderId: order.id,
      status: "Payment Pending",
      dateStr: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
      billTo: {
        name: fullName,
        address1: order.personalInfo.address,
        city: order.personalInfo.city,
        region: order.personalInfo.state,
        postcode: order.personalInfo.postcode,
        country: order.personalInfo.country || "New Zealand",
      },
      items: [
        {
          description: `${order.orderDetails?.currency || "Dinar"} ${order.orderDetails?.quantity || 1}`,
          qty: Number(order.orderDetails?.quantity || 1),
          total: order.totalAmount,
        },
      ],
      subTotal: order.totalAmount,
      shipping: order.shippingCost || 0,
      grandTotal: order.totalAmount + (order.shippingCost || 0),
      currency: "AUD",
      paymentMethod: order.payment?.method || "Bank transfer",
      bank: { 
        accountName: "Oz Trading Group Pty Ltd", 
        bankName: "National Australia Bank Limited", 
        bsb: "083004", 
        accountNumber: "739384751", 
        swiftCode: "NATAAU3303M", 
        bankAddress: "Ground Level 330 Collins St, Melbourne, VIC 3000" 
      },
      
    });

    const mailer = getMailer();
    const from = process.env.SMTP_FROM;
    const alertTo = process.env.ALERT_TO;

    // Customer email
    await mailer.sendMail({
      from,
      to: order.personalInfo.email,
      subject,
      html,
      attachments: [
        { filename: `invoice-${order.id}.pdf`, content: pdf, contentType: "application/pdf" }
      ],
      replyTo: alertTo,
      headers: {
        // as provided in your example header block
        "X-Custom-Date": new Date().toUTCString(),
      }
    });

    // Internal alert with invoice for company owner
    await mailer.sendMail({
      from,
      to: alertTo,
      subject: `New order #${order.id} from ${fullName}`,
      html: `<p>New order received.</p>` + html,
      attachments: [
        { filename: `invoice-${order.id}.pdf`, content: pdf, contentType: "application/pdf" }
      ],
      replyTo: order.personalInfo.email,
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error("EMAIL ERROR", e);
    return new Response(JSON.stringify({ ok:false, message: e.message || "Email failed" }), { status: 500 });
  }
}
