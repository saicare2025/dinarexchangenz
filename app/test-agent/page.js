"use client";

import { useState, useEffect } from 'react';
import { useElevenLabsPage } from '../../components/useElevenLabsUser';

export default function TestAgentPage() {
  const [agentStatus, setAgentStatus] = useState('Checking...');
  const [testQuestions, setTestQuestions] = useState([
    "What is the current exchange rate for Iraqi Dinar?",
    "How can I place an order?",
    "What are your business hours?",
    "Can you check my order status?",
    "What payment methods do you accept?"
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Set page context for the agent
  useElevenLabsPage({
    page_type: 'test_page',
    current_page: '/test-agent',
    product_type: 'Testing',
    currency: 'TEST'
  });

  useEffect(() => {
    // Test agent connection
    const testAgentConnection = async () => {
      try {
        const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_8601k3k3ehrte5htsy5jkp79c64h';
        
        const response = await fetch(`https://api.elevenlabs.io/v1/convai/agent/${agentId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAgentStatus(`✅ Connected - Agent: ${data.name || 'Unknown'}`);
        } else {
          setAgentStatus(`❌ Connection Failed - HTTP ${response.status}`);
        }
      } catch (error) {
        setAgentStatus(`❌ Error: ${error.message}`);
      }
    };

    testAgentConnection();
  }, []);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setIsLoading(true);
    
    // Simulate agent response (in real implementation, this would be handled by the widget)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">ElevenLabs Agent Test</h1>
          
          {/* Agent Status */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Agent Status</h2>
            <div className={`p-4 rounded-lg ${
              agentStatus.includes('✅') ? 'bg-green-50 text-green-800' : 
              agentStatus.includes('❌') ? 'bg-red-50 text-red-800' : 
              'bg-yellow-50 text-yellow-800'
            }`}>
              <p className="font-medium">{agentStatus}</p>
              <p className="text-sm mt-1">
                Agent ID: {process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_8601k3k3ehrte5htsy5jkp79c64h'}
              </p>
            </div>
          </div>

          {/* Test Instructions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Testing Instructions</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ol className="list-decimal list-inside space-y-2 text-blue-900">
                <li>Look for the ElevenLabs chat widget in the bottom-right corner</li>
                <li>Click on the widget to open the chat interface</li>
                <li>Try asking one of the test questions below</li>
                <li>Check if the agent responds with database information</li>
                <li>Verify that the "Powered by ElevenLabs" branding is hidden</li>
              </ol>
            </div>
          </div>

          {/* Test Questions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Test Questions</h2>
            <div className="grid gap-3">
              {testQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  disabled={isLoading}
                  className={`p-3 text-left rounded-lg border transition-colors ${
                    selectedQuestion === question
                      ? 'bg-blue-50 border-blue-300 text-blue-900'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="font-medium">{question}</span>
                  {selectedQuestion === question && isLoading && (
                    <span className="ml-2 text-blue-600">Testing...</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Database Integration Test */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Database Integration Test</h2>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-900 mb-3">
                <strong>Expected Behavior:</strong> The agent should be able to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-green-800">
                <li>Access your Supabase database through the order-lookup API</li>
                <li>Provide real-time exchange rates and order information</li>
                <li>Answer questions about your business policies</li>
                <li>Help with order placement and status inquiries</li>
              </ul>
            </div>
          </div>

          {/* Troubleshooting */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Troubleshooting</h2>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-900 mb-3">
                <strong>If the agent doesn't work:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-yellow-800">
                <li>Check browser console for errors</li>
                <li>Verify your agent ID is correct in .env.local</li>
                <li>Ensure your agent is published in ElevenLabs dashboard</li>
                <li>Check if the order-lookup API endpoint is working</li>
                <li>Verify Supabase connection and permissions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
