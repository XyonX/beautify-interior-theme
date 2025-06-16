// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { Button } from "../../../components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Separator } from "@/components/ui/separator";
// import { Eye, EyeOff, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
// import { useAuthStore } from "@/lib/auth-store";

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { login, isLoading, error, clearError, user } = useAuthStore();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({});

//   const redirectTo = searchParams.get("redirect") || "/";

//   useEffect(() => {
//     if (user) {
//       router.push(redirectTo);
//     }
//   }, [user, router, redirectTo]);

//   useEffect(() => {
//     clearError();
//   }, [clearError]);

//   const validateForm = () => {
//     const errors = {};

//     if (!formData.email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Please enter a valid email address";
//     }

//     if (!formData.password) {
//       errors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const success = await login(formData.email, formData.password);
//     if (success) {
//       router.push(redirectTo);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (validationErrors[field]) {
//       setValidationErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//     clearError();
//   };

//   return (
//     <main className="flex-grow container mx-auto px-4 py-8">
//       <div className="max-w-md mx-auto">
//         <div className="mb-6">
//           <Link
//             href="/"
//             className="inline-flex items-center text-sm text-gray-600 hover:text-accent2-600 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Home
//           </Link>
//         </div>

//         <Card className="border-gray-200">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl font-bold text-gray-900">
//               Welcome Back
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               Sign in to your account to continue shopping
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {error && (
//               <Alert className="border-accent1-200 bg-accent1-50">
//                 <AlertDescription className="text-accent1-700">
//                   {error}
//                 </AlertDescription>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-gray-700">
//                   Email Address
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className={`pl-10 ${
//                       validationErrors.email
//                         ? "border-accent1-300 focus:border-accent1-500"
//                         : "focus:border-accent2-500"
//                     }`}
//                     disabled={isLoading}
//                   />
//                 </div>
//                 {validationErrors.email && (
//                   <p className="text-sm text-accent1-600">
//                     {validationErrors.email}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-gray-700">
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={(e) =>
//                       handleInputChange("password", e.target.value)
//                     }
//                     className={`pl-10 pr-10 ${
//                       validationErrors.password
//                         ? "border-accent1-300 focus:border-accent1-500"
//                         : "focus:border-accent2-500"
//                     }`}
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     disabled={isLoading}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-4 h-4" />
//                     ) : (
//                       <Eye className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//                 {validationErrors.password && (
//                   <p className="text-sm text-accent1-600">
//                     {validationErrors.password}
//                   </p>
//                 )}
//               </div>

//               <div className="flex items-center justify-between">
//                 <Link
//                   href="/auth/forgot-password"
//                   className="text-sm text-accent2-600 hover:text-accent2-700 hover:underline"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-accent2-600 hover:bg-accent2-700 text-white"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Signing In...
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>
//             </form>

//             <div className="relative">
//               <Separator />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="bg-white px-2 text-sm text-gray-500">or</span>
//               </div>
//             </div>

//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 {"Don't have an account? "}
//                 <Link
//                   href="/auth/register"
//                   className="text-accent2-600 hover:text-accent2-700 hover:underline font-medium"
//                 >
//                   Create one here
//                 </Link>
//               </p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-xs text-gray-500 mb-2">Demo Credentials:</p>
//               <p className="text-xs text-gray-600">Email: user@example.com</p>
//               <p className="text-xs text-gray-600">Password: password123</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// }

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-stone-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm text-stone-600">Back to store</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-stone-800 flex items-center justify-center">
                <span className="text-white font-medium text-xs">BI</span>
              </div>
              <span className="text-sm font-medium text-stone-800">
                BeautifyInterior
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-stone-800 mb-2">
              Sign In
            </h1>
            <p className="text-sm text-stone-600">
              Welcome back! Please sign in to your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
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
                  className="h-4 w-4 text-stone-800 border-stone-300 focus:ring-stone-400"
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
              {isLoading ? (
                <>
                  <span className="animate-pulse">🔒</span> Signing in...
                </>
              ) : (
                "Sign In"
              )}
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
          <div className="mt-8">
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
                className="w-full border-stone-200 hover:bg-stone-50 text-sm py-2.5"
                disabled={isLoading}
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-stone-200 hover:bg-stone-50 text-sm py-2.5"
                disabled={isLoading}
              >
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
