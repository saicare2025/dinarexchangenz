#!/usr/bin/env node

/**
 * Create Test Order Script
 * 
 * This script creates a test order in the database for testing the email worker.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { supabaseAdmin } = require('../lib/supabase/admin');

async function createTestOrder() {
  console.log('🚀 Creating test order in database...');
  
  try {
    const testOrder = {
      id: 'TEST-ORDER-001',
      fullName: 'Nahid Priom',
      email: 'nahid.priom.06@gmail.com',
      mobile: '+1234567890',
      country: 'New Zealand',
      address: '123 Test Street',
      city: 'Auckland',
      state: 'Auckland',
      postcode: '1010',
      currency: '1,000,000 IQD',
      quantity: 1,
      status: 'Order Received',
      createdAt: new Date().toISOString()
    };

    console.log('📝 Inserting test order...');
    const { data, error } = await supabaseAdmin
      .from('Order')
      .upsert(testOrder, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('✅ Test order created successfully!');
    console.log('📋 Order ID:', data.id);
    console.log('📋 Customer:', data.fullName);
    console.log('📋 Email:', data.email);
    console.log('📋 Status:', data.status);
    
    console.log('\n🎯 Now you can test the email worker with this order ID!');
    console.log('📝 Update your .env.local with: TEST_ORDER_ID=TEST-ORDER-001');
    
  } catch (error) {
    console.error('❌ Failed to create test order:', error.message);
    console.error('🔍 Error details:', error);
  }
}

// Run the script
createTestOrder().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
