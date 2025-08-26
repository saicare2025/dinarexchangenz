const crypto = require('crypto');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_8401k3jjp5sxe7stxwsakevapep6';
const apiKey = process.env.ELEVENLABS_API_KEY;

console.log('Testing ElevenLabs Agent ID...');
console.log('Agent ID:', agentId);
console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found');

async function testAgentId() {
  try {
    console.log('\nTesting agent configuration...');
    
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agent/${agentId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'xi-api-key': apiKey || ''
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Agent configuration loaded successfully:');
      console.log('Agent name:', data.name);
      console.log('Agent status:', data.status);
      console.log('Tools configured:', data.tools?.length || 0);
    } else {
      const errorText = await response.text();
      console.log('❌ Failed to load agent configuration:');
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ Error testing agent ID:', error.message);
  }
}

async function testWidgetScript() {
  try {
    console.log('\nTesting widget script availability...');
    
    const response = await fetch('https://unpkg.com/@elevenlabs/convai-widget-embed');
    
    console.log('Widget script status:', response.status);
    
    if (response.ok) {
      console.log('✅ Widget script is available');
    } else {
      console.log('❌ Widget script not available');
    }
  } catch (error) {
    console.log('❌ Error testing widget script:', error.message);
  }
}

async function runTests() {
  await testWidgetScript();
  await testAgentId();
}

runTests();
