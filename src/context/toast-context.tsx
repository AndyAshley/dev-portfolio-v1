"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

type ToastMessage = {
  title: string;
  body: string;
};

type ToastState = {
  id: number;
  message: ToastMessage;
  type: ToastType;
};

type ToastAction =
  | { type: "SHOW_TOAST"; payload: ToastState }
  | { type: "REMOVE_TOAST"; payload: { id: number } };

const ToastContext = createContext<
  | {
      toasts: ToastState[];
      dispatchToast: React.Dispatch<ToastAction>;
      showToast: (
        message: ToastMessage,
        type?: ToastType,
        duration?: number
      ) => void;
      removeToast: (id: number) => void;
    }
  | undefined
>(undefined);

// Reducer function
const toastReducer = (state: ToastState[], action: ToastAction) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return [...state, action.payload];

    case "REMOVE_TOAST":
      return state.filter((toast) => toast.id !== action.payload.id);

    default:
      return state;
  }
};

// Toast Context Provider
const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, dispatchToast] = useReducer(toastReducer, []);

  // Function to add toast and auto-remove it after `duration` ms
  const showToast = (
    message: { title: string; body: string },
    type: ToastType = "info",
    duration = 10000
  ) => {
    const id = Date.now();
    dispatchToast({ type: "SHOW_TOAST", payload: { id, message, type } });

    setTimeout(() => {
      setTimeout(() => {
        dispatchToast({ type: "REMOVE_TOAST", payload: { id } });
      }, 100); // Small delay before removing to allow exit animation
    }, duration);
  };

  const removeToast = (id: number) => {
    dispatchToast({ type: "REMOVE_TOAST", payload: { id } });
  };

  const value = { toasts, dispatchToast, showToast, removeToast };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToastContext must be used within a ToastProvider");
  return context;
};

export { ToastProvider, ToastContext };
