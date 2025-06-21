// "use client"

// // import type React from "react"

// import { useState } from "react"
// import { X, Bell, Package } from "lucide-react"
// import { useEngagementStore } from "@/lib/engagement-store"

// // interface StockReengagementProps {
// //   engagement: EngagementState
// // }

// export function StockReengagement({ engagement }) {
//   const { dismissEngagement, completeEngagement } = useEngagementStore()
//   const [email, setEmail] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!email) return

//     setIsSubmitting(true)
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     completeEngagement(engagement.id, { email, product: engagement.context?.productName })
//     setIsSubmitting(false)
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white max-w-md w-full p-6 relative">
//         <button
//           onClick={() => dismissEngagement(engagement.id)}
//           className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
//         >
//           <X className="w-4 h-4" />
//         </button>

//         <div className="text-center mb-6">
//           <div className="w-12 h-12 bg-orange-500 flex items-center justify-center mx-auto mb-4">
//             <Package className="w-6 h-6 text-white" />
//           </div>
//           <h2 className="text-lg font-medium text-stone-900 mb-2">Item Currently Out of Stock</h2>
//           <p className="text-sm text-stone-600">
//             Get notified when "{engagement.context?.productName || "this item"}" is back in stock
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-stone-300 text-sm focus:outline-none focus:border-orange-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-orange-500 text-white py-2 px-4 text-sm font-medium hover:bg-orange-600 disabled:opacity-50 flex items-center justify-center gap-2"
//           >
//             <Bell className="w-4 h-4" />
//             {isSubmitting ? "Setting Up Alert..." : "Notify Me When Available"}
//           </button>
//         </form>

//         <div className="mt-4 p-3 bg-orange-50 border border-orange-200">
//           <p className="text-xs text-orange-700">
//             <strong>Why notify me?</strong> This helps us understand demand and prioritize restocking popular items.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import { X, Bell, Package } from "lucide-react";
import { useEngagementStore } from "@/lib/engagement-store";

export function StockReengagement({ engagement }) {
  const { dismissEngagement, completeEngagement } = useEngagementStore();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    completeEngagement(engagement.id, {
      email,
      product: engagement.context?.productName,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full p-6 relative">
        <button
          onClick={() => dismissEngagement(engagement.id)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-orange-500 flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-medium text-stone-900 mb-2">
            Item Currently Out of Stock
          </h2>
          <p className="text-sm text-stone-600">
            Get notified when "{engagement.context?.productName || "this item"}"
            is back in stock
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 text-sm focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-2 px-4 text-sm font-medium hover:bg-orange-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Bell className="w-4 h-4" />
            {isSubmitting ? "Setting Up Alert..." : "Notify Me When Available"}
          </button>
        </form>

        <div className="mt-4 p-3 bg-orange-50 border border-orange-200">
          <p className="text-xs text-orange-700">
            <strong>Why notify me?</strong> This helps us understand demand and
            prioritize restocking popular items.
          </p>
        </div>
      </div>
    </div>
  );
}
