"use client"; // Ensure this runs only on the client side

import React, { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define toast types
type ToastType = "success" | "error" | "info" | "warning";

// Define the context type
interface ToastContextType {
    showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
}

// Create the context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider Component
export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const showToast = (message: string, type: ToastType = "success", options?: ToastOptions) => {
        toast[type](message, {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            ...options,
        });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};

// Custom hook to use the toast context
export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
