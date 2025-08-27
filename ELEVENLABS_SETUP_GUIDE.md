# ElevenLabs Integration Setup Guide

## Step 1: Get ElevenLabs Credentials

1. **Sign up/Login** to [ElevenLabs](https://elevenlabs.io/)
2. **Create an Agent** in the Conversational AI section
3. **Get your credentials**:
   - API Key: Go to Profile → API Key
   - Agent ID: Copy from your agent settings
   - Tool Secret: Available in agent configuration

## Step 2: Get Supabase Credentials

1. **Go to your Supabase project**: https://supabase.com/dashboard
2. **Navigate to Settings → API**
3. **Copy the following**:
   - Project URL (looks like: `https://your-project-id.supabase.co`)
   - Anon/Public Key
   - Service Role Key (keep this secret!)

## Step 3: Create Environment File

1. **Copy the template**:
   ```bash
   cp env-template.txt .env.local
   ```

2. **Edit `.env.local`** and replace the placeholder values:
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

## Step 4: Test the Integration

1. **Run the test script**:
   ```bash
   npm run test:elevenlabs
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Visit the test page**: http://localhost:3000/test-elevenlabs

## Step 5: Verify Everything Works

✅ **Environment variables are set**  
✅ **Database connection works**  
✅ **Order creation/updates work**  
✅ **Widget appears on pages**  
✅ **Event handling works**  

## Troubleshooting

### "supabaseUrl is required" Error
- Make sure `NEXT_PUBLIC_SUPABASE_URL` is set in `.env.local`
- Check that the URL format is correct: `https://project-id.supabase.co`

### "Agent ID not found" Error
- Verify `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is set
- Check that the agent ID is correct in your ElevenLabs dashboard

### Database Connection Failed
- Verify your Supabase credentials
- Check that your project is active
- Ensure the Order table exists with the correct schema

### Widget Not Loading
- Check browser console for errors
- Verify the ElevenLabs script is loading
- Make sure your agent is published and active

## Security Notes

- ⚠️ **Never commit `.env.local` to version control**
- 🔒 **Keep your service role key secret**
- 🛡️ **Use environment variables for all sensitive data**

## Next Steps

Once everything is working:
1. Customize the widget styling
2. Configure your ElevenLabs agent
3. Test the full order workflow
4. Deploy to production

Need help? Check the main documentation: `ELEVENLABS_INTEGRATION.md`
