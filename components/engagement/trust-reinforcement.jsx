// "use client"

// import { useEffect, useState } from "react"
// import { Star, Users, Truck, Shield } from "lucide-react"
// import { useEngagementStore} from "@/lib/engagement-store"

// // interface TrustReinforcementProps {
// //   engagement: EngagementState
// // }

// export function TrustReinforcement({ engagement }) {
//   const { dismissEngagement } = useEngagementStore()
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false)
//       setTimeout(() => dismissEngagement(engagement.id), 300)
//     }, 4000) // Show for 4 seconds

//     return () => clearTimeout(timer)
//   }, [engagement.id, dismissEngagement])

//   const getIcon = () => {
//     const message = engagement.context?.message || ""
//     if (message.includes("rating") || message.includes("★")) return <Star className="w-3 h-3" />
//     if (message.includes("people") || message.includes("customers")) return <Users className="w-3 h-3" />
//     if (message.includes("shipping")) return <Truck className="w-3 h-3" />
//     return <Shield className="w-3 h-3" />
//   }

//   const getColor = () => {
//     const message = engagement.context?.message || ""
//     if (message.includes("rating") || message.includes("★")) return "bg-yellow-500"
//     if (message.includes("shipping")) return "bg-accent3"
//     return "bg-accent1"
//   }

//   return (
//     <div
//       className={`fixed bottom-4 left-4 z-30 transition-all duration-300 ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
//       }`}
//     >
//       <div className="bg-white border border-stone-200 shadow-lg p-3 max-w-xs">
//         <div className="flex items-center gap-2">
//           <div className={`w-6 h-6 ${getColor()} text-white flex items-center justify-center`}>{getIcon()}</div>
//           <p className="text-xs text-stone-700 font-medium">{engagement.context?.message}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { Star, Users, Truck, Shield } from "lucide-react"
import { useEngagementStore } from "@/lib/engagement-store"


export function TrustReinforcement({ engagement }) {
  const { dismissEngagement } = useEngagementStore()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => dismissEngagement(engagement.id), 300)
    }, 4000) // Show for 4 seconds

    return () => clearTimeout(timer)
  }, [engagement.id, dismissEngagement])

  const getIcon = () => {
    const message = engagement.context?.message || ""
    if (message.includes("rating") || message.includes("★")) return <Star className="w-3 h-3" />
    if (message.includes("people") || message.includes("customers")) return <Users className="w-3 h-3" />
    if (message.includes("shipping")) return <Truck className="w-3 h-3" />
    return <Shield className="w-3 h-3" />
  }

  const getColor = () => {
    const message = engagement.context?.message || ""
    if (message.includes("rating") || message.includes("★")) return "bg-yellow-500"
    if (message.includes("shipping")) return "bg-accent3"
    return "bg-accent1"
  }

  return (
    <div
      className={`fixed bottom-4 left-4 z-30 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="bg-white border border-stone-200 shadow-lg p-3 max-w-xs">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 ${getColor()} text-white flex items-center justify-center`}>{getIcon()}</div>
          <p className="text-xs text-stone-700 font-medium">{engagement.context?.message}</p>
        </div>
      </div>
    </div>
  )
}
