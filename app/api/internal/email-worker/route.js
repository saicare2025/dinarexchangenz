export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail, sendSms } from "@/lib/email/transporter";
import { tplMissing, tplStatusUpdate, tplTracking, tplCompleted } from "@/lib/email/templates";

const ORDER_TABLE = process.env.ORDER_TABLE_NAME || "order"; // set to "Order" if you didn't create a lowercase view
const MAX_ATTEMPTS = 3;
const BATCH_SIZE = 20;
const SMS_BATCH_SIZE = 50;

async function getOrder(orderId) {
  const { data, error } = await supabaseAdmin
    .from(ORDER_TABLE)
    .select('id, "fullName", email, status, "trackingNumber"')
    .eq("id", orderId)
    .single();
  if (error) throw error;
  return data;
}

async function claimJobs() {
  const { data, error } = await supabaseAdmin
    .from("notification_email")
    .update({ status: "sending", locked_at: new Date().toISOString() })
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(BATCH_SIZE)
    .select("*");
  if (error) throw error;
  return data || [];
}

async function markSent(id, attempts) {
  await supabaseAdmin
    .from("notification_email")
    .update({ status: "sent", attempts: attempts + 1, error: null, locked_at: null })
    .eq("id", id);
}

async function markFailedOrRetry(id, attempts, err) {
  const status = attempts + 1 >= MAX_ATTEMPTS ? "failed" : "pending";
  await supabaseAdmin
    .from("notification_email")
    .update({ status, attempts: attempts + 1, error: String(err), locked_at: null })
    .eq("id", id);
}

function buildEmailFor(job, order) {
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

export async function POST(req) {
  // Security: require the same header value you used in Supabase SQL (Option A)
  const ok = req.headers.get("x-cron-secret") === process.env.CRON_SECRET;
  if (!ok) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const jobs = await claimJobs();

    let sent = 0, failed = 0;

    for (const job of jobs) {
      try {
        const order = await getOrder(job.order_id);
        const { subject, html, text } = buildEmailFor(job, order);
        const to = job.to_email || order.email || process.env.ALERT_TO;

        await sendEmail({ to, subject, html, text, bcc: process.env.ALERT_TO });
        await markSent(job.id, job.attempts);
        sent++;
      } catch (err) {
        await markFailedOrRetry(job.id, job.attempts, err);
        failed++;
      }
    }

    // --- SMS phase ---
    // Try to claim and send pending SMS notifications
    const { data: smsJobs, error: smsClaimErr } = await supabaseAdmin
      .from("notification_sms")
      .update({ status: "sending", locked_at: new Date().toISOString() })
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(SMS_BATCH_SIZE)
      .select("*");

    let smsSent = 0, smsFailed = 0;
    if (!smsClaimErr && Array.isArray(smsJobs) && smsJobs.length) {
      for (const sms of smsJobs) {
        try {
          // Minimal E.164 normalizer: if starts with 0 and NZ, convert to +64
          let to = String(sms.to_number || "").trim();
          if (to && !to.startsWith("+")) {
            if (to.startsWith("0")) to = "+64" + to.slice(1);
          }
          const APP = process.env.NEXT_PUBLIC_BASE44_APP_URL || "https://portal.dinarexchange.co.nz";
          const LOGIN = process.env.NEXT_PUBLIC_BASE44_LOGIN_URL || "https://portal.dinarexchange.co.nz/login";
          const loginUrl = `${LOGIN}?from_url=${encodeURIComponent(APP + '/')}`;
          const bodyBase = sms.body || (() => {
            switch (sms.event_type) {
              case "MISSING_ID": return `Action needed: please login to upload your ID. ${loginUrl}`;
              case "MISSING_PAYMENT": return `Action needed: please login to upload payment receipt. ${loginUrl}`;
              case "STATUS_UPDATE": return `Your order was updated. Login: ${loginUrl}`;
              case "TRACKING_ADDED": return `Tracking added. Login: ${loginUrl}`;
              case "TRACKING_UPDATED": return `Tracking updated. Login: ${loginUrl}`;
              case "ORDER_COMPLETED": return `Order completed. Login: ${loginUrl}`;
              default: return `Order update. Login: ${loginUrl}`;
            }
          })();
          await sendSms({ to, body: bodyBase });
          await supabaseAdmin.from("notification_sms").update({ status: "sent", attempts: (sms.attempts || 0) + 1, error: null, locked_at: null }).eq("id", sms.id);
          smsSent++;
        } catch (err) {
          const nextStatus = (sms.attempts + 1) >= MAX_ATTEMPTS ? "failed" : "pending";
          await supabaseAdmin.from("notification_sms").update({ status: nextStatus, attempts: (sms.attempts || 0) + 1, error: String(err), locked_at: null }).eq("id", sms.id);
          smsFailed++;
        }
      }
    }

    return NextResponse.json({ picked: jobs.length, sent, failed, sms_picked: (smsJobs?.length || 0), sms_sent: smsSent, sms_failed: smsFailed });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
