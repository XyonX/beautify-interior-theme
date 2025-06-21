"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// export type EngagementType =
//   | "welcome-incentive"
//   | "whatsapp-conversion"
//   | "exit-capture"
//   | "stock-reengagement"
//   | "newsletter-capture"
//   | "cart-recovery"
//   | "trust-reinforcement"

// export interface EngagementState {
//   id: string
//   type: EngagementType
//   priority: number // 1-5, 5 being highest
//   isActive: boolean
//   hasBeenShown: boolean
//   lastShown?: number
//   context?: Record<string, any>
// }

// interface EngagementStore {
//   // State
//   activeEngagements: EngagementState[]
//   sessionEngagementCount: number
//   visitorData: {
//     isFirstVisit: boolean
//     visitCount: number
//     lastVisit?: number
//     hasSubscribedNewsletter: boolean
//     hasUsedWelcomeOffer: boolean
//     emailCaptured: boolean
//   }

//   // Actions
//   triggerEngagement: (type: EngagementType, context?: Record<string, any>) => void
//   dismissEngagement: (id: string) => void
//   completeEngagement: (id: string, data?: Record<string, any>) => void
//   canShowEngagement: (type: EngagementType) => boolean
//   getActiveEngagement: () => EngagementState | null
//   updateVisitorData: (data: Partial<EngagementStore["visitorData"]>) => void
//   resetSession: () => void
// }

const ENGAGEMENT_PRIORITIES = {
  "exit-capture": 5,
  "cart-recovery": 4,
  "welcome-incentive": 3,
  "stock-reengagement": 3,
  "newsletter-capture": 2,
  "trust-reinforcement": 1,
  "whatsapp-conversion": 1,
};

const MAX_ENGAGEMENTS_PER_SESSION = 2;

export const useEngagementStore = create(
  persist(
    (set, get) => ({
      activeEngagements: [],
      sessionEngagementCount: 0,
      visitorData: {
        isFirstVisit: true,
        visitCount: 1,
        hasSubscribedNewsletter: false,
        hasUsedWelcomeOffer: false,
        emailCaptured: false,
      },

      triggerEngagement: (type, context = {}) => {
        const state = get();

        // Check if we can show this engagement
        if (!state.canShowEngagement(type)) return;

        // Check session limit
        if (state.sessionEngagementCount >= MAX_ENGAGEMENTS_PER_SESSION) return;

        const id = `${type}-${Date.now()}`;
        const priority = ENGAGEMENT_PRIORITIES[type];

        const newEngagement = {
          id,
          type,
          priority,
          isActive: true,
          hasBeenShown: true,
          lastShown: Date.now(),
          context,
        };

        set((state) => ({
          activeEngagements: [...state.activeEngagements, newEngagement].sort(
            (a, b) => b.priority - a.priority
          ), // Sort by priority desc
          sessionEngagementCount: state.sessionEngagementCount + 1,
        }));
      },

      dismissEngagement: (id) => {
        set((state) => ({
          activeEngagements: state.activeEngagements.filter((e) => e.id !== id),
        }));
      },

      completeEngagement: (id, data = {}) => {
        const engagement = get().activeEngagements.find((e) => e.id === id);

        if (engagement) {
          // Update visitor data based on engagement type
          const updates = {};

          switch (engagement.type) {
            case "welcome-incentive":
              updates.hasUsedWelcomeOffer = true;
              updates.emailCaptured = true;
              break;
            case "newsletter-capture":
              updates.hasSubscribedNewsletter = true;
              updates.emailCaptured = true;
              break;
            case "exit-capture":
              updates.emailCaptured = true;
              break;
          }

          set((state) => ({
            activeEngagements: state.activeEngagements.filter(
              (e) => e.id !== id
            ),
            visitorData: { ...state.visitorData, ...updates },
          }));
        }
      },

      canShowEngagement: (type) => {
        const state = get();
        const { visitorData, activeEngagements, sessionEngagementCount } =
          state;

        // Session limit check
        if (sessionEngagementCount >= MAX_ENGAGEMENTS_PER_SESSION) return false;

        // Check if already active
        if (activeEngagements.some((e) => e.type === type && e.isActive))
          return false;

        // Type-specific rules
        switch (type) {
          case "welcome-incentive":
            return visitorData.isFirstVisit && !visitorData.hasUsedWelcomeOffer;

          case "newsletter-capture":
            return (
              !visitorData.hasSubscribedNewsletter && !visitorData.emailCaptured
            );

          case "exit-capture":
            return !visitorData.emailCaptured;

          case "whatsapp-conversion":
            return true; // Always available

          case "trust-reinforcement":
            return true; // Always available

          default:
            return true;
        }
      },

      getActiveEngagement: () => {
        const engagements = get().activeEngagements.filter((e) => e.isActive);
        return engagements.length > 0 ? engagements[0] : null; // Return highest priority
      },

      updateVisitorData: (data) => {
        set((state) => ({
          visitorData: { ...state.visitorData, ...data },
        }));
      },

      resetSession: () => {
        set((state) => ({
          sessionEngagementCount: 0,
          visitorData: {
            ...state.visitorData,
            visitCount: state.visitorData.visitCount + 1,
            isFirstVisit: false,
            lastVisit: Date.now(),
          },
        }));
      },
    }),
    {
      name: "engagement-storage",
      partialize: (state) => ({
        visitorData: state.visitorData,
      }),
    }
  )
);
