// "use client";

// import { useState } from "react";
// import { MessageCircle, X, Minimize2 } from "lucide-react";
// import { useEngagementStore } from "@/lib/engagement-store";

// // interface WhatsAppConversionProps {
// //   engagement: EngagementState
// // }

// export function WhatsAppConversion({ engagement }) {
//   const { dismissEngagement } = useEngagementStore();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);

//   const handleWhatsAppClick = () => {
//     const message = encodeURIComponent(
//       "Hi! I'm interested in your home decor products. Can you help me find the perfect items for my space?"
//     );
//     window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
//   };

//   if (isMinimized) {
//     return (
//       <div className="fixed bottom-4 right-4 z-40">
//         <button
//           onClick={() => setIsMinimized(false)}
//           className="w-12 h-12 bg-accent3 text-white flex items-center justify-center hover:bg-green-600 shadow-lg"
//         >
//           <MessageCircle className="w-5 h-5" />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed bottom-4 right-4 z-40">
//       {isExpanded ? (
//         <div className="bg-white border border-stone-200 shadow-lg w-80 mb-4">
//           <div className="bg-accent3 text-white p-3 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <MessageCircle className="w-4 h-4" />
//               <span className="text-sm font-medium">
//                 Chat with Design Expert
//               </span>
//             </div>
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={() => setIsMinimized(true)}
//                 className="text-white hover:text-green-200"
//               >
//                 <Minimize2 className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => dismissEngagement(engagement.id)}
//                 className="text-white hover:text-green-200"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           <div className="p-4">
//             <div className="bg-stone-50 p-3 mb-4">
//               <p className="text-sm text-stone-700 mb-2">
//                 👋 Hi! I'm here to help you find the perfect decor for your
//                 space.
//               </p>
//               <p className="text-xs text-stone-600">
//                 Get personalized recommendations and instant support!
//               </p>
//             </div>

//             <button
//               onClick={handleWhatsAppClick}
//               className="w-full bg-accent3 text-white py-2 px-4 text-sm font-medium hover:bg-green-600 flex items-center justify-center gap-2"
//             >
//               <MessageCircle className="w-4 h-4" />
//               Start WhatsApp Chat
//             </button>

//             <p className="text-xs text-stone-500 text-center mt-2">
//               Usually replies within minutes
//             </p>
//           </div>
//         </div>
//       ) : null}

//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="w-14 h-14 bg-accent3 text-white flex items-center justify-center hover:bg-green-600 shadow-lg relative"
//       >
//         <MessageCircle className="w-6 h-6" />
//         {!isExpanded && (
//           <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 animate-pulse"></div>
//         )}
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { MessageCircle, X, Minimize2 } from "lucide-react";
import { useEngagementStore } from "@/lib/engagement-store";

export function WhatsAppConversion({ engagement }) {
  const { dismissEngagement } = useEngagementStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in your home decor products. Can you help me find the perfect items for my space?"
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="w-12 h-12 bg-accent3 text-white flex items-center justify-center hover:bg-green-600 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isExpanded ? (
        <div className="bg-white border border-stone-200 shadow-lg w-80 mb-4">
          <div className="bg-accent3 text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                Chat with Design Expert
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white hover:text-green-200"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => dismissEngagement(engagement.id)}
                className="text-white hover:text-green-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-stone-50 p-3 mb-4">
              <p className="text-sm text-stone-700 mb-2">
                👋 Hi! I'm here to help you find the perfect decor for your
                space.
              </p>
              <p className="text-xs text-stone-600">
                Get personalized recommendations and instant support!
              </p>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-accent3 text-white py-2 px-4 text-sm font-medium hover:bg-green-600 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Start WhatsApp Chat
            </button>

            <p className="text-xs text-stone-500 text-center mt-2">
              Usually replies within minutes
            </p>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-accent3 text-white flex items-center justify-center hover:bg-green-600 shadow-lg relative"
      >
        <MessageCircle className="w-6 h-6" />
        {!isExpanded && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 animate-pulse"></div>
        )}
      </button>
    </div>
  );
}
