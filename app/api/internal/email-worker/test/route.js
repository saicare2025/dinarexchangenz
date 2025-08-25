export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { enqueueEmail } from "@/lib/email/queue";

export async function POST(request) {
  try {
    const { order_id, event_type } = await request.json();
    
    if (!order_id || !event_type) {
      return NextResponse.json(
        { error: "Missing required fields: order_id, event_type" },
        { status: 400 }
      );
    }

    const job = await enqueueEmail({
      order_id,
      event_type,
    });

    return NextResponse.json({
      success: true,
      job_id: job.id,
      message: `Email queued for order ${order_id}, event: ${event_type}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Email Worker Test Endpoint",
    usage: "POST with { order_id: '123', event_type: 'STATUS_UPDATE' }",
    supported_events: [
      "MISSING_ID",
      "MISSING_PAYMENT", 
      "STATUS_UPDATE",
      "TRACKING_ADDED",
      "TRACKING_UPDATED",
      "ORDER_COMPLETED"
    ]
  });
}
