export const runtime = "nodejs";          // safer for server libs
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { toDbOrderRow } from "@/lib/mapOrder";

function num(v, def = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

export async function POST(req) {
  try {
    const orderData = await req.json();

    // Generate stable order ID (de-dupe safe)
    const orderId = orderData.id || `ORDER-${Date.now()}`;
    const orderDataWithId = { ...orderData, id: orderId };

    // Minimal validation (Base44 used to enforce this; keep it client-side now)
    const needsReceipt = !orderDataWithId?.payment?.skipReceipt;
    if (!orderDataWithId?.verification?.id_document_url) {
      return NextResponse.json(
        { ok: false, error: "id_document_url required (upload the ID first)" },
        { status: 400 }
      );
    }
    if (needsReceipt && !orderDataWithId?.payment?.receipt_url) {
      return NextResponse.json(
        { ok: false, error: "receipt_url required unless skipReceipt is true" },
        { status: 400 }
      );
    }

    // Coerce common numeric fields in case your mapper is lenient
    if (orderDataWithId?.orderDetails) {
      orderDataWithId.orderDetails.amount = num(orderDataWithId.orderDetails.amount);
      orderDataWithId.orderDetails.quantity = num(orderDataWithId.orderDetails.quantity, 1);
    }
    orderDataWithId.totalAmount = num(orderDataWithId.totalAmount);
    if (orderDataWithId.shippingCost !== undefined) {
      orderDataWithId.shippingCost = num(orderDataWithId.shippingCost);
    }

    // Shape row for public."Order"
    const row = toDbOrderRow(orderDataWithId, { id: orderId });

    // DO NOT set updatedAt here; let DB default/trigger handle it
    delete row.updatedAt;

    // Upsert by id (id is PK)
    const { data, error: dbError } = await supabaseAdmin
      .from("Order")        // supabase-js usually quotes mixed case
      // .from('"Order"')   // fallback if needed
      .upsert(row, { onConflict: "id" })
      .select()
      .eq("id", orderId)
      .single();

    if (dbError) {
      console.error("Supabase upsert error:", dbError);
      return NextResponse.json(
        { ok: false, error: "Database error", details: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      id: orderId,
      order: data,
      message: "Order created successfully",
    });
  } catch (e) {
    console.error("/api/orders/create error", e);
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
