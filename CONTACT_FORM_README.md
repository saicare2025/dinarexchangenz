# Contact Form Implementation

This document describes the comprehensive contact form backend implementation for the Dinar Exchange NZ website.

## Overview

The contact form system provides:
- Secure form submission with validation
- Database storage in Supabase
- Dual email notifications (user acknowledgment + internal alert)
- Rate limiting and abuse protection
- Honeypot spam protection
- Comprehensive error handling

## Architecture

### Files Structure
```
lib/
├── validation/contactForm.js        # Zod validation schemas
├── utils/rateLimit.js              # Rate limiting utility
├── email/templates/contactForm.js  # Email templates
└── client/contactForm.js           # Client-side helper functions

app/
├── api/contact/route.js            # Main API endpoint (uses direct env vars)
└── contact/page.js                 # Updated contact page with form integration
```

### Database Schema
```sql
create table public."ContactForm" (
  id text not null,
  "fullName" text not null,
  email text not null,
  phone text not null,
  message text not null,
  "createdAt" timestamp without time zone not null default CURRENT_TIMESTAMP,
  constraint ContactForm_pkey primary key (id)
) TABLESPACE pg_default;
```

## Setup Instructions

### 1. Environment Variables

Copy the variables from `env-template.txt` to your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
SMTP_FROM=your_email@gmail.com

# Contact Form Configuration
ALERT_TO=alerts@dinarexchange.co.nz
ALLOWED_LOGIN_HOSTS=https://www.dinarexchange.co.nz,https://dinarexchange.co.nz

# Rate Limiting (optional - defaults to 5/min, 50/day)
RATE_LIMIT_PER_MINUTE=5
RATE_LIMIT_PER_DAY=50
```

### 2. Database Setup

Ensure the `ContactForm` table exists in your Supabase database:

```sql
create table public."ContactForm" (
  id text not null,
  "fullName" text not null,
  email text not null,
  phone text not null,
  message text not null,
  "createdAt" timestamp without time zone not null default CURRENT_TIMESTAMP,
  constraint ContactForm_pkey primary key (id)
) TABLESPACE pg_default;
```

### 3. Dependencies

Install required packages:

```bash
npm install zod uuid
```

## API Endpoint

### POST /api/contact

**Request Format:**
- Content-Type: `multipart/form-data`
- Method: `POST`

**Required Fields:**
- `fullName`: string (2-120 chars, letters + spaces)
- `email`: string (valid email format)
- `phone`: string (normalized to E.164 format)
- `message`: string (10-5000 chars)

**Optional Fields:**
- `website`: string (honeypot field, should be empty)
- `captchaToken`: string (optional CAPTCHA token)

**Success Response (200):**
```json
{
  "ok": true,
  "id": "uuid-v4-string",
  "emailDelivery": "ok" | "partial" | "failed",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

**Error Responses:**

Validation Error (400):
```json
{
  "ok": false,
  "code": "VALIDATION_ERROR",
  "issues": [
    {
      "path": ["fullName"],
      "message": "Name must be at least 2 characters"
    }
  ]
}
```

Rate Limit Exceeded (429):
```json
{
  "ok": false,
  "code": "RATE_LIMIT_EXCEEDED"
}
```

## Client-Side Integration

### Basic Usage

```javascript
import { submitContactForm, mapValidationErrors, getErrorMessage } from '@/lib/client/contactForm';

try {
  const result = await submitContactForm({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+64212345678',
    message: 'I would like to inquire about Iraqi Dinar exchange rates.',
    website: '', // honeypot field (hidden from users)
  });
  
  console.log('Success:', result);
  
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    const fieldErrors = mapValidationErrors(error.details);
    // Handle field-specific errors
  } else {
    console.error(getErrorMessage(error));
  }
}
```

### Form Integration Example

```javascript
const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  phone: '',
  message: '',
  website: '', // honeypot
});

const [fieldErrors, setFieldErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const result = await submitContactForm(formData);
    // Handle success
  } catch (error) {
    if (error.code === 'VALIDATION_ERROR') {
      setFieldErrors(mapValidationErrors(error.details));
    }
    // Handle other errors
  } finally {
    setIsSubmitting(false);
  }
};
```

## Security Features

### 1. Rate Limiting
- Per-minute limit: 5 requests (configurable via RATE_LIMIT_PER_MINUTE)
- Per-day limit: 50 requests (configurable via RATE_LIMIT_PER_DAY)
- IP-based tracking with automatic cleanup

### 2. Origin Validation
- Only allows requests from configured domains (ALLOWED_LOGIN_HOSTS)
- Prevents cross-site form submissions

### 3. Honeypot Protection
- Hidden `website` field that should remain empty
- Bots that fill this field are rejected

### 4. Input Validation
- Strong Zod schema validation
- Phone number normalization to E.164 format
- XSS protection through content sanitization

### 5. Duplicate Detection
- Prevents duplicate submissions within 2 minutes
- Based on email + name + message hash

## Email Templates

### User Acknowledgment Email
- Branded with Dinar Exchange NZ styling
- Includes message excerpt and contact information
- Privacy notice and response time expectations

### Internal Alert Email
- Complete submission details in tabular format
- Request metadata (IP, User Agent, Origin)
- Quick action buttons for reply/call
- Partially masked phone number for privacy

## Error Handling

### Client-Side Error Types
- `VALIDATION_ERROR`: Form validation failed
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `DUPLICATE_SUBMISSION`: Duplicate detected
- `NETWORK_ERROR`: Connection issues
- `SERVER_ERROR`: Server-side errors

### Server-Side Logging
- Structured logging at each step
- PII redaction in logs (masked phone numbers)
- Performance timing for monitoring

## Testing

### Manual Testing
1. Submit valid form data
2. Test validation errors (invalid email, short name, etc.)
3. Test rate limiting (submit multiple times quickly)
4. Test honeypot (fill the hidden website field)
5. Verify emails are sent correctly

### Automated Testing
```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/contact \
  -F "fullName=Test User" \
  -F "email=test@example.com" \
  -F "phone=+64212345678" \
  -F "message=Test message"
```

## Monitoring

### Key Metrics to Monitor
- Form submission success rate
- Email delivery success rate
- Rate limit hits
- Validation error frequency
- Response times

### Log Analysis
Look for these log patterns:
- `📧 Contact Form VALIDATED`
- `📧 Contact Form STORED`
- `📧 Contact Form EMAILS_SENT`
- `🚫 Rate limit exceeded`
- `❌ Validation failed`

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check SMTP configuration
   - Verify SMTP credentials
   - Check firewall/network restrictions

2. **Database errors**
   - Verify Supabase connection
   - Check table schema matches
   - Ensure service role key has write permissions

3. **Rate limiting too aggressive**
   - Adjust `RATE_LIMIT_PER_MINUTE` and `RATE_LIMIT_PER_DAY`
   - Check for proxy/CDN affecting IP detection

4. **Validation errors**
   - Review Zod schema in `lib/validation/contactForm.js`
   - Check client-side form field names match API expectations

### Debug Mode
Enable detailed logging by setting `NODE_ENV=development` in your environment.

## Production Considerations

1. **Rate Limiting**: Consider using Redis for distributed rate limiting
2. **Email Queue**: Implement email queuing for high-volume scenarios
3. **Monitoring**: Add application performance monitoring (APM)
4. **Backup**: Implement database backup strategy
5. **SSL**: Ensure HTTPS is enforced in production

## Support

For issues or questions about the contact form implementation:
1. Check the logs for error details
2. Verify environment configuration
3. Test with minimal data to isolate issues
4. Review this documentation for common solutions
