#!/usr/bin/env node

/**
 * Test script for the contact form API
 * Run with: node scripts/test-contact-form.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test data
const testCases = [
  {
    name: 'Valid submission',
    data: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+64212345678',
      message: 'I would like to inquire about Iraqi Dinar exchange rates. Please provide current rates and availability.',
      website: ''
    },
    expectedStatus: 200
  },
  {
    name: 'Invalid email',
    data: {
      fullName: 'John Doe',
      email: 'invalid-email',
      phone: '+64212345678',
      message: 'Test message',
      website: ''
    },
    expectedStatus: 400
  },
  {
    name: 'Short name',
    data: {
      fullName: 'J',
      email: 'john@example.com',
      phone: '+64212345678',
      message: 'Test message',
      website: ''
    },
    expectedStatus: 400
  },
  {
    name: 'Short message',
    data: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+64212345678',
      message: 'Hi',
      website: ''
    },
    expectedStatus: 400
  },
  {
    name: 'Honeypot filled',
    data: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+64212345678',
      message: 'Test message',
      website: 'spam-bot'
    },
    expectedStatus: 400
  }
];

function buildCurlCommand(data, baseUrl = 'http://localhost:3000') {
  const formData = Object.entries(data)
    .map(([key, value]) => `-F "${key}=${value}"`)
    .join(' ');
  
  return `curl -X POST ${baseUrl}/api/contact ${formData} -H "Content-Type: multipart/form-data" -w "\\nHTTP Status: %{http_code}\\n"`;
}

function runTest(testCase, baseUrl = 'http://localhost:3000') {
  console.log(`\n🧪 Testing: ${testCase.name}`);
  console.log(`📝 Data:`, testCase.data);
  
  try {
    const command = buildCurlCommand(testCase.data, baseUrl);
    console.log(`🔗 Command: ${command}`);
    
    const output = execSync(command, { encoding: 'utf8' });
    console.log(`📤 Response: ${output}`);
    
    // Extract HTTP status from output
    const statusMatch = output.match(/HTTP Status: (\d+)/);
    const actualStatus = statusMatch ? parseInt(statusMatch[1]) : null;
    
    if (actualStatus === testCase.expectedStatus) {
      console.log(`✅ PASS: Expected ${testCase.expectedStatus}, got ${actualStatus}`);
    } else {
      console.log(`❌ FAIL: Expected ${testCase.expectedStatus}, got ${actualStatus}`);
    }
    
    return actualStatus === testCase.expectedStatus;
    
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    return false;
  }
}

function testRateLimiting(baseUrl = 'http://localhost:3000') {
  console.log('\n🧪 Testing Rate Limiting');
  
  const testData = {
    fullName: 'Rate Test User',
    email: 'ratetest@example.com',
    phone: '+64212345678',
    message: 'Rate limit test message',
    website: ''
  };
  
  let successCount = 0;
  const maxAttempts = 10;
  
  for (let i = 1; i <= maxAttempts; i++) {
    console.log(`\n📤 Attempt ${i}/${maxAttempts}`);
    
    try {
      const command = buildCurlCommand(testData, baseUrl);
      const output = execSync(command, { encoding: 'utf8' });
      
      const statusMatch = output.match(/HTTP Status: (\d+)/);
      const status = statusMatch ? parseInt(statusMatch[1]) : null;
      
      if (status === 200) {
        successCount++;
        console.log(`✅ Success (${successCount})`);
      } else if (status === 429) {
        console.log(`🚫 Rate limited (expected after ${successCount} successful requests)`);
        break;
      } else {
        console.log(`❌ Unexpected status: ${status}`);
      }
      
      // Small delay between requests
      if (i < maxAttempts) {
        execSync('sleep 1', { stdio: 'ignore' });
      }
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Rate limiting test completed: ${successCount} successful requests before rate limit`);
  return successCount > 0 && successCount <= 5; // Should be rate limited around 5 requests
}

function main() {
  console.log('🚀 Contact Form API Test Suite');
  console.log('================================');
  
  // Check if server is running
  try {
    execSync('curl -s http://localhost:3000 > /dev/null', { stdio: 'ignore' });
  } catch (error) {
    console.log('❌ Server not running on http://localhost:3000');
    console.log('Please start the development server with: npm run dev');
    process.exit(1);
  }
  
  let passedTests = 0;
  let totalTests = testCases.length;
  
  // Run validation tests
  testCases.forEach(testCase => {
    if (runTest(testCase)) {
      passedTests++;
    }
  });
  
  // Run rate limiting test
  console.log('\n⏱️  Waiting 5 seconds before rate limiting test...');
  execSync('sleep 5', { stdio: 'ignore' });
  
  if (testRateLimiting()) {
    passedTests++;
    totalTests++;
  }
  
  // Summary
  console.log('\n📊 Test Summary');
  console.log('===============');
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please check the implementation.');
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { runTest, testRateLimiting };
