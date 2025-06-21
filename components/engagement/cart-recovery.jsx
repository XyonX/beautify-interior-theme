// "use client"

// import { useState, useEffect } from "react"
// import { X, ShoppingCart, Clock } from "lucide-react"
// import { useEngagementStore } from "@/lib/engagement-store"
// import { useCartStore } from "@/lib/cart-store"

// // interface CartRecoveryProps {
// //   engagement: EngagementState
// // }

// export function CartRecovery({ engagement }) {
//   const { dismissEngagement, completeEngagement } = useEngagementStore()
//   const { items, getTotalPrice } = useCartStore()
//   const [timeLeft, setTimeLeft] = useState(900) // 15 minutes

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           dismissEngagement(engagement.id)
//           return 0
//         }
//         return prev - 1
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [engagement.id, dismissEngagement])

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs.toString().padStart(2, "0")}`
//   }

//   const handleCompleteOrder = () => {
//     completeEngagement(engagement.id, { action: "completed_purchase" })
//     window.location.href = "/checkout"
//   }

//   const handleDismiss = () => {
//     dismissEngagement(engagement.id)
//   }

//   return (
//     <div className="fixed bottom-4 right-4 z-50 bg-white border border-stone-200 shadow-xl max-w-sm w-full">
//       <div className="bg-red-600 text-white p-3 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <ShoppingCart className="w-4 h-4" />
//           <span className="text-sm font-medium">Complete Your Order</span>
//         </div>
//         <button onClick={handleDismiss} className="text-white hover:text-red-200">
//           <X className="w-4 h-4" />
//         </button>
//       </div>

//       <div className="p-4">
//         <div className="mb-4">
//           <p className="text-sm font-medium text-stone-900 mb-1">Don't lose your items!</p>
//           <p className="text-xs text-stone-600">
//             You have {items.length} item{items.length !== 1 ? "s" : ""} waiting in your cart
//           </p>
//         </div>

//         <div className="bg-red-50 border border-red-200 p-3 mb-4 text-center">
//           <div className="flex items-center justify-center gap-1 mb-1">
//             <Clock className="w-3 h-3 text-red-600" />
//             <span className="text-xs text-red-600">Offer expires in:</span>
//           </div>
//           <div className="text-lg font-bold text-red-600">{formatTime(timeLeft)}</div>
//         </div>

//         <div className="space-y-2 mb-4">
//           <div className="flex justify-between text-sm">
//             <span className="text-stone-600">Subtotal:</span>
//             <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between text-sm text-accent3">
//             <span>Extra Discount ({engagement.context?.incentive}):</span>
//             <span className="font-medium">-₹{Math.round(getTotalPrice() * 0.05).toLocaleString()}</span>
//           </div>
//           <div className="border-t pt-2 flex justify-between font-medium">
//             <span>Final Total:</span>
//             <span>₹{Math.round(getTotalPrice() * 0.95).toLocaleString()}</span>
//           </div>
//         </div>

//         <button
//           onClick={handleCompleteOrder}
//           className="w-full bg-accent1 text-white py-2 px-4 text-sm font-medium hover:bg-accent2"
//         >
//           Complete Order & Save {engagement.context?.incentive}
//         </button>

//         <p className="text-xs text-stone-500 text-center mt-2">
//           This discount is only valid for the next {formatTime(timeLeft)}
//         </p>
//       </div>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { X, ShoppingCart, Clock } from "lucide-react";
import { useEngagementStore } from "@/lib/engagement-store";
import { useCartStore } from "@/lib/cart-store";

export function CartRecovery({ engagement }) {
  const { dismissEngagement, completeEngagement } = useEngagementStore();
  const { items, getTotalPrice } = useCartStore();
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          dismissEngagement(engagement.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [engagement.id, dismissEngagement]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCompleteOrder = () => {
    completeEngagement(engagement.id, { action: "completed_purchase" });
    window.location.href = "/checkout";
  };

  const handleDismiss = () => {
    dismissEngagement(engagement.id);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-stone-200 shadow-xl max-w-sm w-full">
      <div className="bg-red-600 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          <span className="text-sm font-medium">Complete Your Order</span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white hover:text-red-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm font-medium text-stone-900 mb-1">
            Don't lose your items!
          </p>
          <p className="text-xs text-stone-600">
            You have {items.length} item{items.length !== 1 ? "s" : ""} waiting
            in your cart
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 p-3 mb-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-3 h-3 text-red-600" />
            <span className="text-xs text-red-600">Offer expires in:</span>
          </div>
          <div className="text-lg font-bold text-red-600">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-stone-600">Subtotal:</span>
            <span className="font-medium">
              ₹{getTotalPrice().toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm text-accent3">
            <span>Extra Discount ({engagement.context?.incentive}):</span>
            <span className="font-medium">
              -₹{Math.round(getTotalPrice() * 0.05).toLocaleString()}
            </span>
          </div>
          <div className="border-t pt-2 flex justify-between font-medium">
            <span>Final Total:</span>
            <span>₹{Math.round(getTotalPrice() * 0.95).toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={handleCompleteOrder}
          className="w-full bg-accent1 text-white py-2 px-4 text-sm font-medium hover:bg-accent2"
        >
          Complete Order & Save {engagement.context?.incentive}
        </button>

        <p className="text-xs text-stone-500 text-center mt-2">
          This discount is only valid for the next {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  );
}
