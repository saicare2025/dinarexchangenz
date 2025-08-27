# ElevenLabs Agent Testing Guide

## Overview

This guide helps you test your ElevenLabs agent's connection and database integration with your Supabase database.

## Prerequisites

1. **Valid ElevenLabs Agent ID** in `.env.local`
2. **Supabase Database** configured and accessible
3. **Order-lookup API** endpoint working
4. **Development server** running

## Testing Steps

### 1. Test Database Integration

Run the database integration test:

```bash
npm run test:db-integration
```

This will test:
- ✅ ElevenLabs agent connectivity
- ✅ Supabase database connection
- ✅ Order-lookup API endpoint

### 2. Test Agent Widget

Visit the test page in your browser:

```
http://localhost:3000/test-agent
```

This page will:
- ✅ Check agent connection status
- ✅ Provide test questions
- ✅ Show expected behavior
- ✅ Offer troubleshooting tips

### 3. Manual Testing

#### Step 1: Open the Widget
1. Look for the chat widget in the bottom-right corner
2. Click to open the chat interface
3. Verify the "Powered by ElevenLabs" branding is hidden

#### Step 2: Test Basic Questions
Try these questions:
- "What is the current exchange rate for Iraqi Dinar?"
- "How can I place an order?"
- "What are your business hours?"

#### Step 3: Test Database Integration
Ask questions that require database access:
- "Can you check my order status?"
- "What payment methods do you accept?"
- "Show me my recent orders"

## Expected Behavior

### ✅ Working Agent Should:
1. **Respond to questions** with relevant information
2. **Access database** through the order-lookup API
3. **Provide real-time data** from Supabase
4. **Hide branding** completely
5. **Handle errors gracefully**

### ❌ Common Issues:
1. **Agent not responding** - Check agent ID and status
2. **Database errors** - Verify Supabase connection
3. **API errors** - Check order-lookup endpoint
4. **Branding visible** - Check CSS/JavaScript hiding

## Configuration Checklist

### Environment Variables (.env.local)
```bash
# ElevenLabs
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# API Security
ELEVENLABS_TOOL_SECRET=your_long_random_secret
```

### ElevenLabs Agent Configuration
1. **Agent is published** and active
2. **Webhook tool configured** with your API endpoint
3. **Tool secret matches** your ELEVENLABS_TOOL_SECRET
4. **Agent has access** to order lookup functionality

### Database Setup
1. **Order table exists** in Supabase
2. **Proper permissions** set for the service role
3. **Sample data** available for testing

## Troubleshooting

### Agent Connection Issues
```bash
# Test agent directly
curl https://api.elevenlabs.io/v1/convai/agent/YOUR_AGENT_ID
```

### Database Connection Issues
```bash
# Test Supabase connection
npm run test:db-integration
```

### API Endpoint Issues
```bash
# Test order-lookup API
curl -X POST http://localhost:3000/api/internal/order-lookup \
  -H "Authorization: Bearer YOUR_TOOL_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Sample Test Data

To test with real data, you can create test orders in your Supabase database:

```sql
INSERT INTO "Order" (
  "fullName", 
  "email", 
  "currency", 
  "quantity", 
  "method", 
  "status"
) VALUES (
  'John Doe',
  'john@example.com',
  'Iraqi Dinar - $1,250',
  1000,
  'Bank Transfer',
  'Processing'
);
```

## Next Steps

1. **Get a valid agent ID** from ElevenLabs dashboard
2. **Configure the webhook tool** in your agent
3. **Test with real data** in your database
4. **Customize responses** based on your business needs
5. **Deploy to production** with proper security

## Support

- **ElevenLabs Documentation**: [docs.elevenlabs.io](https://docs.elevenlabs.io)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Project Issues**: Check the browser console for detailed error messages
