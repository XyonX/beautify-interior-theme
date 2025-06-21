// "use client"

// // import type React from "react"

// import { useState } from "react"
// import { X, Gift } from "lucide-react"
// import { useEngagementStore } from "@/lib/engagement-store"

// // interface WelcomeIncentiveProps {
// //   engagement: EngagementState
// // }

// export function WelcomeIncentive({ engagement }) {
//   const { dismissEngagement, completeEngagement } = useEngagementStore()
//   const [formData, setFormData] = useState({ name: "", email: "" })
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!formData.name || !formData.email) return

//     setIsSubmitting(true)

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     completeEngagement(engagement.id, formData)
//     setIsSubmitting(false)
//   }

//   const handleDismiss = () => {
//     dismissEngagement(engagement.id)
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white max-w-md w-full p-6 relative">
//         <button onClick={handleDismiss} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
//           <X className="w-4 h-4" />
//         </button>

//         <div className="text-center mb-6">
//           <div className="w-12 h-12 bg-accent1 flex items-center justify-center mx-auto mb-4">
//             <Gift className="w-6 h-6 text-white" />
//           </div>
//           <h2 className="text-lg font-medium text-stone-900 mb-2">Welcome to BeautifyInterior!</h2>
//           <p className="text-sm text-stone-600">Get {engagement.context?.offer} off your first order</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-xs font-medium text-stone-700 mb-1">Your Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
//               className="w-full px-3 py-2 border border-stone-300 text-sm focus:outline-none focus:border-accent1"
//               placeholder="Enter your name"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
//               className="w-full px-3 py-2 border border-stone-300 text-sm focus:outline-none focus:border-accent1"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-accent1 text-white py-2 px-4 text-sm font-medium hover:bg-accent2 disabled:opacity-50"
//           >
//             {isSubmitting ? "Getting Your Code..." : `Claim ${engagement.context?.offer} Discount`}
//           </button>
//         </form>

//         <p className="text-xs text-stone-500 text-center mt-4">
//           Use code: <span className="font-medium">{engagement.context?.code}</span> at checkout
//         </p>
//       </div>
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import { X, Gift } from "lucide-react";
import { useEngagementStore } from "@/lib/engagement-store";

export function WelcomeIncentive({ engagement }) {
  const { dismissEngagement, completeEngagement } = useEngagementStore();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    completeEngagement(engagement.id, formData);
    setIsSubmitting(false);
  };

  const handleDismiss = () => {
    dismissEngagement(engagement.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full p-6 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-accent1 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-medium text-stone-900 mb-2">
            Welcome to BeautifyInterior!
          </h2>
          <p className="text-sm text-stone-600">
            Get {engagement.context?.offer} off your first order
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-stone-300 text-sm focus:outline-none focus:border-accent1"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-3 py-2 border border-stone-300 text-sm focus:outline-none focus:border-accent1"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent1 text-white py-2 px-4 text-sm font-medium hover:bg-accent2 disabled:opacity-50"
          >
            {isSubmitting
              ? "Getting Your Code..."
              : `Claim ${engagement.context?.offer} Discount`}
          </button>
        </form>

        <p className="text-xs text-stone-500 text-center mt-4">
          Use code:{" "}
          <span className="font-medium">{engagement.context?.code}</span> at
          checkout
        </p>
      </div>
    </div>
  );
}
