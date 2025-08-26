// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.ELEVENLABS_API_KEY;

console.log('Checking ElevenLabs ConvAI domain verification...');
console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found');

async function checkConvAISettings() {
  try {
    console.log('\nFetching ConvAI settings...');
    
    const response = await fetch('https://api.elevenlabs.io/v1/convai/settings', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'xi-api-key': apiKey || ''
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ ConvAI settings loaded:');
      console.log('Allowed domains:', data.allowed_domains || 'Not configured');
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

async function listAgents() {
  try {
    console.log('\nFetching your agents...');
    
    const response = await fetch('https://api.elevenlabs.io/v1/convai/agents', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'xi-api-key': apiKey || ''
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Your agents:');
      if (data.agents && data.agents.length > 0) {
        data.agents.forEach((agent, index) => {
          console.log(`${index + 1}. ${agent.name} (${agent.agent_id})`);
          console.log(`   Status: ${agent.status}`);
          console.log(`   Allowed domains: ${agent.allowed_domains || 'Not configured'}`);
        });
      } else {
        console.log('No agents found. Please create an agent in your ElevenLabs dashboard.');
      }
    } else {
      const errorText = await response.text();
      console.log('❌ Failed to load agents:');
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ Error listing agents:', error.message);
  }
}

async function runChecks() {
  await checkConvAISettings();
  await listAgents();
  
  console.log('\n📋 Next Steps:');
  console.log('1. Go to https://elevenlabs.io/convai');
  console.log('2. Create a new agent or check existing agent settings');
  console.log('3. Add your domain (localhost:3000 for development) to allowed domains');
  console.log('4. Complete domain verification if required');
  console.log('5. Update your .env.local with the correct agent ID');
}

runChecks();
