# 🚀 ElevenLabs Integration - Quick Start

## Option 1: Interactive Setup (Recommended)

Run the interactive setup script:

```bash
npm run setup:elevenlabs
```

This will guide you through entering your credentials step by step.

## Option 2: Manual Setup

1. **Copy the template**:
   ```bash
   copy env-template.txt .env.local
   ```

2. **Edit `.env.local`** with your actual values:
   ```env
   # ElevenLabs Configuration
   ELEVENLABS_API_KEY=your_actual_api_key
   ELEVENLABS_TOOL_SECRET=your_actual_tool_secret
   NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_actual_agent_id

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
   ```

## Get Your Credentials

### ElevenLabs
1. Go to [ElevenLabs Dashboard](https://elevenlabs.io/)
2. Create a Conversational AI Agent
3. Get API Key: Profile → API Key
4. Get Agent ID: From your agent settings
5. Get Tool Secret: From agent configuration

### Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy Project URL, Anon Key, and Service Role Key

## Test the Integration

```bash
# Test the setup
npm run test:elevenlabs

# Start development server
npm run dev

# Visit test page
http://localhost:3000/test-elevenlabs
```

## What You'll See

✅ **Floating chat widget** in bottom-right corner  
✅ **Order creation** when sessions start  
✅ **Order updates** on payment events  
✅ **Database integration** with your existing triggers  
✅ **Test page** for debugging and verification  

## Need Help?

- 📖 **Setup Guide**: `ELEVENLABS_SETUP_GUIDE.md`
- 📚 **Full Documentation**: `ELEVENLABS_INTEGRATION.md`
- 🧪 **Test Page**: `/test-elevenlabs`

## Troubleshooting

**"supabaseUrl is required" Error**
- Make sure `.env.local` exists and has the correct values
- Check that `NEXT_PUBLIC_SUPABASE_URL` is set correctly

**Widget not appearing**
- Verify `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is set
- Check browser console for errors

**Database errors**
- Ensure your Supabase credentials are correct
- Verify the Order table exists with the correct schema
