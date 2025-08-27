"use client";

import { useEffect, useRef, useState } from 'react';
import { supabaseClient } from '../lib/supabase/client';
import { loadElevenLabsScript, isElevenLabsScriptLoaded } from '../lib/elevenlabs-loader';
import '../app/elevenlabs-widget.css';

const ElevenLabsWidget = () => {
  const widgetRef = useRef(null);
  const [orderId, setOrderId] = useState(null);
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(null);

  // Generate a unique tracking number
  const generateTrackingNumber = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TRK-${timestamp}-${random}`.toUpperCase();
  };

  // Handle session start - create new order
  const handleSessionStart = async (event) => {
    try {
      console.log('ElevenLabs session started:', event);
      
      const trackingNumber = generateTrackingNumber();
      const userData = event.detail?.user || {};
      
      const orderData = {
        status: 'order_received',
        quantity: 1,
        email: userData.email || null,
        fullName: userData.name || null,
        mobile: userData.phone || null,
        trackingNumber: trackingNumber,
        currency: null,
        method: null,
        comments: `Order created via ElevenLabs AI Assistant - Session ID: ${event.detail?.sessionId || 'unknown'}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const { data, error } = await supabaseClient
        .from('Order')
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        return;
      }

      setOrderId(data.id);
      console.log('Order created successfully:', data);
      
      // Store order ID in session storage for persistence
      sessionStorage.setItem('elevenlabs_order_id', data.id);
      sessionStorage.setItem('elevenlabs_tracking_number', trackingNumber);
      
    } catch (error) {
      console.error('Error in session start handler:', error);
    }
  };

  // Handle session end - update order status
  const handleSessionEnd = async (event) => {
    try {
      console.log('ElevenLabs session ended:', event);
      
      const currentOrderId = orderId || sessionStorage.getItem('elevenlabs_order_id');
      if (!currentOrderId) {
        console.warn('No order ID found for session end');
        return;
      }

      const sessionData = event.detail || {};
      const finalStatus = sessionData.paymentStatus === 'success' ? 'paid' : 
                         sessionData.paymentStatus === 'failed' ? 'payment_failed' : 
                         'session_completed';

      const updateData = {
        status: finalStatus,
        updatedAt: new Date().toISOString()
      };

      // Add payment-related data if available
      if (sessionData.currency) updateData.currency = sessionData.currency;
      if (sessionData.paymentMethod) updateData.method = sessionData.paymentMethod;
      if (sessionData.receiptUrl) updateData.receiptUrl = sessionData.receiptUrl;
      if (sessionData.amount) updateData.quantity = sessionData.amount;
      if (sessionData.comments) updateData.comments = sessionData.comments;

      // Use API route for secure updates
      const response = await fetch('/api/orders/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: currentOrderId,
          updates: updateData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      const result = await response.json();
      console.log('Order updated successfully:', result);
      
      // Clear session storage
      sessionStorage.removeItem('elevenlabs_order_id');
      sessionStorage.removeItem('elevenlabs_tracking_number');
      
    } catch (error) {
      console.error('Error in session end handler:', error);
    }
  };

  // Handle payment events
  const handlePaymentEvent = async (event) => {
    try {
      console.log('ElevenLabs payment event:', event);
      
      const currentOrderId = orderId || sessionStorage.getItem('elevenlabs_order_id');
      if (!currentOrderId) {
        console.warn('No order ID found for payment event');
        return;
      }

      const paymentData = event.detail || {};
      const status = paymentData.status === 'success' ? 'paid' : 
                    paymentData.status === 'failed' ? 'payment_failed' : 
                    'processing';

      const updateData = {
        status: status,
        updatedAt: new Date().toISOString()
      };

      if (paymentData.currency) updateData.currency = paymentData.currency;
      if (paymentData.method) updateData.method = paymentData.method;
      if (paymentData.receiptUrl) updateData.receiptUrl = paymentData.receiptUrl;

      // Use API route for secure updates
      const response = await fetch('/api/orders/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: currentOrderId,
          updates: updateData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order payment');
      }

      const result = await response.json();
      console.log('Order payment updated successfully:', result);
      
    } catch (error) {
      console.error('Error in payment event handler:', error);
    }
  };

  useEffect(() => {
    console.log('🎯 ElevenLabsWidget mounted');
    console.log('Agent ID:', process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID);
    
    // Check for existing order ID in session storage
    const existingOrderId = sessionStorage.getItem('elevenlabs_order_id');
    if (existingOrderId) {
      setOrderId(existingOrderId);
    }

    // Load ElevenLabs script using global loader
    const loadScript = async () => {
      try {
        await loadElevenLabsScript();
        setIsWidgetLoaded(true);
        console.log('✅ ElevenLabs script loaded successfully');
      } catch (error) {
        console.error('❌ Failed to load ElevenLabs script:', error);
        setWidgetError('Failed to load ElevenLabs widget script');
      }
    };

    loadScript();

    // Add event listeners for widget lifecycle events
    const handleWidgetEvent = (event) => {
      console.log('🎯 ElevenLabs event received:', event.type, event.detail);
      switch (event.type) {
        case 'elevenlabs:session-start':
          handleSessionStart(event);
          break;
        case 'elevenlabs:session-end':
          handleSessionEnd(event);
          break;
        case 'elevenlabs:payment-success':
        case 'elevenlabs:payment-failed':
        case 'elevenlabs:payment-processing':
          handlePaymentEvent(event);
          break;
        default:
          console.log('Unhandled ElevenLabs event:', event.type, event);
      }
    };

    document.addEventListener('elevenlabs:session-start', handleWidgetEvent);
    document.addEventListener('elevenlabs:session-end', handleWidgetEvent);
    document.addEventListener('elevenlabs:payment-success', handleWidgetEvent);
    document.addEventListener('elevenlabs:payment-failed', handleWidgetEvent);
    document.addEventListener('elevenlabs:payment-processing', handleWidgetEvent);

    return () => {
      // Cleanup event listeners only
      // Don't remove the script as it might be used by other instances
      document.removeEventListener('elevenlabs:session-start', handleWidgetEvent);
      document.removeEventListener('elevenlabs:session-end', handleWidgetEvent);
      document.removeEventListener('elevenlabs:payment-success', handleWidgetEvent);
      document.removeEventListener('elevenlabs:payment-failed', handleWidgetEvent);
      document.removeEventListener('elevenlabs:payment-processing', handleWidgetEvent);
    };
  }, []);

  // Render widget when script is loaded
  useEffect(() => {
    if (isWidgetLoaded && widgetRef.current) {
      console.log('✅ ElevenLabs widget ready to render');
    }
  }, [isWidgetLoaded]);

  if (widgetError) {
    return (
      <div className="elevenlabs-widget-container error">
        <p>Error: {widgetError}</p>
        <p>Please check your ElevenLabs configuration.</p>
      </div>
    );
  }

  return (
    <div className="elevenlabs-widget-container">
      {!isWidgetLoaded && (
        <div className="loading">
          <p>Loading AI Assistant...</p>
        </div>
      )}
      
      {isWidgetLoaded && (
        <>
          {customElements.get('elevenlabs-convai') ? (
            <elevenlabs-convai 
              ref={widgetRef}
              agent-id={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}
              className="w-full h-full"
            />
          ) : (
            <div className="loading">
              <p>Initializing AI Assistant...</p>
            </div>
          )}
        </>
      )}
      
      {/* Order tracking info */}
      {orderId && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Order ID:</strong> {orderId}
          </p>
          <p className="text-sm text-blue-800">
            <strong>Tracking:</strong> {sessionStorage.getItem('elevenlabs_tracking_number')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ElevenLabsWidget;
