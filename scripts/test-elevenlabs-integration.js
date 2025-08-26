#!/usr/bin/env node

/**
 * Test script for ElevenLabs ConvAI integration
 * Run with: node scripts/test-elevenlabs-integration.js
 */

const crypto = require('crypto');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Configuration
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const TOOL_SECRET = process.env.ELEVENLABS_TOOL_SECRET;

if (!TOOL_SECRET) {
  console.error('❌ ELEVENLABS_TOOL_SECRET not found in environment variables');
  console.log('Please set ELEVENLABS_TOOL_SECRET in your .env.local file');
  process.exit(1);
}

// Test data
const testOrderId = 'ORDER-12345';
const testEmail = 'test@example.com';

async function testEndpoint(endpoint, data, description) {
  console.log(`\n🔍 Testing: ${description}`);
  console.log(`   Endpoint: ${endpoint}`);
  console.log(`   Data:`, data);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOOL_SECRET}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('   ✅ Success:', result);
      return true;
    } else {
      console.log('   ❌ Error:', result);
      return false;
    }
  } catch (error) {
    console.log('   ❌ Network Error:', error.message);
    return false;
  }
}

async function testRateLimit() {
  console.log('\n🚦 Testing Rate Limiting...');
  
  const promises = [];
  for (let i = 0; i < 12; i++) {
    promises.push(
      testEndpoint(
        '/api/internal/order-lookup',
        { email: 'ratelimit@test.com' },
        `Rate limit test ${i + 1}/12`
      )
    );
  }

  const results = await Promise.all(promises);
  const successCount = results.filter(Boolean).length;
  
  console.log(`\n📊 Rate Limit Results: ${successCount}/12 requests succeeded`);
  if (successCount <= 10) {
    console.log('   ✅ Rate limiting working correctly');
  } else {
    console.log('   ⚠️  Rate limiting may not be working');
  }
}

async function testUnauthorizedAccess() {
  console.log('\n🔒 Testing Unauthorized Access...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/internal/order-lookup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid-secret'
      },
      body: JSON.stringify({ email: testEmail })
    });

    if (response.status === 401) {
      console.log('   ✅ Unauthorized access properly rejected');
      return true;
    } else {
      console.log('   ❌ Unauthorized access not properly rejected');
      return false;
    }
  } catch (error) {
    console.log('   ❌ Network Error:', error.message);
    return false;
  }
}

async function testSignedUrlEndpoint() {
  console.log('\n🔗 Testing Signed URL Endpoint...');
  
  return await testEndpoint(
    '/api/internal/elevenlabs-signed-url',
    { agentId: 'test-agent-id' },
    'Signed URL generation'
  );
}

async function runTests() {
  console.log('🧪 ElevenLabs ConvAI Integration Tests');
  console.log('=====================================');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Tool Secret: ${TOOL_SECRET.substring(0, 8)}...`);

  // Test order lookup with order ID
  await testEndpoint(
    '/api/internal/order-lookup',
    { orderId: testOrderId },
    'Order lookup by ID'
  );

  // Test order lookup with email
  await testEndpoint(
    '/api/internal/order-lookup',
    { email: testEmail },
    'Order lookup by email'
  );

  // Test invalid input
  await testEndpoint(
    '/api/internal/order-lookup',
    {},
    'Invalid input (no orderId or email)'
  );

  // Test unauthorized access
  await testUnauthorizedAccess();

  // Test rate limiting
  await testRateLimit();

  // Test signed URL endpoint
  await testSignedUrlEndpoint();

  console.log('\n✅ All tests completed!');
  console.log('\n📝 Next Steps:');
  console.log('1. Configure your ElevenLabs agent with the webhook tool');
  console.log('2. Set up your agent\'s system prompt');
  console.log('3. Test the widget on /test-elevenlabs page');
  console.log('4. Deploy to production with HTTPS');
}

// Run tests
runTests().catch(console.error);
