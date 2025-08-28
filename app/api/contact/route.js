import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';
import { validateContactForm } from '../../../lib/validation/contactForm.js';
import { rateLimiter } from '../../../lib/utils/rateLimit.js';
import { supabaseAdmin } from '../../../lib/supabase/admin.js';
import { sendEmail } from '../../../lib/email/transporter.js';
import { getUserEmailTemplate, getInternalAlertTemplate } from '../../../lib/email/templates/contactForm.js';

// Rate limiting configuration (declared directly in route)
const RATE_LIMIT_PER_MINUTE = parseInt(process.env.RATE_LIMIT_PER_MINUTE || '5', 10);
const RATE_LIMIT_PER_DAY = parseInt(process.env.RATE_LIMIT_PER_DAY || '50', 10);

// Allowed origins from environment
const ALLOWED_ORIGINS = (process.env.ALLOWED_LOGIN_HOSTS || 'https://www.dinarexchange.co.nz,https://dinarexchange.co.nz')
  .split(',')
  .map(origin => origin.trim());

// In-memory store for duplicate detection (in production, use Redis or similar)
const duplicateStore = new Map();

// Clean up duplicate store every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of duplicateStore.entries()) {
    if (now - timestamp > 120000) { // 2 minutes
      duplicateStore.delete(key);
    }
  }
}, 300000);

// Generate idempotency key for duplicate detection
function generateIdempotencyKey(data) {
  const payload = `${data.email}:${data.fullName}:${data.message}`;
  return createHash('sha256').update(payload).digest('hex');
}

// Check for duplicate submission
function isDuplicateSubmission(data) {
  const key = generateIdempotencyKey(data);
  const now = Date.now();
  
  if (duplicateStore.has(key)) {
    const timestamp = duplicateStore.get(key);
    if (now - timestamp < 120000) { // 2 minutes
      return true;
    }
  }
  
  duplicateStore.set(key, now);
  return false;
}

// Log structured data (redacting PII where appropriate)
function logContactSubmission(data, metadata, step) {
  const maskedPhone = data.phone.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{3})/, '$1***$3$4');
  
  console.log(`📧 Contact Form ${step}:`, {
    timestamp: new Date().toISOString(),
    step,
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: maskedPhone,
      messageLength: data.message.length,
    },
    metadata: {
      ip: metadata.ip,
      userAgent: metadata.userAgent?.substring(0, 100),
      origin: metadata.origin,
    }
  });
}

export async function POST(request) {
  const startTime = Date.now();
  
  try {
    // 1. Extract request metadata
    const ip = rateLimiter.getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const origin = request.headers.get('origin') || request.headers.get('referer') || 'unknown';
    
    const metadata = { ip, userAgent, origin };
    
    // 2. Rate limiting
    const isAllowed = rateLimiter.isAllowed(ip, {
      perMinute: RATE_LIMIT_PER_MINUTE,
      perDay: RATE_LIMIT_PER_DAY
    });
    
    if (!isAllowed) {
      const retryAfter = rateLimiter.getRetryAfter(ip);
      console.log(`🚫 Rate limit exceeded for IP: ${ip}`);
      
      return NextResponse.json(
        { ok: false, code: 'RATE_LIMIT_EXCEEDED' },
        { 
          status: 429,
          headers: { 'Retry-After': retryAfter.toString() }
        }
      );
    }
    
    // 3. Origin validation
    const isValidOrigin = ALLOWED_ORIGINS.some(allowedOrigin => 
      origin.includes(allowedOrigin.replace(/^https?:\/\//, ''))
    );
    
    if (!isValidOrigin && origin !== 'unknown') {
      console.log(`🚫 Invalid origin: ${origin}`);
      return NextResponse.json(
        { ok: false, code: 'INVALID_ORIGIN' },
        { status: 403 }
      );
    }
    
    // 4. Parse and validate form data
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
    
    const rawData = {
      fullName: formData.get('fullName') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      message: formData.get('message') || '',
      website: formData.get('website') || '', // honeypot
      captchaToken: formData.get('captchaToken') || '',
    };
    
    // 5. Validate data
    const validation = validateContactForm(rawData);
    
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.errors);
      return NextResponse.json(
        { 
          ok: false, 
          code: 'VALIDATION_ERROR',
          issues: validation.errors
        },
        { status: 400 }
      );
    }
    
    const validatedData = validation.data;
    logContactSubmission(validatedData, metadata, 'VALIDATED');
    
    // 6. Check for duplicate submission
    if (isDuplicateSubmission(validatedData)) {
      console.log('🔄 Duplicate submission detected');
      return NextResponse.json(
        { ok: false, code: 'DUPLICATE_SUBMISSION' },
        { status: 409 }
      );
    }
    
    // 7. Generate UUID for the contact form entry
    const id = uuidv4();
    
    // 8. Insert into database
    const { error: dbError } = await supabaseAdmin
      .from('ContactForm')
      .insert({
        id,
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
      });
    
    if (dbError) {
      console.error('❌ Database error:', dbError);
      return NextResponse.json(
        { ok: false, code: 'DATABASE_ERROR' },
        { status: 500 }
      );
    }
    
    logContactSubmission(validatedData, metadata, 'STORED');
    
    // 9. Send emails
    let emailDelivery = 'ok';
    const emailPromises = [];
    
    try {
      // User acknowledgment email
      const userEmail = getUserEmailTemplate(validatedData);
      emailPromises.push(
        sendEmail({
          to: validatedData.email,
          subject: userEmail.subject,
          html: userEmail.html,
          text: userEmail.text,
        }).catch(error => {
          console.error('❌ User email failed:', error);
          return { error: 'user_email_failed' };
        })
      );
      
      // Internal alert email
      const internalEmail = getInternalAlertTemplate(validatedData, metadata);
      emailPromises.push(
        sendEmail({
          to: process.env.ALERT_TO,
          subject: internalEmail.subject,
          html: internalEmail.html,
          text: internalEmail.text,
          replyTo: validatedData.email,
        }).catch(error => {
          console.error('❌ Internal email failed:', error);
          return { error: 'internal_email_failed' };
        })
      );
      
      // Wait for both emails
      const results = await Promise.allSettled(emailPromises);
      
      const userEmailResult = results[0];
      const internalEmailResult = results[1];
      
      if (userEmailResult.status === 'rejected' || internalEmailResult.status === 'rejected') {
        emailDelivery = 'partial';
      } else if (userEmailResult.value?.error || internalEmailResult.value?.error) {
        emailDelivery = 'partial';
      }
      
      logContactSubmission(validatedData, metadata, 'EMAILS_SENT');
      
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      emailDelivery = 'failed';
    }
    
    // 10. Return success response
    const responseTime = Date.now() - startTime;
    console.log(`✅ Contact form processed successfully in ${responseTime}ms`);
    
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
