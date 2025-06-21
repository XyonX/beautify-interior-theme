import { create } from "zustand";
import { persist } from "zustand/middleware";

// interface SessionState {
//   sessionId: string | null;
//   setSessionId: (id: string) => void;
// }

export const useSessionStore = create(
  persist(
    (set) => ({
      sessionId: null,
      setSessionId: (id) => set({ sessionId: id }),
    }),
    {
      name: "session-storage", // localStorage key
      getStorage: () => localStorage,
    }
  )
);
