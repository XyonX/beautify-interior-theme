"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      userId: null,

      setUserId: (id) => {
        set({ userId: id });
        if (id) {
          get().fetchCartFromBackend();
        }
      },

      fetchCartFromBackend: async () => {
        const userId = get().userId;
        if (!userId) return;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`,
            {
              credentials: "include",
            }
          );
          if (!res.ok) throw new Error("Failed to fetch cart");
          const data = await res.json();
          set({ items: data.cart || [] });
        } catch (error) {
          console.error("Cart fetch error:", error);
        }
      },

      addItem: async (newItem) => {
        const userId = get.userId;

        if (userId) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/add`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  product_id: newItem.id,
                  quantity: newItem.quantity || 1,
                }),
              }
            );
            if (!res.ok) throw new Error("Failed to add to cart");
            await get().fetchCartFromBackend();
          } catch (error) {
            console.error(error);
          }
        }

        {
          const items = get().items;
          const existingItem = items.find((item) => item.id === newItem.id);
          if (existingItem) {
            const newQuantity = existingItem.quantity + (newItem.quantity || 1);
            const maxQuantity = newItem.maxQuantity || 99;
            set({
              items: items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: Math.min(newQuantity, maxQuantity) }
                  : item
              ),
            });
          } else {
            set({
              items: [
                ...items,
                { ...newItem, quantity: newItem.quantity || 1 },
              ],
            });
          }
        }
      },

      removeItem: async (id) => {
        const userId = get().userId;
        if (userId) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/remove/${id}`,
              {
                method: "DELETE",
                credentials: "include",
              }
            );
            if (!res.ok) throw new Error("Failed to remove cart item");
            const data = await res.json();
            set({ items: data.cart || [] });
          } catch (error) {
            console.error(error);
          }
        } else {
          set({
            items: get().items.filter((item) => item.id !== id),
          });
        }
      },
      updateQuantity: async (id, quantity) => {
        const userId = get().userId;
        if (quantity <= 0) {
          await get().removeItem(id);
          return;
        }

        if (userId) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/update/${id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ quantity }),
              }
            );
            if (!res.ok) throw new Error("Failed to update cart item");
            const data = await res.json();
            set({ items: data.cart || [] });
          } catch (error) {
            console.error(error);
          }
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
