# ElevenLabs ConvAI Integration Guide

This guide covers the complete setup and configuration of ElevenLabs ConvAI integration with your Next.js Dinar Exchange application.

## 🚨 Security First

**IMPORTANT**: If you've previously shared any API keys, treat them as compromised and rotate them immediately.

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# ElevenLabs ConvAI Integration
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_TOOL_SECRET=your_long_random_shared_secret_here
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id_here

# Supabase Configuration (existing)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### Generating Secure Secrets

1. **ELEVENLABS_TOOL_SECRET**: Generate a long, random string (at least 32 characters)
   ```bash
   # Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **ELEVENLABS_API_KEY**: Get from your ElevenLabs dashboard
3. **NEXT_PUBLIC_ELEVENLABS_AGENT_ID**: Your ConvAI agent ID from ElevenLabs

## ElevenLabs Dashboard Configuration

### 1. Create Your Agent

1. Go to [ElevenLabs ConvAI Dashboard](https://elevenlabs.io/convai)
2. Create a new agent or use an existing one
3. Note down your Agent ID

### 2. Configure Webhook Tool

In your ElevenLabs agent dashboard, add a new **Webhook Tool**:

**Tool Name**: `getOrder`

**Method**: `POST`

**URL**: `https://your-domain.com/api/internal/order-lookup`

**Headers**:
```
Authorization: Bearer YOUR_ELEVENLABS_TOOL_SECRET
Content-Type: application/json
```

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "orderId": {
      "type": "string",
      "description": "Order ID to lookup"
    },
    "email": {
      "type": "string",
      "description": "Email address to lookup orders for"
    }
  },
  "anyOf": [
    {"required": ["orderId"]},
    {"required": ["email"]}
  ]
}
```

**Output Schema**:
```json
{
  "type": "object",
  "properties": {
    "found": {
      "type": "boolean",
      "description": "Whether an order was found"
    },
    "orderId": {
      "type": "string",
      "description": "Order ID"
    },
    "customerName": {
      "type": "string",
      "description": "Customer's full name"
    },
    "email": {
      "type": "string",
      "description": "Customer's email"
    },
    "currency": {
      "type": "string",
      "description": "Order currency"
    },
    "quantity": {
      "type": "number",
      "description": "Order quantity"
    },
    "totalAmount": {
      "type": "number",
      "description": "Total order amount"
    },
    "paymentMethod": {
      "type": "string",
      "description": "Payment method used"
    },
    "status": {
      "type": "string",
      "description": "Order status"
    },
    "orderDate": {
      "type": "string",
      "description": "Order creation date"
    },
    "lastUpdated": {
      "type": "string",
      "description": "Last update date"
    },
    "message": {
      "type": "string",
      "description": "Human-readable order summary"
    }
  }
}
```

### 3. Agent System Prompt

Configure your agent's system prompt to include:

```
You are a helpful customer service agent for Dinar Exchange. You can help customers with:

1. Order status inquiries
2. Order details and totals
3. General questions about our services

When customers ask about their orders:
- Use the getOrder tool with their order ID if provided
- If no order ID, ask for their email address
- Always prefer order ID over email when both are available
- If multiple orders exist for an email, focus on the most recent one
- Summarize order information clearly: status, total, last update date

Available dynamic variables:
- user_email: Customer's email (when available)
- current_order_id: Current order being viewed (when available)

Always be polite, professional, and helpful. If you can't find an order, ask the customer to provide their order ID or email address.
```

## Widget Integration

### Basic Usage

```jsx
import ElevenLabsWidget from '@/components/ElevenLabsWidget';

// On any page
<ElevenLabsWidget
  agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}
  userEmail="customer@example.com"
  currentOrderId="ORDER-12345"
  position="bottom-right"
/>
```

### Dynamic Variables

The widget automatically injects these variables into your agent context:

- `user_email`: Customer's email address
- `current_order_id`: Current order being viewed

### Positioning Options

- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`

## API Endpoints

### 1. Order Lookup Endpoint

**URL**: `/api/internal/order-lookup`

**Method**: `POST`

**Authorization**: Bearer token with `ELEVENLABS_TOOL_SECRET`

**Features**:
- Rate limiting (10 requests per minute per identifier)
- Secure authorization
- Returns most recent order for email lookups
- Comprehensive order summary

### 2. Signed URL Endpoint (Optional)

**URL**: `/api/internal/elevenlabs-signed-url`

**Method**: `POST`

**Use case**: For private agents requiring signed URLs

## Testing

### 1. Test Page

Visit `/test-elevenlabs` to test the integration:

- Configure test variables
- Test widget functionality
- Verify API endpoints

### 2. Manual API Testing

```bash
# Test order lookup
curl -X POST https://your-domain.com/api/internal/order-lookup \
  -H "Authorization: Bearer YOUR_ELEVENLABS_TOOL_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"orderId": "ORDER-12345"}'

# Test with email
curl -X POST https://your-domain.com/api/internal/order-lookup \
  -H "Authorization: Bearer YOUR_ELEVENLABS_TOOL_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@example.com"}'
```

## Production Deployment

### 1. HTTPS Requirement

ElevenLabs ConvAI requires HTTPS for microphone access. Ensure your production environment uses HTTPS.

### 2. Content Security Policy

If using CSP, add to your `next.config.mjs`:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' https://widget.elevenlabs.io;"
          }
        ]
      }
    ];
  }
};
```

### 3. Domain Allowlist

Consider implementing domain allowlisting for the widget in production.

## Monitoring & Maintenance

### 1. Log Monitoring

Monitor these endpoints for errors:
- `/api/internal/order-lookup`
- `/api/internal/elevenlabs-signed-url`

### 2. Rate Limiting

Current rate limit: 10 requests per minute per identifier. Adjust in the API code if needed.

### 3. Secret Rotation

Rotate `ELEVENLABS_TOOL_SECRET` regularly and on any suspected leak.

### 4. Database Schema Changes

If you modify your Supabase Order table schema, update:
- The order lookup API endpoint
- The agent's tool output schema
- The agent's system prompt

## Troubleshooting

### Common Issues

1. **Widget not loading**: Check if `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is set
2. **Tool calls failing**: Verify `ELEVENLABS_TOOL_SECRET` matches between dashboard and environment
3. **No orders found**: Check Supabase connection and table structure
4. **Rate limit errors**: Reduce request frequency or increase limits

### Debug Mode

Enable debug logging by adding to your environment:

```bash
DEBUG=elevenlabs:*
```

## Security Checklist

- [ ] All API keys are in environment variables
- [ ] `ELEVENLABS_TOOL_SECRET` is a long, random string
- [ ] HTTPS is enabled in production
- [ ] Rate limiting is configured
- [ ] Authorization headers are validated
- [ ] No secrets are exposed in client-side code
- [ ] CSP is configured if needed
- [ ] Regular secret rotation schedule is in place

## Support

For issues with:
- **ElevenLabs ConvAI**: Contact ElevenLabs support
- **Integration**: Check this guide and API documentation
- **Database**: Verify Supabase configuration and table structure
