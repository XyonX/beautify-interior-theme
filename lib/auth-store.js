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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Essential for cookie handling
              body: JSON.stringify({
                email,
                password,
              }),
            }
          );

          const responseData = await res.json();

          if (!res.ok) {
            // Handle HTTP errors (4xx/5xx)
            const errorMessage =
              responseData.message || "login failed. Please try again.";
            set({ isLoading: false, error: errorMessage });
            console.log("Login failed!!");
            return false;
          }
          set({ user: responseData.user, isLoading: false });
          return true;
        } catch (error) {
          set({
            error: "Network error. Please check your connection.",
            isLoading: false,
          });
          return false;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Added missing headers
              },
              body: JSON.stringify({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                role: "customer",
                status: "active",
              }),
            }
          );
          const responseData = await res.json();

          if (!res.ok) {
            // Handle HTTP errors (4xx/5xx)
            const errorMessage =
              responseData.message || "Registration failed. Please try again.";
            set({ isLoading: false, error: errorMessage });
            console.log("Registration failed!!");
            return false;
          }
          // Handle successful response (2xx)
          set({ isLoading: false });
          console.log("Registration success!!");
          return {
            success: true,
            message: responseData.message,
            userId: responseData.userId,
          };
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

        console.log("Adding user for : ", user);

        try {
          // Transform data for backend compatibility
          const backendData = {
            ...addressData,
            is_default: addressData.isDefault, // Convert field name
          };

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addresses`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(backendData),
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.eeor || "Failed to add address");
          }
          const newAddress = await res.json();

          // Update local state
          set((state) => {
            if (!state.user) return state;

            let updatedAddresses = [...state.user.addresses];

            if (newAddress.isDefault) {
              updatedAddresses = updatedAddresses.map((addr) => ({
                ...addr,
                isDefault: false,
              }));
            }

            return {
              ...state,
              user: {
                ...state.user,
                addresses: [...updatedAddresses, newAddress],
                updatedAt: new Date().toISOString(),
              },
              isLoading: false,
            };
          });

          return true;
        } catch (error) {
          set({
            error: error.message || "Failed to add address",
            isLoading: false,
          });
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
