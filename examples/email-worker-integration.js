// Example integration of email worker with order management
// This file shows how to use the email worker in your existing code

import { 
  enqueueStatusUpdate, 
  enqueueMissingId, 
  enqueueMissingPayment,
  enqueueTrackingUpdate,
  enqueueOrderCompleted 
} from '@/lib/email/queue';

import { supabaseAdmin } from '@/lib/supabase/admin';

// Example 1: After updating order status
export async function updateOrderStatus(orderId, newStatus) {
  try {
    // Your existing order update logic
    const { data, error } = await supabaseAdmin
      .from('Order')
      .update({ status: newStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // Enqueue email notification
    await enqueueStatusUpdate(orderId);

    // Optionally trigger worker immediately for faster delivery
    fetch(`${process.env.APP_URL}/api/internal/email-worker`, { 
      method: 'POST',
      headers: {
        'x-cron-secret': process.env.CRON_SECRET,
        'content-type': 'application/json'
      }
    }).catch(() => {}); // Don't let email worker failure affect order update

    return data;
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw error;
  }
}

// Example 2: When admin marks ID as missing
export async function markIdMissing(orderId) {
  try {
    // Your existing logic to mark ID as missing
    const { data, error } = await supabaseAdmin
      .from('Order')
      .update({ idVerified: false, idMissing: true })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // Enqueue missing ID notification
    await enqueueMissingId(orderId);

    return data;
  } catch (error) {
    console.error('Failed to mark ID as missing:', error);
    throw error;
  }
}

// Example 3: When admin marks payment as missing
export async function markPaymentMissing(orderId) {
  try {
    // Your existing logic to mark payment as missing
    const { data, error } = await supabaseAdmin
      .from('Order')
      .update({ paymentVerified: false, paymentMissing: true })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // Enqueue missing payment notification
    await enqueueMissingPayment(orderId);

    return data;
  } catch (error) {
    console.error('Failed to mark payment as missing:', error);
    throw error;
  }
}

// Example 4: When admin adds or updates tracking
export async function updateTracking(orderId, trackingNumber, isUpdate = false) {
  try {
    // Your existing logic to update tracking
    const { data, error } = await supabaseAdmin
      .from('Order')
      .update({ trackingNumber })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // Enqueue tracking notification
    await enqueueTrackingUpdate(orderId, isUpdate);

    return data;
  } catch (error) {
    console.error('Failed to update tracking:', error);
    throw error;
  }
}

// Example 5: When admin completes an order
export async function completeOrder(orderId) {
  try {
    // Your existing logic to complete order
    const { data, error } = await supabaseAdmin
      .from('Order')
      .update({ 
        status: 'completed',
        completedAt: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // Enqueue completion notification
    await enqueueOrderCompleted(orderId);

    return data;
  } catch (error) {
    console.error('Failed to complete order:', error);
    throw error;
  }
}

// Example 6: Custom email with custom content
import { enqueueEmail } from '@/lib/email/queue';

export async function sendCustomOrderEmail(orderId, customSubject, customHtml) {
  try {
    await enqueueEmail({
      order_id: orderId,
      event_type: 'CUSTOM',
      subject: customSubject,
      html: customHtml,
      text: customHtml.replace(/<[^>]*>?/gm, ''), // Strip HTML for text version
    });
  } catch (error) {
    console.error('Failed to enqueue custom email:', error);
    throw error;
  }
}

// Example 7: Batch processing multiple orders
export async function processBatchStatusUpdates(orderIds, newStatus) {
  const results = [];
  
  for (const orderId of orderIds) {
    try {
      await updateOrderStatus(orderId, newStatus);
      results.push({ orderId, success: true });
    } catch (error) {
      results.push({ orderId, success: false, error: error.message });
    }
  }
  
  return results;
}

// Example 8: Integration with existing API routes
// In your app/api/orders/[id]/route.js or similar:

/*
import { enqueueStatusUpdate } from '@/lib/email/queue';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    // Update order
    const { data, error } = await supabaseAdmin
      .from('Order')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Enqueue email notification
    await enqueueStatusUpdate(id);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
*/

// Example 9: Error handling best practices
export async function safeEnqueueEmail(orderId, eventType) {
  try {
    await enqueueEmail({
      order_id: orderId,
      event_type: eventType,
    });
    console.log(`Email queued successfully for order ${orderId}, event: ${eventType}`);
  } catch (error) {
    console.error(`Failed to queue email for order ${orderId}:`, error);
    // Don't throw - email failure shouldn't break the main flow
    // Optionally log to external service or alert admin
  }
}

// Example 10: Testing the email worker
export async function testEmailWorker() {
  try {
    // Test the worker endpoint
    const response = await fetch(`${process.env.APP_URL}/api/internal/email-worker`, {
      method: 'POST',
      headers: {
        'x-cron-secret': process.env.CRON_SECRET,
        'content-type': 'application/json'
      }
    });
    
    const result = await response.json();
    console.log('Email worker test result:', result);
    
    return result;
  } catch (error) {
    console.error('Email worker test failed:', error);
    throw error;
  }
}
