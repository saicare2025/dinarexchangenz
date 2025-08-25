export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    // Get recent orders
    const { data: orders, error } = await supabaseAdmin
      .from('Order')
      .select('id, fullName, email, status, createdAt')
      .order('createdAt', { ascending: false })
      .limit(10);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: `Found ${orders.length} orders`,
      orders: orders,
      targetOrder: orders.find(order => order.id === '#38634894')
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
