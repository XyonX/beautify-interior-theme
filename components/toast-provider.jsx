"use client";

import { useToastStore } from "@/lib/toast-store";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore();

  const getToastIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-amber-200 bg-amber-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-stone-200 bg-white";
    }
  };

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            p-4 rounded-sm border shadow-lg transform transition-all duration-300 ease-in-out pointer-events-auto
            ${getToastStyles(toast.type)}
          `}
          style={{
            animation: "slideInFromRight 0.3s ease-out",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getToastIcon(toast.type)}
            </div>
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="text-sm font-medium text-stone-900 mb-1">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-stone-700">{toast.message}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeToast(toast.id)}
              className="h-6 w-6 p-0 hover:bg-stone-200/50 flex-shrink-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
