# Email Worker Testing Guide

This guide provides comprehensive testing instructions for the Dinar Exchange Email Worker system.

## 🚀 Quick Start Testing

### **Option 1: Simple JavaScript Testing (Recommended)**

```bash
# Make sure your environment variables are set
set CRON_SECRET=your_secret_here
set TEST_ORDER_ID=your-test-order-id

# Run the simple test script
npm run test:email-worker
```

### **Option 2: Advanced JavaScript Testing**

```bash
# Install node-fetch if not already installed
npm install node-fetch

# Run the comprehensive JavaScript test
npm run test:email-worker:simple
```

### **Option 3: Manual Testing**

```bash
# Test the worker endpoint directly
curl -X POST http://localhost:3000/api/internal/email-worker \
  -H "x-cron-secret: your_secret_here"

# Enqueue a test email
curl -X POST http://localhost:3000/api/internal/email-worker/test \
  -H "Content-Type: application/json" \
  -d '{"order_id": "test-order-123", "event_type": "STATUS_UPDATE"}'
```

## 📋 Prerequisites

### **1. Environment Variables**

Make sure these environment variables are set in your `.env.local` file:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dinars@dinarexchange.co.nz
SMTP_PASS=your_gmail_app_password
SMTP_FROM="Dinarexchange Orders <dinars@dinarexchange.co.nz>"
ALERT_TO=dinars@dinarexchange.co.nz

# Application
APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Security
CRON_SECRET=your_test_secret

# Testing
TEST_ORDER_ID=your-test-order-id
```

### **2. Database Setup**

Ensure the `notification_email` table exists in your Supabase database:

```sql
-- Run this in your Supabase SQL editor
CREATE TABLE IF NOT EXISTS public.notification_email (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public."Order"(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  to_email TEXT,
  subject TEXT,
  html TEXT,
  text TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sending', 'sent', 'failed')),
  attempts INTEGER DEFAULT 0,
  error TEXT,
  locked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **3. Test Order**

Create a test order in your database or use an existing order ID:

```sql
-- Insert a test order (if needed)
INSERT INTO public."Order" (id, "fullName", email, status) 
VALUES ('test-order-123', 'Test User', 'test@example.com', 'pending');
```

## 🧪 Testing Scenarios

### **1. Basic Functionality Tests**

#### **Test Environment Variables**
```bash
# Check if all required variables are set
npm run test:email-worker
```

**Expected Result:** All environment variables should be marked as "set"

#### **Test API Security**
```bash
# Test unauthorized access
curl -X POST http://localhost:3000/api/internal/email-worker

# Test authorized access
curl -X POST http://localhost:3000/api/internal/email-worker \
  -H "x-cron-secret: your_secret_here"
```

**Expected Results:**
- Unauthorized: `401 Unauthorized`
- Authorized: `200 OK` with JSON response

### **2. Email Queueing Tests**

#### **Test Different Event Types**
```bash
# Test each event type
curl -X POST http://localhost:3000/api/internal/email-worker/test \
  -H "Content-Type: application/json" \
  -d '{"order_id": "test-order-123", "event_type": "STATUS_UPDATE"}'

curl -X POST http://localhost:3000/api/internal/email-worker/test \
  -H "Content-Type: application/json" \
  -d '{"order_id": "test-order-123", "event_type": "MISSING_ID"}'

curl -X POST http://localhost:3000/api/internal/email-worker/test \
  -H "Content-Type: application/json" \
  -d '{"order_id": "test-order-123", "event_type": "ORDER_COMPLETED"}'
```

**Expected Result:** Each request should return `200 OK` with a job ID

### **3. Email Processing Tests**

#### **Process Queued Emails**
```bash
# Process all pending emails
curl -X POST http://localhost:3000/api/internal/email-worker \
  -H "x-cron-secret: your_secret_here" \
  -H "Content-Type: application/json"
```

**Expected Result:** JSON response like `{"picked": 3, "sent": 2, "failed": 1}`

### **4. Error Handling Tests**

#### **Test Invalid Inputs**
```bash
# Test invalid event type
curl -X POST http://localhost:3000/api/internal/email-worker/test \
  -H "Content-Type: application/json" \
  -d '{"order_id": "test-order-123", "event_type": "INVALID_EVENT"}'

# Test missing required fields
curl -X POST http://localhost:3000/api/internal/email-worker/test \
  -H "Content-Type: application/json" \
  -d '{"order_id": "test-order-123"}'
```

**Expected Results:**
- Invalid event: `400 Bad Request` or `500 Internal Server Error`
- Missing fields: `400 Bad Request`

## 📊 Verification Steps

### **1. Check Database**

```sql
-- Check email queue status
SELECT 
  event_type,
  status,
  COUNT(*) as count,
  MIN(created_at) as oldest,
  MAX(created_at) as newest
FROM notification_email 
GROUP BY event_type, status
ORDER BY event_type, status;

-- Check for errors
SELECT * FROM notification_email 
WHERE error IS NOT NULL 
ORDER BY created_at DESC;
```

### **2. Check Email Delivery**

1. **Check your Gmail inbox** for test emails
2. **Check the ALERT_TO email** for BCC copies
3. **Verify email content** matches the event type
4. **Check email headers** for proper sender information

### **3. Check Application Logs**

```bash
# Monitor Next.js console output
npm run dev

# Look for these log messages:
# - "Processing jobs: X"
# - "Email sent successfully"
# - "Email processing completed"
```

## 🔧 Troubleshooting

### **Common Issues**

#### **1. SMTP Authentication Failed**
```
Error: Invalid login
```
**Solution:**
- Verify Gmail app password is correct
- Ensure 2FA is enabled on Gmail account
- Check SMTP settings in environment variables

#### **2. Database Connection Issues**
```
Error: relation "notification_email" does not exist
```
**Solution:**
- Run the database migration script
- Check Supabase service role key
- Verify table permissions

#### **3. Order Not Found**
```
Error: Order with ID 'test-order-123' not found
```
**Solution:**
- Create a test order in your database
- Use an existing order ID
- Check the ORDER_TABLE_NAME environment variable

#### **4. Unauthorized Access**
```
Error: 401 Unauthorized
```
**Solution:**
- Check CRON_SECRET environment variable
- Ensure the secret matches in your request headers
- Verify the secret is the same as used in Supabase

### **Debug Mode**

Enable debug logging by modifying the worker route:

```javascript
// In app/api/internal/email-worker/route.js
console.log('Processing jobs:', jobs.length);
console.log('Job details:', job);
console.log('Order details:', order);
```

## 📈 Performance Testing

### **Load Testing**

```bash
# Test with multiple emails
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/internal/email-worker/test \
    -H "Content-Type: application/json" \
    -d "{\"order_id\": \"test-order-$i\", \"event_type\": \"STATUS_UPDATE\"}"
done

# Process all emails
curl -X POST http://localhost:3000/api/internal/email-worker \
  -H "x-cron-secret: your_secret_here"
```

### **Monitoring Performance**

```sql
-- Check processing times
SELECT 
  event_type,
  status,
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_processing_time_seconds,
  COUNT(*) as count
FROM notification_email 
WHERE status IN ('sent', 'failed')
GROUP BY event_type, status;
```

## 🎯 Success Criteria

Your email worker system is working correctly if:

✅ **All environment variables are set**  
✅ **API security returns 401 for unauthorized requests**  
✅ **API security returns 200 for authorized requests**  
✅ **Email queueing creates jobs with valid IDs**  
✅ **Email processing sends emails successfully**  
✅ **Emails are delivered to the correct recipients**  
✅ **Database status is updated correctly**  
✅ **Error handling works for invalid inputs**  
✅ **Retry logic works for failed emails**  

## 📞 Support

If you encounter issues:

1. **Check the troubleshooting section above**
2. **Review the application logs**
3. **Verify all environment variables**
4. **Test with the provided scripts**
5. **Check database connectivity and permissions**

The testing scripts will help you identify exactly where any issues occur in your email worker system.
