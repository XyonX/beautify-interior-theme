"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Loader2, CheckCircle, XCircle } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { verifyEmail, resendVerification, isLoading, error, clearError } = useAuthStore()

  const [verificationStatus, setVerificationStatus] = useState("verifying") // verifying, success, error
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token")
    const emailFromUrl = searchParams.get("email")

    if (tokenFromUrl) {
      setToken(tokenFromUrl)
      setEmail(emailFromUrl || "")
      handleVerification(tokenFromUrl)
    } else {
      setVerificationStatus("error")
    }
  }, [searchParams])

  const handleVerification = async (verificationToken) => {
    try {
      const success = await verifyEmail(verificationToken)
      if (success) {
        setVerificationStatus("success")
        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
      } else {
        setVerificationStatus("error")
      }
    } catch (err) {
      setVerificationStatus("error")
    }
  }

  const handleResendVerification = async () => {
    if (!email) return

    setResendLoading(true)
    try {
      const success = await resendVerification(email)
      if (success) {
        setResendSuccess(true)
      }
    } finally {
      setResendLoading(false)
    }
  }

  if (verificationStatus === "verifying") {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-stone-600 animate-spin" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-stone-900">Verifying Your Email</CardTitle>
                <CardDescription className="text-stone-600">
                  Please wait while we verify your email address
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  if (verificationStatus === "success") {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-stone-600" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-stone-900">Email Verified Successfully</CardTitle>
                <CardDescription className="text-stone-600">
                  Your email has been verified. You can now sign in to your account.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-center">
                <p className="text-sm text-stone-600 mb-2">Welcome to BeautifyInterior!</p>
                <p className="text-sm text-stone-500">Redirecting to login page in 3 seconds...</p>
              </div>

              <Button
                onClick={() => router.push("/auth/login")}
                className="w-full bg-stone-800 hover:bg-stone-900 text-white"
              >
                Continue to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-stone-900">Verification Failed</CardTitle>
              <CardDescription className="text-stone-600">We couldn't verify your email address</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {resendSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">
                  Verification email sent successfully! Please check your inbox.
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
              <p className="text-sm text-stone-600 mb-4">
                The verification link may have expired or is invalid. You can request a new verification email.
              </p>

              {email && (
                <div className="space-y-3">
                  <p className="text-sm text-stone-700">
                    <span className="font-medium">Email:</span> {email}
                  </p>
                  <Button
                    onClick={handleResendVerification}
                    disabled={resendLoading || resendSuccess}
                    variant="outline"
                    className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent"
                  >
                    {resendLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : resendSuccess ? (
                      "Email Sent!"
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className="text-center space-y-2">
              <Button
                onClick={() => router.push("/auth/register")}
                variant="outline"
                className="w-full border-stone-300 text-stone-700 hover:bg-stone-50"
              >
                Create New Account
              </Button>

              <p className="text-sm text-stone-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-stone-800 hover:text-stone-900 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
