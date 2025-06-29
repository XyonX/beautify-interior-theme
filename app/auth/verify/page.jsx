"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Head from "next/head";
import Link from "next/link";
import ResendVerificationForm from "@/components/ResendVerificationForm";

// Loading fallback component
const LoadingFallback = () => (
  <div className="text-center">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 text-2xl md:text-3xl font-bold animate-pulse">
      ⋯
    </div>
    <h2 className="text-xl md:text-2xl font-normal text-gray-800 mb-4 md:mb-5 leading-tight">
      Verifying Your Email
    </h2>
    <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-lg mx-auto px-4">
      Please wait while we verify your email address...
    </p>
  </div>
);

// Component that uses searchParams
const VerifyContent = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const renderContent = () => {
    switch (status) {
      case "success":
        return (
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 text-2xl md:text-3xl font-bold">
              ✓
            </div>
            <h2 className="text-xl md:text-2xl font-normal text-gray-800 mb-4 md:mb-5 leading-tight">
              Email Verified Successfully!
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-5 max-w-lg mx-auto px-4">
              Welcome to Beautify Interior! Your email has been verified and
              your account is now active.
            </p>
            <div className="bg-gray-50 p-4 md:p-5 rounded-md my-6 md:my-8 text-left mx-4">
              <p className="text-sm text-gray-600 font-medium mb-2">
                What's next?
              </p>
              <p className="text-sm text-gray-600">
                You now have access to exclusive collections, personalized
                recommendations, and early access to new arrivals.
              </p>
            </div>
            <div className="text-center my-6 md:my-8">
              <Link
                href="/"
                className="inline-block bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded text-sm md:text-base font-medium tracking-wide hover:bg-gray-900 transition-colors duration-200"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        );

      case "expired":
        return (
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 text-2xl md:text-3xl font-bold">
              ⚠
            </div>
            <h2 className="text-xl md:text-2xl font-normal text-gray-800 mb-4 md:mb-5 leading-tight">
              Verification Link Expired
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-5 max-w-lg mx-auto px-4">
              Your verification link has expired. Please request a new
              verification email to complete your registration.
            </p>
            <ResendVerificationForm />
            <div className="text-center my-6 md:my-8">
              <Link
                href="/auth/login"
                className="inline-block bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded text-sm md:text-base font-medium tracking-wide hover:bg-gray-900 transition-colors duration-200"
              >
                Go to Login
              </Link>
            </div>
          </div>
        );

      case "invalid":
        return (
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 text-2xl md:text-3xl font-bold">
              ✕
            </div>
            <h2 className="text-xl md:text-2xl font-normal text-gray-800 mb-4 md:mb-5 leading-tight">
              Invalid Verification Link
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-5 max-w-lg mx-auto px-4">
              The verification link you used is invalid or has already been
              used. Please check your email for the correct link.
            </p>
            <div className="bg-gray-50 p-4 md:p-5 rounded-md my-6 md:my-8 text-left mx-4">
              <p className="text-sm text-gray-600 font-medium mb-2">
                What to do?
              </p>
              <p className="text-sm text-gray-600">
                If you're having trouble, please contact our support team or try
                logging in to your account.
              </p>
            </div>
            <div className="text-center my-6 md:my-8">
              <Link
                href="/login"
                className="inline-block bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded text-sm md:text-base font-medium tracking-wide hover:bg-gray-900 transition-colors duration-200"
              >
                Go to Login
              </Link>
            </div>
          </div>
        );

      default:
        return <LoadingFallback />;
    }
  };

  return renderContent();
};

const VerifyPage = () => {
  return (
    <>
      <Head>
        <title>Email Verification - Beautify Interior</title>
        <meta
          name="description"
          content="Verify your email address for your Beautify Interior account"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-5 font-sans text-gray-800 leading-relaxed">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 md:px-10 py-6 md:py-8 border-b border-gray-100 bg-white">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="w-16 md:w-20 mb-4 md:mb-0">
                  <img
                    src="https://cdn.beautifyinterior.com/site-data/BI.png"
                    alt="Beautify Interior"
                    className="w-12 h-12 md:w-15 md:h-15 block mx-auto md:mx-0"
                  />
                </div>
                <div className="md:pl-5">
                  <h1 className="text-xl md:text-2xl font-light text-gray-800 tracking-wide leading-tight m-0">
                    Beautify Interior
                  </h1>
                  <p className="text-sm text-gray-500 font-light mt-1 mb-0">
                    Curated Home Decor & Design
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="px-6 md:px-10 py-8 md:py-10">
              <Suspense fallback={<LoadingFallback />}>
                <VerifyContent />
              </Suspense>
            </div>

            {/* Footer */}
            <div className="px-6 md:px-10 py-6 md:py-8 border-t border-gray-100 bg-gray-50 text-center">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Transform your space with our curated collection
              </p>
              <p className="mb-4">
                <Link
                  href="https://beautifyinterior.com"
                  className="text-gray-800 no-underline hover:underline"
                >
                  beautifyinterior.com
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                support@beautifyinterior.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
