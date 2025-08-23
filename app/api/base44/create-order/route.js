import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { toDbOrderRow } from "@/lib/mapOrder";

export async function POST(req) {
  try {
    const orderData = await req.json();

    // Generate a unique order ID
    const orderId = orderData.id || `ORDER-${Date.now()}`;
    
    // Add the order ID to the order data
    const orderDataWithId = {
      ...orderData,
      id: orderId,
    };

    console.log("Creating order in Supabase:", JSON.stringify(orderDataWithId, null, 2));

    // Build row & upsert into Supabase public."Order"
    const row = toDbOrderRow(orderDataWithId, { id: orderId });

    const { error: dbError } = await supabaseAdmin
      .from("Order") // mixed-case table name; supabase-js will quote it
      .upsert(row, { onConflict: "id" });

    if (dbError) {
      console.error("Supabase upsert error:", dbError);
      return NextResponse.json({ 
        ok: false, 
        error: "Database error", 
        details: dbError.message 
      }, { status: 500 });
    }

    console.log("Order created successfully in Supabase:", orderId);

    return NextResponse.json({ 
      ok: true, 
      id: orderId,
      message: "Order created successfully"
    });
  } catch (e) {
    console.error("/api/base44/create-order error", e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
