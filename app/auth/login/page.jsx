"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    try {
      const success = await login(email, password);
      if (success) {
        router.push("/");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-8 py-8 bg-white">
      <div className="w-full max-w-md">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-stone-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-stone-600">
            Sign in to your account to continue shopping
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="text-xs font-medium text-stone-700 uppercase tracking-wider"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border-stone-200 focus:border-stone-400 focus:ring-stone-400 text-sm"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-xs font-medium text-stone-700 uppercase tracking-wider"
              >
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 border-stone-200 focus:border-stone-400 focus:ring-stone-400 text-sm"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-stone-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-stone-400" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-stone-800 border-stone-300 focus:ring-stone-400 rounded"
                disabled={isLoading}
              />
              <span className="ml-2 text-stone-600">Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-stone-800 hover:text-stone-600 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-stone-800 hover:bg-stone-700 text-white text-sm py-2.5"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-stone-600">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-stone-800 hover:text-stone-600 font-medium"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Social Login */}
        {/* <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-stone-500 tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-stone-200 hover:bg-stone-50 text-sm py-2.5 bg-transparent"
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-stone-200 hover:bg-stone-50 text-sm py-2.5 bg-transparent"
              disabled={isLoading}
            >
              Facebook
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
