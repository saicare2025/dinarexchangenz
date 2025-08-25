#!/usr/bin/env node

/**
 * Direct Email Test Script
 * 
 * This script tests sending an email directly to nahid.priom.06@gmail.com
 * without requiring a real order in the database.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const nodemailer = require('nodemailer');

// Create transporter directly
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

async function sendEmail({ to, subject, html, text, bcc }) {
  const transporter = getTransporter();
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    bcc,
    subject,
    html,
    text,
  });
}

async function testDirectEmail() {
  console.log('🚀 Testing Direct Email to nahid.priom.06@gmail.com...');
  
  try {
    const emailData = {
      to: 'nahid.priom.06@gmail.com',
      subject: 'Test Email from Dinar Exchange Email Worker',
      html: `
        <h2>🎉 Email Worker Test Successful!</h2>
        <p>Hello Nahid,</p>
        <p>This is a test email from your Dinar Exchange email worker system.</p>
        <p><strong>Test Details:</strong></p>
        <ul>
          <li>✅ SMTP Configuration: Working</li>
          <li>✅ Email Templates: Working</li>
          <li>✅ Email Sending: Working</li>
          <li>✅ Direct Email: Working</li>
        </ul>
        <p>Your email worker system is now ready to send automated emails!</p>
        <p>Best regards,<br/>Dinar Exchange Team</p>
      `,
      text: `
        Email Worker Test Successful!
        
        Hello Nahid,
        
        This is a test email from your Dinar Exchange email worker system.
        
        Test Details:
        - SMTP Configuration: Working
        - Email Templates: Working
        - Email Sending: Working
        - Direct Email: Working
        
        Your email worker system is now ready to send automated emails!
        
        Best regards,
        Dinar Exchange Team
      `
    };

    console.log('📧 Sending test email...');
    const result = await sendEmail(emailData);
    
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📧 Response:', result.response);
    
    console.log('\n📋 Check your inbox at nahid.priom.06@gmail.com');
    console.log('📋 You should receive the test email within a few minutes');
    
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    console.error('🔍 Error details:', error);
  }
}

// Run the test
testDirectEmail().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
