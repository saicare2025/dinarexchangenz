#!/usr/bin/env node

// Load env (local dev)
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const BASE_URL = process.env.APP_URL || 'http://localhost:3000';
const CRON_SECRET = process.env.CRON_SECRET || '';
const ORDER_ID = process.env.TEST_ORDER_ID || process.argv[2];
const TO_NUMBER = process.env.TEST_SMS_TO || process.argv[3] || '+61417460236';

const EVENTS = [
  'MISSING_ID',
  'MISSING_PAYMENT',
  'STATUS_UPDATE',
  'TRACKING_ADDED',
  'TRACKING_UPDATED',
  'ORDER_COMPLETED',
];

function log(msg) { console.log(`[sms-test] ${msg}`); }
function fail(msg) { console.error(`[sms-test] ERROR: ${msg}`); process.exit(1); }

async function ensureOrderExists(orderId) {
  // We only check existence; we don't create orders here to avoid schema coupling.
  const { data, error } = await supabaseAdmin.from('Order').select('id').eq('id', orderId).single();
  if (error) {
    throw new Error(`Order lookup failed: ${error.message}`);
  }
  if (!data) {
    throw new Error(`Order not found: ${orderId}. Set TEST_ORDER_ID to a valid Order.id`);
  }
}

async function enqueueSmsTests(orderId, toNumber) {
  const ids = [];
  for (const ev of EVENTS) {
    const { data, error } = await supabaseAdmin
      .from('notification_sms')
      .insert({ order_id: orderId, event_type: ev, to_number: toNumber, status: 'pending' })
      .select('id')
      .single();
    if (error) throw new Error(`Insert SMS (${ev}) failed: ${error.message}`);
    ids.push({ id: data.id, event: ev });
  }
  return ids;
}

async function runWorker() {
  const res = await fetch(`${BASE_URL}/api/internal/email-worker`, {
    method: 'POST',
    headers: { 'x-cron-secret': CRON_SECRET, 'content-type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Worker HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function readStatuses(ids) {
  const out = [];
  for (const { id, event } of ids) {
    const { data, error } = await supabaseAdmin
      .from('notification_sms')
      .select('status, attempts, error')
      .eq('id', id)
      .single();
    if (error) throw new Error(`Status read failed for ${id}: ${error.message}`);
    out.push({ id, event, ...data });
  }
  return out;
}

async function main() {
  if (!ORDER_ID) fail('Usage: node scripts/test-sms-worker.js <ORDER_ID> [TO_NUMBER] or set TEST_ORDER_ID, TEST_SMS_TO');
  if (!CRON_SECRET) fail('CRON_SECRET is required');
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    fail('Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER');
  }

  log(`Base: ${BASE_URL}`);
  log(`Order: ${ORDER_ID}`);
  log(`To: ${TO_NUMBER}`);

  await ensureOrderExists(ORDER_ID);
  log('Order exists. Enqueuing SMS tests...');

  const ids = await enqueueSmsTests(ORDER_ID, TO_NUMBER);
  log(`Inserted ${ids.length} sms jobs.`);

  const workerRes = await runWorker();
  log(`Worker response: ${JSON.stringify(workerRes)}`);

  // small delay for async delivery update
  await new Promise(r => setTimeout(r, 1500));
  const statuses = await readStatuses(ids);
  log('Statuses:');
  for (const s of statuses) {
    log(` - ${s.event}: ${s.status} (attempts=${s.attempts})${s.error ? ` error=${s.error}` : ''}`);
  }
}

main().catch((e) => { fail(e.message || String(e)); });


