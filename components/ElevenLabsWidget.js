"use client";

import { useEffect, useRef } from 'react';

export default function ElevenLabsWidget({ 
  agentId, 
  userEmail = null, 
  currentOrderId = null,
  position = "bottom-right",
  className = ""
}) {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Wait for the widget script to load
    const initWidget = () => {
      if (window.ConvAIWidget && agentId) {
        // Prepare dynamic variables
        const variables = {};
        if (userEmail) variables.user_email = userEmail;
        if (currentOrderId) variables.current_order_id = currentOrderId;

        // Initialize the widget
        window.ConvAIWidget.init({
          agentId: agentId,
          position: position, // "bottom-right", "bottom-left", "top-right", "top-left"
          variables: variables,
          onReady: () => {
            console.log('ElevenLabs ConvAI widget ready');
          },
          onError: (error) => {
            console.error('ElevenLabs ConvAI widget error:', error);
          }
        });
      }
    };

    // Check if script is already loaded
    if (window.ConvAIWidget) {
      initWidget();
    } else {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if (window.ConvAIWidget) {
          clearInterval(checkInterval);
          initWidget();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 10000);
    }

    // Cleanup function
    return () => {
      if (window.ConvAIWidget && window.ConvAIWidget.destroy) {
        window.ConvAIWidget.destroy();
      }
    };
  }, [agentId, userEmail, currentOrderId, position]);

  return (
    <div 
      ref={widgetRef}
      className={`elevenlabs-widget ${className}`}
      data-agent-id={agentId}
    />
  );
}
