# Contact Form Quick Setup Guide

This guide will help you get the contact form up and running quickly.

## Prerequisites

1. **Supabase Project**: You need a Supabase project with the `ContactForm` table
2. **SMTP Server**: Configured email server (Gmail, SendGrid, etc.)
3. **Environment Variables**: All required environment variables set

## Step 1: Database Setup

Run this SQL in your Supabase SQL editor:

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

## Step 2: Environment Configuration

Copy these variables to your `.env.local` file:

```bash
# Supabase (get from your Supabase project settings)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# SMTP Configuration (example for Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
SMTP_FROM=your_email@gmail.com

# Contact Form Settings
ALERT_TO=alerts@dinarexchange.co.nz
ALLOWED_LOGIN_HOSTS=https://www.dinarexchange.co.nz,https://dinarexchange.co.nz

# Rate Limiting (optional - defaults to 5/min, 50/day)
RATE_LIMIT_PER_MINUTE=5
RATE_LIMIT_PER_DAY=50
```

### Gmail Setup (if using Gmail SMTP)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use the generated password as `SMTP_PASS`

## Step 3: Install Dependencies

```bash
npm install zod uuid
```

## Step 4: Test the Implementation

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Run the test suite:
   ```bash
   npm run test:contact-form
   ```

3. Visit the contact page at `http://localhost:3000/contact`

## Step 5: Verify Everything Works

### Manual Testing

1. **Submit a valid form**:
   - Fill out all fields correctly
   - Submit the form
   - Check for success message
   - Verify emails are sent

2. **Test validation**:
   - Try submitting with invalid email
   - Try submitting with short name/message
   - Verify error messages appear

3. **Test rate limiting**:
   - Submit the form multiple times quickly
   - Should get rate limited after 5 submissions

### Check Logs

Look for these log messages in your terminal:

```
📧 Contact Form VALIDATED
📧 Contact Form STORED
📧 Contact Form EMAILS_SENT
✅ Contact form processed successfully in XXXms
```

## Troubleshooting

### Common Issues

**"Environment validation failed"**
- Check all required environment variables are set
- Verify SMTP credentials are correct

**"Database error"**
- Ensure the `ContactForm` table exists in Supabase
- Check your service role key has write permissions

**"Emails not sending"**
- Verify SMTP configuration
- Check firewall/network restrictions
- Test SMTP credentials manually

**"Rate limiting too aggressive"**
- Adjust `RATE_LIMIT_PER_MINUTE` and `RATE_LIMIT_PER_DAY`
- Check if you're behind a proxy/CDN

### Debug Mode

Enable detailed logging by setting `NODE_ENV=development` in your environment.

## Production Deployment

1. **Environment Variables**: Set all environment variables in your production environment
2. **Database**: Ensure the `ContactForm` table exists in production Supabase
3. **SMTP**: Use a production SMTP service (SendGrid, AWS SES, etc.)
4. **Rate Limiting**: Consider using Redis for distributed rate limiting
5. **Monitoring**: Set up logging and monitoring for the contact form

## Support

If you encounter issues:

1. Check the logs for error details
2. Verify environment configuration
3. Test with the provided test script
4. Review the full documentation in `CONTACT_FORM_README.md`

## Files Created/Modified

- `lib/validation/contactForm.js` - Validation schemas
- `lib/utils/rateLimit.js` - Rate limiting utility
- `lib/email/templates/contactForm.js` - Email templates
- `lib/client/contactForm.js` - Client-side helper
- `app/api/contact/route.js` - API endpoint (uses direct env vars)
- `app/contact/page.js` - Updated contact page
- `scripts/test-contact-form.js` - Test script
- `CONTACT_FORM_README.md` - Full documentation
- `env-template.txt` - Environment template

The contact form is now ready to use! 🎉
