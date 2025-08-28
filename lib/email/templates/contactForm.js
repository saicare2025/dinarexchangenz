// Email templates for contact form submissions

// User acknowledgment email template
export function getUserEmailTemplate(data) {
  const firstName = data.fullName.split(' ')[0];
  const messageExcerpt = data.message.length > 100 
    ? data.message.substring(0, 100) + '...' 
    : data.message;

  return {
    subject: 'Thanks for contacting Dinar Exchange NZ',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for your inquiry</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #ea580c 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; text-align: center; font-size: 28px;">Dinar Exchange NZ</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; border-left: 4px solid #1e40af;">
          <h2 style="color: #1e40af; margin-top: 0;">Thank you for your inquiry, ${firstName}!</h2>
          
          <p>We've received your message and appreciate you taking the time to contact us. Here's a summary of what you submitted:</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <p><strong>Your message:</strong></p>
            <p style="font-style: italic; color: #6b7280;">"${messageExcerpt}"</p>
          </div>
          
          <p>Our team will review your inquiry and get back to you within <strong>24 hours</strong> during business hours (Monday-Friday, 9am-5pm NZT).</p>
          
          <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Need immediate assistance?</h3>
            <p style="margin-bottom: 10px;"><strong>Phone:</strong> <a href="tel:+6498724693" style="color: #1e40af;">+64 9 872 4693</a></p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:dinars@dinarexchange.co.nz" style="color: #1e40af;">dinars@dinarexchange.co.nz</a></p>
            <p style="margin: 0;"><strong>Hours:</strong> Mon-Fri: 9am-5pm, Sat: 10am-2pm</p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            <strong>Privacy Note:</strong> Your information is kept confidential and will only be used to respond to your inquiry. 
            We never share your personal details with third parties.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            © ${new Date().getFullYear()} Dinar Exchange NZ. All rights reserved.
          </p>
        </div>
      </body>
      </html>
    `,
    text: `
Thank you for your inquiry, ${firstName}!

We've received your message and appreciate you taking the time to contact us.

Your message: "${messageExcerpt}"

Our team will review your inquiry and get back to you within 24 hours during business hours (Monday-Friday, 9am-5pm NZT).

Need immediate assistance?
Phone: +64 9 872 4693
Email: dinars@dinarexchange.co.nz
Hours: Mon-Fri: 9am-5pm, Sat: 10am-2pm

Privacy Note: Your information is kept confidential and will only be used to respond to your inquiry. We never share your personal details with third parties.

© ${new Date().getFullYear()} Dinar Exchange NZ. All rights reserved.
    `
  };
}

// Internal alert email template
export function getInternalAlertTemplate(data, metadata) {
  const maskedPhone = data.phone.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{3})/, '$1***$3$4');
  
  return {
    subject: 'New Contact Form Submission - Dinar Exchange NZ',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; text-align: center; font-size: 28px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
          <h2 style="color: #dc2626; margin-top: 0;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold; width: 150px;">Full Name:</td>
              <td style="padding: 12px 0;">${data.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Email:</td>
              <td style="padding: 12px 0;"><a href="mailto:${data.email}" style="color: #1e40af;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 12px 0;"><a href="tel:${data.phone}" style="color: #1e40af;">${maskedPhone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Submitted:</td>
              <td style="padding: 12px 0;">${new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })}</td>
            </tr>
          </table>
          
          <h3 style="color: #dc2626;">Message</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 30px;">
            <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
          </div>
          
          <h3 style="color: #dc2626;">Request Metadata</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold; width: 150px;">IP Address:</td>
              <td style="padding: 12px 0;">${metadata.ip}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">User Agent:</td>
              <td style="padding: 12px 0; font-size: 14px;">${metadata.userAgent}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Origin:</td>
              <td style="padding: 12px 0;">${metadata.origin}</td>
            </tr>
          </table>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h4 style="color: #92400e; margin-top: 0;">Quick Actions</h4>
            <p style="margin-bottom: 15px;">
              <a href="mailto:${data.email}?subject=Re: Your inquiry to Dinar Exchange NZ" 
                 style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reply to Customer
              </a>
            </p>
            <p style="margin-bottom: 15px;">
              <a href="tel:${data.phone}" 
                 style="background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Call Customer
              </a>
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This is an automated alert from the Dinar Exchange NZ contact form system.
          </p>
        </div>
      </body>
      </html>
    `,
    text: `
New Contact Form Submission - Dinar Exchange NZ

Contact Details:
Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${maskedPhone}
Submitted: ${new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })}

Message:
${data.message}

Request Metadata:
IP Address: ${metadata.ip}
User Agent: ${metadata.userAgent}
Origin: ${metadata.origin}

Quick Actions:
- Reply to customer: mailto:${data.email}?subject=Re: Your inquiry to Dinar Exchange NZ
- Call customer: ${data.phone}

This is an automated alert from the Dinar Exchange NZ contact form system.
    `
  };
}
