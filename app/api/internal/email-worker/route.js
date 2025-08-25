export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/transporter";
import { tplMissing, tplStatusUpdate, tplTracking, tplCompleted } from "@/lib/email/templates";

const ORDER_TABLE = process.env.ORDER_TABLE_NAME || "order"; // set to "Order" if you didn't create a lowercase view
const MAX_ATTEMPTS = 3;
const BATCH_SIZE = 20;

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
    if (!jobs.length) {
      return NextResponse.json({ picked: 0, sent: 0, failed: 0 });
    }

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

    return NextResponse.json({ picked: jobs.length, sent, failed });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
