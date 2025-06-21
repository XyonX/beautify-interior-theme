"use client"

import { useEffect, useRef, useCallback } from "react"
import { useEngagementStore } from "./engagement-store"

// Hook for delayed welcome incentive
export function useWelcomeIncentive() {
  const { triggerEngagement, canShowEngagement, visitorData } = useEngagementStore()
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (hasTriggered.current || !visitorData.isFirstVisit) return

    const timer = setTimeout(
      () => {
        if (canShowEngagement("welcome-incentive")) {
          triggerEngagement("welcome-incentive", {
            offer: "10% OFF",
            code: "WELCOME10",
          })
          hasTriggered.current = true
        }
      },
      Math.random() * 5000 + 5000,
    ) // 5-10 seconds

    return () => clearTimeout(timer)
  }, [triggerEngagement, canShowEngagement, visitorData.isFirstVisit])
}

// Hook for exit intent detection (desktop only)
export function useExitIntent() {
  const { triggerEngagement, canShowEngagement } = useEngagementStore()
  const hasTriggered = useRef(false)

  useEffect(() => {
    // Only on desktop
    if (typeof window === "undefined" || window.innerWidth < 768) return

    const handleMouseLeave = (e) => {
      if (hasTriggered.current) return

      // Detect exit intent (mouse moving to top of screen)
      if (e.clientY <= 0 && e.relatedTarget === null) {
        if (canShowEngagement("exit-capture")) {
          triggerEngagement("exit-capture", {
            offer: "15% OFF",
            urgency: "Limited Time Offer!",
            timeLimit: "10 minutes",
          })
          hasTriggered.current = true
        }
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [triggerEngagement, canShowEngagement])
}

// Hook for scroll-based triggers
export function useScrollTriggers() {
  const { triggerEngagement, canShowEngagement } = useEngagementStore()
  const scrollTriggered = useRef({
    newsletter: false,
    whatsapp: false,
    trust: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100

      // Newsletter capture at 30% scroll
      if (scrollPercent > 30 && !scrollTriggered.current.newsletter) {
        if (canShowEngagement("newsletter-capture")) {
          triggerEngagement("newsletter-capture")
          scrollTriggered.current.newsletter = true
        }
      }

      // WhatsApp conversion at 50% scroll
      if (scrollPercent > 50 && !scrollTriggered.current.whatsapp) {
        triggerEngagement("whatsapp-conversion", {
          context: "scroll-triggered",
        })
        scrollTriggered.current.whatsapp = true
      }

      // Trust reinforcement at 70% scroll
      if (scrollPercent > 70 && !scrollTriggered.current.trust) {
        triggerEngagement("trust-reinforcement", {
          message: "127 people viewed this page in the last hour",
          type: "viewer-count",
        })
        scrollTriggered.current.trust = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [triggerEngagement, canShowEngagement])
}

// Hook for cart abandonment detection
export function useCartAbandonment() {
  const { triggerEngagement, canShowEngagement } = useEngagementStore()
  const abandonmentTimer = useRef()

  const resetTimer = useCallback(() => {
    if (abandonmentTimer.current) {
      clearTimeout(abandonmentTimer.current)
    }
  }, [])

  const startTimer = useCallback(() => {
    resetTimer()
    abandonmentTimer.current = setTimeout(() => {
      if (canShowEngagement("cart-recovery")) {
        triggerEngagement("cart-recovery", {
          incentive: "5% OFF",
          urgency: "Complete your purchase now!",
        })
      }
    }, 300000) // 5 minutes
  }, [triggerEngagement, canShowEngagement, resetTimer])

  useEffect(() => {
    return () => resetTimer()
  }, [resetTimer])

  return { startTimer, resetTimer }
}

// Hook for time-based trust reinforcement
export function useTrustReinforcement() {
  const { triggerEngagement } = useEngagementStore()

  useEffect(() => {
    const messages = [
      "23 people bought this item today",
      "156 customers are viewing this category",
      "Free shipping on orders over ₹999",
      "4.8★ rating from 2,847 customers",
      "Trusted by 50,000+ happy customers",
    ]

    const showTrustMessage = () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      triggerEngagement("trust-reinforcement", {
        message: randomMessage,
        type: "social-proof",
      })
    }

    // Show every 20-30 seconds
    const interval = setInterval(showTrustMessage, Math.random() * 10000 + 20000)

    return () => clearInterval(interval)
  }, [triggerEngagement])
}
