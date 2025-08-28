export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const ORDER_TABLE = process.env.ORDER_TABLE_NAME || "order";

export async function POST(req) {
  // Security check
  const ok = req.headers.get("x-cron-secret") === process.env.CRON_SECRET;
  if (!ok) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Find orders that:
    // 1. Have payment received (status indicates payment confirmed)
    // 2. Don't have tracking number
    // 3. Payment was received more than 7 days ago
    // 4. Haven't already received a delay notice
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: delayedOrders, error } = await supabaseAdmin
      .from(ORDER_TABLE)
      .select('id, "fullName", email, status, "trackingNumber", "paymentReceivedAt", "delayNoticeSent"')
      .or('status.eq.payment_confirmed,status.eq.processing,status.eq.preparing')
      .is('trackingNumber', null)
      .lt('paymentReceivedAt', sevenDaysAgo.toISOString())
      .eq('delayNoticeSent', false)
      .limit(50); // Process in batches

    if (error) {
      console.error('Error fetching delayed orders:', error);
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }

    if (!delayedOrders || delayedOrders.length === 0) {
      return NextResponse.json({ 
        message: "No orders require delay notices",
        processed: 0 
      });
    }

    let processed = 0;
    const results = [];

    for (const order of delayedOrders) {
      try {
        // Insert email notification
        const { error: emailError } = await supabaseAdmin
          .from("notification_email")
          .insert({
            order_id: order.id,
            event_type: "DELAY_NOTICE",
            to_email: order.email,
            status: "pending",
            created_at: new Date().toISOString(),
          });

        if (emailError) {
          console.error(`Failed to create email notification for order ${order.id}:`, emailError);
          results.push({ orderId: order.id, success: false, error: 'email_creation_failed' });
          continue;
        }

        // Insert SMS notification if phone number exists
        if (order.phone) {
          const { error: smsError } = await supabaseAdmin
            .from("notification_sms")
            .insert({
              order_id: order.id,
              event_type: "DELAY_NOTICE",
              to_number: order.phone,
              status: "pending",
              created_at: new Date().toISOString(),
            });

          if (smsError) {
            console.error(`Failed to create SMS notification for order ${order.id}:`, smsError);
            // Continue anyway, email was created successfully
          }
        }

        // Mark order as having received delay notice
        const { error: updateError } = await supabaseAdmin
          .from(ORDER_TABLE)
          .update({ delayNoticeSent: true })
          .eq("id", order.id);

        if (updateError) {
          console.error(`Failed to update delay notice flag for order ${order.id}:`, updateError);
          // Continue anyway, notifications were created
        }

        processed++;
        results.push({ orderId: order.id, success: true });

      } catch (err) {
        console.error(`Error processing delay notice for order ${order.id}:`, err);
        results.push({ orderId: order.id, success: false, error: String(err) });
      }
    }

    return NextResponse.json({
      message: `Processed ${processed} delay notices`,
      processed,
      total: delayedOrders.length,
      results
    });

  } catch (error) {
    console.error('Unexpected error in delay notice processing:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
