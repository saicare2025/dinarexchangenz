// Utility functions for ElevenLabs event testing and debugging

export const dispatchElevenLabsEvent = (eventType, eventData = {}) => {
  const event = new CustomEvent(eventType, {
    detail: eventData,
    bubbles: true,
    cancelable: true
  });
  
  document.dispatchEvent(event);
  console.log(`Dispatched ElevenLabs event: ${eventType}`, eventData);
};

// Test event data templates
export const testEvents = {
  sessionStart: {
    sessionId: 'test-session-123',
    user: {
      email: 'test@example.com',
      name: 'Test User',
      phone: '+1234567890'
    },
    timestamp: new Date().toISOString()
  },
  
  sessionEnd: {
    sessionId: 'test-session-123',
    paymentStatus: 'success',
    currency: 'USD',
    paymentMethod: 'credit_card',
    receiptUrl: 'https://example.com/receipt.pdf',
    amount: 100,
    comments: 'Test order completed successfully'
  },
  
  paymentSuccess: {
    sessionId: 'test-session-123',
    status: 'success',
    currency: 'USD',
    method: 'credit_card',
    receiptUrl: 'https://example.com/receipt.pdf',
    amount: 100
  },
  
  paymentFailed: {
    sessionId: 'test-session-123',
    status: 'failed',
    currency: 'USD',
    method: 'credit_card',
    error: 'Insufficient funds'
  }
};

// Helper to test the full workflow
export const testFullWorkflow = () => {
  console.log('Testing ElevenLabs full workflow...');
  
  // Simulate session start
  setTimeout(() => {
    dispatchElevenLabsEvent('elevenlabs:session-start', testEvents.sessionStart);
  }, 1000);
  
  // Simulate payment success
  setTimeout(() => {
    dispatchElevenLabsEvent('elevenlabs:payment-success', testEvents.paymentSuccess);
  }, 3000);
  
  // Simulate session end
  setTimeout(() => {
    dispatchElevenLabsEvent('elevenlabs:session-end', testEvents.sessionEnd);
  }, 5000);
};

// Debug function to check if event listeners are working
export const debugEventListeners = () => {
  const events = [
    'elevenlabs:session-start',
    'elevenlabs:session-end', 
    'elevenlabs:payment-success',
    'elevenlabs:payment-failed',
    'elevenlabs:payment-processing'
  ];
  
  events.forEach(eventType => {
    document.addEventListener(eventType, (event) => {
      console.log(`🎯 Event caught: ${eventType}`, event.detail);
    });
  });
  
  console.log('Event listeners debug mode enabled');
};
