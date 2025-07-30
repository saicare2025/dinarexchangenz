'use client';

import { DocumentTextIcon, PhotoIcon, TruckIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { FiTrash2, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

export default function OrderCard({ order, onUploadClick, onDeleteRequest }) {
  const statusColors = {
    'Order Received': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    'ID Received': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
    'Payment Received': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
    'Ready to Ship': { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
    'Shipped': { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' }
  };

  const [deleteRequested, setDeleteRequested] = useState(false);
  const status = statusColors[order.status];

  const handleDeleteRequest = async () => {
    setDeleteRequested(true);
    await onDeleteRequest(order.id);
  };

  return (
    <motion.div
      className={`bg-white p-5 rounded-xl shadow-sm border ${status.border} transition-all duration-200`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {deleteRequested ? (
            <div className="flex items-center text-xs bg-red-50 text-green-700 px-2 py-1 rounded-md">
              <FiCheck className="h-3 w-3 mr-1" />
              <span className="sr-only md:not-sr-only">Requested for delete</span>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleDeleteRequest}
              className="flex items-center text-xs bg-red-50 hover:bg-red-100 text-red-700 px-2 py-1 rounded-md transition-colors"
              title="Request Deletion"
            >
              <FiTrash2 className="h-3 w-3 mr-1" />
              <span className="sr-only md:not-sr-only">Delete</span>
            </motion.button>
          )}

          <span className={`text-xs px-3 py-1 rounded-full ${status.bg} ${status.text} font-medium`}>
            {order.status}
          </span>
        </div>
      </div>

      
      <div className="mb-4">
        <p className="text-xl font-bold text-gray-900">
          {order.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: order.currency
          })}
        </p>
      </div>

     
      {order.trackingNumber && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <div className="p-2 bg-white rounded-lg mr-3 shadow-xs">
              <TruckIcon className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Tracking Number</p>
              <a 
                href={`https://www.dhl.com/track?trackingNumber=${order.trackingNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline flex items-center"
              >
                {order.trackingNumber}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
        {!order.idPhotoUrl && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onUploadClick(order, "id")}
            className="flex items-center text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors"
          >
            <div className="p-1 bg-blue-100 rounded mr-2">
              <PhotoIcon className="h-4 w-4 text-blue-600" />
            </div>
            Upload ID
          </motion.button>
        )}

        {!order.receiptUrl && order.status !== "Shipped" && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onUploadClick(order, "receipt")}
            className="flex items-center text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg transition-colors"
          >
            <div className="p-1 bg-emerald-100 rounded mr-2">
              <DocumentTextIcon className="h-4 w-4 text-emerald-600" />
            </div>
            Upload Receipt
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}