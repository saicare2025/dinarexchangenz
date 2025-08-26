# ElevenLabs ConvAI Integration

AI-powered customer service widget for Dinar Exchange with secure order lookup capabilities.

## Quick Setup

1. **Run the setup script:**
   ```bash
   npm run setup:elevenlabs
   ```

2. **Configure your ElevenLabs agent:**
   - Go to [ElevenLabs ConvAI Dashboard](https://elevenlabs.io/convai)
   - Create/configure your agent
   - Add the webhook tool (see detailed guide below)

3. **Test the integration:**
   ```bash
   npm run test:elevenlabs
   ```

4. **Visit the test page:**
   - Go to `/test-elevenlabs` to test the widget

## What's Included

- ✅ **Secure API endpoints** with rate limiting and authorization
- ✅ **React widget component** with dynamic variables
- ✅ **Order lookup tool** for ElevenLabs agents
- ✅ **Test scripts** and validation
- ✅ **Production-ready** with HTTPS support

## Files Created

```
components/
├── ElevenLabsWidget.js          # React widget component

app/
├── api/internal/
│   ├── order-lookup/            # Secure order lookup endpoint
│   └── elevenlabs-signed-url/   # Private agent signed URL endpoint
├── test-elevenlabs/             # Test page for the integration
└── user/dashboard/              # Example integration

scripts/
├── setup-elevenlabs.js          # Setup and validation script
└── test-elevenlabs-integration.js # Integration tests

docs/
├── ELEVENLABS_INTEGRATION_GUIDE.md  # Complete setup guide
└── ELEVENLABS_README.md             # This file
```

## Environment Variables

```bash
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_TOOL_SECRET=your_long_random_secret
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id
```

## Usage

```jsx
import ElevenLabsWidget from '@/components/ElevenLabsWidget';

<ElevenLabsWidget
  agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}
  userEmail="customer@example.com"
  currentOrderId="ORDER-12345"
  position="bottom-right"
/>
```

## Security Features

- 🔒 **Bearer token authentication** for all API endpoints
- 🚦 **Rate limiting** (10 requests/minute per identifier)
- 🔐 **Server-only secrets** (no client exposure)
- 🛡️ **Input validation** and error handling
- 🔄 **Secret rotation** support

## Next Steps

1. Read the [Complete Integration Guide](ELEVENLABS_INTEGRATION_GUIDE.md)
2. Configure your ElevenLabs agent with the webhook tool
3. Test the integration thoroughly
4. Deploy to production with HTTPS

## Support

- **Integration issues**: Check the test scripts and logs
- **ElevenLabs issues**: Contact ElevenLabs support
- **Database issues**: Verify Supabase configuration
