"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { resetPassword, isLoading, error, clearError } = useAuthStore()

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [resetSuccess, setResetSuccess] = useState(false)
  const [token, setToken] = useState("")

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token")
    if (!tokenFromUrl) {
      router.push("/auth/forgot-password")
      return
    }
    setToken(tokenFromUrl)
  }, [searchParams, router])

  const validateForm = () => {
    const errors = {}

    if (!formData.password) {
      errors.password = "Password is required"
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    const success = await resetPassword(token, formData.password)
    if (success) {
      setResetSuccess(true)
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    }
    clearError()
  }

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-stone-200 shadow-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-stone-600" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-stone-900">Password Reset Successful</CardTitle>
                <CardDescription className="text-stone-600">Your password has been successfully reset</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-center">
                <p className="text-sm text-stone-600 mb-2">You can now sign in with your new password</p>
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
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-stone-900">Reset Your Password</CardTitle>
            <CardDescription className="text-stone-600">Enter your new password below</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-stone-700 font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 border-stone-300 focus:border-stone-500 focus:ring-stone-500 ${
                      validationErrors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validationErrors.password && <p className="text-sm text-red-600">{validationErrors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-stone-700 font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 border-stone-300 focus:border-stone-500 focus:ring-stone-500 ${
                      validationErrors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-sm text-red-600">{validationErrors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-stone-800 hover:bg-stone-900 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
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
