// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
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
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   User,
//   Phone,
//   ArrowLeft,
//   Loader2,
//   CheckCircle,
// } from "lucide-react";
// import { useAuthStore } from "@/lib/auth-store";

// export default function RegisterPage() {
//   const router = useRouter();
//   const { register, isLoading, error, clearError, user } = useAuthStore();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     if (user) {
//       router.push("/auth/verify-email");
//     }
//   }, [user, router]);

//   useEffect(() => {
//     clearError();
//   }, [clearError]);

//   const validateForm = () => {
//     const errors = {};

//     if (!formData.firstName.trim()) {
//       errors.firstName = "First name is required";
//     }

//     if (!formData.lastName.trim()) {
//       errors.lastName = "Last name is required";
//     }

//     if (!formData.email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Please enter a valid email address";
//     }

//     if (formData.phone && !/^\+?[\d\s\-$$$$]+$/.test(formData.phone)) {
//       errors.phone = "Please enter a valid phone number";
//     }

//     if (!formData.password) {
//       errors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       errors.password = "Password must be at least 8 characters";
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       errors.password =
//         "Password must contain at least one uppercase letter, one lowercase letter, and one number";
//     }

//     if (!formData.confirmPassword) {
//       errors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }

//     if (!agreeToTerms) {
//       errors.terms =
//         "You must agree to the Terms of Service and Privacy Policy";
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const success = await register({
//       firstName: formData.firstName.trim(),
//       lastName: formData.lastName.trim(),
//       email: formData.email,
//       password: formData.password,
//       phone: formData.phone || undefined,
//     });

//     if (success) {
//       router.push("/auth/verify-email");
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (validationErrors[field]) {
//       setValidationErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//     clearError();
//   };

//   const getPasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[a-z]/.test(password)) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/\d/.test(password)) strength++;
//     if (/[^a-zA-Z\d]/.test(password)) strength++;
//     return strength;
//   };

//   const passwordStrength = getPasswordStrength(formData.password);

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
//               Create Account
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               Join BeautifyInterior and start transforming your space
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
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName" className="text-gray-700">
//                     First Name
//                   </Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <Input
//                       id="firstName"
//                       type="text"
//                       placeholder="First name"
//                       value={formData.firstName}
//                       onChange={(e) =>
//                         handleInputChange("firstName", e.target.value)
//                       }
//                       className={`pl-10 ${
//                         validationErrors.firstName
//                           ? "border-accent1-300 focus:border-accent1-500"
//                           : "focus:border-accent2-500"
//                       }`}
//                       disabled={isLoading}
//                     />
//                   </div>
//                   {validationErrors.firstName && (
//                     <p className="text-sm text-accent1-600">
//                       {validationErrors.firstName}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="lastName" className="text-gray-700">
//                     Last Name
//                   </Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <Input
//                       id="lastName"
//                       type="text"
//                       placeholder="Last name"
//                       value={formData.lastName}
//                       onChange={(e) =>
//                         handleInputChange("lastName", e.target.value)
//                       }
//                       className={`pl-10 ${
//                         validationErrors.lastName
//                           ? "border-accent1-300 focus:border-accent1-500"
//                           : "focus:border-accent2-500"
//                       }`}
//                       disabled={isLoading}
//                     />
//                   </div>
//                   {validationErrors.lastName && (
//                     <p className="text-sm text-accent1-600">
//                       {validationErrors.lastName}
//                     </p>
//                   )}
//                 </div>
//               </div>

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
//                 <Label htmlFor="phone" className="text-gray-700">
//                   Phone Number (Optional)
//                 </Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="Enter your phone number"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     className={`pl-10 ${
//                       validationErrors.phone
//                         ? "border-accent1-300 focus:border-accent1-500"
//                         : "focus:border-accent2-500"
//                     }`}
//                     disabled={isLoading}
//                   />
//                 </div>
//                 {validationErrors.phone && (
//                   <p className="text-sm text-accent1-600">
//                     {validationErrors.phone}
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
//                     placeholder="Create a password"
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

//                 {formData.password && (
//                   <div className="space-y-2">
//                     <div className="flex space-x-1">
//                       {[1, 2, 3, 4, 5].map((level) => (
//                         <div
//                           key={level}
//                           className={`h-1 flex-1 rounded ${
//                             level <= passwordStrength
//                               ? level <= 2
//                                 ? "bg-accent1-500"
//                                 : level <= 4
//                                 ? "bg-yellow-500"
//                                 : "bg-accent3-500"
//                               : "bg-gray-200"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       Password strength:{" "}
//                       {passwordStrength <= 2
//                         ? "Weak"
//                         : passwordStrength <= 4
//                         ? "Medium"
//                         : "Strong"}
//                     </p>
//                   </div>
//                 )}

//                 {validationErrors.password && (
//                   <p className="text-sm text-accent1-600">
//                     {validationErrors.password}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword" className="text-gray-700">
//                   Confirm Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     id="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm your password"
//                     value={formData.confirmPassword}
//                     onChange={(e) =>
//                       handleInputChange("confirmPassword", e.target.value)
//                     }
//                     className={`pl-10 pr-10 ${
//                       validationErrors.confirmPassword
//                         ? "border-accent1-300 focus:border-accent1-500"
//                         : "focus:border-accent2-500"
//                     }`}
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     disabled={isLoading}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="w-4 h-4" />
//                     ) : (
//                       <Eye className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//                 {formData.confirmPassword &&
//                   formData.password === formData.confirmPassword && (
//                     <div className="flex items-center text-accent3-600">
//                       <CheckCircle className="w-4 h-4 mr-1" />
//                       <span className="text-sm">Passwords match</span>
//                     </div>
//                   )}
//                 {validationErrors.confirmPassword && (
//                   <p className="text-sm text-accent1-600">
//                     {validationErrors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-start space-x-2">
//                   <Checkbox
//                     id="terms"
//                     checked={agreeToTerms}
//                     onCheckedChange={setAgreeToTerms}
//                     className="mt-1"
//                   />
//                   <Label
//                     htmlFor="terms"
//                     className="text-sm text-gray-600 leading-relaxed"
//                   >
//                     I agree to the{" "}
//                     <Link
//                       href="/terms"
//                       className="text-accent2-600 hover:text-accent2-700 hover:underline"
//                     >
//                       Terms of Service
//                     </Link>{" "}
//                     and{" "}
//                     <Link
//                       href="/privacy"
//                       className="text-accent2-600 hover:text-accent2-700 hover:underline"
//                     >
//                       Privacy Policy
//                     </Link>
//                   </Label>
//                 </div>
//                 {validationErrors.terms && (
//                   <p className="text-sm text-accent1-600">
//                     {validationErrors.terms}
//                   </p>
//                 )}

//                 <div className="flex items-start space-x-2">
//                   <Checkbox
//                     id="newsletter"
//                     checked={subscribeNewsletter}
//                     onCheckedChange={setSubscribeNewsletter}
//                     className="mt-1"
//                   />
//                   <Label
//                     htmlFor="newsletter"
//                     className="text-sm text-gray-600 leading-relaxed"
//                   >
//                     Subscribe to our newsletter for exclusive offers and
//                     interior design tips
//                   </Label>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-accent2-600 hover:bg-accent2-700 text-white"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Creating Account...
//                   </>
//                 ) : (
//                   "Create Account"
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
//                 Already have an account?{" "}
//                 <Link
//                   href="/auth/login"
//                   className="text-accent2-600 hover:text-accent2-700 hover:underline font-medium"
//                 >
//                   Sign in here
//                 </Link>
//               </p>
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
    <>
      {/* Header */}
      <div className="border-b border-stone-100 py-4">
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

      {/* Main Content */}
      <div className="py-8 md:py-16">
        <div className="max-w-md mx-auto">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-stone-800 mb-2">
              Create Account
            </h1>
            <p className="text-sm text-stone-600">
              Join us to start transforming your space.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div
                className={`p-3 border text-sm ${
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
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
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
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  className="h-4 w-4 text-stone-800 border-stone-300 focus:ring-stone-400 mt-0.5"
                  required
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
        </div>
      </div>
    </>
  );
}
