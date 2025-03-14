"use client";

// Components
import FadeInContent from "@/lib/motion";
import { AnimatePresence } from "framer-motion";
import { useToastContext } from "@/context/toast-context";

// Icons
import { X } from "lucide-react";

// Toast styles based on type
const toastStyles = {
  success: {
    border: "border-green-500",
    icon: "hover:text-green-500",
  },
  error: {
    border: "border-red-500",
    icon: "hover:text-red-500",
  },
  info: {
    border: "border-blue-500",
    icon: "hover:text-blue-500",
  },
};

/**
 * Container for the global toast messages
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="fixed bottom-1/8 flex flex-col md:items-end items-center w-full px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          return (
            <FadeInContent
              from="bottom"
              key={toast.id}
              toastId={toast.id}
              exit
              className="mb-5 pointer-events-auto"
            >
              <div
                className={`bg-cyber-black/98 px-4 py-2 rounded shadow-lg max-w-100 border cursor-default ${
                  toastStyles[toast.type].border
                }`}
              >
                <div className="flex justify-between items-center mb-3 text-balance">
                  <h2 className="text-[18px]">{toast.message.title}</h2>
                  <X
                    onClick={() => removeToast(toast.id)}
                    className={`cursor-pointer hover:transform hover:scale-115 duration-200 ${
                      toastStyles[toast.type].icon
                    }`}
                  />
                </div>
                {toast.message.body}
              </div>
            </FadeInContent>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
