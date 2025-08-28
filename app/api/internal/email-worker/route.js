export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail, sendSms } from "@/lib/email/transporter";
import { buildLoginUrl } from "@/lib/auth";
import {
  tplOrderReceived,
  tplMissingId,
  tplIdReceived,
  tplMissingPayment,
  tplPaymentReceived,
  tplDelayNotice,
  tplTrackingAdded,
  tplOrderCompleted,
  tplReviewRequest
} from "@/lib/email/templates/notifications";

const ORDER_TABLE = process.env.ORDER_TABLE_NAME || "order";
const MAX_ATTEMPTS = 3;
const EMAIL_BATCH_SIZE = 20;
const SMS_BATCH_SIZE = 50;

/* ----------------------------- ORDER HELPERS ----------------------------- */
async function getOrder(orderId) {
  const { data, error } = await supabaseAdmin
    .from(ORDER_TABLE)
    .select('id, "fullName", email, status, "trackingNumber"')
    .eq("id", orderId)
    .single();
  if (error) throw error;
  return data;
}

/* ----------------------------- EMAIL HELPERS ----------------------------- */
async function claimEmailJobs() {
  const { data, error } = await supabaseAdmin
    .from("notification_email")
    .update({ status: "sending", locked_at: new Date().toISOString() })
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(EMAIL_BATCH_SIZE)
    .select("*");
  if (error) throw error;
  return data || [];
}

async function markEmailSent(id, attempts) {
  await supabaseAdmin
    .from("notification_email")
    .update({
      status: "sent",
      attempts: attempts + 1,
      error: null,
      locked_at: null,
    })
    .eq("id", id);
}

async function markEmailFailedOrRetry(id, attempts, err) {
  const status = attempts + 1 >= MAX_ATTEMPTS ? "failed" : "pending";
  await supabaseAdmin
    .from("notification_email")
    .update({
      status,
      attempts: attempts + 1,
      error: String(err),
      locked_at: null,
    })
    .eq("id", id);
}

function buildEmail(job, order) {
  if (job.subject && job.html) {
    return { subject: job.subject, html: job.html, text: job.text || "" };
  }
  
  switch (job.event_type) {
    case "ORDER_RECEIVED":
      return tplOrderReceived(order);
    case "MISSING_ID":
      return tplMissingId(order);
    case "ID_RECEIVED":
      return tplIdReceived(order);
    case "MISSING_PAYMENT":
      return tplMissingPayment(order);
    case "PAYMENT_RECEIVED":
      return tplPaymentReceived(order);
    case "DELAY_NOTICE":
      return tplDelayNotice(order);
    case "TRACKING_ADDED":
      return tplTrackingAdded(order);
    case "ORDER_COMPLETED":
      return tplOrderCompleted(order);
    case "REVIEW_REQUEST":
      return tplReviewRequest(order);
    default:
      throw new Error(`Unknown event_type: ${job.event_type}`);
  }
}

/* ------------------------------ SMS HELPERS ------------------------------ */
async function claimSmsJobs() {
  const { data, error } = await supabaseAdmin
    .from("notification_sms")
    .update({ status: "sending", locked_at: new Date().toISOString() })
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(SMS_BATCH_SIZE)
    .select("*");
  if (error) throw error;
  return data || [];
}

function formatSmsMessage(sms, order) {
  // Extract first name from full name
  const firstName = order.fullName ? order.fullName.split(' ')[0] : 'there';
  
  // Generate magic login link for order
  const magicLoginLink = buildLoginUrl('/');
  
  // Generate AusPost tracking link
  const ausPostTrackingLink = order.trackingNumber ? 
    `https://auspost.com.au/mypost/track/search?trackingNumbers=${order.trackingNumber}` : 
    magicLoginLink;

  switch (sms.event_type) {
    case "ORDER_RECEIVED":
      return `Hi ${firstName}, we've received your order. Please complete payment within 24 hrs to lock today's rate.`;
    
    case "MISSING_ID":
      return `Hi ${firstName}, we still need your ID to process your order. Please upload it using your secure link: ${magicLoginLink}`;
    
    case "ID_RECEIVED":
      return `Hi ${firstName}, thanks — we've received your ID and your order is now being processed.`;
    
    case "MISSING_PAYMENT":
      return `Hi ${firstName}, we're waiting for your payment receipt. Please upload your transfer receipt here: ${magicLoginLink}`;
    
    case "PAYMENT_RECEIVED":
      return `Hi ${firstName}, payment received — your order is confirmed and being prepared.`;
    
    case "DELAY_NOTICE":
      return `Hi ${firstName}, due to high demand and some delays in Iraq, your order is taking longer than expected. It'll ship in the next few days — thanks for your patience.`;
    
    case "TRACKING_ADDED":
      return `Great news ${firstName}! Your order has shipped. Track it here: ${ausPostTrackingLink}`;
    
    case "ORDER_COMPLETED":
      return `Hi ${firstName}, your order has been delivered. Thanks for choosing us!`;
    
    case "REVIEW_REQUEST":
      return `Hi ${firstName}, we hope you're enjoying your order. We'd love your feedback — please leave us a review: https://www.productreview.com.au/listings/dinar-exchange/write-review`;
    
    // Legacy cases for backward compatibility
    case "MISSING_ID_LEGACY":
      return `Hi ${firstName}, we still need your ID to process your order. Please upload it using your secure link: ${magicLoginLink}`;
    
    case "MISSING_PAYMENT_LEGACY":
      return `Hi ${firstName}, we're waiting for your payment receipt. Please upload your transfer receipt here: ${magicLoginLink}`;
    
    case "STATUS_UPDATE":
      return `Hi ${firstName}, your order status has been updated. Check your dashboard for details.`;
    
    case "TRACKING_UPDATED":
      return `Hi ${firstName}, tracking updated for your order. Track it here: ${ausPostTrackingLink}`;
    
    default:
      return `Hi ${firstName}, your order update is available. Check your dashboard for details.`;
  }
}

/* ------------------------------- MAIN POST ------------------------------- */
export async function POST(req) {
  // Security check
  const ok = req.headers.get("x-cron-secret") === process.env.CRON_SECRET;
  if (!ok) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    /* -------- EMAIL -------- */
    const emailJobs = await claimEmailJobs();
    let sent = 0,
      failed = 0;

    for (const job of emailJobs) {
      try {
        const order = await getOrder(job.order_id);
        const { subject, html, text } = buildEmail(job, order);
        const to = job.to_email || order.email || process.env.ALERT_TO;

        await sendEmail({
          to,
          subject,
          html,
          text,
          bcc: process.env.ALERT_TO,
        });

        await markEmailSent(job.id, job.attempts);
        sent++;
      } catch (err) {
        await markEmailFailedOrRetry(job.id, job.attempts, err);
        failed++;
      }
    }

    /* -------- SMS -------- */
    const smsJobs = await claimSmsJobs();
    let smsSent = 0,
      smsFailed = 0;

    for (const sms of smsJobs) {
      try {
        let to = String(sms.to_number || "").trim();
        if (to && !to.startsWith("+") && to.startsWith("0")) {
          to = "+64" + to.slice(1); // Convert NZ local to E.164
        }

        const order = await getOrder(sms.order_id);
        const body = sms.body || formatSmsMessage(sms, order);

        await sendSms({ to, body });

        await supabaseAdmin
          .from("notification_sms")
          .update({
            status: "sent",
            attempts: (sms.attempts || 0) + 1,
            error: null,
            locked_at: null,
          })
          .eq("id", sms.id);

        smsSent++;
      } catch (err) {
        const nextStatus =
          (sms.attempts + 1) >= MAX_ATTEMPTS ? "failed" : "pending";
        await supabaseAdmin
          .from("notification_sms")
          .update({
            status: nextStatus,
            attempts: (sms.attempts || 0) + 1,
            error: String(err),
            locked_at: null,
          })
          .eq("id", sms.id);
        smsFailed++;
      }
    }

    return NextResponse.json({
      picked: emailJobs.length,
      sent,
      failed,
      sms_picked: smsJobs.length,
      sms_sent: smsSent,
      sms_failed: smsFailed,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
