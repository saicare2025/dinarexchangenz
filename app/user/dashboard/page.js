"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockOrders, orderStatuses } from "../../../services/mockData";
import OrderCard from "../../../components/OrderCard";
import UploadModal from "../../../components/UploadModal";
import MainLayout from "../../MainLayout";
import { FiPlus, FiFilter, FiSearch, FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useElevenLabsUser } from "../../../components/useElevenLabsUser";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Set user context for ElevenLabs widget
  useElevenLabsUser("user@example.com", currentOrder?.id);

  const filteredOrders = (
    activeTab === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === activeTab)
  ).filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.amount.toString().includes(searchQuery) ||
      order.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadClick = (order, type) => {
    setCurrentOrder(order);
    setUploadType(type);
    setShowUploadModal(true);
  };

  const handleDeleteRequest = (orderId) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          // Simulate API call
          console.log("Delete request sent for order:", orderId);
          resolve();
        }, 1000);
      }),
      {
        loading: "Sending deletion request...",
        success: "Request sent to admin for approval",
        error: "Failed to send request",
      }
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6 pt-4">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Order Management
            </h1>
            <p className="text-gray-500">
              Track and manage your currency exchange orders
            </p>
          </div>
          <Link href="/buydinar">
            <button className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors">
              <FiPlus className="w-4 h-4" />
              <span>New Exchange</span>
            </button>
          </Link>
        </div>

        {/* Search and filter section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, amount, or currency..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500" />
              <select
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="all">All Orders</option>
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Status overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {["all", ...orderStatuses].map((status) => (
            <motion.div
              key={status}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-xl shadow-sm cursor-pointer transition-colors ${
                activeTab === status
                  ? "ring-2 ring-orange bg-orange-50"
                  : "bg-white"
              }`}
              onClick={() => setActiveTab(status)}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {status === "all" ? "All Orders" : status}
                </span>
                <span className="text-xl font-bold">
                  {status === "all"
                    ? mockOrders.length
                    : mockOrders.filter((o) => o.status === status).length}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Orders list */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <OrderCard
                      order={order}
                      onUploadClick={handleUploadClick}
                      onDeleteRequest={handleDeleteRequest}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders match your criteria</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-orange mt-2 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        <AnimatePresence>
          {showUploadModal && (
            <UploadModal
              order={currentOrder}
              type={uploadType}
              onClose={() => setShowUploadModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
