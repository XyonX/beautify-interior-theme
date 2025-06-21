// "use client";

// // import type React from "react"

// import { useState } from "react";
// import { X, Mail, Sparkles } from "lucide-react";
// import { useEngagementStore } from "@/lib/engagement-store";

// // interface NewsletterCaptureProps {
// //   engagement: EngagementState
// // }

// export function NewsletterCapture({ engagement }) {
//   const { dismissEngagement, completeEngagement } = useEngagementStore();
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isDismissed, setIsDismissed] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     setIsSubmitting(true);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     completeEngagement(engagement.id, { email });
//     setIsSubmitting(false);
//   };

//   const handleDismiss = () => {
//     setIsDismissed(true);
//     setTimeout(() => dismissEngagement(engagement.id), 300);
//   };

//   if (isDismissed) return null;

//   return (
//     <div className="fixed top-0 left-0 right-0 z-30 bg-stone-900 text-white p-3 shadow-lg">
//       <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-accent1 flex items-center justify-center">
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <div>
//             <p className="text-sm font-medium">
//               Get Weekly Design Inspiration & Exclusive Deals
//             </p>
//             <p className="text-xs text-stone-300">
//               Join 10,000+ design lovers getting our curated home decor trends
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <form onSubmit={handleSubmit} className="flex items-center gap-2">
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-stone-400" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-9 pr-3 py-2 bg-white text-stone-900 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-accent1"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-accent1 text-white px-4 py-2 text-xs font-medium hover:bg-accent2 disabled:opacity-50 whitespace-nowrap"
//             >
//               {isSubmitting ? "Subscribing..." : "Subscribe"}
//             </button>
//           </form>

//           <button
//             onClick={handleDismiss}
//             className="text-stone-400 hover:text-white ml-2"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { X, Mail, Sparkles } from "lucide-react";
import { useEngagementStore } from "@/lib/engagement-store";

export function NewsletterCapture({ engagement }) {
  const { dismissEngagement, completeEngagement } = useEngagementStore();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    completeEngagement(engagement.id, { email });
    setIsSubmitting(false);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setTimeout(() => dismissEngagement(engagement.id), 300);
  };

  if (isDismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-stone-900 text-white p-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent1 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Get Weekly Design Inspiration & Exclusive Deals
            </p>
            <p className="text-xs text-stone-300">
              Join 10,000+ design lovers getting our curated home decor trends
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 pr-3 py-2 bg-white text-stone-900 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-accent1"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent1 text-white px-4 py-2 text-xs font-medium hover:bg-accent2 disabled:opacity-50 whitespace-nowrap"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <button
            onClick={handleDismiss}
            className="text-stone-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
