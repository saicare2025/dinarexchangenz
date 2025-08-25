# Quick Setup Guide for Email Worker

## 🚀 **Step 1: Set Up Environment Variables**

Create or update your `.env.local` file with these variables:

```env
# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dinars@dinarexchange.co.nz
SMTP_PASS=your_gmail_app_password
SMTP_FROM="Dinarexchange Orders <dinars@dinarexchange.co.nz>"
ALERT_TO=dinars@dinarexchange.co.nz

# Application
APP_URL=http://localhost:3000

# Supabase (get these from your Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Security
CRON_SECRET=your_random_secret_here

# Testing
TEST_ORDER_ID=your-existing-order-id
```

## 🗄️ **Step 2: Set Up Database**

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the notification_email table
CREATE TABLE IF NOT EXISTS public.notification_email (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES public."Order"(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  to_email TEXT, -- Made nullable since it can be derived from order
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notification_email_status ON public.notification_email(status);
CREATE INDEX IF NOT EXISTS idx_notification_email_created_at ON public.notification_email(created_at);
CREATE INDEX IF NOT EXISTS idx_notification_email_order_id ON public.notification_email(order_id);
CREATE INDEX IF NOT EXISTS idx_notification_email_event_type ON public.notification_email(event_type);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_notification_email_updated_at 
    BEFORE UPDATE ON public.notification_email 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.notification_email TO authenticated;
GRANT ALL ON public.notification_email TO service_role;

-- Enable RLS
ALTER TABLE public.notification_email ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Note: Since Order table doesn't have userId column, we'll allow service role only
-- Users can access notification emails through the service role API endpoints
CREATE POLICY "Service role can manage all notification emails" ON public.notification_email
    FOR ALL USING (auth.role() = 'service_role');
```

## 🧪 **Step 3: Test the System**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Run the tests:**
   ```bash
   npm run test:email-worker:simple
   ```

3. **Expected Results:**
   - ✅ All environment variables should be set
   - ✅ API security should work (401 for unauthorized, 200 for authorized)
   - ✅ Email queueing should work
   - ✅ Email processing should work

## 📧 **Step 4: Set Up Gmail App Password**

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use that password in `SMTP_PASS`

## 🔄 **Step 5: Set Up Supabase Cron (Optional)**

In your Supabase dashboard, create a cron job:

```sql
-- Run every 2 minutes
SELECT cron.schedule(
  'email-worker',
  '*/2 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://your-domain.com/api/internal/email-worker',
    headers := '{"x-cron-secret": "' || current_setting('app.cron_secret') || '", "content-type": "application/json"}',
    body := '{}'
  );
  $$
);
```

## 🎯 **Step 6: Test with Real Data**

1. **Get a real order ID from your database:**
   ```sql
   SELECT id, "fullName", email FROM public."Order" LIMIT 1;
   ```

2. **Update your environment variable:**
   ```env
   TEST_ORDER_ID=your-real-order-id
   ```

3. **Test again:**
   ```bash
   npm run test:email-worker:simple
   ```

## ✅ **Success Criteria**

Your system is working when:
- ✅ All tests pass
- ✅ Emails are delivered to your inbox
- ✅ Database shows email status updates
- ✅ No errors in the console

## 🆘 **Need Help?**

1. Check the `TESTING_GUIDE.md` for detailed troubleshooting
2. Verify all environment variables are set
3. Make sure your Gmail app password is correct
4. Ensure the database table was created successfully
5. Check that your order ID exists in the database
