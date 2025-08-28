import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { supabaseAdmin } from '../../../lib/supabase/admin.js';
import { sendEmail } from '../../../lib/email/transporter.js';

// Allowed origins from environment
const ALLOWED_ORIGINS = (process.env.ALLOWED_LOGIN_HOSTS || 'https://www.dinarexchange.co.nz,https://dinarexchange.co.nz')
  .split(',')
  .map(origin => origin.trim());

export async function POST(request) {
  try {
    // 1. Parse form data
    let formData;
    try {
      formData = await request.formData();
    } catch (error) {
      console.log('❌ Failed to parse form data:', error.message);
      return NextResponse.json(
        { ok: false, code: 'INVALID_REQUEST' },
        { status: 400 }
      );
    }
    
    const data = {
      fullName: formData.get('fullName') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      message: formData.get('message') || '',
    };
    
    console.log('📧 Contact Form Submission:', {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      messageLength: data.message.length,
    });
    
    // 2. Generate UUID for the contact form entry
    const id = uuidv4();
    
    // 3. Insert into database
    const { error: dbError } = await supabaseAdmin
      .from('ContactForm')
      .insert({
        id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });
    
    if (dbError) {
      console.error('❌ Database error:', dbError);
      return NextResponse.json(
        { ok: false, code: 'DATABASE_ERROR' },
        { status: 500 }
      );
    }
    
    console.log('✅ Contact form stored in database');
    
    // 4. Send emails
    let emailDelivery = 'ok';
    
    try {
      // User acknowledgment email
      const userEmailSubject = 'Thank you for contacting Dinar Exchange NZ';
      const userEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting us!</h2>
          <p>Dear ${data.fullName},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #ff6b35;">${data.message}</p>
          <p>Best regards,<br>The Dinar Exchange NZ Team</p>
        </div>
      `;
      const userEmailText = `
Thank you for contacting us!

Dear ${data.fullName},

We have received your message and will get back to you as soon as possible.

Your message:
${data.message}

Best regards,
The Dinar Exchange NZ Team
      `;
      
      await sendEmail({
        to: data.email,
        subject: userEmailSubject,
        html: userEmailHtml,
        text: userEmailText,
      });
      
      // Internal alert email with plain text email and phone
      const internalEmailSubject = `New Contact Form Submission from ${data.fullName}`;
      const internalEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #ff6b35;">${data.message}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-NZ')}</p>
        </div>
      `;
      const internalEmailText = `
New Contact Form Submission

Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}

Submitted: ${new Date().toLocaleString('en-NZ')}
      `;
      
      await sendEmail({
        to: process.env.ALERT_TO,
        subject: internalEmailSubject,
        html: internalEmailHtml,
        text: internalEmailText,
        replyTo: data.email,
      });
      
      console.log('✅ Emails sent successfully');
      
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      emailDelivery = 'failed';
    }
    
    // 5. Return success response
    console.log('✅ Contact form processed successfully');
    
    return NextResponse.json({
      ok: true,
      id,
      emailDelivery,
      createdAt: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ Unexpected error in contact form:', error);
    return NextResponse.json(
      { ok: false, code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.join(','),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
