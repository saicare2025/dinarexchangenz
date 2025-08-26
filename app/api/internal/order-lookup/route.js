export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Rate limiting helper
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(identifier) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, []);
  }
  
  const requests = rateLimitMap.get(identifier);
  const recentRequests = requests.filter(timestamp => timestamp > windowStart);
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);
  return true;
}

export async function POST(req) {
  try {
    // Verify authorization
    const authHeader = req.headers.get('authorization');
    const expectedSecret = process.env.ELEVENLABS_TOOL_SECRET;
    
    if (!authHeader || !expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { orderId, email } = body;

    // Validate input
    if (!orderId && !email) {
      return NextResponse.json(
        { error: "Either orderId or email is required" },
        { status: 400 }
      );
    }

    // Rate limiting
    const identifier = orderId || email;
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    // Build query
    let query = supabaseAdmin
      .from("Order")
      .select(`
        id,
        fullName,
        email,
        currency,
        quantity,
        method,
        createdAt,
        updatedAt,
        status
      `)
      .order('updatedAt', { ascending: false });

    if (orderId) {
      query = query.eq('id', orderId);
    } else {
      query = query.eq('email', email);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    if (!orders || orders.length === 0) {
      return NextResponse.json({
        found: false,
        message: orderId 
          ? `No order found with ID: ${orderId}` 
          : `No orders found for email: ${email}`
      });
    }

    // Get the most recent order if multiple found
    const order = orders[0];
    
    // Calculate total amount based on currency and quantity
    let totalAmount = order.quantity || 1;
    
    // If currency contains a price, extract it
    if (order.currency && order.currency.includes('$')) {
      const priceMatch = order.currency.match(/\$([\d,]+)/);
      if (priceMatch) {
        const price = parseFloat(priceMatch[1].replace(/,/g, ''));
        totalAmount = price * (order.quantity || 1);
      }
    }

    const orderSummary = {
      found: true,
      orderId: order.id,
      customerName: order.fullName,
      email: order.email,
      currency: order.currency,
      quantity: order.quantity,
      totalAmount: totalAmount,
      paymentMethod: order.method,
      status: order.status || 'Processing',
      orderDate: order.createdAt,
      lastUpdated: order.updatedAt,
      message: `Order ${order.id} is currently ${order.status || 'Processing'}. Total: ${order.quantity} ${order.currency}`
    };

    return NextResponse.json(orderSummary);

  } catch (error) {
    console.error("Order lookup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
