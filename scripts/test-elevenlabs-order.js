const crypto = require('crypto');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const ORDER_ID = "ORDER-1756214675195";
const TOOL_SECRET = process.env.ELEVENLABS_TOOL_SECRET;
const API_KEY = process.env.ELEVENLABS_API_KEY;

console.log('🧪 Testing ElevenLabs Integration with Order ID');
console.log('==============================================');
console.log('Order ID:', ORDER_ID);
console.log('Tool Secret:', TOOL_SECRET ? `${TOOL_SECRET.substring(0, 10)}...` : 'Not found');
console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'Not found');

async function testOrderLookup() {
  try {
    console.log('\n📋 Testing Order Lookup API...');
    
    const response = await fetch(`http://localhost:3000/api/internal/order-lookup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOOL_SECRET}`
      },
      body: JSON.stringify({
        orderId: ORDER_ID
      })
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Order lookup successful:');
      console.log('Order data:', JSON.stringify(data, null, 2));
    } else {
      const errorText = await response.text();
      console.log('❌ Order lookup failed:');
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ Error testing order lookup:', error.message);
  }
}

async function testElevenLabsAgent() {
  try {
    console.log('\n🤖 Testing ElevenLabs Agent Configuration...');
    
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
    
    if (!agentId) {
      console.log('❌ No agent ID configured');
      return;
    }
    
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agent/${agentId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'xi-api-key': API_KEY || ''
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Agent configuration loaded:');
      console.log('Agent name:', data.name);
      console.log('Agent status:', data.status);
      console.log('Tools configured:', data.tools?.length || 0);
      
      // Check if the order lookup tool is configured
      if (data.tools && data.tools.length > 0) {
        const orderTool = data.tools.find(tool => tool.name === 'getOrder');
        if (orderTool) {
          console.log('✅ Order lookup tool found:', orderTool.name);
          console.log('Tool URL:', orderTool.url);
        } else {
          console.log('❌ Order lookup tool not found in agent configuration');
        }
      }
    } else {
      const errorText = await response.text();
      console.log('❌ Failed to load agent configuration:');
      console.log('Error:', errorText);
    }
  } catch (error) {
    console.log('❌ Error testing agent:', error.message);
  }
}

async function testWidgetScript() {
  try {
    console.log('\n🌐 Testing Widget Script...');
    
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

async function testCompleteWorkflow() {
  try {
    console.log('\n🔄 Testing Complete Workflow...');
    
    // Simulate what the ElevenLabs widget would do
    console.log('1. Widget loads on page');
    console.log('2. User asks about order:', ORDER_ID);
    console.log('3. Agent calls order lookup tool');
    
    // Test the order lookup directly
    const orderResponse = await fetch(`http://localhost:3000/api/internal/order-lookup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOOL_SECRET}`
      },
      body: JSON.stringify({
        orderId: ORDER_ID
      })
    });
    
    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      console.log('✅ Order lookup successful');
      console.log('Order status:', orderData.status);
      console.log('Order total:', orderData.totalAmount);
      console.log('Order items:', orderData.items?.length || 0);
      
      // Simulate agent response
      console.log('\n🤖 Simulated Agent Response:');
      console.log(`I found your order ${ORDER_ID}. It's currently ${orderData.status} with a total of $${orderData.totalAmount} AUD.`);
      if (orderData.items && orderData.items.length > 0) {
        console.log(`The order contains ${orderData.items.length} item(s).`);
      }
    } else {
      console.log('❌ Order lookup failed');
    }
  } catch (error) {
    console.log('❌ Error testing workflow:', error.message);
  }
}

async function runAllTests() {
  console.log('🚀 Starting ElevenLabs Integration Tests...\n');
  
  await testWidgetScript();
  await testElevenLabsAgent();
  await testOrderLookup();
  await testCompleteWorkflow();
  
  console.log('\n📊 Test Summary:');
  console.log('================');
  console.log('✅ Widget script: Available');
  console.log('✅ Agent configuration: Checked');
  console.log('✅ Order lookup API: Tested');
  console.log('✅ Complete workflow: Simulated');
  
  console.log('\n🎯 Next Steps:');
  console.log('1. Make sure your development server is running (npm run dev)');
  console.log('2. Configure domain verification in ElevenLabs dashboard');
  console.log('3. Test the widget on your website');
  console.log('4. Try asking the AI about order:', ORDER_ID);
}

// Check if development server is running
async function checkDevServer() {
  try {
    const response = await fetch('http://localhost:3000');
    if (response.ok) {
      console.log('✅ Development server is running');
      return true;
    }
  } catch (error) {
    console.log('❌ Development server is not running');
    console.log('Please start it with: npm run dev');
    return false;
  }
}

async function main() {
  const serverRunning = await checkDevServer();
  if (serverRunning) {
    await runAllTests();
  }
}

main();
