export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/transporter";
import { tplMissing, tplStatusUpdate, tplTracking, tplCompleted } from "@/lib/email/templates";

export async function POST() {
  try {
    console.log('🎨 Testing Professional Email Templates...');

    // Sample order data
    const sampleOrder = {
      id: 'ORD-1756038634894',
      fullName: 'MD. NAHID FERDOUS PRIOM',
      email: 'nahid.priom.06@gmail.com',
      status: 'ready_to_ship'
    };

    const results = [];

    // Test 1: Missing ID Template
    console.log('1️⃣ Testing Missing ID Template...');
    try {
      const missingIdEmail = tplMissing('ID', sampleOrder);
      await sendEmail({
        to: 'nahid.priom.06@gmail.com',
        subject: missingIdEmail.subject,
        html: missingIdEmail.html,
        text: missingIdEmail.text
      });
      results.push({ template: 'Missing ID', success: true });
      console.log('✅ Missing ID email sent successfully!');
    } catch (error) {
      results.push({ template: 'Missing ID', success: false, error: error.message });
      console.log('❌ Missing ID email failed:', error.message);
    }

    // Test 2: Missing Payment Template
    console.log('2️⃣ Testing Missing Payment Template...');
    try {
      const missingPaymentEmail = tplMissing('Payment', sampleOrder);
      await sendEmail({
        to: 'nahid.priom.06@gmail.com',
        subject: missingPaymentEmail.subject,
        html: missingPaymentEmail.html,
        text: missingPaymentEmail.text
      });
      results.push({ template: 'Missing Payment', success: true });
      console.log('✅ Missing Payment email sent successfully!');
    } catch (error) {
      results.push({ template: 'Missing Payment', success: false, error: error.message });
      console.log('❌ Missing Payment email failed:', error.message);
    }

    // Test 3: Status Update Template
    console.log('3️⃣ Testing Status Update Template...');
    try {
      const statusUpdateEmail = tplStatusUpdate(sampleOrder, 'Processing', 'TRK123456789');
      await sendEmail({
        to: 'nahid.priom.06@gmail.com',
        subject: statusUpdateEmail.subject,
        html: statusUpdateEmail.html,
        text: statusUpdateEmail.text
      });
      results.push({ template: 'Status Update', success: true });
      console.log('✅ Status Update email sent successfully!');
    } catch (error) {
      results.push({ template: 'Status Update', success: false, error: error.message });
      console.log('❌ Status Update email failed:', error.message);
    }

    // Test 4: Tracking Template
    console.log('4️⃣ Testing Tracking Template...');
    try {
      const trackingEmail = tplTracking(sampleOrder, 'TRK123456789', false);
      await sendEmail({
        to: 'nahid.priom.06@gmail.com',
        subject: trackingEmail.subject,
        html: trackingEmail.html,
        text: trackingEmail.text
      });
      results.push({ template: 'Tracking', success: true });
      console.log('✅ Tracking email sent successfully!');
    } catch (error) {
      results.push({ template: 'Tracking', success: false, error: error.message });
      console.log('❌ Tracking email failed:', error.message);
    }

    // Test 5: Completed Template
    console.log('5️⃣ Testing Completed Template...');
    try {
      const completedEmail = tplCompleted(sampleOrder, '3-5 business days');
      await sendEmail({
        to: 'nahid.priom.06@gmail.com',
        subject: completedEmail.subject,
        html: completedEmail.html,
        text: completedEmail.text
      });
      results.push({ template: 'Completed', success: true });
      console.log('✅ Completed email sent successfully!');
    } catch (error) {
      results.push({ template: 'Completed', success: false, error: error.message });
      console.log('❌ Completed email failed:', error.message);
    }

    // Summary
    const passed = results.filter(r => r.success).length;
    const total = results.length;

    console.log('📊 Test Results Summary:');
    results.forEach(result => {
      const status = result.success ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${result.template}`);
    });

    return NextResponse.json({
      success: true,
      message: 'Professional email templates test completed',
      results: results,
      summary: {
        passed,
        total,
        allPassed: passed === total
      },
      features: [
        'Professional gradient header with Dinar Exchange branding',
        'Responsive design that works on all devices',
        'Color-coded status indicators (urgent, info, success)',
        'Attractive call-to-action buttons',
        'Professional footer with contact information',
        'Clean typography and spacing',
        'Mobile-friendly layout'
      ]
    });

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
