const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false },
    global: { headers: { "X-Client-Info": "elevenlabs-test/1.0" } },
  }
);

async function testElevenLabsIntegration() {
  console.log('🧪 Testing ElevenLabs Integration with Supabase...\n');

  // Test 1: Check environment variables
  console.log('1. Environment Variables Check:');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
  
  console.log(`   - Supabase URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`);
  console.log(`   - Service Role Key: ${serviceRoleKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`   - ElevenLabs Agent ID: ${agentId ? '✅ Set' : '❌ Missing'}`);
  
  // Check if any required variables are missing
  if (!supabaseUrl || !serviceRoleKey || !agentId) {
    console.log('\n❌ Missing required environment variables!');
    console.log('Please create a .env.local file with the required variables.');
    console.log('See env-template.txt and ELEVENLABS_SETUP_GUIDE.md for instructions.');
    console.log('\nRequired variables:');
    if (!supabaseUrl) console.log('   - NEXT_PUBLIC_SUPABASE_URL');
    if (!serviceRoleKey) console.log('   - SUPABASE_SERVICE_ROLE_KEY');
    if (!agentId) console.log('   - NEXT_PUBLIC_ELEVENLABS_AGENT_ID');
    console.log('\nExample:');
    console.log('NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
    console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here');
    console.log('NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here');
    return;
  }
  
  console.log('');

  // Test 2: Test database connection
  console.log('2. Database Connection Test:');
  try {
    const { data, error } = await supabase
      .from('Order')
      .select('count')
      .limit(1);

    if (error) {
      console.log(`   ❌ Database connection failed: ${error.message}`);
    } else {
      console.log('   ✅ Database connection successful');
    }
  } catch (error) {
    console.log(`   ❌ Database connection error: ${error.message}`);
  }
  console.log('');

  // Test 3: Test order creation (simulate session start)
  console.log('3. Order Creation Test (Session Start):');
  try {
    const testOrderData = {
      status: 'order_received',
      quantity: 1,
      email: 'test@elevenlabs.com',
      fullName: 'Test User',
      mobile: '+1234567890',
      trackingNumber: 'TRK-TEST-123',
      comments: 'Test order created via ElevenLabs integration test',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('Order')
      .insert([testOrderData])
      .select()
      .single();

    if (error) {
      console.log(`   ❌ Order creation failed: ${error.message}`);
    } else {
      console.log(`   ✅ Order created successfully with ID: ${data.id}`);
      
      // Test 4: Test order update (simulate payment success)
      console.log('4. Order Update Test (Payment Success):');
      const updateData = {
        status: 'paid',
        currency: 'USD',
        method: 'credit_card',
        receiptUrl: 'https://example.com/test-receipt.pdf',
        updatedAt: new Date().toISOString()
      };

      const { data: updatedData, error: updateError } = await supabase
        .from('Order')
        .update(updateData)
        .eq('id', data.id)
        .select()
        .single();

      if (updateError) {
        console.log(`   ❌ Order update failed: ${updateError.message}`);
      } else {
        console.log(`   ✅ Order updated successfully to status: ${updatedData.status}`);
      }

      // Test 5: Clean up test data
      console.log('5. Cleanup Test Data:');
      const { error: deleteError } = await supabase
        .from('Order')
        .delete()
        .eq('id', data.id);

      if (deleteError) {
        console.log(`   ⚠️  Cleanup failed: ${deleteError.message}`);
      } else {
        console.log('   ✅ Test data cleaned up successfully');
      }
    }
  } catch (error) {
    console.log(`   ❌ Test failed: ${error.message}`);
  }
  console.log('');

  // Test 6: Check triggers
  console.log('6. Database Triggers Check:');
  try {
    const { data: triggers, error } = await supabase
      .rpc('get_triggers_info');

    if (error) {
      console.log('   ⚠️  Could not check triggers (function may not exist)');
      console.log('   Expected triggers: set_updated_at, trigger_notifications_on_status_change, order_to_outbox');
    } else {
      console.log('   ✅ Triggers check completed');
    }
  } catch (error) {
    console.log('   ⚠️  Triggers check skipped');
  }
  console.log('');

  console.log('🎉 ElevenLabs Integration Test Complete!');
  console.log('');
  console.log('Next Steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Visit /test-elevenlabs to test the widget');
  console.log('3. Check browser console for event logs');
  console.log('4. Verify orders are created in your Supabase dashboard');
}

// Run the test
testElevenLabsIntegration().catch(console.error);
