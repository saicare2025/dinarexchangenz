"use client";

import { useEffect, useRef } from 'react';

export default function ElevenLabsInlineWidget() {
  const widgetRef = useRef(null);
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_8601k3k3ehrte5htsy5jkp79c64h';

  useEffect(() => {
    // Store ref in a variable for cleanup
    const currentRef = widgetRef.current;

    // Function to hide ElevenLabs branding
    const hideBranding = () => {
      // Hide by class name
      const brandingElements = document.querySelectorAll('.whitespace-nowrap');
      brandingElements.forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.height = '0';
        el.style.overflow = 'hidden';
      });

      // Hide by text content
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.textContent && el.textContent.includes('Powered by ElevenLabs')) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.height = '0';
          el.style.overflow = 'hidden';
        }
      });

      // Hide specific paragraph elements
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach(p => {
        if (p.textContent && p.textContent.includes('Powered by ElevenLabs')) {
          p.style.display = 'none';
          p.style.visibility = 'hidden';
          p.style.opacity = '0';
          p.style.height = '0';
          p.style.overflow = 'hidden';
        }
      });
    };

    // Set up MutationObserver to watch for dynamically added branding
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the added node contains branding
              if (node.textContent && node.textContent.includes('Powered by ElevenLabs')) {
                node.style.display = 'none';
                node.style.visibility = 'hidden';
                node.style.opacity = '0';
                node.style.height = '0';
                node.style.overflow = 'hidden';
              }
              
              // Also check child elements
              const brandingInChildren = node.querySelectorAll('*');
              brandingInChildren.forEach(el => {
                if (el.textContent && el.textContent.includes('Powered by ElevenLabs')) {
                  el.style.display = 'none';
                  el.style.visibility = 'hidden';
                  el.style.opacity = '0';
                  el.style.height = '0';
                  el.style.overflow = 'hidden';
                }
              });
            }
          });
        }
      });
    });

    // Start observing the entire document
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Function to initialize the widget
    const initWidget = () => {
      if (!currentRef) return;

      // Clear any existing content
      currentRef.innerHTML = '';

      // Create the custom element
      const widgetElement = document.createElement('elevenlabs-convai');
      widgetElement.setAttribute('agent-id', agentId);
      
      // Add to the container
      currentRef.appendChild(widgetElement);

      console.log('ElevenLabs widget initialized with agent ID:', agentId);

      // Hide branding after a short delay to ensure widget is loaded
      setTimeout(hideBranding, 1000);
      
      // Also hide branding periodically in case it gets re-added
      const brandingInterval = setInterval(hideBranding, 2000);
      
      // Cleanup interval on unmount
      return () => clearInterval(brandingInterval);
    };

    // Check if the custom element is already defined
    if (customElements.get('elevenlabs-convai')) {
      initWidget();
    } else {
      // Wait for the custom element to be defined
      const checkInterval = setInterval(() => {
        if (customElements.get('elevenlabs-convai')) {
          clearInterval(checkInterval);
          initWidget();
        }
      }, 100);
    }

    // Cleanup
    return () => {
      observer.disconnect();
      if (currentRef) {
        currentRef.innerHTML = '';
      }
    };
  }, [agentId]);

  return (
    <div 
      ref={widgetRef}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
    />
  );
}
