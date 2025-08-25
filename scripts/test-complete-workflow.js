#!/usr/bin/env node

/**
 * Complete Email Worker Workflow Test
 * 
 * This script tests the complete email worker process:
 * 1. Create test order
 * 2. Queue email notifications
 * 3. Process emails
 * 4. Verify results
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { supabaseAdmin } = require('../lib/supabase/admin');

// Use built-in fetch (available in Node.js 18+)
const fetch = globalThis.fetch;

// Configuration
const BASE_URL = 'http://localhost:3000';
const CRON_SECRET = process.env.CRON_SECRET;
const TEST_ORDER_ID = '#38634894'; // Your real order ID

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

async function verifyOrderExists() {
  log('Verifying order exists in database...');
  
  const { data, error } = await supabaseAdmin
    .from('Order')
    .select('*')
    .eq('id', TEST_ORDER_ID)
    .single();

  if (error) {
    throw new Error(`Order not found: ${error.message}`);
  }

  log(`✅ Order found: ${data.id}`, 'success');
  log(`📋 Customer: ${data.fullName}`, 'info');
  log(`📧 Email: ${data.email}`, 'info');
  log(`📊 Status: ${data.status}`, 'info');
  return data;
}

async function queueEmailNotifications() {
  log('Queueing email notifications...');
  
  const eventTypes = ['STATUS_UPDATE', 'MISSING_ID', 'MISSING_PAYMENT', 'TRACKING_ADDED', 'ORDER_COMPLETED'];
  const results = [];

  for (const eventType of eventTypes) {
    try {
      const response = await fetch(`${BASE_URL}/api/internal/email-worker/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: TEST_ORDER_ID,
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
  log('Processing email queue...');
  
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

async function verifyResults() {
  log('Verifying results...');
  
  try {
    // Check notification_email table
    const { data: notifications, error: notifError } = await supabaseAdmin
      .from('notification_email')
      .select('*')
      .eq('order_id', TEST_ORDER_ID)
      .order('created_at', { ascending: false });

    if (notifError) {
      throw new Error(`Failed to fetch notifications: ${notifError.message}`);
    }

    log(`📧 Found ${notifications.length} email notifications`, 'success');
    
    notifications.forEach(notification => {
      log(`  - ${notification.event_type}: ${notification.status} (${notification.attempts} attempts)`, 
          notification.status === 'sent' ? 'success' : 'info');
    });

    // Check Order table
    const { data: order, error: orderError } = await supabaseAdmin
      .from('Order')
      .select('*')
      .eq('id', TEST_ORDER_ID)
      .single();

    if (orderError) {
      throw new Error(`Failed to fetch order: ${orderError.message}`);
    }

    log(`📋 Order status: ${order.status}`, 'success');

    return { notifications, order };
  } catch (error) {
    log(`❌ Error verifying results: ${error.message}`, 'error');
    throw error;
  }
}

async function cleanup() {
  log('Cleaning up test notifications...');
  
  try {
    // Only delete test notifications, keep the real order
    const { error: notifError } = await supabaseAdmin
      .from('notification_email')
      .delete()
      .eq('order_id', TEST_ORDER_ID);

    if (notifError) {
      log(`⚠️ Warning: Could not clean up notifications: ${notifError.message}`, 'error');
    } else {
      log('✅ Test notifications cleaned up', 'success');
    }
  } catch (error) {
    log(`❌ Error during cleanup: ${error.message}`, 'error');
  }
}

async function runCompleteTest() {
  log('🚀 Starting Complete Email Worker Workflow Test...');
  log(`Base URL: ${BASE_URL}`);
  log(`Test Order ID: ${TEST_ORDER_ID}`);
  console.log('');

  try {
    // Step 1: Verify order exists
    await verifyOrderExists();
    console.log('');

    // Step 2: Queue email notifications
    const queueResults = await queueEmailNotifications();
    console.log('');

    // Step 3: Process emails
    const processResults = await processEmails();
    console.log('');

    // Step 4: Verify results
    const verificationResults = await verifyResults();
    console.log('');

    // Summary
    log('📊 Test Results Summary:');
    const successfulQueues = queueResults.filter(r => r.success).length;
    log(`✅ Successfully queued: ${successfulQueues}/${queueResults.length} emails`);
    log(`📧 Processed: ${processResults.picked} emails`);
    log(`✅ Sent: ${processResults.sent} emails`);
    log(`❌ Failed: ${processResults.failed} emails`);
    log(`📋 Total notifications: ${verificationResults.notifications.length}`);

    if (processResults.sent > 0) {
      log('🎉 Email worker is working correctly!', 'success');
      log('📧 Check nahid.priom.06@gmail.com for test emails');
    } else {
      log('⚠️ No emails were sent. Check the logs above.', 'error');
    }

  } catch (error) {
    log(`❌ Test failed: ${error.message}`, 'error');
  } finally {
    console.log('');
    log('🧹 Cleaning up test data...');
    await cleanup();
    console.log('');
    log('🏁 Test completed!');
  }
}

// Run the complete test
runCompleteTest().catch(error => {
  log(`❌ Fatal error: ${error.message}`, 'error');
  process.exit(1);
});
