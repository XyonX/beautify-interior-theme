"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, verifyEmail, isLoading, error, clearError } = useAuthStore();

  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [resendCooldown, setResendCooldown] = useState(0);

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      handleVerification(token);
    }
  }, [token]);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (user.isEmailVerified && !token) {
      router.push("/account");
    }
  }, [user, router, token]);

  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleVerification = async (verificationToken) => {
    const success = await verifyEmail(verificationToken);
    if (success) {
      setVerificationStatus("success");
      setTimeout(() => {
        router.push("/account");
      }, 3000);
    } else {
      setVerificationStatus("error");
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;

    // Simulate resending email
    setResendCooldown(60);
    // In a real app, you'd call an API to resend the verification email
    console.log("Resending verification email...");
  };

  if (!user) {
    return null;
  }

  if (verificationStatus === "success") {
    return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="border-gray-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-accent3-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-accent3-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Email Verified!
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your email has been successfully verified
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Welcome to BeautifyInterior! You can now access all features
                  of your account.
                </p>

                <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Redirecting to your account...
                </div>

                <Button
                  onClick={() => router.push("/account")}
                  className="w-full bg-accent2-600 hover:bg-accent2-700 text-white"
                >
                  Go to Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (verificationStatus === "error") {
    return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="border-gray-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-accent1-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-accent1-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Verification Failed
              </CardTitle>
              <CardDescription className="text-gray-600">
                The verification link is invalid or has expired
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

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Don't worry! We can send you a new verification email.
                </p>

                <Button
                  onClick={handleResendEmail}
                  disabled={resendCooldown > 0}
                  className="w-full bg-accent2-600 hover:bg-accent2-700 text-white"
                >
                  {resendCooldown > 0 ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend in {resendCooldown}s
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
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
        <Card className="border-gray-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-accent2-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-accent2-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-gray-600">
              We've sent a verification link to your email address
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                We sent a verification email to:
              </p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Click the verification link in your email to activate your
                account. If you don't see the email, check your spam folder.
              </p>

              <Button
                onClick={handleResendEmail}
                disabled={resendCooldown > 0}
                variant="outline"
                className="w-full border-accent2-200 text-accent2-600 hover:bg-accent2-50"
              >
                {resendCooldown > 0 ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend in {resendCooldown}s
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Wrong email address?{" "}
                <Link
                  href="/account"
                  className="text-accent2-600 hover:text-accent2-700 hover:underline font-medium"
                >
                  Update in settings
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
