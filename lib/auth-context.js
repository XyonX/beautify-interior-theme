"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { mockAdminUser } from "./mock-data";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-auth`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log("After checkiing auth : ", user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Autho check  started..");
    checkAuth();

    console.log("Autho check  done");
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include", // Necessary for cookies
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        }
      );

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
