import { PhoneIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export function FloatingCallButton() {
  return (
    <motion.a
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      href="tel: 0417 460 236"
      className="fixed bottom-6 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2"
      aria-label="Call Now"
    >
      <PhoneIcon className="w-5 h-5 text-white" />
      <span className="font-medium">Call Now</span>
    </motion.a>
  );
}
