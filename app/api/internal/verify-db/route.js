export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const results = {
    tableExists: false,
    columns: [],
    indexes: [],
    triggers: [],
    rlsPolicies: [],
    cronFunctions: [],
    sampleData: null,
    errors: []
  };

  try {
    // 1. Check if table exists and get columns
    try {
      const { data: columns, error } = await supabaseAdmin
        .from('notification_email')
        .select('*')
        .limit(1);

      if (!error) {
        results.tableExists = true;
        results.columns = Object.keys(columns[0] || {});
      } else {
        results.errors.push(`Table check failed: ${error.message}`);
      }
    } catch (error) {
      results.errors.push(`Table check error: ${error.message}`);
    }

    // 2. Test foreign key constraint
    try {
      const { error } = await supabaseAdmin
        .from('notification_email')
        .insert({
          order_id: 'NON-EXISTENT-ORDER-TEST',
          event_type: 'TEST',
          status: 'pending'
        });

      if (error && error.message.includes('foreign key constraint')) {
        results.foreignKeyWorking = true;
      } else if (!error) {
        results.foreignKeyWorking = false;
        results.errors.push('Foreign key constraint not working');
      } else {
        results.errors.push(`Foreign key test error: ${error.message}`);
      }
    } catch (error) {
      results.errors.push(`Foreign key test error: ${error.message}`);
    }

    // 3. Test trigger by inserting and updating
    try {
      // Get a real order for testing
      const { data: orders } = await supabaseAdmin
        .from('Order')
        .select('id')
        .limit(1);

      if (orders && orders.length > 0) {
        const testOrderId = orders[0].id;
        
        // Insert test record
        const { data: insertData, error: insertError } = await supabaseAdmin
          .from('notification_email')
          .insert({
            order_id: testOrderId,
            event_type: 'DB_VERIFICATION_TEST',
            status: 'pending'
          })
          .select()
          .single();

        if (!insertError && insertData) {
          results.sampleData = {
            id: insertData.id,
            order_id: insertData.order_id,
            created_at: insertData.created_at,
            updated_at: insertData.updated_at
          };

          // Test trigger by updating
          const { data: updateData, error: updateError } = await supabaseAdmin
            .from('notification_email')
            .update({ status: 'sent' })
            .eq('id', insertData.id)
            .select()
            .single();

          if (!updateError && updateData) {
            results.triggerWorking = updateData.updated_at > insertData.updated_at;
          }

          // Clean up
          await supabaseAdmin
            .from('notification_email')
            .delete()
            .eq('id', insertData.id);
        }
      }
    } catch (error) {
      results.errors.push(`Trigger test error: ${error.message}`);
    }

    // 4. Test cron function
    try {
      const { error } = await supabaseAdmin
        .rpc('process_email_queue');

      if (error) {
        results.cronFunctionExists = false;
        results.errors.push(`Cron function error: ${error.message}`);
      } else {
        results.cronFunctionExists = true;
      }
    } catch (error) {
      results.cronFunctionExists = false;
      results.errors.push(`Cron function test error: ${error.message}`);
    }

    // 5. Check for existing notifications
    try {
      const { data: notifications, error } = await supabaseAdmin
        .from('notification_email')
        .select('id, order_id, event_type, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error) {
        results.existingNotifications = notifications;
      }
    } catch (error) {
      results.errors.push(`Existing notifications check error: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Database verification completed',
      results: results,
      summary: {
        tableExists: results.tableExists,
        foreignKeyWorking: results.foreignKeyWorking,
        triggerWorking: results.triggerWorking,
        cronFunctionExists: results.cronFunctionExists,
        hasErrors: results.errors.length > 0,
        errorCount: results.errors.length
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      results: results
    }, { status: 500 });
  }
}
