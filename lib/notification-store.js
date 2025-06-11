import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotificationStore = create()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      addNotification: (notification) => {
        const newNotification = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isRead: false,
          ...notification,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
      },
      markAsRead: (id) => {
        set((state) => {
          const updatedNotifications = state.notifications.map((notification) =>
            notification.id === id
              ? { ...notification, isRead: true }
              : notification
          );
          const unreadCount = updatedNotifications.filter(
            (notification) => !notification.isRead
          ).length;
          return { notifications: updatedNotifications, unreadCount };
        });
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            isRead: true,
          })),
          unreadCount: 0,
        }));
      },
      clearNotification: (id) => {
        set((state) => {
          const updatedNotifications = state.notifications.filter(
            (notification) => notification.id !== id
          );
          const unreadCount = updatedNotifications.filter(
            (notification) => !notification.isRead
          ).length;
          return { notifications: updatedNotifications, unreadCount };
        });
      },
      clearAllNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      },
    }),
    {
      name: "beautify-notifications",
    }
  )
);
