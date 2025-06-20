"use client";

import { create } from "zustand";

// export interface Toast {
//   id: string
//   title?: string
//   message: string
//   type: "success" | "error" | "warning" | "info"
//   duration?: number
// }

// interface ToastStore {
//   toasts: Toast[]
//   addToast: (toast: Omit<Toast, "id">) => void
//   removeToast: (id: string) => void
//   clearToasts: () => void
// }

export const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto remove toast after duration
    const duration = toast.duration || 5000;
    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));
