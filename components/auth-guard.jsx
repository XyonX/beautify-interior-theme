"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

// interface AuthGuardProps {
//   children: React.ReactNode
//   requireAuth?: boolean
//   redirectTo?: string
//   fallback?: React.ReactNode
// }

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo,
  fallback,
}) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && requireAuth && !user && redirectTo) {
      router.push(redirectTo);
    }
  }, [user, isLoading, requireAuth, redirectTo, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-6 h-6 animate-spin text-accent2-600 mx-auto mb-3" />
          <p className="text-sm text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If auth is required but user is not logged in
  if (requireAuth && !user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="border-stone-200">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-accent2-100 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-accent2-600" />
              </div>
              <CardTitle className="text-lg font-medium text-stone-900">
                Sign In Required
              </CardTitle>
              <CardDescription className="text-sm text-stone-600">
                You need to be signed in to access this page
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Alert className="border-accent2-200 bg-accent2-50">
                <User className="w-4 h-4" />
                <AlertDescription className="text-sm text-accent2-700">
                  Please sign in to your account to continue
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Link href="/auth/login" className="block">
                  <Button className="w-full bg-accent2-600 hover:bg-accent2-700 text-white text-sm">
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <div className="text-center">
                  <span className="text-xs text-stone-600">
                    Don't have an account?{" "}
                  </span>
                  <Link
                    href="/auth/register"
                    className="text-xs text-accent2-600 hover:text-accent2-700 hover:underline font-medium"
                  >
                    Create one here
                  </Link>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 text-sm"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If user is logged in or auth is not required
  return <>{children}</>;
}
