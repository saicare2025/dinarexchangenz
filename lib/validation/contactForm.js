// Simple validation functions for contact form

// Phone number normalization and validation
function normalizePhone(phone) {
  if (!phone) return phone;
  
  // Remove all non-digit characters except + at the beginning
  let normalized = phone.replace(/[^\d+]/g, '');
  
  // If it doesn't start with +, assume it's a local number
  if (!normalized.startsWith('+')) {
    // If it starts with 0, remove it and add +64 (NZ)
    if (normalized.startsWith('0')) {
      normalized = '+64' + normalized.substring(1);
    } else {
      // Assume it's a NZ number without country code
      normalized = '+64' + normalized;
    }
  }
  
  return normalized;
}

// Validate full name
function validateFullName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }
  
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (trimmed.length > 120) {
    return { valid: false, error: 'Name must be less than 120 characters' };
  }
  
  if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters and spaces' };
  }
  
  return { valid: true, value: trimmed };
}

// Validate email
function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  return { valid: true, value: trimmed };
}

// Validate phone
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required' };
  }
  
  const normalized = normalizePhone(phone);
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  
  if (!e164Regex.test(normalized)) {
    return { valid: false, error: 'Please enter a valid phone number' };
  }
  
  return { valid: true, value: normalized };
}

// Validate message
function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message is required' };
  }
  
  const trimmed = message.trim();
  if (trimmed.length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters' };
  }
  
  if (trimmed.length > 5000) {
    return { valid: false, error: 'Message must be less than 5000 characters' };
  }
  
  return { valid: true, value: trimmed };
}

// Validate honeypot field
function validateHoneypot(website) {
  if (website && website.trim() !== '') {
    return { valid: false, error: 'Invalid submission' };
  }
  
  return { valid: true, value: '' };
}

// Main validation function
export function validateContactForm(data) {
  const errors = [];
  const validatedData = {};
  
  // Validate full name
  const nameValidation = validateFullName(data.fullName);
  if (!nameValidation.valid) {
    errors.push({ path: ['fullName'], message: nameValidation.error });
  } else {
    validatedData.fullName = nameValidation.value;
  }
  
  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.valid) {
    errors.push({ path: ['email'], message: emailValidation.error });
  } else {
    validatedData.email = emailValidation.value;
  }
  
  // Validate phone
  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.valid) {
    errors.push({ path: ['phone'], message: phoneValidation.error });
  } else {
    validatedData.phone = phoneValidation.value;
  }
  
  // Validate message
  const messageValidation = validateMessage(data.message);
  if (!messageValidation.valid) {
    errors.push({ path: ['message'], message: messageValidation.error });
  } else {
    validatedData.message = messageValidation.value;
  }
  
  // Validate honeypot
  const honeypotValidation = validateHoneypot(data.website);
  if (!honeypotValidation.valid) {
    errors.push({ path: ['website'], message: honeypotValidation.error });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    data: validatedData
  };
}
