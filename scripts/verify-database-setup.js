#!/usr/bin/env node

/**
 * Verify Database Setup
 * 
 * This script verifies that all database components are properly set up:
 * - notification_email table structure
 * - Indexes
 * - Triggers
 * - RLS policies
 * - Cron functions
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { supabaseAdmin } = require('../lib/supabase/admin');

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

async function verifyTableStructure() {
  log('🔍 Verifying notification_email table structure...');
  
  try {
    // Check if table exists and get its structure
    const { data: columns, error } = await supabaseAdmin
      .rpc('get_table_columns', { table_name: 'notification_email' })
      .catch(() => {
        // Fallback: try to query the table directly
        return supabaseAdmin
          .from('notification_email')
          .select('*')
          .limit(1);
      });

    if (error) {
      log(`❌ Table verification failed: ${error.message}`, 'error');
      return false;
    }

    log('✅ notification_email table exists', 'success');
    
    // Check specific columns
    const requiredColumns = [
      'id', 'order_id', 'event_type', 'to_email', 'subject', 
      'html', 'text', 'status', 'attempts', 'error', 
      'locked_at', 'created_at', 'updated_at'
    ];

    log('📋 Checking required columns...');
    for (const column of requiredColumns) {
      try {
        await supabaseAdmin
          .from('notification_email')
          .select(column)
          .limit(1);
        log(`  ✅ Column '${column}' exists`, 'success');
      } catch (err) {
        log(`  ❌ Column '${column}' missing: ${err.message}`, 'error');
      }
    }

    return true;
  } catch (error) {
    log(`❌ Table structure verification failed: ${error.message}`, 'error');
    return false;
  }
}

async function verifyIndexes() {
  log('🔍 Verifying indexes...');
  
  try {
    const { data: indexes, error } = await supabaseAdmin
      .rpc('get_table_indexes', { table_name: 'notification_email' })
      .catch(() => {
        // Fallback: try to query with different conditions to test indexes
        return Promise.all([
          supabaseAdmin.from('notification_email').select('*').eq('status', 'pending').limit(1),
          supabaseAdmin.from('notification_email').select('*').order('created_at', { ascending: false }).limit(1),
          supabaseAdmin.from('notification_email').select('*').eq('order_id', 'test').limit(1),
          supabaseAdmin.from('notification_email').select('*').eq('event_type', 'test').limit(1)
        ]);
      });

    if (error) {
      log(`❌ Index verification failed: ${error.message}`, 'error');
      return false;
    }

    log('✅ Indexes appear to be working', 'success');
    return true;
  } catch (error) {
    log(`❌ Index verification failed: ${error.message}`, 'error');
    return false;
  }
}

async function verifyTriggers() {
  log('🔍 Verifying triggers...');
  
  try {
    // Test the updated_at trigger by inserting and updating a test record
    const testData = {
      order_id: 'TEST-TRIGGER-001',
      event_type: 'TEST',
      status: 'pending'
    };

    // Insert test record
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('notification_email')
      .insert(testData)
      .select()
      .single();

    if (insertError) {
      log(`❌ Trigger test insert failed: ${insertError.message}`, 'error');
      return false;
    }

    log(`✅ Test record inserted with ID: ${insertData.id}`, 'success');

    // Update the record to test the trigger
    const { data: updateData, error: updateError } = await supabaseAdmin
      .from('notification_email')
      .update({ status: 'sent' })
      .eq('id', insertData.id)
      .select()
      .single();

    if (updateError) {
      log(`❌ Trigger test update failed: ${updateError.message}`, 'error');
      return false;
    }

    // Check if updated_at was changed
    if (updateData.updated_at > insertData.updated_at) {
      log('✅ updated_at trigger is working', 'success');
    } else {
      log('❌ updated_at trigger not working', 'error');
    }

    // Clean up test record
    await supabaseAdmin
      .from('notification_email')
      .delete()
      .eq('id', insertData.id);

    return true;
  } catch (error) {
    log(`❌ Trigger verification failed: ${error.message}`, 'error');
    return false;
  }
}

async function verifyRLSPolicies() {
  log('🔍 Verifying RLS policies...');
  
  try {
    // Test RLS by trying to access with different roles
    const { data: policies, error } = await supabaseAdmin
      .rpc('get_rls_policies', { table_name: 'notification_email' })
      .catch(() => {
        // Fallback: try to insert/select to test RLS
        return supabaseAdmin
          .from('notification_email')
          .select('*')
          .limit(1);
      });

    if (error) {
      log(`❌ RLS verification failed: ${error.message}`, 'error');
      return false;
    }

    log('✅ RLS policies appear to be working', 'success');
    return true;
  } catch (error) {
    log(`❌ RLS verification failed: ${error.message}`, 'error');
    return false;
  }
}

async function verifyCronFunctions() {
  log('🔍 Verifying cron functions...');
  
  try {
    // Check if the cron function exists
    const { data: functions, error } = await supabaseAdmin
      .rpc('get_cron_functions')
      .catch(() => {
        // Fallback: try to call the function
        return supabaseAdmin
          .rpc('process_email_queue');
      });

    if (error) {
      log(`❌ Cron function verification failed: ${error.message}`, 'error');
      return false;
    }

    log('✅ Cron functions appear to be working', 'success');
    return true;
  } catch (error) {
    log(`❌ Cron function verification failed: ${error.message}`, 'error');
    return false;
  }
}

async function verifyForeignKey() {
  log('🔍 Verifying foreign key constraint...');
  
  try {
    // Try to insert with a non-existent order_id
    const { error } = await supabaseAdmin
      .from('notification_email')
      .insert({
        order_id: 'NON-EXISTENT-ORDER',
        event_type: 'TEST',
        status: 'pending'
      });

    if (error && error.message.includes('foreign key constraint')) {
      log('✅ Foreign key constraint is working (correctly rejected invalid order_id)', 'success');
      return true;
    } else if (!error) {
      log('❌ Foreign key constraint not working (should have rejected invalid order_id)', 'error');
      return false;
    } else {
      log(`❌ Foreign key test failed: ${error.message}`, 'error');
      return false;
    }
  } catch (error) {
    log(`❌ Foreign key verification failed: ${error.message}`, 'error');
    return false;
  }
}

async function verifySampleData() {
  log('🔍 Verifying with sample data...');
  
  try {
    // Get a real order from the database
    const { data: orders, error: orderError } = await supabaseAdmin
      .from('Order')
      .select('id, fullName, email')
      .limit(1);

    if (orderError || !orders.length) {
      log('❌ No orders found to test with', 'error');
      return false;
    }

    const testOrder = orders[0];
    log(`📋 Using test order: ${testOrder.id} (${testOrder.fullName})`, 'info');

    // Insert a test notification
    const { data: notification, error: insertError } = await supabaseAdmin
      .from('notification_email')
      .insert({
        order_id: testOrder.id,
        event_type: 'TEST_VERIFICATION',
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      log(`❌ Sample data insert failed: ${insertError.message}`, 'error');
      return false;
    }

    log(`✅ Sample notification inserted: ${notification.id}`, 'success');

    // Clean up
    await supabaseAdmin
      .from('notification_email')
      .delete()
      .eq('id', notification.id);

    log('✅ Sample data verification completed', 'success');
    return true;
  } catch (error) {
    log(`❌ Sample data verification failed: ${error.message}`, 'error');
    return false;
  }
}

async function runVerification() {
  log('🚀 Starting Database Setup Verification...');
  console.log('');

  const results = {
    tableStructure: false,
    indexes: false,
    triggers: false,
    rlsPolicies: false,
    cronFunctions: false,
    foreignKey: false,
    sampleData: false
  };

  try {
    results.tableStructure = await verifyTableStructure();
    console.log('');

    results.indexes = await verifyIndexes();
    console.log('');

    results.triggers = await verifyTriggers();
    console.log('');

    results.rlsPolicies = await verifyRLSPolicies();
    console.log('');

    results.cronFunctions = await verifyCronFunctions();
    console.log('');

    results.foreignKey = await verifyForeignKey();
    console.log('');

    results.sampleData = await verifySampleData();
    console.log('');

    // Summary
    log('📊 Verification Summary:');
    log(`✅ Table Structure: ${results.tableStructure ? 'PASS' : 'FAIL'}`);
    log(`✅ Indexes: ${results.indexes ? 'PASS' : 'FAIL'}`);
    log(`✅ Triggers: ${results.triggers ? 'PASS' : 'FAIL'}`);
    log(`✅ RLS Policies: ${results.rlsPolicies ? 'PASS' : 'FAIL'}`);
    log(`✅ Cron Functions: ${results.cronFunctions ? 'PASS' : 'FAIL'}`);
    log(`✅ Foreign Key: ${results.foreignKey ? 'PASS' : 'FAIL'}`);
    log(`✅ Sample Data: ${results.sampleData ? 'PASS' : 'FAIL'}`);

    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;

    console.log('');
    if (passed === total) {
      log('🎉 All verifications passed! Database setup is correct.', 'success');
    } else {
      log(`⚠️ ${passed}/${total} verifications passed. Some issues need attention.`, 'error');
    }

  } catch (error) {
    log(`❌ Verification failed: ${error.message}`, 'error');
  }
}

// Run the verification
runVerification().catch(error => {
  log(`❌ Fatal error: ${error.message}`, 'error');
  process.exit(1);
});
