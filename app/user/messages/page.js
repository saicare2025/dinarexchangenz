'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/app/MainLayout';


const systemMessages = [
  {
    id: 1,
    sender: 'dinar Exchange System',
    subject: 'Order Placed Successfully',
    time: 'Just now',
    content: `Hi Nahid, your order has been received and is now being processed. Expect delivery updates soon.`,
  },
  {
    id: 2,
    sender: 'dinar Exchange System',
    subject: 'Missing ID for Verification',
    time: '1 hour ago',
    content: `We noticed your recent order is missing a valid ID. Please upload your ID to avoid delays.`,
  },
  {
    id: 3,
    sender: 'dinar Exchange System',
    subject: 'Payment Confirmed',
    time: 'Yesterday',
    content: `Your payment has been successfully received. Your order is now being packaged.`,
  },
  {
    id: 4,
    sender: 'dinar Exchange System',
    subject: 'Order Shipped',
    time: '2 days ago',
    content: `Your order has been shipped! Estimated delivery within 3–5 business days.`,
  },
  {
    id: 5,
    sender: 'dinar Exchange System',
    subject: 'Order Completed',
    time: '5 days ago',
    content: `Your order has been completed and delivered. Thank you for choosing dinar Exchange.`,
  },
];

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState(systemMessages[0]);

  return (
    <MainLayout>
      <div className="min-h-[80vh] bg-orange-50 px-4 py-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl flex flex-col sm:flex-row bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Message List */}
          <aside className="w-full sm:w-1/3 border-r border-gray-200 bg-gray-50">
            <div className="p-4 border-b border-gray-200 text-lg font-semibold text-gray-700">
              System Messages
            </div>
            <ul className="divide-y divide-gray-200 max-h-[70vh] overflow-y-auto">
              {systemMessages.map((msg) => (
                <li
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`px-4 py-3 cursor-pointer hover:bg-orange-100 transition ${
                    selectedMessage?.id === msg.id ? 'bg-orange-100' : ''
                  }`}
                >
                  <p className="font-medium text-gray-800">{msg.sender}</p>
                  <p className="text-sm text-gray-600 truncate">{msg.subject}</p>
                  <p className="text-xs text-gray-400">{msg.time}</p>
                </li>
              ))}
            </ul>
          </aside>

          {/* Message Detail */}
          <section className="w-full sm:w-2/3 p-6">
            {selectedMessage ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {selectedMessage.subject}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  From <span className="font-medium">{selectedMessage.sender}</span> ·{' '}
                  <span>{selectedMessage.time}</span>
                </p>
                <div className="text-gray-700 leading-relaxed">{selectedMessage.content}</div>
              </>
            ) : (
              <p className="text-gray-500">Select a message to view its content.</p>
            )}
          </section>
        </motion.div>
      </div>
    </MainLayout>
  );
}
