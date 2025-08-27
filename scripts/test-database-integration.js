#!/usr/bin/env node

/**
 * Test Database Integration for ElevenLabs Agent
 * 
 * This script tests the order-lookup API endpoint that the ElevenLabs agent uses
 * to access Supabase database information.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = process.env.APP_URL || 'http://localhost:3000';
const API_ENDPOINT = '/api/internal/order-lookup';

console.log('🔍 Testing Database Integration for ElevenLabs Agent');
console.log('Base URL:', BASE_URL);
console.log('API Endpoint:', API_ENDPOINT);
console.log('---');

function makeRequest(url, options = {}, data = null) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ statusCode: res.statusCode, data: response });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    req.setTimeout(10000); // 10 second timeout
    
    // Write data for POST requests
    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

async function testOrderLookupAPI() {
  console.log('📡 Testing Order Lookup API...');
  
  try {
    // Test 1: Basic endpoint availability (should return 405 for GET, which is expected)
    const testUrl = `${BASE_URL}${API_ENDPOINT}`;
    console.log('Testing endpoint:', testUrl);
    
    const response = await makeRequest(testUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));

    if (response.statusCode === 405) {
      console.log('✅ Order Lookup API is accessible (405 expected for GET method)');
      console.log('ℹ️  This endpoint only accepts POST requests with proper authentication');
    } else if (response.statusCode === 401) {
      console.log('⚠️  API requires authentication (expected for security)');
    } else {
      console.log('❌ API returned unexpected status:', response.statusCode);
    }

    // Test 2: POST request with authentication (if we have the tool secret)
    const toolSecret = process.env.ELEVENLABS_TOOL_SECRET;
    if (toolSecret) {
      console.log('\n🔐 Testing authenticated POST request...');
      
      const postResponse = await makeRequest(testUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${toolSecret}`
        }
      }, JSON.stringify({ email: 'test@example.com' }));

      console.log('POST Response Status:', postResponse.statusCode);
      console.log('POST Response Data:', JSON.stringify(postResponse.data, null, 2));

      if (postResponse.statusCode === 200) {
        console.log('✅ Authenticated API call successful');
      } else if (postResponse.statusCode === 404) {
        console.log('⚠️  No test data found (expected if no orders exist)');
      } else {
        console.log('❌ Authenticated API call failed:', postResponse.statusCode);
      }
    } else {
      console.log('⚠️  ELEVENLABS_TOOL_SECRET not configured - skipping authenticated test');
    }

  } catch (error) {
    console.log('❌ Error testing Order Lookup API:', error.message);
  }
}

async function testSupabaseConnection() {
  console.log('\n🗄️  Testing Supabase Connection...');
  
  try {
    // Test Supabase environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Supabase environment variables not configured');
      console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
      console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'Set' : 'Missing');
      return;
    }

    console.log('✅ Supabase environment variables are configured');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Service Role Key:', serviceRoleKey ? 'Set' : 'Missing');

    // Test Supabase connection
    const testUrl = `${supabaseUrl}/rest/v1/`;
    const response = await makeRequest(testUrl, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Accept': 'application/json'
      }
    });

    console.log('Supabase Connection Status:', response.statusCode);
    
    if (response.statusCode === 200) {
      console.log('✅ Supabase connection successful');
    } else {
      console.log('⚠️  Supabase connection test returned status:', response.statusCode);
    }

    // Test Order table access
    if (serviceRoleKey) {
      console.log('\n📋 Testing Order table access...');
      
      const orderTableUrl = `${supabaseUrl}/rest/v1/Order?select=count`;
      const orderResponse = await makeRequest(orderTableUrl, {
        method: 'GET',
        headers: {
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Accept': 'application/json'
        }
      });

      console.log('Order Table Access Status:', orderResponse.statusCode);
      
      if (orderResponse.statusCode === 200) {
        console.log('✅ Order table accessible');
        console.log('Order Table Response:', JSON.stringify(orderResponse.data, null, 2));
      } else {
        console.log('❌ Order table access failed:', orderResponse.statusCode);
      }
    }

  } catch (error) {
    console.log('❌ Error testing Supabase connection:', error.message);
  }
}

async function testElevenLabsAgent() {
  console.log('\n🤖 Testing ElevenLabs Agent...');
  
  try {
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_8601k3k3ehrte5htsy5jkp79c64h';
    
    const response = await makeRequest(`https://api.elevenlabs.io/v1/convai/agent/${agentId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Agent Status:', response.statusCode);
    
    if (response.statusCode === 200) {
      console.log('✅ ElevenLabs agent is accessible');
      console.log('Agent Name:', response.data.name || 'Unknown');
      console.log('Agent Status:', response.data.status || 'Unknown');
    } else {
      console.log('❌ ElevenLabs agent test failed:', response.statusCode);
      console.log('Response:', response.data);
    }

  } catch (error) {
    console.log('❌ Error testing ElevenLabs agent:', error.message);
  }
}

async function runAllTests() {
  console.log('🚀 Starting Database Integration Tests...\n');
  
  await testElevenLabsAgent();
  await testSupabaseConnection();
  await testOrderLookupAPI();
  
  console.log('\n📋 Test Summary:');
  console.log('1. ElevenLabs Agent: Check if agent is accessible');
  console.log('2. Supabase Connection: Verify database connectivity');
  console.log('3. Order Lookup API: Test the API endpoint used by the agent');
  console.log('\n💡 Next Steps:');
  console.log('- Visit /test-agent in your browser to test the widget');
  console.log('- Check browser console for any JavaScript errors');
  console.log('- Verify your agent is configured with the webhook tool');
  console.log('- Test actual conversations with the agent');
}

// Run the tests
runAllTests().catch(console.error);
