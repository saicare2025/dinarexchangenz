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
