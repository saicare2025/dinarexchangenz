#!/usr/bin/env node

// Load env
require('dotenv').config({ path: '.env.local' });

const fetch = (typeof global.fetch !== 'undefined') ? global.fetch : (...args) => import('node-fetch').then(({default: f}) => f(...args));
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const BASE_URL = process.env.APP_URL || 'http://localhost:3000';
const CRON_SECRET = process.env.CRON_SECRET || '';

// Inputs (allow override via argv): node scripts/test-final-notifications.js <email> <phone> <orderId>
const TO_EMAIL = (process.argv[2] || process.env.TEST_EMAIL || 'nahid.priom.06@gmail.com').trim();
const TO_NUMBER = (process.argv[3] || process.env.TEST_SMS_TO || '+61 417 460 236').replace(/\s+/g, '');
const ORDER_ID = (process.argv[4] || process.env.TEST_ORDER_ID || 'TEST-FINAL-ORDER').trim();

const EMAIL_EVENTS = [
  'MISSING_ID',
  'MISSING_PAYMENT',
  'STATUS_UPDATE',
  'TRACKING_ADDED',
  'TRACKING_UPDATED',
  'ORDER_COMPLETED',
];

const SMS_EVENTS = [
  'ORDER_RECEIVED',
  'MISSING_ID',
  'MISSING_PAYMENT',
  'STATUS_UPDATE',
  'TRACKING_ADDED',
  'TRACKING_UPDATED',
  'ORDER_COMPLETED',
];

function log(msg) { console.log(`[final-test] ${msg}`); }
function fail(msg) { console.error(`[final-test] ERROR: ${msg}`); process.exit(1); }

async function ensureOrder() {
  // Ensure an order exists with the given ORDER_ID and target email/phone
  const baseOrder = {
    id: ORDER_ID,
    fullName: 'Final Test User',
    email: TO_EMAIL,
    mobile: TO_NUMBER,
    status: 'Order Received',
    trackingNumber: 'TRKTEST12345',
    createdAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('Order')
    .upsert(baseOrder, { onConflict: 'id' })
    .select('id, email, mobile, status')
    .single();
  if (error) throw new Error(`ensureOrder failed: ${error.message}`);
  return data;
}

async function enqueueEmails(orderId) {
  const inserted = [];
  for (const ev of EMAIL_EVENTS) {
    const { data, error } = await supabase
      .from('notification_email')
      .insert({ order_id: orderId, event_type: ev, to_email: TO_EMAIL, status: 'pending' })
      .select('id')
      .single();
    if (error) throw new Error(`enqueueEmails (${ev}) failed: ${error.message}`);
    inserted.push({ id: data.id, event: ev });
  }
  return inserted;
}

async function enqueueSms(orderId) {
  const inserted = [];
  for (const ev of SMS_EVENTS) {
    const { data, error } = await supabase
      .from('notification_sms')
      .insert({ order_id: orderId, event_type: ev, to_number: TO_NUMBER, status: 'pending' })
      .select('id')
      .single();
    if (error) throw new Error(`enqueueSms (${ev}) failed: ${error.message}`);
    inserted.push({ id: data.id, event: ev });
  }
  return inserted;
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

async function readEmailStatuses(ids) {
  const out = [];
  for (const { id, event } of ids) {
    const { data, error } = await supabase
      .from('notification_email')
      .select('status, attempts, error')
      .eq('id', id)
      .single();
    if (error) throw new Error(`email status read failed for ${id}: ${error.message}`);
    out.push({ id, event, ...data });
  }
  return out;
}

async function readSmsStatuses(ids) {
  const out = [];
  for (const { id, event } of ids) {
    const { data, error } = await supabase
      .from('notification_sms')
      .select('status, attempts, error')
      .eq('id', id)
      .single();
    if (error) throw new Error(`sms status read failed for ${id}: ${error.message}`);
    out.push({ id, event, ...data });
  }
  return out;
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) fail('Missing Supabase env');
  if (!CRON_SECRET) fail('CRON_SECRET is required');

  log(`Base: ${BASE_URL}`);
  log(`Order: ${ORDER_ID}`);
  log(`Email: ${TO_EMAIL}`);
  log(`Phone: ${TO_NUMBER}`);

  const order = await ensureOrder();
  log(`Order ensured: ${order.id}`);

  const emailIds = await enqueueEmails(order.id);
  const smsIds = await enqueueSms(order.id);
  log(`Queued ${emailIds.length} emails and ${smsIds.length} SMS.`);

  const workerRes = await runWorker();
  log(`Worker response: ${JSON.stringify(workerRes)}`);

  // allow some time for updates
  await new Promise(r => setTimeout(r, 2000));

  const emailStatuses = await readEmailStatuses(emailIds);
  const smsStatuses = await readSmsStatuses(smsIds);

  log('Email statuses:');
  for (const s of emailStatuses) {
    log(` - ${s.event}: ${s.status} (attempts=${s.attempts})${s.error ? ` error=${s.error}` : ''}`);
  }
  log('SMS statuses:');
  for (const s of smsStatuses) {
    log(` - ${s.event}: ${s.status} (attempts=${s.attempts})${s.error ? ` error=${s.error}` : ''}`);
  }

  log('Done. Check your inbox and phone for messages.');
}

main().catch((e) => fail(e.message || String(e)));


