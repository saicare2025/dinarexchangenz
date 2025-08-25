#!/usr/bin/env node

/**
 * Test Email Worker with Real Order
 * 
 * This script tests the email worker with your real order ID #38634894
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Use built-in fetch (available in Node.js 18+)
const fetch = globalThis.fetch;

// Configuration
const BASE_URL = 'http://localhost:3000';
const CRON_SECRET = process.env.CRON_SECRET;
const REAL_ORDER_ID = 'ORD-1756038634894'; // Your real order ID

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

async function testEmailQueueing() {
  log('🚀 Testing Email Worker with Real Order...');
  log(`📋 Order ID: ${REAL_ORDER_ID}`);
  log(`📧 Target Email: nahid.priom.06@gmail.com`);
  log(`📋 Customer: MD. NAHID FERDOUS PRIOM`);
  console.log('');

  const eventTypes = ['STATUS_UPDATE', 'MISSING_ID', 'MISSING_PAYMENT', 'TRACKING_ADDED', 'ORDER_COMPLETED'];
  const results = [];

  log('📧 Queueing email notifications...');
  
  for (const eventType of eventTypes) {
    try {
      log(`Queueing ${eventType}...`);
      
      const response = await fetch(`${BASE_URL}/api/internal/email-worker/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: REAL_ORDER_ID,
          event_type: eventType
        })
      });

      const data = await response.json();
      
      if (response.status === 200) {
        log(`✅ Queued ${eventType}: Job ID ${data.job_id}`, 'success');
        results.push({ eventType, success: true, jobId: data.job_id });
      } else {
        log(`❌ Failed to queue ${eventType}: ${data.error}`, 'error');
        results.push({ eventType, success: false, error: data.error });
      }
    } catch (error) {
      log(`❌ Error queueing ${eventType}: ${error.message}`, 'error');
      results.push({ eventType, success: false, error: error.message });
    }
  }

  return results;
}

async function processEmails() {
  log('🔄 Processing email queue...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/internal/email-worker`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-cron-secret': CRON_SECRET
      },
      body: JSON.stringify({})
    });

    const data = await response.json();
    
    if (response.status === 200) {
      log(`✅ Processed emails: ${JSON.stringify(data)}`, 'success');
      return data;
    } else {
      throw new Error(`Failed to process emails: ${data.error}`);
    }
  } catch (error) {
    log(`❌ Error processing emails: ${error.message}`, 'error');
    throw error;
  }
}

async function runTest() {
  try {
    // Step 1: Queue email notifications
    const queueResults = await testEmailQueueing();
    console.log('');

    // Step 2: Process emails
    const processResults = await processEmails();
    console.log('');

    // Summary
    log('📊 Test Results Summary:');
    const successfulQueues = queueResults.filter(r => r.success).length;
    log(`✅ Successfully queued: ${successfulQueues}/${queueResults.length} emails`);
    log(`📧 Processed: ${processResults.picked} emails`);
    log(`✅ Sent: ${processResults.sent} emails`);
    log(`❌ Failed: ${processResults.failed} emails`);

    if (processResults.sent > 0) {
      log('🎉 Email worker is working correctly!', 'success');
      log('📧 Check nahid.priom.06@gmail.com for test emails');
      log('📧 You should receive emails for your order #38634894');
    } else {
      log('⚠️ No emails were sent. Check the logs above.', 'error');
    }

    console.log('');
    log('📋 Detailed Results:');
    queueResults.forEach(result => {
      if (result.success) {
        log(`  ✅ ${result.eventType}: Queued successfully`, 'success');
      } else {
        log(`  ❌ ${result.eventType}: ${result.error}`, 'error');
      }
    });

  } catch (error) {
    log(`❌ Test failed: ${error.message}`, 'error');
  }
}

// Run the test
runTest().catch(error => {
  log(`❌ Fatal error: ${error.message}`, 'error');
  process.exit(1);
});
