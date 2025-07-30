"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import MainLayout from "../../MainLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState("email");

  const router = useRouter();

  const RETURNING_USER = "nahid.priom.06@gmail.com";

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 1500));

      if (email === RETURNING_USER) {
        toast.success("Link verified. Auto-login successful.");
        router.push("/user/dashboard");
      } else {
        toast.success("A link sent! Please verify with 2FA.");
        setStep("otp");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Enter your 2FA code");

    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/user/dashboard");
    } catch {
      toast.error("Invalid code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center bg-orange-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
        >
         
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-100 rounded-full filter blur-xl opacity-70"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full filter blur-xl opacity-70"></div>

          {/* Form Container */}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome to <span className="text-orange">Dinar</span>{" "}
                <span className="text-blue">Exchange</span>
              </h1>
              <p className="text-gray-500 mt-1">
                Please log in to securely access your account
              </p>
              
            </div>

            <form
              onSubmit={step === "email" ? handleEmailSubmit : handleOtpSubmit}
              className="space-y-6"
            >
              {step === "email" && (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-orange focus:ring-2"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              )}

              {step === "otp" && (
                <>
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Enter 2FA Code
                    </label>
                    <input
                      type="text"
                      id="otp"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-blue focus:ring-2"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use your SMS or authenticator app code
                    </p>
                  </div>
                </>
              )}

              <motion.button
                type="submit"
                className="w-full bg-orange text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : step === "email" ? (
                  "Login Now"
                ) : (
                  "Verify 2FA Code"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Need help?{" "}
              <a
                href="#"
                className="font-medium text-blue hover:text-blue-dark transition-colors"
              >
                Contact our support team
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
