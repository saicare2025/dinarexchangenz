import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Enqueue an email notification to the outbox
 * @param {Object} params
 * @param {string} params.order_id - The order ID
 * @param {string} params.event_type - Event type (MISSING_ID, MISSING_PAYMENT, STATUS_UPDATE, etc.)
 * @param {string} [params.to_email] - Override recipient email (optional)
 * @param {string} [params.subject] - Custom subject (optional)
 * @param {string} [params.html] - Custom HTML body (optional)
 * @param {string} [params.text] - Custom text body (optional)
 */
export async function enqueueEmail({
  order_id,
  event_type,
  to_email = null,
  subject = null,
  html = null,
  text = null,
}) {
  const { data, error } = await supabaseAdmin
    .from("notification_email")
    .insert({
      order_id,
      event_type,
      to_email,
      subject,
      html,
      text,
      status: "pending",
      attempts: 0,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to enqueue email: ${error.message}`);
  }

  return data;
}

/**
 * Enqueue a status update email
 */
export async function enqueueStatusUpdate(orderId, newStatus) {
  return enqueueEmail({
    order_id: orderId,
    event_type: "STATUS_UPDATE",
  });
}

/**
 * Enqueue a missing ID notification
 */
export async function enqueueMissingId(orderId) {
  return enqueueEmail({
    order_id: orderId,
    event_type: "MISSING_ID",
  });
}

/**
 * Enqueue a missing payment notification
 */
export async function enqueueMissingPayment(orderId) {
  return enqueueEmail({
    order_id: orderId,
    event_type: "MISSING_PAYMENT",
  });
}

/**
 * Enqueue a tracking update
 */
export async function enqueueTrackingUpdate(orderId, isUpdate = false) {
  return enqueueEmail({
    order_id: orderId,
    event_type: isUpdate ? "TRACKING_UPDATED" : "TRACKING_ADDED",
  });
}

/**
 * Enqueue an order completion notification
 */
export async function enqueueOrderCompleted(orderId) {
  return enqueueEmail({
    order_id: orderId,
    event_type: "ORDER_COMPLETED",
  });
}
