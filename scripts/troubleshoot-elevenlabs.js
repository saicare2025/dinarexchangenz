#!/usr/bin/env node

/**
 * ElevenLabs Authorization Troubleshooting Script
 * 
 * This script helps diagnose "Could not authorize the conversation" errors
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const https = require('https');
const http = require('http');

console.log('🔍 ElevenLabs Authorization Troubleshooting');
console.log('==========================================\n');

function makeRequest(url, options = {}) {
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
          resolve({ statusCode: res.statusCode, data: response, headers: res.headers });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000);
    req.end();
  });
}

async function checkEnvironmentVariables() {
  console.log('1️⃣  Checking Environment Variables...');
  
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
  const toolSecret = process.env.ELEVENLABS_TOOL_SECRET;
  
  console.log('Agent ID:', agentId ? `${agentId.substring(0, 10)}...` : '❌ Missing');
  console.log('Tool Secret:', toolSecret ? '✅ Set' : '❌ Missing');
  
  if (!agentId) {
    console.log('❌ NEXT_PUBLIC_ELEVENLABS_AGENT_ID is not set in .env.local');
    return false;
  }
  
  if (!toolSecret) {
    console.log('❌ ELEVENLABS_TOOL_SECRET is not set in .env.local');
    return false;
  }
  
  console.log('✅ Environment variables are configured\n');
  return true;
}

async function checkAgentStatus() {
  console.log('2️⃣  Checking Agent Status...');
  
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
  
  try {
    const response = await makeRequest(`https://api.elevenlabs.io/v1/convai/agent/${agentId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Agent API Response:', response.statusCode);
    
    if (response.statusCode === 200) {
      const agent = response.data;
      console.log('✅ Agent is accessible');
      console.log('Agent Name:', agent.name || 'Unknown');
      console.log('Agent Status:', agent.status || 'Unknown');
      console.log('Agent Published:', agent.published || false);
      
      if (!agent.published) {
        console.log('⚠️  Agent is not published - this could cause authorization issues');
      }
      
      return true;
    } else {
      console.log('❌ Agent not accessible:', response.statusCode);
      console.log('Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Error checking agent:', error.message);
    return false;
  }
}

async function checkDomainAuthorization() {
  console.log('\n3️⃣  Checking Domain Authorization...');
  
  const currentDomain = process.env.APP_URL || 'http://localhost:3000';
  console.log('Current Domain:', currentDomain);
  
  // Check if we're on localhost
  if (currentDomain.includes('localhost')) {
    console.log('⚠️  Running on localhost - ElevenLabs may not authorize localhost domains');
    console.log('💡 Try deploying to a public domain or use ngrok for testing');
    return false;
  }
  
  // Check if domain is HTTPS
  if (!currentDomain.startsWith('https://')) {
    console.log('⚠️  Domain is not HTTPS - ElevenLabs requires HTTPS for production');
    console.log('💡 Use HTTPS in production or ngrok for testing');
    return false;
  }
  
  console.log('✅ Domain appears to be properly configured');
  return true;
}

async function checkWidgetScript() {
  console.log('\n4️⃣  Checking Widget Script...');
  
  try {
    const response = await makeRequest('https://unpkg.com/@elevenlabs/convai-widget-embed', {
      method: 'GET'
    });

    if (response.statusCode === 200) {
      console.log('✅ Widget script is accessible');
      console.log('Script Size:', response.data.length, 'bytes');
    } else {
      console.log('❌ Widget script not accessible:', response.statusCode);
    }
  } catch (error) {
    console.log('❌ Error checking widget script:', error.message);
  }
}

async function testWidgetInitialization() {
  console.log('\n5️⃣  Testing Widget Initialization...');
  
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
  
  console.log('Testing widget with agent ID:', agentId);
  console.log('💡 Check browser console for these messages:');
  console.log('   - "ElevenLabs widget initialized with agent ID: ..."');
  console.log('   - Any error messages about authorization');
  console.log('   - Network requests to ElevenLabs API');
}

async function provideSolutions() {
  console.log('\n6️⃣  Solutions for Authorization Issues...\n');
  
  console.log('🔧 Common Solutions:');
  console.log('1. Verify Agent ID:');
  console.log('   - Go to https://elevenlabs.io/convai');
  console.log('   - Check if your agent ID is correct');
  console.log('   - Ensure the agent is published');
  
  console.log('\n2. Check Domain Authorization:');
  console.log('   - In ElevenLabs dashboard, go to your agent settings');
  console.log('   - Add your domain to the authorized domains list');
  console.log('   - For localhost testing, use ngrok or similar service');
  
  console.log('\n3. Verify Agent Configuration:');
  console.log('   - Ensure the agent is published and active');
  console.log('   - Check if the agent has the webhook tool configured');
  console.log('   - Verify the tool secret matches your ELEVENLABS_TOOL_SECRET');
  
  console.log('\n4. Test with ngrok (for localhost):');
  console.log('   - Install ngrok: npm install -g ngrok');
  console.log('   - Run: ngrok http 3000');
  console.log('   - Use the ngrok URL in your ElevenLabs agent settings');
  
  console.log('\n5. Check Browser Console:');
  console.log('   - Open browser developer tools');
  console.log('   - Look for network errors to ElevenLabs API');
  console.log('   - Check for JavaScript errors in the console');
}

async function runTroubleshooting() {
  console.log('🚀 Starting ElevenLabs Authorization Troubleshooting...\n');
  
  const envOk = await checkEnvironmentVariables();
  const agentOk = await checkAgentStatus();
  const domainOk = await checkDomainAuthorization();
  await checkWidgetScript();
  await testWidgetInitialization();
  await provideSolutions();
  
  console.log('\n📋 Summary:');
  console.log('Environment Variables:', envOk ? '✅' : '❌');
  console.log('Agent Status:', agentOk ? '✅' : '❌');
  console.log('Domain Authorization:', domainOk ? '✅' : '❌');
  
  if (!envOk || !agentOk) {
    console.log('\n❌ Critical issues found - fix these first');
  } else if (!domainOk) {
    console.log('\n⚠️  Domain issues - consider using ngrok for testing');
  } else {
    console.log('\n✅ Basic configuration looks good - check browser console for specific errors');
  }
}

// Run the troubleshooting
runTroubleshooting().catch(console.error);
