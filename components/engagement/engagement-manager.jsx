"use client"

import { useEffect } from "react"
import { useEngagementStore } from "@/lib/engagement-store"
import { useWelcomeIncentive, useExitIntent, useScrollTriggers, useTrustReinforcement } from "@/lib/engagement-triggers"

// Import all engagement components
import { WelcomeIncentive } from "./welcome-incentive"
import { ExitCapture } from "./exit-capture"
import { WhatsAppConversion } from "./whatsapp-conversion"
import { NewsletterCapture } from "./newsletter-capture"
import { TrustReinforcement } from "./trust-reinforcement"
import { StockReengagement } from "./stock-reengagement"
import { CartRecovery } from "./cart-recovery"

export function EngagementManager() {
  const { getActiveEngagement, resetSession } = useEngagementStore()

  // Initialize all triggers
  useWelcomeIncentive()
  useExitIntent()
  useScrollTriggers()
  useTrustReinforcement()

  // Reset session on mount (new page load)
  useEffect(() => {
    resetSession()
  }, [resetSession])

  const activeEngagement = getActiveEngagement()

  if (!activeEngagement) return null

  // Render the appropriate engagement component
  switch (activeEngagement.type) {
    case "welcome-incentive":
      return <WelcomeIncentive engagement={activeEngagement} />

    case "exit-capture":
      return <ExitCapture engagement={activeEngagement} />

    case "whatsapp-conversion":
      return <WhatsAppConversion engagement={activeEngagement} />

    case "newsletter-capture":
      return <NewsletterCapture engagement={activeEngagement} />

    case "trust-reinforcement":
      return <TrustReinforcement engagement={activeEngagement} />

    case "stock-reengagement":
      return <StockReengagement engagement={activeEngagement} />

    case "cart-recovery":
      return <CartRecovery engagement={activeEngagement} />

    default:
      return null
  }
}
