"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [validationError, setValidationError] = useState("");

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setValidationError(emailError);
      return;
    }

    const success = await forgotPassword(email);
    if (success) {
      setEmailSent(true);
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (validationError) {
      setValidationError("");
    }
    clearError();
  };

  if (emailSent) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-accent2-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>

          <Card className="border-gray-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-accent3-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-accent3-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-gray-600">
                We've sent a password reset link to your email address
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  We sent a password reset link to:
                </p>
                <p className="font-medium text-gray-900">{email}</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Click the link in the email to reset your password. If you
                  don't see the email, check your spam folder.
                </p>

                <Button
                  onClick={() => setEmailSent(false)}
                  variant="outline"
                  className="w-full border-accent2-200 text-accent2-600 hover:bg-accent2-50"
                >
                  Try Different Email
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link
                    href="/auth/login"
                    className="text-accent2-600 hover:text-accent2-700 hover:underline font-medium"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-accent2-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>

        <Card className="border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-gray-600">
              No worries! Enter your email and we'll send you a reset link
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-accent1-200 bg-accent1-50">
                <AlertDescription className="text-accent1-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`pl-10 ${
                      validationError
                        ? "border-accent1-300 focus:border-accent1-500"
                        : "focus:border-accent2-500"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {validationError && (
                  <p className="text-sm text-accent1-600">{validationError}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-accent2-600 hover:bg-accent2-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Reset Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-accent2-600 hover:text-accent2-700 hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
