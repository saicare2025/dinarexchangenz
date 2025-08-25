-- Create the notification_email table for email worker outbox
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

-- SMS outbox mirror
CREATE TABLE IF NOT EXISTS public.notification_sms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES public."Order"(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  to_number TEXT NOT NULL,
  body TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','sending','sent','failed')),
  attempts INTEGER DEFAULT 0,
  error TEXT,
  locked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notification_sms_status ON public.notification_sms(status, created_at);
CREATE INDEX IF NOT EXISTS idx_notification_sms_order ON public.notification_sms(order_id);

-- Fan-out trigger: whenever a notification_email is inserted with relevant event_type, insert SMS
CREATE OR REPLACE FUNCTION public.fanout_notification_sms()
RETURNS TRIGGER AS $$
DECLARE
  mobile TEXT;
BEGIN
  IF NEW.event_type IN ('MISSING_ID','MISSING_PAYMENT','STATUS_UPDATE','TRACKING_ADDED','TRACKING_UPDATED','ORDER_COMPLETED') THEN
    SELECT o."mobile" INTO mobile FROM public."Order" o WHERE o.id = NEW.order_id;
    IF mobile IS NOT NULL AND length(trim(mobile)) > 0 THEN
      INSERT INTO public.notification_sms(order_id, event_type, to_number, status)
      VALUES (NEW.order_id, NEW.event_type, mobile, 'pending');
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_fanout_notification_sms ON public.notification_email;
CREATE TRIGGER trg_fanout_notification_sms
AFTER INSERT ON public.notification_email
FOR EACH ROW EXECUTE FUNCTION public.fanout_notification_sms();

-- Create indexes for performance
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

-- Enable Row Level Security
ALTER TABLE public.notification_email ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Note: Since Order table doesn't have userId column, we'll allow service role only
-- Users can access notification emails through the service role API endpoints
CREATE POLICY "Service role can manage all notification emails" ON public.notification_email
    FOR ALL USING (auth.role() = 'service_role');
