# Dinar Exchange NZ — SMTP Email Worker System

A robust email notification system that processes pending emails from a Supabase outbox table using a Node.js worker.

## Features

- **Reliable Email Processing**: Processes emails in batches with retry logic
- **Multiple Event Types**: Supports various order-related email notifications
- **SMTP Integration**: Uses Gmail SMTP with proper authentication
- **Error Handling**: Comprehensive error handling with retry mechanisms
- **Status Tracking**: Tracks email status (pending, sending, sent, failed)
- **Cron Compatible**: Easy integration with Vercel Cron or other schedulers

## Environment Variables

Add these environment variables to your deployment:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dinars@dinarexchange.co.nz
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD
SMTP_FROM="Dinarexchange Orders <dinars@dinarexchange.co.nz>"
ALERT_TO=dinars@dinarexchange.co.nz

# Application
APP_URL=https://your-nextjs-domain.com

# Supabase (existing)
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# Security
CRON_SECRET=PASTE_THE_SAME_SECRET_YOU_USED_IN_SUPABASE_SQL

# Optional: Set to "Order" if you don't have a lowercase "order" view
ORDER_TABLE_NAME=Order
```

## Database Schema

The system expects a `notification_email` table in your Supabase database:

```sql
CREATE TABLE public.notification_email (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public."Order"(id),
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

-- Index for performance
CREATE INDEX idx_notification_email_status ON public.notification_email(status, created_at);
CREATE INDEX idx_notification_email_order ON public.notification_email(order_id);
```

## Implementation Files

### Core Email System
- `lib/email/transporter.js` - SMTP connection and email sending
- `lib/email/templates.js` - Email templates for different event types
- `lib/email/queue.js` - Utility functions to enqueue emails

### API Endpoints
- `app/api/internal/email-worker/route.js` - Main worker endpoint
- `app/api/internal/email-worker/test/route.js` - Test endpoint for manual testing

### Updated Files
- `lib/supabase/admin.js` - Enhanced with worker headers

## Usage

### 1. Enqueue Emails

Use the queue utilities to add emails to the outbox:

```javascript
import { 
  enqueueStatusUpdate, 
  enqueueMissingId, 
  enqueueTrackingUpdate 
} from '@/lib/email/queue';

// Status update
await enqueueStatusUpdate(orderId);

// Missing ID notification
await enqueueMissingId(orderId);

// Tracking update
await enqueueTrackingUpdate(orderId, true); // true for update, false for new
```

### 2. Process Emails

The worker processes emails automatically when called:

```bash
# Manual trigger (requires x-cron-secret header)
curl -X POST https://your-domain.com/api/internal/email-worker \
  -H "x-cron-secret: YOUR_CRON_SECRET"

# Expected response
{ "picked": 5, "sent": 4, "failed": 1 }
```

### 3. Cron Setup (Supabase)

The system is configured to work with Supabase cron jobs. You can call the worker endpoint directly from your Supabase cron function:

```sql
-- Example Supabase cron function
SELECT net.http_post(
  url := 'https://your-domain.com/api/internal/email-worker',
  headers := '{"x-cron-secret": "' || current_setting('app.cron_secret') || '", "content-type": "application/json"}',
  body := '{}'
);
```

## Event Types

The system supports these event types:

- `MISSING_ID` - Customer needs to provide identification
- `MISSING_PAYMENT` - Customer needs to provide payment receipt
- `STATUS_UPDATE` - Order status has changed
- `TRACKING_ADDED` - Tracking number added to order
- `TRACKING_UPDATED` - Tracking number updated
- `ORDER_COMPLETED` - Order marked as completed

## Email Templates

Each event type has a corresponding template:

- **Missing ID/Payment**: Action required notifications
- **Status Updates**: Order status change notifications
- **Tracking**: Tracking number notifications
- **Completed**: Order completion with ETA

All emails include:
- Professional branding
- Order details and links
- Customer name personalization
- Internal BCC copy

## Error Handling

- **Retry Logic**: Failed emails are retried up to 3 times
- **Status Tracking**: Each attempt is tracked with timestamps
- **Error Logging**: Failed emails include error details
- **Graceful Degradation**: Email failures don't affect order processing

## Testing

### Manual Testing

1. Enqueue a test email:
```bash
curl -X POST https://your-domain.com/api/internal/email-worker/test \
  -H "Content-Type: application/json" \
  -d '{"order_id": "your-order-id", "event_type": "STATUS_UPDATE"}'
```

2. Process the email:
```bash
curl -X POST https://your-domain.com/api/internal/email-worker \
  -H "x-cron-secret: YOUR_CRON_SECRET"
```

3. Local testing with script:
```bash
chmod +x scripts/test-cron.sh
CRON_SECRET=YOUR_SECRET ./scripts/test-cron.sh
```

### Database Testing

Check email status in Supabase:
```sql
SELECT * FROM notification_email ORDER BY created_at DESC LIMIT 10;
```

## Integration Examples

### After Order Status Update

```javascript
// In your order update API
import { enqueueStatusUpdate } from '@/lib/email/queue';

// After successful order update
await enqueueStatusUpdate(orderId);

// Optionally trigger worker immediately
fetch(`${process.env.APP_URL}/api/internal/email-worker`, { 
  method: 'POST' 
}).catch(() => {});
```

### After Admin Actions

```javascript
// When admin marks ID as missing
await enqueueMissingId(orderId);

// When admin adds tracking
await enqueueTrackingUpdate(orderId, false);

// When admin completes order
await enqueueOrderCompleted(orderId);
```

## Monitoring

Monitor the system by checking:

1. **Email Status**: Query `notification_email` table
2. **Worker Logs**: Check Next.js API route logs
3. **SMTP Logs**: Monitor Gmail app password usage
4. **Error Rates**: Track failed vs sent emails
5. **Supabase Cron Logs**: Check cron job execution logs

## Security Notes

- All SMTP credentials are server-side only
- Uses Supabase Service Role for database access
- Environment variables are not exposed to client
- Email content is sanitized and escaped
- Worker endpoint requires `x-cron-secret` header for authentication
- Supabase cron jobs can include the secret header in HTTP requests

## Troubleshooting

### Common Issues

1. **SMTP Authentication Failed**
   - Verify Gmail app password is correct
   - Check 2FA is enabled on Gmail account

2. **Database Connection Issues**
   - Verify Supabase service role key
   - Check table permissions

3. **Emails Not Sending**
   - Check `notification_email` table exists
   - Verify order table name in env vars
   - Check worker endpoint is accessible

### Debug Mode

Add logging to the worker by modifying the route:

```javascript
console.log('Processing jobs:', jobs.length);
console.log('Job details:', job);
```

## Performance

- **Batch Size**: Processes up to 20 emails per run
- **Concurrency**: Sequential processing for reliability
- **Memory**: Minimal memory footprint
- **Timeout**: 30-second function timeout (Next.js default)

## Future Enhancements

- Email template customization
- Multiple SMTP providers
- Email analytics and tracking
- Webhook notifications
- Rate limiting and throttling
