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
    // 1. Have been delivered (status = delivered)
    // 2. Were delivered more than 7 days ago
    // 3. Haven't already received a review request
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: deliveredOrders, error } = await supabaseAdmin
      .from(ORDER_TABLE)
      .select('id, "fullName", email, phone, status, "deliveredAt", "reviewRequestSent"')
      .eq('status', 'delivered')
      .lt('deliveredAt', sevenDaysAgo.toISOString())
      .eq('reviewRequestSent', false)
      .limit(50); // Process in batches

    if (error) {
      console.error('Error fetching delivered orders:', error);
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }

    if (!deliveredOrders || deliveredOrders.length === 0) {
      return NextResponse.json({ 
        message: "No orders require review requests",
        processed: 0 
      });
    }

    let processed = 0;
    const results = [];

    for (const order of deliveredOrders) {
      try {
        // Insert email notification
        const { error: emailError } = await supabaseAdmin
          .from("notification_email")
          .insert({
            order_id: order.id,
            event_type: "REVIEW_REQUEST",
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
              event_type: "REVIEW_REQUEST",
              to_number: order.phone,
              status: "pending",
              created_at: new Date().toISOString(),
            });

          if (smsError) {
            console.error(`Failed to create SMS notification for order ${order.id}:`, smsError);
            // Continue anyway, email was created successfully
          }
        }

        // Mark order as having received review request
        const { error: updateError } = await supabaseAdmin
          .from(ORDER_TABLE)
          .update({ reviewRequestSent: true })
          .eq("id", order.id);

        if (updateError) {
          console.error(`Failed to update review request flag for order ${order.id}:`, updateError);
          // Continue anyway, notifications were created
        }

        processed++;
        results.push({ orderId: order.id, success: true });

      } catch (err) {
        console.error(`Error processing review request for order ${order.id}:`, err);
        results.push({ orderId: order.id, success: false, error: String(err) });
      }
    }

    return NextResponse.json({
      message: `Processed ${processed} review requests`,
      processed,
      total: deliveredOrders.length,
      results
    });

  } catch (error) {
    console.error('Unexpected error in review request processing:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
