// "use client";

// // import type React from "react"

// import { useState, useEffect } from "react";
// import { X, Clock, Zap } from "lucide-react";
// import { useEngagementStore } from "@/lib/engagement-store";

// // interface ExitCaptureProps {
// //   engagement: EngagementState
// // }

// export function ExitCapture({ engagement }) {
//   const { dismissEngagement, completeEngagement } = useEngagementStore();
//   const [email, setEmail] = useState("");
//   const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           dismissEngagement(engagement.id);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [engagement.id, dismissEngagement]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     setIsSubmitting(true);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     completeEngagement(engagement.id, { email });
//     setIsSubmitting(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white max-w-lg w-full p-8 relative">
//         <button
//           onClick={() => dismissEngagement(engagement.id)}
//           className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
//         >
//           <X className="w-4 h-4" />
//         </button>

//         <div className="text-center mb-6">
//           <div className="w-16 h-16 bg-red-600 flex items-center justify-center mx-auto mb-4">
//             <Zap className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-stone-900 mb-2">
//             Wait! Don't Leave Empty Handed
//           </h2>
//           <p className="text-lg text-red-600 font-medium mb-2">
//             {engagement.context?.urgency}
//           </p>
//           <p className="text-sm text-stone-600">
//             Get {engagement.context?.offer} off your entire order
//           </p>
//         </div>

//         <div className="bg-red-50 border border-red-200 p-4 mb-6 text-center">
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <Clock className="w-4 h-4 text-red-600" />
//             <span className="text-sm font-medium text-red-600">
//               Time Remaining:
//             </span>
//           </div>
//           <div className="text-2xl font-bold text-red-600">
//             {formatTime(timeLeft)}
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-xs font-medium text-stone-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 border border-stone-300 text-sm focus:outline-none focus:border-red-500"
//               placeholder="Enter your email to claim discount"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-red-600 text-white py-3 px-4 text-sm font-medium hover:bg-red-700 disabled:opacity-50"
//           >
//             {isSubmitting
//               ? "Claiming Discount..."
//               : `Claim ${engagement.context?.offer} Discount Now`}
//           </button>
//         </form>

//         <p className="text-xs text-stone-500 text-center mt-4">
//           This offer expires in {formatTime(timeLeft)} and won't be shown again
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { X, Clock, Zap } from "lucide-react";
import { useEngagementStore } from "@/lib/engagement-store";

export function ExitCapture({ engagement }) {
  const { dismissEngagement, completeEngagement } = useEngagementStore();
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    completeEngagement(engagement.id, { email });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-lg w-full p-8 relative">
        <button
          onClick={() => dismissEngagement(engagement.id)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-600 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Wait! Don't Leave Empty Handed
          </h2>
          <p className="text-lg text-red-600 font-medium mb-2">
            {engagement.context?.urgency}
          </p>
          <p className="text-sm text-stone-600">
            Get {engagement.context?.offer} off your entire order
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 p-4 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              Time Remaining:
            </span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {formatTime(timeLeft)}
          </div>
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
              className="w-full px-4 py-3 border border-stone-300 text-sm focus:outline-none focus:border-red-500"
              placeholder="Enter your email to claim discount"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-3 px-4 text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting
              ? "Claiming Discount..."
              : `Claim ${engagement.context?.offer} Discount Now`}
          </button>
        </form>

        <p className="text-xs text-stone-500 text-center mt-4">
          This offer expires in {formatTime(timeLeft)} and won't be shown again
        </p>
      </div>
    </div>
  );
}
