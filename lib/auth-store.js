import { create } from "zustand";
import { persist } from "zustand/middleware";

// export interface User {
//   id: string
//   email: string
//   firstName: string
//   lastName: string
//   phone?: string
//   dateOfBirth?: string
//   avatar?: string
//   isEmailVerified: boolean
//   role: "customer" | "admin" | "super_admin"
//   status: "active" | "suspended" | "deleted"
//   marketingOptIn: boolean
//   addresses: Address[]
//   createdAt: string
//   updatedAt: string
// }

// export interface Address {
//   id: string
//   type: "home" | "work" | "other"
//   firstName: string
//   lastName: string
//   company?: string
//   address: string
//   address2?: string
//   city: string
//   state: string
//   zipCode: string
//   country: string
//   phone?: string
//   isDefault: boolean
// }

// export interface RegisterData {
//   firstName: string
//   lastName: string
//   email: string
//   password: string
//   phone?: string
// }

// interface AuthState {
//   user: User | null
//   isLoading: boolean
//   error: string | null
//   login: (email: string, password: string) => Promise<boolean>
//   register: (data: RegisterData) => Promise<boolean>
//   logout: () => void
//   updateProfile: (data: Partial<User>) => Promise<boolean>
//   addAddress: (address: Omit<Address, "id">) => Promise<boolean>
//   updateAddress: (id: string, address: Partial<Address>) => Promise<boolean>
//   deleteAddress: (id: string) => Promise<boolean>
//   forgotPassword: (email: string) => Promise<boolean>
//   resetPassword: (token: string, password: string) => Promise<boolean>
//   verifyEmail: (token: string) => Promise<boolean>
//   resendVerification: () => Promise<boolean>
//   clearError: () => void
// }

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock successful login
          if (email === "user@example.com" && password === "password123") {
            const mockUser = {
              id: "1",
              email: "user@example.com",
              firstName: "John",
              lastName: "Doe",
              phone: "+1-555-0123",
              isEmailVerified: true,
              role: "customer",
              status: "active",
              marketingOptIn: true,
              addresses: [
                {
                  id: "1",
                  type: "home",
                  firstName: "John",
                  lastName: "Doe",
                  address: "123 Main St",
                  city: "New York",
                  state: "NY",
                  zipCode: "10001",
                  country: "United States",
                  isDefault: true,
                },
              ],
              createdAt: "2023-01-01T00:00:00Z",
              updatedAt: "2023-01-01T00:00:00Z",
            };

            set({ user: mockUser, isLoading: false });
            return true;
          } else {
            set({ error: "Invalid email or password", isLoading: false });
            return false;
          }
        } catch (error) {
          set({ error: "Login failed. Please try again.", isLoading: false });
          return false;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Mock successful registration
          const mockUser = {
            id: Date.now().toString(),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            isEmailVerified: false,
            role: "customer",
            status: "active",
            marketingOptIn: true,
            addresses: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set({ user: mockUser, isLoading: false });
          return true;
        } catch (error) {
          set({
            error: "Registration failed. Please try again.",
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({ user: null, error: null });
      },

      updateProfile: async (data) => {
        const { user } = get();
        if (!user) return false;

        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const updatedUser = {
            ...user,
            ...data,
            updatedAt: new Date().toISOString(),
          };
          set({ user: updatedUser, isLoading: false });
          return true;
        } catch (error) {
          set({ error: "Failed to update profile", isLoading: false });
          return false;
        }
      },

      addAddress: async (addressData) => {
        const { user } = get();
        if (!user) return false;

        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const newAddress = {
            ...addressData,
            id: Date.now().toString(),
          };

          // If this is the default address, unset others
          let updatedAddresses = user.addresses;
          if (newAddress.isDefault) {
            updatedAddresses = user.addresses.map((addr) => ({
              ...addr,
              isDefault: false,
            }));
          }

          const updatedUser = {
            ...user,
            addresses: [...updatedAddresses, newAddress],
            updatedAt: new Date().toISOString(),
          };

          set({ user: updatedUser, isLoading: false });
          return true;
        } catch (error) {
          set({ error: "Failed to add address", isLoading: false });
          return false;
        }
      },

      updateAddress: async (id, addressData) => {
        const { user } = get();
        if (!user) return false;

        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          let updatedAddresses = user.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...addressData } : addr
          );

          // If this address is being set as default, unset others
          if (addressData.isDefault) {
            updatedAddresses = updatedAddresses.map((addr) =>
              addr.id === id ? addr : { ...addr, isDefault: false }
            );
          }

          const updatedUser = {
            ...user,
            addresses: updatedAddresses,
            updatedAt: new Date().toISOString(),
          };

          set({ user: updatedUser, isLoading: false });
          return true;
        } catch (error) {
          set({ error: "Failed to update address", isLoading: false });
          return false;
        }
      },

      deleteAddress: async (id) => {
        const { user } = get();
        if (!user) return false;

        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const updatedUser = {
            ...user,
            addresses: user.addresses.filter((addr) => addr.id !== id),
            updatedAt: new Date().toISOString(),
          };

          set({ user: updatedUser, isLoading: false });
          return true;
        } catch (error) {
          set({ error: "Failed to delete address", isLoading: false });
          return false;
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock successful password reset request
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({ error: "Failed to send reset email", isLoading: false });
          return false;
        }
      },

      resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock successful password reset
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({ error: "Failed to reset password", isLoading: false });
          return false;
        }
      },

      verifyEmail: async (token) => {
        const { user } = get();
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (user) {
            const updatedUser = { ...user, isEmailVerified: true };
            set({ user: updatedUser, isLoading: false });
          } else {
            set({ isLoading: false });
          }
          return true;
        } catch (error) {
          set({ error: "Failed to verify email", isLoading: false });
          return false;
        }
      },

      resendVerification: async () => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({ isLoading: false });
          return true;
        } catch (error) {
          set({ error: "Failed to resend verification", isLoading: false });
          return false;
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
