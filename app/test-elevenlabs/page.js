"use client";

import { useState } from 'react';
import ElevenLabsWidget from '../../components/ElevenLabsWidget';
import MainLayout from '../MainLayout';

export default function TestElevenLabsPage() {
  const [userEmail, setUserEmail] = useState('test@example.com');
  const [orderId, setOrderId] = useState('ORDER-12345');
  const [showWidget, setShowWidget] = useState(false);

  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">ElevenLabs ConvAI Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Widget Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent ID
              </label>
              <input
                type="text"
                value={agentId || 'Not configured'}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Email (Dynamic Variable)
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter test email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order ID (Dynamic Variable)
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter test order ID"
              />
            </div>

            <button
              onClick={() => setShowWidget(!showWidget)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {showWidget ? 'Hide Widget' : 'Show Widget'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Integration Details</h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-900">Environment Variables Required:</h3>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li><code>ELEVENLABS_API_KEY</code> - Your ElevenLabs API key</li>
                <li><code>ELEVENLABS_TOOL_SECRET</code> - Long random secret for webhook authorization</li>
                <li><code>NEXT_PUBLIC_ELEVENLABS_AGENT_ID</code> - Your ElevenLabs agent ID</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">API Endpoints Created:</h3>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li><code>/api/internal/order-lookup</code> - Secure order lookup endpoint</li>
                <li><code>/api/internal/elevenlabs-signed-url</code> - Private agent signed URL endpoint</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">Widget Features:</h3>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Dynamic variables injection (user_email, current_order_id)</li>
                <li>Secure order lookup via webhook tool</li>
                <li>Rate limiting and authorization</li>
                <li>Responsive positioning</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800 mb-2">Next Steps:</h3>
          <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
            <li>Configure your environment variables</li>
            <li>Set up the webhook tool in ElevenLabs dashboard</li>
            <li>Configure your agent's system prompt</li>
            <li>Test the order lookup functionality</li>
            <li>Deploy to production with HTTPS</li>
          </ol>
        </div>

        {/* ElevenLabs Widget */}
        {showWidget && agentId && (
          <ElevenLabsWidget
            agentId={agentId}
            userEmail={userEmail}
            currentOrderId={orderId}
            position="bottom-right"
          />
        )}
      </div>
    </MainLayout>
  );
}
