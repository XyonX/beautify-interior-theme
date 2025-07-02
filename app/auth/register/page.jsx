"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer", // Add default role
    status: "active", // Add default status
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuthStore();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.status,
      });
      if (result.success) {
        // Show success message instead of immediate redirect
        setError(
          "Registration successful! Please check your email to verify your account."
        );

        // Optional: Auto-redirect after delay
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        // Use specific error message from backend
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-8 py-8 bg-white">
      <div className="w-full max-w-md">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-stone-800 mb-2">
            Create Account
          </h1>
          <p className="text-sm text-stone-600">
            Join us to start transforming your space
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className={`p-3 border text-sm rounded-lg ${
                error.includes("successful")
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-xs font-medium text-stone-700 uppercase tracking-wider"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 w-full border-stone-200 focus:border-stone-400 focus:ring-stone-400 text-sm"
                  placeholder="John"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-xs font-medium text-stone-700 uppercase tracking-wider"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 w-full border-stone-200 focus:border-stone-400 focus:ring-stone-400 text-sm"
                  placeholder="Doe"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-xs font-medium text-stone-700 uppercase tracking-wider"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full border-stone-200 focus:border-stone-400 focus:ring-stone-400 text-sm"
                placeholder="john@example.com"
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pr-10 border-stone-200 focus:border-stone-400 focus:ring-stone-400 text-sm"
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
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

            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-xs font-medium text-stone-700 uppercase tracking-wider"
              >
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pr-10 border-stone-200 focus:border-stone-400 focus:ring-stone-400 text-sm"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-stone-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-stone-400" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="text-sm">
            <label className="flex items-start">
              <input
                type="checkbox"
                className="h-4 w-4 text-stone-800 border-stone-300 focus:ring-stone-400 mt-0.5 rounded"
                required
                disabled={isLoading}
              />
              <span className="ml-3 text-stone-600 leading-relaxed">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-stone-800 hover:text-stone-600 font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-stone-800 hover:text-stone-600 font-medium"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-stone-800 hover:bg-stone-700 text-white text-sm py-2.5"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-stone-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-stone-800 hover:text-stone-600 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Social Registration */}
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

          <div className="mt-6 grid grid-cols-2 gap-3">
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
