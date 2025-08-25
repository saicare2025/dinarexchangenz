#!/usr/bin/env node

/**
 * Simple Email Worker Testing Script (Windows Compatible)
 * 
 * This script tests the basic functionality of the email worker system
 * without requiring bash or additional dependencies.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Configuration
const BASE_URL = 'http://localhost:3000'; // Force localhost for testing
const CRON_SECRET = process.env.CRON_SECRET;
const TEST_ORDER_ID = process.env.TEST_ORDER_ID || 'test-order-123';

// Test results
let passed = 0;
let failed = 0;

function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`ℹ️ [${timestamp}] ${message}`);
}

function success(message) {
    console.log(`✅ ${message}`);
    passed++;
}

function error(message) {
    console.log(`❌ ${message}`);
    failed++;
}

function warning(message) {
    console.log(`⚠️ ${message}`);
}

async function testApi(name, method, url, headers = {}, body = null, expectedStatus) {
    log(`Testing: ${name}`);
    
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }
        
        const response = await fetch(url, options);
        const responseText = await response.text();
        
        if (response.status === expectedStatus) {
            success(`${name} - Status ${response.status} (Expected: ${expectedStatus})`);
            console.log(`   Response: ${responseText}`);
        } else {
            error(`${name} - Status ${response.status} (Expected: ${expectedStatus})`);
            console.log(`   Response: ${responseText}`);
        }
    } catch (err) {
        error(`${name} - ${err.message}`);
    }
    console.log('');
}

// Check if required environment variables are set
function checkEnvVars() {
    log('Checking environment variables...');
    
    const requiredVars = [
        'SMTP_HOST',
        'SMTP_PORT',
        'SMTP_USER',
        'SMTP_PASS',
        'SMTP_FROM',
        'ALERT_TO',
        'NEXT_PUBLIC_SUPABASE_URL',
        'SUPABASE_SERVICE_ROLE_KEY',
        'CRON_SECRET'
    ];
    
    for (const varName of requiredVars) {
        if (!process.env[varName]) {
            error(`Missing environment variable: ${varName}`);
        } else {
            success(`Environment variable: ${varName} is set`);
        }
    }
    console.log('');
}

// Test API endpoints
async function testApiEndpoints() {
    log('Testing API endpoints...');
    
    // Test unauthorized access
    await testApi(
        'Unauthorized Access',
        'POST',
        `${BASE_URL}/api/internal/email-worker`,
        {},
        {},
        401
    );
    
    // Test authorized access
    if (CRON_SECRET) {
        await testApi(
            'Authorized Access',
            'POST',
            `${BASE_URL}/api/internal/email-worker`,
            { 'x-cron-secret': CRON_SECRET },
            {},
            200
        );
    } else {
        warning('CRON_SECRET not set, skipping authorized access test');
    }
    
    // Test endpoint info
    await testApi(
        'Test Endpoint Info',
        'GET',
        `${BASE_URL}/api/internal/email-worker/test`,
        {},
        null,
        200
    );
}

// Test email queueing
async function testEmailQueueing() {
    log('Testing email queueing...');
    
    const eventTypes = ['STATUS_UPDATE', 'MISSING_ID', 'MISSING_PAYMENT', 'TRACKING_ADDED', 'ORDER_COMPLETED'];
    
    for (const eventType of eventTypes) {
        await testApi(
            `Queue Email - ${eventType}`,
            'POST',
            `${BASE_URL}/api/internal/email-worker/test`,
            {},
            { order_id: TEST_ORDER_ID, event_type: eventType },
            200
        );
    }
}

// Test email processing
async function testEmailProcessing() {
    log('Testing email processing...');
    
    if (CRON_SECRET) {
        await testApi(
            'Process Emails',
            'POST',
            `${BASE_URL}/api/internal/email-worker`,
            { 'x-cron-secret': CRON_SECRET },
            {},
            200
        );
    } else {
        warning('CRON_SECRET not set, skipping email processing test');
    }
}

// Test error handling
async function testErrorHandling() {
    log('Testing error handling...');
    
    // Test invalid event type
    await testApi(
        'Invalid Event Type',
        'POST',
        `${BASE_URL}/api/internal/email-worker/test`,
        {},
        { order_id: TEST_ORDER_ID, event_type: 'INVALID_EVENT' },
        400
    );
    
    // Test missing required fields
    await testApi(
        'Missing Event Type',
        'POST',
        `${BASE_URL}/api/internal/email-worker/test`,
        {},
        { order_id: TEST_ORDER_ID },
        400
    );
    
    // Test missing order ID
    await testApi(
        'Missing Order ID',
        'POST',
        `${BASE_URL}/api/internal/email-worker/test`,
        {},
        { event_type: 'STATUS_UPDATE' },
        400
    );
}

// Test database connectivity (basic check)
function testDatabase() {
    log('Testing database connectivity...');
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        success('Database configuration appears to be set');
    } else {
        error('Database configuration is missing');
    }
    console.log('');
}

// Test SMTP configuration
function testSmtp() {
    log('Testing SMTP configuration...');
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        success('SMTP configuration appears to be set');
        log(`SMTP Host: ${process.env.SMTP_HOST}`);
        log(`SMTP Port: ${process.env.SMTP_PORT || 587}`);
        log(`SMTP User: ${process.env.SMTP_USER}`);
    } else {
        error('SMTP configuration is incomplete');
    }
    console.log('');
}

// Main test function
async function runTests() {
    log('🚀 Starting Email Worker System Tests...');
    log(`Base URL: ${BASE_URL}`);
    log(`Test Order ID: ${TEST_ORDER_ID}`);
    console.log('');
    
    checkEnvVars();
    testDatabase();
    testSmtp();
    await testApiEndpoints();
    await testEmailQueueing();
    await testEmailProcessing();
    await testErrorHandling();
    
    // Summary
    log('📊 Test Results Summary:');
    log(`✅ Passed: ${passed}`);
    log(`❌ Failed: ${failed}`);
    
    if (failed === 0) {
        success('🎉 All tests passed! Your email worker system is working correctly.');
    } else {
        error('⚠️ Some tests failed. Please check the details above.');
    }
    
    console.log('');
    log('📋 Next Steps:');
    log('1. Check your email inbox for test emails');
    log('2. Verify database entries in Supabase');
    log('3. Check Next.js console for any errors');
    log('4. Test with real order IDs from your database');
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests().catch(error => {
        console.error(`❌ Fatal error: ${error.message}`);
        process.exit(1);
    });
}

module.exports = { runTests };
