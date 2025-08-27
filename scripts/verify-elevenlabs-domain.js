// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

console.log('🔍 ElevenLabs Domain Verification Helper');
console.log('=======================================');
console.log('Agent ID:', AGENT_ID);
console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'Not found');

async function checkAgentDetails() {
  try {
    console.log('\n📋 Checking Agent Details...');
    
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agent/${AGENT_ID}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'xi-api-key': API_KEY || ''
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Agent found:');
      console.log('Name:', data.name);
      console.log('Status:', data.status);
      console.log('Allowed domains:', data.allowed_domains || 'Not configured');
      console.log('Verification method:', data.verification_method || 'Not specified');
      
      if (data.allowed_domains) {
        console.log('\n🌐 Domain Configuration:');
        data.allowed_domains.forEach((domain, index) => {
          console.log(`${index + 1}. ${domain}`);
        });
      } else {
        console.log('\n❌ No domains configured');
      }
    } else {
      const errorText = await response.text();
      console.log('❌ Agent not found or access denied:');
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ Error checking agent:', error.message);
  }
}

async function checkConvAISettings() {
  try {
    console.log('\n⚙️ Checking ConvAI Settings...');
    
    const response = await fetch('https://api.elevenlabs.io/v1/convai/settings', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'xi-api-key': API_KEY || ''
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ ConvAI settings:');
      console.log('Global allowed domains:', data.allowed_domains || 'Not configured');
      console.log('Verification method:', data.verification_method || 'Not specified');
    } else {
      const errorText = await response.text();
      console.log('❌ Failed to load ConvAI settings:');
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ Error checking ConvAI settings:', error.message);
  }
}

async function testDomainAccess() {
  try {
    console.log('\n🌐 Testing Domain Access...');
    
    const testDomains = [
      'localhost:3000',
      'localhost',
      '127.0.0.1:3000',
      'yourdomain.com' // Replace with your actual domain
    ];
    
    for (const domain of testDomains) {
      console.log(`Testing domain: ${domain}`);
      
      // This is a placeholder - ElevenLabs doesn't have a direct domain test API
      // But we can check if the agent is accessible from different contexts
      console.log(`  - Domain ${domain} needs to be configured in ElevenLabs dashboard`);
    }
  } catch (error) {
    console.log('❌ Error testing domain access:', error.message);
  }
}

async function provideVerificationSteps() {
  console.log('\n📋 Domain Verification Steps:');
  console.log('=============================');
  console.log('1. Go to https://elevenlabs.io/convai');
  console.log('2. Find your agent:', AGENT_ID);
  console.log('3. Click on "Settings" or "Configuration"');
  console.log('4. Look for "Domain Settings" or "Allowed Domains"');
  console.log('5. Add these domains:');
  console.log('   - localhost:3000 (for development)');
  console.log('   - yourdomain.com (for production)');
  console.log('6. Complete verification if required:');
  console.log('   - Meta tag: Add <meta name="elevenlabs-verification" content="code">');
  console.log('   - DNS record: Add TXT record elevenlabs-verification=code');
  console.log('   - File upload: Upload elevenlabs-verification.txt');
  console.log('7. Save settings and test again');
}

async function runVerification() {
  await checkAgentDetails();
  await checkConvAISettings();
  await testDomainAccess();
  await provideVerificationSteps();
  
  console.log('\n🎯 Next Steps:');
  console.log('1. Configure domains in ElevenLabs dashboard');
  console.log('2. Complete verification if required');
  console.log('3. Test the widget on your website');
  console.log('4. Run: node scripts/test-elevenlabs-order.js');
}

runVerification();

