"use client";

import { useState, useEffect } from 'react';
import ElevenLabsWidget from './ElevenLabsWidget';

const ElevenLabsContainer = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    console.log('🎯 ElevenLabsContainer mounted');
    console.log('Agent ID:', process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Minimized state - just a chat bubble */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open AI Assistant"
          style={{ zIndex: 9999 }}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </button>
      )}

      {/* Expanded state - full widget */}
      {!isMinimized && (
        <div className={`
          bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300
          ${isExpanded ? 'w-96 h-[600px]' : 'w-80 h-[500px]'}
        `} style={{ zIndex: 9999 }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <p className="text-xs text-blue-100">Powered by ElevenLabs</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Expand/Collapse button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isExpanded ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  )}
                </svg>
              </button>
              
              {/* Minimize button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                aria-label="Minimize"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Widget Content */}
          <div className="h-full flex flex-col">
            <div className="flex-1 p-4 overflow-hidden">
              <ElevenLabsWidget />
            </div>
            
            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <p className="text-xs text-gray-500 text-center">
                Secure AI-powered ordering • Your data is protected
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElevenLabsContainer;
