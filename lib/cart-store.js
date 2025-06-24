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
        console.log("fetchCartFromBackend: userId:", userId); // Log userId
        if (!userId) {
          console.log("fetchCartFromBackend: No userId, aborting");
          return;
        }

        try {
          console.log("fetchCartFromBackend: Fetching cart from backend...");
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
            {
              credentials: "include",
            }
          );

          console.log("fetchCartFromBackend: Response status:", res.status);
          if (!res.ok) throw new Error("Failed to fetch cart");

          const data = await res.json();
          console.log("fetchCartFromBackend: Received cart data:", data);
          set({ items: data.cart || [] });
          console.log("fetchCartFromBackend: Cart updated in state");
        } catch (error) {
          console.error("Cart fetch error:", error);
        }
      },

      addItem: async (newItem) => {
        console.log("addItem: Adding new item:", newItem);
        const userId = get().userId;
        console.log("addItem: userId:", userId);

        if (userId) {
          try {
            console.log("addItem: Attempting to add item to backend...");
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
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
            console.log("addItem: Backend response status:", res.status);
            if (!res.ok) throw new Error("Failed to add to cart");

            console.log(
              "addItem: Successfully added to backend, refreshing cart..."
            );
            await get().fetchCartFromBackend();
          } catch (error) {
            console.error("addItem: Backend error:", error);
          }
        }

        {
          console.log("addItem: Updating local state...");
          const items = get().items;
          console.log("addItem: Current items:", items);
          const existingItem = items.find((item) => item.id === newItem.id);

          if (existingItem) {
            console.log("addItem: Item exists, updating quantity");
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
            console.log("addItem: New item, adding to cart");
            set({
              items: [
                ...items,
                { ...newItem, quantity: newItem.quantity || 1 },
              ],
            });
          }
          console.log("addItem: Local state updated");
        }
      },

      removeItem: async (id) => {
        const userId = get().userId;
        if (userId) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/remove/${id}`,
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/update/${id}`,
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
        const items = get().items;
        console.log("Cart items :", items);
        const total = items.reduce((total, item) => total + item.quantity, 0);
        console.log(
          "[getTotalItems] Called. Items:",
          items,
          "| Total quantity:",
          total
        );
        return total;
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
