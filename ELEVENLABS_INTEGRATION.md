# ElevenLabs Conversational AI Integration with Supabase Order Tracking

This document describes the end-to-end integration of ElevenLabs Conversational AI Assistant with Supabase order tracking in our Next.js application.

## Overview

The integration creates a seamless workflow where:
1. **Session Start** → Creates new order in Supabase
2. **Payment Events** → Updates order status and payment details
3. **Session End** → Finalizes order with complete data
4. **Database Triggers** → Automatically fire notifications and updates

## Architecture

```
ElevenLabs Widget → Event Listeners → Supabase Client/API → Order Table → Triggers
```

### Components

- **ElevenLabsWidget.js** - Core widget component with event handling
- **ElevenLabsContainer.js** - Styled container with minimize/expand functionality
- **API Route** - Secure order updates using service role key
- **Supabase Client** - Browser-safe client for initial order creation

## Environment Variables

Add these to your `.env.local` file:

```env
# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_api_key_here
ELEVENLABS_TOOL_SECRET=your_tool_secret_here
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Database Schema

The integration works with the existing Order table:

```sql
create table public."Order" (
  id text not null default (gen_random_uuid ())::text,
  country text null,
  address text null,
  city text null,
  state text null,
  postcode text null,
  currency text null,
  quantity integer null default 1,
  "idFileUrl" text null,
  "receiptUrl" text null,
  comments text null,
  "createdAt" timestamp without time zone not null default CURRENT_TIMESTAMP,
  "updatedAt" timestamp without time zone not null default CURRENT_TIMESTAMP,
  "fullName" text null,
  mobile text null,
  method text null,
  "idExpiry" text null,
  "idNumber" text null,
  email text null,
  "acceptTerms" boolean null,
  "skipReceipt" boolean null,
  status text null default 'order_received'::text,
  "trackingNumber" text null,
  constraint Order_pkey primary key (id)
);
```

## Event Flow

### 1. Session Start Event
```javascript
// Event: elevenlabs:session-start
{
  sessionId: "session-123",
  user: {
    email: "user@example.com",
    name: "John Doe",
    phone: "+1234567890"
  }
}
```

**Action**: Creates new order with:
- `status: 'order_received'`
- `quantity: 1`
- User data from event
- Generated tracking number
- Session metadata in comments

### 2. Payment Events
```javascript
// Event: elevenlabs:payment-success
{
  status: "success",
  currency: "USD",
  method: "credit_card",
  receiptUrl: "https://example.com/receipt.pdf",
  amount: 100
}
```

**Action**: Updates order with:
- `status: 'paid'` (or 'payment_failed', 'processing')
- Payment details (currency, method, receipt URL)
- Updated timestamp

### 3. Session End Event
```javascript
// Event: elevenlabs:session-end
{
  paymentStatus: "success",
  currency: "USD",
  paymentMethod: "credit_card",
  receiptUrl: "https://example.com/receipt.pdf",
  amount: 100,
  comments: "Order completed successfully"
}
```

**Action**: Finalizes order with complete data and clears session storage.

## Security

### Client-Side (Browser)
- Uses Supabase anon key for initial order creation
- Session storage for order ID persistence
- No sensitive data exposed

### Server-Side (API Routes)
- Uses Supabase service role key for updates
- Field validation to prevent unauthorized updates
- Secure error handling

## Database Triggers

The integration leverages existing triggers:

1. **set_updated_at** - Automatically updates timestamp
2. **trigger_notifications_on_status_change** - Sends notifications
3. **order_to_outbox** - Queues order for processing

## Usage

### Basic Integration

The widget is automatically included in all pages via `MainLayout.js`:

```javascript
import ElevenLabsContainer from "@/components/ElevenLabsContainer";

// In MainLayout
<ElevenLabsContainer />
```

### Custom Styling

The widget container uses Tailwind CSS classes and can be customized:

```javascript
// In ElevenLabsContainer.js
<div className="fixed bottom-4 right-4 z-50">
  {/* Widget content */}
</div>
```

### Testing

Visit `/test-elevenlabs` to test the integration:

- Environment variable validation
- Event simulation
- Full workflow testing
- Debug logging

## Event Types

| Event | Description | Order Action |
|-------|-------------|--------------|
| `elevenlabs:session-start` | User starts conversation | Create new order |
| `elevenlabs:payment-success` | Payment completed successfully | Update status to 'paid' |
| `elevenlabs:payment-failed` | Payment failed | Update status to 'payment_failed' |
| `elevenlabs:payment-processing` | Payment in progress | Update status to 'processing' |
| `elevenlabs:session-end` | Conversation ended | Finalize order data |

## Error Handling

### Client-Side Errors
- Console logging for debugging
- Graceful fallback for missing data
- Session storage cleanup on errors

### Server-Side Errors
- Detailed error responses
- Field validation
- Database constraint handling

## Monitoring

### Console Logs
- Session lifecycle events
- Database operations
- Error details

### Database Monitoring
- Order creation/updates
- Trigger execution
- Notification delivery

## Troubleshooting

### Common Issues

1. **Widget not loading**
   - Check `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`
   - Verify script loading in network tab

2. **Events not firing**
   - Check browser console for errors
   - Verify event listener registration
   - Test with `/test-elevenlabs` page

3. **Database errors**
   - Check Supabase credentials
   - Verify table permissions
   - Check RLS policies

4. **Triggers not firing**
   - Verify trigger functions exist
   - Check database logs
   - Test manual updates

### Debug Mode

Enable debug mode in browser console:

```javascript
// Import and run debug function
import { debugEventListeners } from './utils/elevenlabs-events';
debugEventListeners();
```

## Performance Considerations

- Widget script loads asynchronously
- Event listeners cleaned up on unmount
- Database operations optimized
- Session storage for persistence

## Future Enhancements

- Real-time order status updates
- Advanced payment integration
- Multi-language support
- Analytics integration
- Custom event handling

## Support

For issues or questions:
1. Check browser console for errors
2. Test with `/test-elevenlabs` page
3. Review database logs
4. Check environment variables
