// Client-side helper for contact form submission

/**
 * Submit a contact form to the API
 * @param {Object} formData - The form data object
 * @param {string} formData.fullName - Full name (2-120 chars, letters + spaces)
 * @param {string} formData.email - Email address
 * @param {string} formData.phone - Phone number (will be normalized to E.164)
 * @param {string} formData.message - Message (10-5000 chars)
 * @param {string} [formData.website] - Honeypot field (should be empty)
 * @param {string} [formData.captchaToken] - Optional CAPTCHA token
 * @returns {Promise<Object>} API response
 */
export async function submitContactForm(formData) {
  try {
    // Create FormData object
    const data = new FormData();
    
    // Add required fields
    data.append('fullName', formData.fullName || '');
    data.append('email', formData.email || '');
    data.append('phone', formData.phone || '');
    data.append('message', formData.message || '');
    
    // Add optional fields
    if (formData.website !== undefined) {
      data.append('website', formData.website);
    }
    if (formData.captchaToken) {
      data.append('captchaToken', formData.captchaToken);
    }
    
    // Submit to API
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: data,
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      // Handle different error types
      switch (response.status) {
        case 400:
          if (result.code === 'VALIDATION_ERROR') {
            throw new ContactFormError('VALIDATION_ERROR', 'Please check your input and try again.', result.issues);
          }
          throw new ContactFormError('INVALID_REQUEST', 'Invalid request format.');
          
        case 403:
          throw new ContactFormError('INVALID_ORIGIN', 'Invalid request origin.');
          
        case 409:
          throw new ContactFormError('DUPLICATE_SUBMISSION', 'This message appears to be a duplicate. Please wait a moment before submitting again.');
          
        case 429:
          const retryAfter = response.headers.get('Retry-After');
          const waitTime = retryAfter ? parseInt(retryAfter) : 60;
          throw new ContactFormError('RATE_LIMIT_EXCEEDED', `Too many requests. Please wait ${waitTime} seconds before trying again.`);
          
        case 500:
          throw new ContactFormError('SERVER_ERROR', 'Server error. Please try again later.');
          
        default:
          throw new ContactFormError('UNKNOWN_ERROR', 'An unexpected error occurred. Please try again.');
      }
    }
    
    return result;
    
  } catch (error) {
    // Re-throw ContactFormError instances
    if (error instanceof ContactFormError) {
      throw error;
    }
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new ContactFormError('NETWORK_ERROR', 'Network error. Please check your connection and try again.');
    }
    
    // Handle other errors
    console.error('Contact form submission error:', error);
    throw new ContactFormError('UNKNOWN_ERROR', 'An unexpected error occurred. Please try again.');
  }
}

/**
 * Map validation errors to field-specific messages
 * @param {Array} issues - Validation issues from the API
 * @returns {Object} Field-specific error messages
 */
export function mapValidationErrors(issues) {
  const fieldErrors = {};
  
  if (!Array.isArray(issues)) {
    return fieldErrors;
  }
  
  issues.forEach(issue => {
    const field = issue.path[0];
    if (field) {
      fieldErrors[field] = issue.message;
    }
  });
  
  return fieldErrors;
}

/**
 * Custom error class for contact form errors
 */
export class ContactFormError extends Error {
  constructor(code, message, details = null) {
    super(message);
    this.name = 'ContactFormError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Get user-friendly error message for display
 * @param {ContactFormError} error - The error object
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error) {
  if (error instanceof ContactFormError) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Get success message for display
 * @param {Object} result - API response
 * @returns {string} Success message
 */
export function getSuccessMessage(result) {
  if (result.emailDelivery === 'ok') {
    return 'Thank you for your message! We\'ll get back to you within 24 hours.';
  } else if (result.emailDelivery === 'partial') {
    return 'Thank you for your message! We\'ve received it, but there was an issue sending the confirmation email. We\'ll still respond to your inquiry.';
  } else {
    return 'Thank you for your message! We\'ve received it and will respond to your inquiry.';
  }
}

/**
 * Example form field names expected by the API:
 * 
 * Required fields:
 * - fullName: string (2-120 chars, letters + spaces)
 * - email: string (valid email format)
 * - phone: string (will be normalized to E.164 format)
 * - message: string (10-5000 chars)
 * 
 * Optional fields:
 * - website: string (honeypot field, should be empty)
 * - captchaToken: string (optional CAPTCHA token)
 * 
 * Example usage:
 * 
 * ```javascript
 * import { submitContactForm, mapValidationErrors, getErrorMessage } from '@/lib/client/contactForm';
 * 
 * try {
 *   const result = await submitContactForm({
 *     fullName: 'John Doe',
 *     email: 'john@example.com',
 *     phone: '+64212345678',
 *     message: 'I would like to inquire about Iraqi Dinar exchange rates.',
 *     website: '', // honeypot field (hidden from users)
 *   });
 *   
 *   // Show success message
 *   showSuccess(getSuccessMessage(result));
 *   
 * } catch (error) {
 *   if (error.code === 'VALIDATION_ERROR') {
 *     // Map validation errors to form fields
 *     const fieldErrors = mapValidationErrors(error.details);
 *     setFieldErrors(fieldErrors);
 *   } else {
 *     // Show general error message
 *     showError(getErrorMessage(error));
 *   }
 * }
 * ```
 */
