#!/usr/bin/env node

/**
 * Comprehensive Email Worker Testing Script
 * 
 * This script tests all aspects of the email worker system:
 * 1. Environment variables
 * 2. Database connectivity
 * 3. API endpoints
 * 4. Email queueing
 * 5. Email processing
 * 6. SMTP connectivity
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const fetch = require('node-fetch');
const { supabaseAdmin } = require('../lib/supabase/admin');
const { enqueueEmail } = require('../lib/email/queue');
const { getTransporter } = require('../lib/email/transporter');

// Configuration
const BASE_URL = process.env.APP_URL || 'http://localhost:3000';
const CRON_SECRET = process.env.CRON_SECRET;
const TEST_ORDER_ID = process.env.TEST_ORDER_ID || 'test-order-123';

// Test results
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function addTest(name, passed, details = '') {
  results.tests.push({ name, passed, details });
  if (passed) {
    results.passed++;
    log(`PASS: ${name}`, 'success');
  } else {
    results.failed++;
    log(`FAIL: ${name} - ${details}`, 'error');
  }
}

async function testEnvironmentVariables() {
  log('Testing environment variables...');
  
  const requiredVars = [
    'SMTP_HOST',
    'SMTP_PORT', 
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM',
    'ALERT_TO',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'CRON_SECRET',
    'APP_URL'
  ];

  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value) {
      addTest(`Environment Variable: ${varName}`, false, 'Missing');
    } else {
      addTest(`Environment Variable: ${varName}`, true, 'Present');
    }
  }
}

async function testDatabaseConnectivity() {
  log('Testing database connectivity...');
  
  try {
    // Test basic connection
    const { data, error } = await supabaseAdmin
      .from('notification_email')
      .select('count')
      .limit(1);
    
    if (error) {
      addTest('Database Connection', false, error.message);
      return;
    }
    
    addTest('Database Connection', true, 'Connected successfully');
    
    // Test if notification_email table exists
    const { data: tableData, error: tableError } = await supabaseAdmin
      .from('notification_email')
      .select('*')
      .limit(1);
    
    if (tableError) {
      addTest('Notification Email Table', false, tableError.message);
    } else {
      addTest('Notification Email Table', true, 'Table exists and accessible');
    }
    
  } catch (error) {
    addTest('Database Connection', false, error.message);
  }
}

async function testSMTPConnectivity() {
  log('Testing SMTP connectivity...');
  
  try {
    const transporter = getTransporter();
    await transporter.verify();
    addTest('SMTP Connection', true, 'SMTP server is reachable');
  } catch (error) {
    addTest('SMTP Connection', false, error.message);
  }
}

async function testAPIEndpoints() {
  log('Testing API endpoints...');
  
  // Test 1: Unauthorized access
  try {
    const response = await fetch(`${BASE_URL}/api/internal/email-worker`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    
    if (response.status === 401) {
      addTest('API Security - Unauthorized', true, 'Returns 401 as expected');
    } else {
      addTest('API Security - Unauthorized', false, `Expected 401, got ${response.status}`);
    }
  } catch (error) {
    addTest('API Security - Unauthorized', false, error.message);
  }
  
  // Test 2: Authorized access
  try {
    const response = await fetch(`${BASE_URL}/api/internal/email-worker`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-cron-secret': CRON_SECRET
      },
      body: JSON.stringify({})
    });
    
    if (response.status === 200) {
      const data = await response.json();
      addTest('API Security - Authorized', true, `Returns 200: ${JSON.stringify(data)}`);
    } else {
      addTest('API Security - Authorized', false, `Expected 200, got ${response.status}`);
    }
  } catch (error) {
    addTest('API Security - Authorized', false, error.message);
  }
  
  // Test 3: Test endpoint info
  try {
    const response = await fetch(`${BASE_URL}/api/internal/email-worker/test`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.status === 200) {
      const data = await response.json();
      addTest('Test Endpoint Info', true, 'Returns endpoint information');
    } else {
      addTest('Test Endpoint Info', false, `Expected 200, got ${response.status}`);
    }
  } catch (error) {
    addTest('Test Endpoint Info', false, error.message);
  }
}

async function testEmailQueueing() {
  log('Testing email queueing...');
  
  const eventTypes = ['STATUS_UPDATE', 'MISSING_ID', 'MISSING_PAYMENT', 'TRACKING_ADDED', 'ORDER_COMPLETED'];
  
  for (const eventType of eventTypes) {
    try {
      // Test direct queueing
      const job = await enqueueEmail({
        order_id: TEST_ORDER_ID,
        event_type: eventType
      });
      
      if (job && job.id) {
        addTest(`Email Queue - ${eventType}`, true, `Job ID: ${job.id}`);
      } else {
        addTest(`Email Queue - ${eventType}`, false, 'No job ID returned');
      }
    } catch (error) {
      addTest(`Email Queue - ${eventType}`, false, error.message);
    }
  }
  
  // Test API queueing
  try {
    const response = await fetch(`${BASE_URL}/api/internal/email-worker/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: TEST_ORDER_ID,
        event_type: 'STATUS_UPDATE'
      })
    });
    
    if (response.status === 200) {
      const data = await response.json();
      addTest('API Email Queue', true, `Job ID: ${data.job_id}`);
    } else {
      addTest('API Email Queue', false, `Expected 200, got ${response.status}`);
    }
  } catch (error) {
    addTest('API Email Queue', false, error.message);
  }
}

async function testEmailProcessing() {
  log('Testing email processing...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/internal/email-worker`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-cron-secret': CRON_SECRET
      },
      body: JSON.stringify({})
    });
    
    if (response.status === 200) {
      const data = await response.json();
      addTest('Email Processing', true, `Processed: ${JSON.stringify(data)}`);
    } else {
      addTest('Email Processing', false, `Expected 200, got ${response.status}`);
    }
  } catch (error) {
    addTest('Email Processing', false, error.message);
  }
}

async function testErrorHandling() {
  log('Testing error handling...');
  
  // Test invalid event type
  try {
    const response = await fetch(`${BASE_URL}/api/internal/email-worker/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: TEST_ORDER_ID,
        event_type: 'INVALID_EVENT'
      })
    });
    
    if (response.status === 400 || response.status === 500) {
      addTest('Error Handling - Invalid Event', true, `Returns ${response.status} as expected`);
    } else {
      addTest('Error Handling - Invalid Event', false, `Expected 400/500, got ${response.status}`);
    }
  } catch (error) {
    addTest('Error Handling - Invalid Event', false, error.message);
  }
  
  // Test missing required fields
  try {
    const response = await fetch(`${BASE_URL}/api/internal/email-worker/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: TEST_ORDER_ID
        // Missing event_type
      })
    });
    
    if (response.status === 400) {
      addTest('Error Handling - Missing Fields', true, 'Returns 400 as expected');
    } else {
      addTest('Error Handling - Missing Fields', false, `Expected 400, got ${response.status}`);
    }
  } catch (error) {
    addTest('Error Handling - Missing Fields', false, error.message);
  }
}

async function cleanupTestData() {
  log('Cleaning up test data...');
  
  try {
    // Delete test emails from the last hour
    const { error } = await supabaseAdmin
      .from('notification_email')
      .delete()
      .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
      .eq('order_id', TEST_ORDER_ID);
    
    if (error) {
      log(`Cleanup warning: ${error.message}`, 'error');
    } else {
      addTest('Test Data Cleanup', true, 'Test data cleaned up');
    }
  } catch (error) {
    log(`Cleanup error: ${error.message}`, 'error');
  }
}

async function runAllTests() {
  log('🚀 Starting Email Worker System Tests...');
  log(`Base URL: ${BASE_URL}`);
  log(`Test Order ID: ${TEST_ORDER_ID}`);
  log('');
  
  await testEnvironmentVariables();
  log('');
  
  await testDatabaseConnectivity();
  log('');
  
  await testSMTPConnectivity();
  log('');
  
  await testAPIEndpoints();
  log('');
  
  await testEmailQueueing();
  log('');
  
  await testEmailProcessing();
  log('');
  
  await testErrorHandling();
  log('');
  
  await cleanupTestData();
  log('');
  
  // Summary
  log('📊 Test Results Summary:');
  log(`✅ Passed: ${results.passed}`);
  log(`❌ Failed: ${results.failed}`);
  log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  log('');
  
  if (results.failed === 0) {
    log('🎉 All tests passed! Your email worker system is working correctly.', 'success');
  } else {
    log('⚠️  Some tests failed. Please check the details above.', 'error');
  }
  
  // Detailed results
  log('📋 Detailed Test Results:');
  results.tests.forEach(test => {
    const status = test.passed ? '✅' : '❌';
    log(`${status} ${test.name}${test.details ? ` - ${test.details}` : ''}`);
  });
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(error => {
    log(`Fatal error: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = { runAllTests };
