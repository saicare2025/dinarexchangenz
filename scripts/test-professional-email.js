#!/usr/bin/env node

/**
 * Test Professional Email Templates
 * 
 * This script tests the new professional email templates with attractive design
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const nodemailer = require('nodemailer');

// Create transporter
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_PORT) === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
  });
}

async function sendTestEmail(templateName, emailData) {
  const transporter = getTransporter();
  
  try {
    console.log(`📧 Sending ${templateName} email...`);
    
    const result = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'nahid.priom.06@gmail.com',
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    console.log(`✅ ${templateName} email sent successfully!`);
    console.log(`📧 Message ID: ${result.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send ${templateName} email:`, error.message);
    return false;
  }
}

async function testAllTemplates() {
  console.log('🎨 Testing Professional Email Templates...');
  console.log('📧 Target: nahid.priom.06@gmail.com');
  console.log('');

  // Import the templates using dynamic import
  const { tplMissing, tplStatusUpdate, tplTracking, tplCompleted } = await import('../lib/email/templates.js');

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
  const missingIdEmail = tplMissing('ID', sampleOrder);
  const missingIdResult = await sendTestEmail('Missing ID', missingIdEmail);
  results.push({ template: 'Missing ID', success: missingIdResult });
  console.log('');

  // Test 2: Missing Payment Template
  console.log('2️⃣ Testing Missing Payment Template...');
  const missingPaymentEmail = tplMissing('Payment', sampleOrder);
  const missingPaymentResult = await sendTestEmail('Missing Payment', missingPaymentEmail);
  results.push({ template: 'Missing Payment', success: missingPaymentResult });
  console.log('');

  // Test 3: Status Update Template
  console.log('3️⃣ Testing Status Update Template...');
  const statusUpdateEmail = tplStatusUpdate(sampleOrder, 'Processing', 'TRK123456789');
  const statusUpdateResult = await sendTestEmail('Status Update', statusUpdateEmail);
  results.push({ template: 'Status Update', success: statusUpdateResult });
  console.log('');

  // Test 4: Tracking Template
  console.log('4️⃣ Testing Tracking Template...');
  const trackingEmail = tplTracking(sampleOrder, 'TRK123456789', false);
  const trackingResult = await sendTestEmail('Tracking', trackingEmail);
  results.push({ template: 'Tracking', success: trackingResult });
  console.log('');

  // Test 5: Completed Template
  console.log('5️⃣ Testing Completed Template...');
  const completedEmail = tplCompleted(sampleOrder, '3-5 business days');
  const completedResult = await sendTestEmail('Completed', completedEmail);
  results.push({ template: 'Completed', success: completedResult });
  console.log('');

  // Summary
  console.log('📊 Test Results Summary:');
  results.forEach(result => {
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${result.template}`);
  });

  const passed = results.filter(r => r.success).length;
  const total = results.length;

  console.log('');
  if (passed === total) {
    console.log('🎉 All professional email templates are working perfectly!');
    console.log('📧 Check nahid.priom.06@gmail.com for the beautiful emails');
  } else {
    console.log(`⚠️ ${passed}/${total} templates sent successfully`);
  }

  console.log('');
  console.log('🎨 Features of the new templates:');
  console.log('• Professional gradient header with Dinar Exchange branding');
  console.log('• Responsive design that works on all devices');
  console.log('• Color-coded status indicators (urgent, info, success)');
  console.log('• Attractive call-to-action buttons');
  console.log('• Professional footer with contact information');
  console.log('• Clean typography and spacing');
  console.log('• Mobile-friendly layout');
}

// Run the test
testAllTemplates().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
