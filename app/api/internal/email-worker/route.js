export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail, sendSms } from "@/lib/email/transporter";
import { tplMissing, tplStatusUpdate, tplTracking, tplCompleted } from "@/lib/email/templates";

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
    case "MISSING_ID":
      return tplMissing("ID", order);
    case "MISSING_PAYMENT":
      return tplMissing("PAYMENT", order);
    case "STATUS_UPDATE":
      return tplStatusUpdate(order, order.status, order.trackingNumber);
    case "TRACKING_ADDED":
      return tplTracking(order, order.trackingNumber, false);
    case "TRACKING_UPDATED":
      return tplTracking(order, order.trackingNumber, true);
    case "ORDER_COMPLETED":
      return tplCompleted(order, "3–5 business days");
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
  switch (sms.event_type) {
    case "MISSING_ID":
      return `Order #${order.id} requires ID verification. Please provide valid ID. —Dinar Exchange NZ`;
    case "MISSING_PAYMENT":
      return `Order #${order.id} is awaiting your payment receipt. Please submit promptly. —Dinar Exchange NZ`;
    case "STATUS_UPDATE":
      return `Order #${order.id} status has been updated. —Dinar Exchange NZ`;
    case "TRACKING_ADDED":
      return `Order #${order.id} now has tracking number ${order.trackingNumber}. —Dinar Exchange NZ`;
    case "TRACKING_UPDATED":
      return `Order #${order.id} tracking details were updated. —Dinar Exchange NZ`;
    case "ORDER_COMPLETED":
      return `Order #${order.id} has been completed successfully. Thank you. —Dinar Exchange NZ`;
    default:
      return `Order #${order.id} update available. —Dinar Exchange NZ`;
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
