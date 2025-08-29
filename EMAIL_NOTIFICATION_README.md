# Dinar Exchange NZ — Email Notification System

This implementation adds branded Gmail SMTP order notifications with professional PDF invoice generation to the Dinar Exchange NZ application.

## Features

- **Branded NZ Email**: Sends confirmation email with NZ-specific content and branding
- **Professional PDF Invoice**: Generates invoice matching the screenshot layout with logo and NZ styling
- **Internal Alert**: Sends notification to internal team about new orders
- **NZ Localization**: All content updated for New Zealand market
- **Error Handling**: Graceful error handling that doesn't affect order processing

## Environment Variables

Add these environment variables to your Vercel deployment:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dinars@dinarexchange.co.nz
SMTP_PASS=abcdefghijklmnop
SMTP_FROM="Dinarexchange Orders <dinars@dinarexchange.co.nz>"
ALERT_TO=dinars@dinarexchange.co.nz
```

## Implementation Details

### Files Created/Modified

1. **`app/lib/mailer.js`** - Nodemailer transporter configuration
2. **`app/lib/emailTemplateNZ.js`** - NZ-specific HTML email template and subject builder
3. **`app/lib/invoiceNZ.js`** - Professional PDF invoice generator matching screenshot layout
4. **`app/api/orders/notify/route.js`** - Updated API endpoint using NZ templates
5. **`components/order-form/OrderForm.js`** - Updated to use new data structure
6. **`components/order-form/SuccessModal.js`** - Success message mentions email confirmation
7. **`public/branding/`** - Directory for logo and branding assets

### Flow

1. User completes order form on `/buydinar` or `/buy-zimbabwe-dollar`
2. Order is submitted to Base44 (existing functionality)
3. If Base44 submission succeeds, email notification is triggered
4. Two emails are sent:
   - Customer confirmation with branded NZ content and PDF invoice
   - Internal alert to ALERT_TO address
5. Success modal shows confirmation message mentioning email

### Error Handling

- Email failures don't affect order processing
- Errors are logged but not shown to users
- Environment variable validation
- PDF generation error handling

## Testing

To test the implementation:

1. Set up environment variables in Vercel
2. Add your logo to `public/branding/dinar-exchange-logo.png`
3. Complete an order on `/buydinar` or `/buy-zimbabwe-dollar`
4. Check that emails are received by customer and internal team
5. Verify branded NZ content and PDF invoice attachment
6. Confirm subject line format: "Dinar Exchange NZ Order confirmation - {Customer Name}"

## Security Notes

- SMTP credentials are server-side only (not exposed to client)
- Uses STARTTLS on port 587 (secure: false)
- Environment variables are not prefixed with NEXT_PUBLIC_
