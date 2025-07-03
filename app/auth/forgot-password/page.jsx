"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Loader2, CheckCircle } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading, error, clearError } = useAuthStore()

  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [validationError, setValidationError] = useState("")

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required"
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailError = validateEmail(email)
    if (emailError) {
      setValidationError(emailError)
      return
    }

    const success = await forgotPassword(email)
    if (success) {
      setEmailSent(true)
    }
  }

  const handleEmailChange = (value) => {
    setEmail(value)
    if (validationError) {
      setValidationError("")
    }
    clearError()
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-stone-600" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-stone-900">Check Your Email</CardTitle>
                <CardDescription className="text-stone-600">
                  We've sent a password reset link to your email address
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                <p className="text-sm text-stone-600 mb-2">We sent a password reset link to:</p>
                <p className="font-medium text-stone-900">{email}</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Click the link in the email to reset your password. If you don't see the email, check your spam
                  folder.
                </p>

                <Button
                  onClick={() => setEmailSent(false)}
                  variant="outline"
                  className="w-full border-stone-300 text-stone-700 hover:bg-stone-50"
                >
                  Try Different Email
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-stone-600">
                  Remember your password?{" "}
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

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-stone-200 shadow-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-stone-900">Forgot Password?</CardTitle>
            <CardDescription className="text-stone-600">
              No worries! Enter your email and we'll send you a reset link
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-stone-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`pl-10 border-stone-300 focus:border-stone-500 focus:ring-stone-500 ${
                      validationError ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {validationError && <p className="text-sm text-red-600">{validationError}</p>}
              </div>

              <Button type="submit" className="w-full bg-stone-800 hover:bg-stone-900 text-white" disabled={isLoading}>
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
              <p className="text-sm text-stone-600">
                Remember your password?{" "}
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
