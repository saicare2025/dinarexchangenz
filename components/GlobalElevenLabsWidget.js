"use client";

import { useEffect, useRef, useState } from 'react';
import { useElevenLabs } from './ElevenLabsContext';

export default function GlobalElevenLabsWidget() {
  const widgetRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { widgetVariables } = useElevenLabs();

  useEffect(() => {
    console.log('GlobalElevenLabsWidget: useEffect triggered');
    console.log('Agent ID:', process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID);
    console.log('Widget variables:', widgetVariables);
    
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_8601k3k3ehrte5htsy5jkp79c64h';
    
    if (!agentId) {
      console.warn('ElevenLabs Agent ID not configured - widget will not show');
      return;
    }

    console.log('Using agent ID:', agentId);

    // Test the agent ID by making a simple fetch request
    const testAgentId = async () => {
      try {
        console.log('Testing agent ID:', agentId);
        const response = await fetch(`https://api.elevenlabs.io/v1/convai/agent/${agentId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Agent configuration loaded successfully:', data);
        } else {
          console.error('Failed to load agent configuration:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error testing agent ID:', error);
      }
    };

    // Test the agent ID
    testAgentId();

    // Function to initialize the custom element
    const initWidget = () => {
      if (isInitialized) return;
      
      try {
        // Create the custom element with basic configuration first
        const widgetElement = document.createElement('elevenlabs-convai');
        widgetElement.setAttribute('agent-id', agentId);
        
        // Add basic styling attributes
        widgetElement.setAttribute('position', 'bottom-right');
        
        // Add to the widget container
        if (widgetRef.current) {
          widgetRef.current.innerHTML = '';
          widgetRef.current.appendChild(widgetElement);
          setIsInitialized(true);
          console.log('Global ElevenLabs ConvAI widget initialized with custom element');
          
          // Add event listeners to debug any issues
          widgetElement.addEventListener('error', (e) => {
            console.error('ElevenLabs widget error:', e);
          });
          
          widgetElement.addEventListener('load', () => {
            console.log('ElevenLabs widget loaded successfully');
          });
        }
      } catch (error) {
        console.error('GlobalElevenLabsWidget: Failed to initialize widget:', error);
      }
    };

    // Wait for the script to load and then initialize
    const waitForScript = () => {
      // Check if the custom element is defined
      if (customElements.get('elevenlabs-convai')) {
        console.log('GlobalElevenLabsWidget: Custom element already defined, initializing...');
        initWidget();
        return;
      }

      // Wait for the custom element to be defined
      console.log('GlobalElevenLabsWidget: Waiting for custom element to be defined...');
      let attempts = 0;
      const maxAttempts = 100; // 10 seconds
      
      const checkInterval = setInterval(() => {
        attempts++;
        
        if (customElements.get('elevenlabs-convai')) {
          console.log('GlobalElevenLabsWidget: Custom element defined, initializing...');
          clearInterval(checkInterval);
          initWidget();
        } else if (attempts >= maxAttempts) {
          console.error('GlobalElevenLabsWidget: Custom element not defined after timeout');
          clearInterval(checkInterval);
        }
      }, 100);
    };

    // Start the initialization process
    waitForScript();

    // Cleanup function
    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
        setIsInitialized(false);
      }
    };
  }, [isInitialized, widgetVariables]);

  // Don't render anything if agent ID is not configured
  if (!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID) {
    console.warn('ElevenLabs Agent ID not configured - widget will not show');
    return null;
  }

  // For testing purposes, show a placeholder if agent ID is invalid
  if (process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID === 'agent_8401k3jjp5sxe7stxwsakevapep6') {
    console.warn('Using test agent ID - please create a real agent in ElevenLabs dashboard');
    return (
      <div 
        className="elevenlabs-global-widget"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: '#007bff',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer'
        }}
        onClick={() => alert('ElevenLabs widget placeholder\n\nPlease create a real agent in your ElevenLabs dashboard and update the agent ID in .env.local')}
      >
        🤖 AI Chat (Test Mode)
      </div>
    );
  }

  return (
    <div 
      ref={widgetRef}
      className="elevenlabs-global-widget"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
    />
  );
}
