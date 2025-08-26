import { NextResponse } from "next/server";
import { buildSubject, buildEmailHtml } from "@/app/lib/emailTemplateNZ";

function buildSmsFor(eventType, order) {
  switch (eventType) {
    case "ORDER_RECEIVED":
      return `[Dinar Exchange NZ] We’ve received order #${order.id}. Please complete payment within 24 hours to secure today’s rate. Help: 64 9 872 4693`;
    case "MISSING_ID":
      return `[Dinar Exchange NZ] Action required: please upload your ID for order #${order.id}. Help: 64 9 872 4693`;
    case "MISSING_PAYMENT":
      return `[Dinar Exchange NZ] Payment receipt required for order #${order.id}. Please upload your bank transfer receipt. Help: 64 9 872 4693`;
    case "STATUS_UPDATE":
      return `[Dinar Exchange NZ] Your order #${order.id} status has been updated. Help: 64 9 872 4693`;
    case "TRACKING_ADDED":
      return `[Dinar Exchange NZ] Order #${order.id} has shipped. Tracking available in your account. Help: 64 9 872 4693`;
    case "TRACKING_UPDATED":
      return `[Dinar Exchange NZ] Tracking updated for order #${order.id}. Help: 64 9 872 4693`;
    case "ORDER_COMPLETED":
      return `[Dinar Exchange NZ] Order #${order.id} has been delivered. Thank you for your business. Support: 64 9 872 4693`;
    default:
      return `[Dinar Exchange NZ] Order #${order.id} update available. Help: 64 9 872 4693`;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const order = body?.order || {};

    const subject = buildSubject(order?.personalInfo?.fullName || "Customer");
    const html = buildEmailHtml({
      fullName: order?.personalInfo?.fullName || "Customer",
      username: order?.personalInfo?.email,
      email: order?.personalInfo?.email,
      mobile: order?.personalInfo?.mobile,
      address1: order?.personalInfo?.address,
      address2: order?.personalInfo?.address2 || "",
      city: order?.personalInfo?.city,
      state: order?.personalInfo?.state,
      postcode: order?.personalInfo?.postcode,
      country: order?.personalInfo?.country || "New Zealand",
      quantityLabel: `${order?.orderDetails?.quantity || 1} ${order?.orderDetails?.currency || ""}`.trim(),
      totalLabel: `${order?.totalAmount} AUD`,
      orderId: order?.id,
      dateStr: order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
      paymentMethod: order?.payment?.method || "Bank transfer",
    });

    const smsEvents = [
      "ORDER_RECEIVED",
      "MISSING_ID",
      "MISSING_PAYMENT",
      "STATUS_UPDATE",
      "TRACKING_ADDED",
      "TRACKING_UPDATED",
      "ORDER_COMPLETED",
    ];
    const sms = smsEvents.map((ev) => ({ event: ev, body: buildSmsFor(ev, order) }));

    return NextResponse.json({ ok: true, subject, html, sms });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}


