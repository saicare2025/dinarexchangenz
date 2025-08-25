#!/usr/bin/env node

/**
 * Check Orders in Database
 * 
 * This script lists all orders in the database to find the correct order ID
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { supabaseAdmin } = require('../lib/supabase/admin');

async function checkOrders() {
  console.log('🔍 Checking orders in database...');
  
  try {
    // Get all orders
    const { data: orders, error } = await supabaseAdmin
      .from('Order')
      .select('id, fullName, email, status, createdAt')
      .order('createdAt', { ascending: false })
      .limit(10);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    console.log(`📋 Found ${orders.length} orders:`);
    console.log('');

    orders.forEach((order, index) => {
      console.log(`${index + 1}. Order ID: "${order.id}"`);
      console.log(`   Customer: ${order.fullName}`);
      console.log(`   Email: ${order.email}`);
      console.log(`   Status: ${order.status}`);
      console.log(`   Created: ${new Date(order.createdAt).toLocaleDateString()}`);
      console.log('');
    });

    // Check if our target order exists
    const targetOrder = orders.find(order => order.id === '#38634894');
    if (targetOrder) {
      console.log('✅ Found your order #38634894!');
    } else {
      console.log('❌ Order #38634894 not found in database');
      console.log('');
      console.log('💡 Try using one of the order IDs above instead');
    }

  } catch (error) {
    console.error('❌ Error checking orders:', error.message);
  }
}

// Run the check
checkOrders().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
